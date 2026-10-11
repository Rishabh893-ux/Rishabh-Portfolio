import type { LucideIcon } from "lucide-react";
import { AudioLines, Bot, Database, FileSearch, KeyRound, Network, ShieldCheck, Workflow, Zap } from "lucide-react";
import {
  siDotnet,
  siFastapi,
  siGithub,
  siGithubactions,
  siGoogle,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siMongodb,
  siMqtt,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siOpenai,
  siOpencv,
  siPrisma,
  siRazorpay,
  siReact,
  siRedux,
  siSqlite,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

export type TechIcon =
  | { kind: "brand"; path: string; title: string; dark?: string; light?: string }
  | { kind: "generic"; Icon: LucideIcon };

// Brand logos (simple-icons, CC0) imported one by one so only these end up in the bundle.
const brands: Record<string, SimpleIcon> = {
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  Redux: siRedux,
  "Tailwind CSS": siTailwindcss,
  JavaScript: siJavascript,
  "HTML / CSS": siHtml5,
  "Node.js / Express": siNodedotjs,
  "ASP.NET Core (.NET 8)": siDotnet,
  FastAPI: siFastapi,
  Prisma: siPrisma,
  SQLite: siSqlite,
  MongoDB: siMongodb,
  Supabase: siSupabase,
  "OpenAI API": siOpenai,
  "Gemini API": siGooglegemini,
  "Computer Vision (YOLOv8n, MediaPipe)": siOpencv,
  n8n: siN8n,
  "GitHub Actions (CI)": siGithubactions,
  MQTT: siMqtt,
  Razorpay: siRazorpay,
  "Stripe Connect": siStripe,
  "Google Business Profile API": siGoogle,
  "GitHub API": siGithub,
};

// Concepts and tools without a brand logo get a matching line icon.
const generic: Record<string, LucideIcon> = {
  "REST APIs": Network,
  OAuth2: KeyRound,
  NextAuth: ShieldCheck,
  "SQL Server + EF Core": Database,
  "AI Agents (tool calling)": Bot,
  "Groq API": Zap,
  Whisper: AudioLines,
  "Multi-Agent Orchestration": Workflow,
  "RAG (FAISS + sentence-transformers)": FileSearch,
};

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(hex: string, surfaceLum: number) {
  const l = luminance(hex);
  return (Math.max(l, surfaceLum) + 0.05) / (Math.min(l, surfaceLum) + 0.05);
}

// Card surfaces of each theme (globals.css): dark #0f0f12, light #fcf9f3.
const DARK_SURFACE = luminance("0f0f12");
const LIGHT_SURFACE = luminance("fcf9f3");

/** The brand color for a theme, or undefined when it would be too faint there (under 3:1). */
function brandColor(hex: string, surface: number) {
  return contrast(hex, surface) >= 3 ? `#${hex}` : undefined;
}

export function techIcon(name: string): TechIcon {
  const brand = brands[name];
  if (brand) {
    return {
      kind: "brand",
      path: brand.path,
      title: brand.title,
      dark: brandColor(brand.hex, DARK_SURFACE),
      light: brandColor(brand.hex, LIGHT_SURFACE),
    };
  }
  return { kind: "generic", Icon: generic[name] ?? Workflow };
}
