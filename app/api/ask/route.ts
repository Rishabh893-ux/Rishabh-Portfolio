import { ASK_SYSTEM_PROMPT } from "@/lib/askContext";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const API_BASE = process.env.GEMINI_API_BASE || "https://generativelanguage.googleapis.com";
const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

const MAX_TURNS = 12; // messages kept from the conversation
const MAX_CHARS = 600; // per message
const RATE_LIMIT = 20; // requests per visitor…
const RATE_WINDOW_MS = 10 * 60 * 1000; // …per 10 minutes
const UPSTREAM_TIMEOUT_MS = 25_000;

type Turn = { role: "user" | "assistant"; text: string };

// In-memory per-visitor limit. Each server instance keeps its own window, which is
// enough to stop one visitor from burning through the shared API key.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
  }
  return recent.length > RATE_LIMIT;
}

function error(status: number, code: string, message: string) {
  return Response.json({ error: { code, message } }, { status });
}

function cleanTurns(input: unknown): Turn[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  const turns: Turn[] = [];
  for (const item of input.slice(-MAX_TURNS)) {
    if (!item || typeof item !== "object") return null;
    const { role, text } = item as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof text !== "string") return null;
    const trimmed = text.trim().slice(0, MAX_CHARS);
    if (trimmed) turns.push({ role, text: trimmed });
  }
  // Gemini needs the conversation to start with the user and end on a user question.
  while (turns.length && turns[0].role !== "user") turns.shift();
  if (!turns.length || turns[turns.length - 1].role !== "user") return null;
  return turns;
}

export async function POST(req: Request) {
  // Only this site's own pages may call the route.
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return error(403, "forbidden", "Requests from other websites are not allowed.");
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) return error(503, "not_configured", "The AI assistant isn't set up yet.");

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return error(429, "rate_limited", "Too many questions in a short time. Please try again in a few minutes.");

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return error(400, "bad_request", "Invalid JSON.");
  }
  const turns = cleanTurns((body as { messages?: unknown })?.messages);
  if (!turns) return error(400, "bad_request", "Send a non-empty conversation that ends with a question.");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await fetch(`${API_BASE}/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: ASK_SYSTEM_PROMPT }] },
        contents: turns.map((t) => ({ role: t.role === "assistant" ? "model" : "user", parts: [{ text: t.text }] })),
        generationConfig: { temperature: 0.4, maxOutputTokens: 700 },
      }),
      signal: controller.signal,
    });
  } catch {
    clearTimeout(timeout);
    return error(504, "upstream_unavailable", "The AI service didn't respond. Please try again.");
  }

  if (!upstream.ok || !upstream.body) {
    clearTimeout(timeout);
    const status = upstream.status === 429 ? 429 : 502;
    const code = upstream.status === 429 ? "busy" : "upstream_error";
    return error(status, code, upstream.status === 429 ? "The AI is busy right now. Please try again shortly." : "The AI service returned an error.");
  }

  // Re-stream Gemini's server-sent events as plain text chunks.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(ctrl) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          clearTimeout(timeout);
          ctrl.close();
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split(/\r?\n\r?\n/);
        buffer = events.pop() ?? "";
        for (const event of events) {
          const data = event
            .split(/\r?\n/)
            .filter((l) => l.startsWith("data:"))
            .map((l) => l.slice(5).trim())
            .join("");
          if (!data) continue;
          try {
            const json = JSON.parse(data);
            const parts = json?.candidates?.[0]?.content?.parts ?? [];
            const text = parts.map((p: { text?: string; thought?: boolean }) => (p.thought ? "" : p.text ?? "")).join("");
            if (text) ctrl.enqueue(encoder.encode(text));
          } catch {
            // Ignore a malformed event rather than failing the whole answer.
          }
        }
      } catch {
        clearTimeout(timeout);
        ctrl.close();
      }
    },
    cancel() {
      clearTimeout(timeout);
      controller.abort();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}
