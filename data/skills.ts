export type Skill = {
  name: string;
  usedIn: string[]; // project slugs
  usedAt?: string[]; // experience ids
  concepts: string[];
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React", usedIn: ["ai-navigator", "careeros-ai", "ai-ats-resume", "ai-revenue-recovery", "rishabh-studio", "waypoint", "ops-agent-platform"], concepts: ["Component architecture", "Context API state", "Hooks"] },
      { name: "Next.js", usedIn: ["ai-navigator", "careeros-ai", "edgepilot-ai", "waypoint", "vendly", "ai-ats-resume"], concepts: ["App Router", "Server/client components", "File-based routing"] },
      { name: "TypeScript", usedIn: ["ai-navigator", "careeros-ai", "ai-ats-resume", "waypoint"], concepts: ["Type-safe data models", "Interfaces"] },
      { name: "Redux", usedIn: ["vendly"], concepts: ["Centralized client state", "Predictable state updates"] },
      { name: "Tailwind CSS", usedIn: ["careeros-ai", "waypoint", "vendly"], concepts: ["Utility-first styling", "Design tokens"] },
      { name: "JavaScript", usedIn: ["ai-revenue-recovery", "rishabh-studio"], concepts: ["Async/await", "DOM & browser APIs"] },
      { name: "HTML / CSS", usedIn: ["ai-navigator", "ai-revenue-recovery", "rishabh-studio", "careeros-ai", "edgepilot-ai", "waypoint", "vendly", "ai-ats-resume"], concepts: ["Semantic markup", "Responsive layout"] },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js / Express", usedIn: ["ai-revenue-recovery", "careeros-ai", "ops-agent-platform"], concepts: ["REST API design", "Middleware", "Route modules"] },
      { name: "REST APIs", usedIn: ["ai-revenue-recovery", "careeros-ai", "library-api"], usedAt: ["impulseai"], concepts: ["Third-party API integration", "Request/response mapping"] },
      { name: "OAuth2", usedIn: [], usedAt: ["impulseai"], concepts: ["Token refresh flows", "Delegated API access"] },
      { name: "FastAPI", usedIn: ["rishabh-studio", "edgepilot-ai"], concepts: ["Async endpoints", "Pipeline orchestration"] },
      { name: "ASP.NET Core (.NET 8)", usedIn: ["library-api"], concepts: ["Controllers & services", "JWT role-based auth", "RFC 7807 errors"] },
      { name: "NextAuth", usedIn: ["vendly", "ai-ats-resume"], concepts: ["Session/auth management", "Role-based access"] },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "Prisma", usedIn: ["ops-agent-platform", "vendly"], concepts: ["Schema modeling", "Migrations"] },
      { name: "SQLite", usedIn: ["ops-agent-platform", "library-api"], concepts: ["Local-first data storage"] },
      { name: "MongoDB", usedIn: ["careeros-ai", "vendly", "ai-ats-resume"], concepts: ["Document modeling", "Mongoose / Prisma schemas"] },
      { name: "SQL Server + EF Core", usedIn: ["library-api"], concepts: ["Code-first migrations", "Hand-written reporting SQL"] },
      { name: "Supabase", usedIn: ["ai-revenue-recovery"], concepts: ["Postgres-backed carts/payments", "Service-role access from backend"] },
    ],
  },
  {
    category: "AI / ML",
    skills: [
      { name: "OpenAI API", usedIn: [], usedAt: ["impulseai"], concepts: ["Sentiment analysis", "On-brand reply drafting"] },
      { name: "Gemini API", usedIn: ["ai-navigator", "ai-revenue-recovery", "rishabh-studio", "edgepilot-ai", "waypoint", "ai-ats-resume", "ops-agent-platform"], concepts: ["Function calling", "Prompt pipelines", "Structured generation"] },
      { name: "AI Agents (tool calling)", usedIn: ["ai-navigator"], concepts: ["Agent loop with tool rounds", "Validated tool execution", "Undoable actions"] },
      { name: "Groq API", usedIn: ["careeros-ai"], concepts: ["Quota + cache service wrapper", "Vision OCR for scanned resumes"] },
      { name: "Computer Vision (YOLOv8n, MediaPipe)", usedIn: ["edgepilot-ai"], concepts: ["Real-time object detection", "Safety monitoring"] },
      { name: "Whisper", usedIn: ["rishabh-studio"], concepts: ["Speech-to-text transcription"] },
      { name: "Multi-Agent Orchestration", usedIn: ["ops-agent-platform"], concepts: ["Confidence-based escalation", "Human-in-the-loop approval", "Audit trails"] },
      { name: "RAG (FAISS + sentence-transformers)", usedIn: [], concepts: ["Embedding search", "Retrieval-augmented generation"] },
    ],
  },
  {
    category: "Automation",
    skills: [
      { name: "n8n", usedIn: ["ai-revenue-recovery"], usedAt: ["impulseai"], concepts: ["Event-driven workflows", "AI-in-the-loop automation", "Debugging production workflows"] },
      { name: "GitHub Actions (CI)", usedIn: ["careeros-ai"], concepts: ["Lint, typecheck, build and test on every push"] },
      { name: "MQTT", usedIn: ["edgepilot-ai"], concepts: ["Lightweight telemetry transport"] },
    ],
  },
  {
    category: "Payments / Integrations",
    skills: [
      { name: "Razorpay", usedIn: ["ai-revenue-recovery"], concepts: ["Server-verified order flow", "Webhook signature verification"] },
      { name: "Stripe Connect", usedIn: ["vendly"], concepts: ["Multi-vendor payout splitting"] },
      { name: "Google Business Profile API", usedIn: [], usedAt: ["impulseai"], concepts: ["Review sync", "Webhooks"] },
      { name: "GitHub API", usedIn: ["careeros-ai"], concepts: ["Repository metadata"] },
    ],
  },
];
