"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Sparkles, X } from "lucide-react";
import { ASK_SUGGESTIONS } from "@/lib/askSuggestions";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; text: string; error?: boolean };

const firstName = site.name.split(" ")[0];

/**
 * "Ask my AI": a floating chat that answers questions about Rishabh from the
 * portfolio's own data (see /api/ask). Replies stream in as they are written.
 */
export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Open from elsewhere (command palette).
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-ask-ai", onOpen);
    return () => window.removeEventListener("open-ask-ai", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setInput("");
    const history = [...messages.filter((m) => !m.error), { role: "user" as const, text: q }];
    setMessages([...history, { role: "assistant", text: "" }]);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, text }) => ({ role, text })) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        const code = data?.error?.code;
        const text =
          code === "not_configured"
            ? `The AI assistant isn't switched on yet. You can reach ${firstName} at ${site.email}.`
            : data?.error?.message ?? "Something went wrong. Please try again.";
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", text, error: true }]);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", text: answer }]);
      }
      if (!answer.trim()) {
        setMessages((m) => [
          ...m.slice(0, -1),
          { role: "assistant", text: "I couldn't come up with an answer. Please try rephrasing.", error: true },
        ]);
      }
    } catch {
      if (!controller.signal.aborted) {
        setMessages((m) => [
          ...m.slice(0, -1),
          { role: "assistant", text: "The connection dropped. Please try again.", error: true },
        ]);
      }
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="ask-ai-panel"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="gradient-btn fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-bg shadow-lift focus-ring sm:bottom-7 sm:right-7"
      >
        {open ? <X size={16} /> : <Sparkles size={16} />}
        <span>{open ? "Close" : "Ask my AI"}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="ask-ai-panel"
            role="dialog"
            aria-label={`Ask questions about ${site.name}`}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-3 bottom-20 z-[70] flex max-h-[min(70vh,600px)] flex-col overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-lift backdrop-blur-xl sm:inset-x-auto sm:bottom-24 sm:right-7 sm:w-[380px]"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Sparkles size={15} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-primary">Ask about {firstName}</div>
                <div className="text-[11px] text-secondary">Answers come from this portfolio · AI can make mistakes</div>
              </div>
            </div>

            <div
              ref={listRef}
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
            >
              {messages.length === 0 && (
                <div>
                  <p className="text-sm leading-relaxed text-secondary">
                    Hi! I can answer questions about {firstName}&apos;s projects, skills and experience. Try one of these:
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {ASK_SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => ask(s)}
                        className="rounded-xl border border-border bg-surface2/60 px-3 py-2 text-left text-sm text-primary transition-colors hover:border-accent/50 focus-ring"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-accent text-white"
                        : m.error
                          ? "rounded-bl-md border border-border bg-surface2 text-secondary"
                          : "rounded-bl-md bg-surface2 text-primary"
                    )}
                  >
                    {m.text || (
                      <span className="inline-flex gap-1 py-1" aria-label="Thinking">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-secondary"
                            style={{ animationDelay: `${d * 0.15}s` }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border p-3">
              <label htmlFor="ask-ai-input" className="sr-only">
                Your question
              </label>
              <input
                id="ask-ai-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder={`Ask about ${firstName}…`}
                autoComplete="off"
                className="min-w-0 flex-1 rounded-xl border border-border bg-bg/60 px-3 py-2.5 text-sm text-primary placeholder:text-secondary/70 focus:border-accent/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="gradient-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-bg transition-opacity disabled:opacity-40 focus-ring"
              >
                <ArrowUp size={17} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
