export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  architecture: string[];
  overview: string;
  problem: string;
  solution: string;
  systemFlow?: string[];
  techDecisions: string[];
  challenges: string[];
  features: string[];
  futureImprovements: string[];
  github?: string;
  demo?: string;
  image?: string; // screenshot under /public
  featured: boolean;
  status?: "In Development" | "Hackathon Submission";
};

// NOTE: All content below reflects only information actually provided about
// each project. Live-demo and GitHub links are left as placeholders ("#")
// where a public URL has not been confirmed — wire these up in this file
// once repos/deployments are public.

export const projects: Project[] = [
  {
    slug: "ai-revenue-recovery",
    name: "AI Revenue Recovery (ReviveAI)",
    tagline: "Detects abandoned checkouts and triggers automated, AI-assisted recovery workflows.",
    description:
      "An e-commerce revenue recovery system that tracks cart and payment state, and hands off abandoned or failed checkouts to an automation layer that decides and executes recovery actions.",
    category: "AI / Automation / Full-Stack",
    tech: ["React", "Vite", "React Router", "Node.js / Express", "Supabase", "n8n", "Gemini API", "Razorpay"],
    architecture: [
      "Customer",
      "Cart (React + Context, persisted to localStorage)",
      "Checkout / Payment State",
      "Backend (Express) — order creation & verification",
      "Supabase (carts, cart items, payment events, agent actions)",
      "n8n workflow — watches payment/cart events",
      "Gemini — decides and drafts a recovery action",
      "Recovery action (e.g. email) → customer",
      "Admin Dashboard — revenue, recovery rate, activity log",
    ],
    overview:
      "ReviveAI is the customer-facing storefront and admin dashboard for an AI-driven revenue recovery pipeline. The frontend never talks to Gemini or n8n directly — it only ever calls the backend, which is the security boundary for payment and automation logic.",
    problem:
      "Abandoned carts and failed payments are silent revenue loss for small e-commerce operations, and manually following up with every customer doesn't scale.",
    solution:
      "A clear separation of concerns: React handles cart/checkout UX and calls a small set of backend endpoints; Supabase stores cart, payment, and action state; n8n watches that state and calls Gemini to decide what recovery action (if any) to take; the dashboard surfaces the resulting metrics and activity log back to the store owner.",
    systemFlow: [
      "Customer adds items — cart state kept in React Context and localStorage",
      "Checkout creates a Razorpay order via POST /api/payment/create-order",
      "Payment is verified server-side via POST /api/payment/verify (no secret keys in the browser)",
      "Cart/payment events are written to Supabase",
      "n8n workflows react to those events and call Gemini to generate a recovery action",
      "Recovery actions and resulting metrics are surfaced on the admin dashboard",
    ],
    techDecisions: [
      "Kept all Razorpay secret operations server-side; the frontend only opens Razorpay Checkout and reads a client-safe key",
      "Used Supabase as the shared state store between the frontend/backend and the n8n automation layer, instead of having n8n talk to the app database directly",
      "Split the app into a monorepo (frontend / backend / n8n / supabase / docs) so the automation and application layers can evolve independently",
    ],
    challenges: [
      "Designing endpoint contracts so the frontend, backend, and n8n workflows could all be built and iterated on somewhat independently",
      "Keeping payment-sensitive logic entirely server-side while still giving the dashboard real-time-feeling metrics",
    ],
    features: [
      "Cart, checkout, payment success/failure pages",
      "Razorpay checkout integration with server-side order creation and verification",
      "Admin dashboard: total revenue, recovered revenue, recovery rate, failed payments, abandoned carts, and a recovery activity table",
      "Webhook endpoints for Razorpay, cart-abandonment, and n8n recovery actions",
    ],
    futureImprovements: [
      "Finish reconciling the frontend to the newer monorepo layout (split services/utils, dedicated dashboard navbar, real product imagery)",
      "Add a docker-compose-based one-command local setup",
    ],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    slug: "rishabh-studio",
    name: "Rishabh Studio",
    tagline: "An AI video generation SaaS that turns a text prompt into a YouTube Short or long-form video.",
    description:
      "A full-stack application that runs a prompt through an 8-agent Gemini pipeline plus TTS, transcription, and video assembly to produce a finished video — built and debugged end-to-end on consumer hardware.",
    category: "AI / Full-Stack",
    tech: ["React (Vite)", "FastAPI", "Gemini API (8-agent pipeline)", "Kokoro TTS", "Whisper", "FFmpeg / MoviePy"],
    architecture: [
      "Text prompt",
      "8-agent Gemini pipeline (scripting, structuring, etc.)",
      "Kokoro TTS — narration audio",
      "Whisper — transcription / captioning",
      "FFmpeg + MoviePy — video assembly",
      "React frontend — prompt input & status polling",
    ],
    overview:
      "Rishabh Studio targets both YouTube Shorts and long-form video from a single text prompt, coordinating multiple AI stages into one rendering pipeline.",
    problem:
      "Producing a video from an idea normally means separately writing a script, generating voiceover, sourcing visuals, and editing everything together.",
    solution:
      "An 8-agent Gemini pipeline breaks the prompt into the stages a human editor would perform, then hands off to Kokoro TTS for narration, Whisper for captions, and FFmpeg/MoviePy for final assembly, with a React frontend to submit prompts and track generation status.",
    techDecisions: [
      "Chose Kokoro TTS and Whisper over cloud alternatives to keep the pipeline runnable on local/free tooling",
      "Ruled out Stable Diffusion for visuals given the 4GB VRAM constraint on the development machine (RTX 2050, 8GB RAM)",
      "Replaced an ImageMagick dependency with Pillow to simplify the deployment environment",
    ],
    challenges: [
      "A bcrypt/passlib version incompatibility",
      "A Gemini import-order race condition",
      "A Pixabay vocabulary mismatch affecting stock asset search",
      "An ImageMagick dependency that was replaced with Pillow",
      "A React polling bug fixed with a useRef-based approach",
    ],
    features: [
      "Text-to-video generation for both Shorts and long-form formats",
      "8-agent Gemini pipeline for script/structure generation",
      "Kokoro TTS narration and Whisper-based captioning",
      "FFmpeg/MoviePy-based automated video assembly",
    ],
    futureImprovements: [
      "Add image/visual generation once running on hardware with more VRAM headroom",
    ],
    github: "https://github.com/Rishabh893-ux/rishabh-studio",
    demo: "#",
    featured: true,
  },
  {
    slug: "careeros-ai",
    name: "CareerOS AI",
    tagline: "A career-readiness platform that scores, coaches, and tracks a student's job-search progress.",
    description:
      "A multi-module platform covering resume parsing, GitHub analysis, a defensible career-readiness score, an AI copilot, and dedicated modules for growth, interview prep, and LinkedIn presence.",
    category: "AI / Full-Stack",
    tech: ["Node.js / Express", "Prisma", "SQLite", "Gemini API"],
    architecture: [
      "Resume Parsing",
      "GitHub Analysis",
      "Career Score Engine (40/30/30 weighting)",
      "AI Copilot (geminiService.js — quota + caching)",
      "Growth OS / Interview OS / LinkedIn OS modules",
    ],
    overview:
      "CareerOS is Rishabh's major project: ten route modules built around a resume-parsing and GitHub-analysis core, feeding a Career Score he designed to be explainable in an academic viva.",
    problem:
      "Students get generic 'improve your resume' advice with no concrete, explainable scoring of where they actually stand.",
    solution:
      "A hardcoded, explainable 40/30/30 Career Score (skills & projects / GitHub activity / goal alignment) backed by real resume and GitHub data, plus AI-assisted modules for growth planning, interview prep, and LinkedIn optimization.",
    techDecisions: [
      "Migrated from MongoDB to Prisma + SQLite specifically to avoid requiring a cloud database signup",
      "Centralized all Gemini calls in one geminiService.js with a daily quota cap, token-bucket rate limiting, and 24-hour caching to stay within free-tier API limits",
      "Deliberately hardcoded the 40/30/30 Career Score weighting so it can be explained and defended clearly rather than tuned as a black box",
    ],
    challenges: [
      "Staying within free-tier Gemini API quotas across ten route modules that all rely on it",
      "Designing a scoring formula that is simple enough to defend in a viva but still meaningful",
    ],
    features: [
      "Resume parsing",
      "GitHub analysis",
      "Career Score (40/30/30: skills & projects / GitHub activity / goal alignment)",
      "AI Copilot",
      "Growth OS, Interview OS, and LinkedIn OS modules",
    ],
    futureImprovements: [],
    github: "https://github.com/Rishabh893-ux/CareerOS-AI",
    demo: "#",
    featured: true,
  },
  {
    slug: "edgepilot-ai",
    name: "EdgePilot AI",
    tagline: "Edge-based intelligence for heavy machinery — predictive maintenance and computer-vision safety monitoring.",
    description:
      "An autonomous heavy-machine intelligence platform combining predictive maintenance, real-time computer-vision safety monitoring, and an AI maintenance copilot, submitted to the Tata Technologies InnoVent hackathon.",
    category: "AI / Computer Vision",
    tech: ["FastAPI", "YOLOv8n", "MediaPipe", "Gemini API", "MQTT", "Next.js dashboard"],
    architecture: [
      "Machine sensors / camera feed",
      "YOLOv8n + MediaPipe — vision-based safety detection",
      "MQTT — telemetry transport",
      "FastAPI backend",
      "Gemini — AI Maintenance Copilot",
      "Next.js dashboard",
    ],
    overview:
      "Built with team Tech Titans for Stage 1 of the Tata Technologies InnoVent hackathon, EdgePilot targets safety and uptime on heavy industrial machinery.",
    problem:
      "Heavy machinery operations need both real-time safety monitoring (e.g. PPE compliance) and early warning on maintenance issues, typically handled by separate, disconnected systems.",
    solution:
      "A single platform where YOLOv8n and MediaPipe handle real-time vision-based safety checks, MQTT carries telemetry, and a Gemini-powered copilot assists with maintenance decisions — all surfaced through a Next.js dashboard.",
    techDecisions: [
      "Chose YOLOv8n specifically for its balance of speed and accuracy on edge-oriented inference",
      "Used MQTT for telemetry to keep the machine-to-backend transport lightweight",
    ],
    challenges: [
      "Integrating vision inference, telemetry, and an LLM copilot into one coherent pipeline within a hackathon timeframe",
    ],
    features: [
      "Computer-vision safety monitoring (e.g. PPE detection)",
      "Predictive maintenance signals",
      "AI Maintenance Copilot",
      "Next.js dashboard for monitoring",
    ],
    futureImprovements: [],
    github: "https://github.com/Rishabh893-ux/EdgePilot_AI",
    demo: "https://edge-pilot-ai.vercel.app",
    image: "/projects/edgepilot-ai.jpg",
    featured: true,
  },
  {
    slug: "waypoint",
    name: "Waypoint — AI Learning Path Recommender",
    tagline: "Conversational learner profiling that generates and adapts a personalized learning roadmap.",
    description:
      "An AI-powered platform, built for the Amplified HCL program, that profiles a learner through conversation and produces a structured, explorable, and adaptive learning roadmap.",
    category: "AI / Full-Stack",
    tech: ["Next.js 14", "TypeScript", "Gemini API (gemini-2.5-flash)", "Recharts"],
    architecture: [
      "Conversational learner profiling",
      "Gemini-generated roadmap & syllabus",
      "Gemini-graded assessments (70% pass threshold, offline deterministic fallback)",
      "Roadmap engine — Trail / Graph views with prerequisite tracking",
      "Progress, gamification, and study-pace planning",
    ],
    overview:
      "Named Waypoint, this project turns a learner's interests, goals, and skill level into a concrete, navigable roadmap rather than a generic course list.",
    problem:
      "Generic course recommendations don't account for a learner's actual history, pace, or prerequisite gaps.",
    solution:
      "A conversational intake profiles the learner, Gemini generates a structured roadmap with a detailed per-course syllabus, and Gemini-graded assessments feed completion state back into the recommendation engine — with a Course Explorer for search/filter and manual roadmap edits under prerequisite protection.",
    techDecisions: [
      "Switched from better-sqlite3 to a JSON file store after better-sqlite3 failed to install on Windows without build tools",
      "Added an offline deterministic fallback for assessment grading so the app degrades gracefully without an API call",
      "Used Recharts for progress and skill-proficiency visualization",
    ],
    challenges: [
      "A Windows build-tools issue that forced a switch away from better-sqlite3",
      "A hydration warning on <html> caused by the theme-toggle script, resolved with suppressHydrationWarning",
    ],
    features: [
      "Conversational learner profiling and roadmap generation",
      "Per-course syllabus with modules, topics, and learning outcomes",
      "Gemini-graded assessments with an offline fallback, auto-marking courses complete",
      "Course Explorer with search/filter and prerequisite-protected manual edits",
      "Study-pace planner with projected completion date and a printable certificate",
      "Gamification: XP, levels, streaks, and badges derived from real activity",
      "Cmd+K command palette, toast notifications, light/dark theme",
      "Trail/Graph roadmap views with a prerequisite dependency graph",
    ],
    futureImprovements: ["Push to GitHub, record a demo video, and deploy — final submission steps"],
    github: "https://github.com/Rishabh893-ux/WaypointLearningPath",
    demo: "https://waypointlearningpath.vercel.app",
    image: "/projects/waypoint.jpg",
    featured: true,
  },
  {
    slug: "vendly",
    name: "Vendly",
    tagline: "A multi-vendor e-commerce platform with per-vendor payouts, inventory, and analytics.",
    description:
      "A full-featured multi-vendor marketplace covering authentication, product and inventory management, cart/wishlist, coupons, order tracking, reviews, and a seller-facing admin dashboard with sales analytics.",
    category: "Full-Stack",
    tech: ["Next.js 14", "Prisma", "PostgreSQL / MongoDB", "NextAuth", "Stripe Connect", "Redux", "Jest", "GitHub Actions"],
    architecture: [
      "Buyer / Vendor / Admin roles",
      "NextAuth — authentication",
      "Prisma ORM",
      "PostgreSQL / MongoDB",
      "Stripe Connect — per-vendor payouts",
      "Redux — client state",
      "CI: GitHub Actions + Jest",
    ],
    overview:
      "Vendly (iterated from an earlier name, GoCart, then Bazaario) is built as a placement-portfolio piece that goes beyond a single-vendor storefront into genuine marketplace mechanics — most notably split payouts across independent vendors.",
    problem:
      "Most student e-commerce projects stop at a single-seller cart-and-checkout flow, which doesn't demonstrate multi-tenant data modeling or marketplace-specific payment splitting.",
    solution:
      "Model vendors as first-class tenants with their own inventory and order streams, route payments through Stripe Connect so each vendor is paid directly, and give admins a sales-analytics view across the whole marketplace.",
    techDecisions: [
      "Chose Stripe Connect specifically to handle the per-vendor payout problem rather than settling all revenue into one account",
      "Added Jest tests and a GitHub Actions CI pipeline to keep the codebase portfolio-review-ready",
    ],
    challenges: [
      "Modeling a schema that cleanly separates vendor, product, and order ownership under Prisma",
      "Naming and scope iterated twice (GoCart → Bazaario → Vendly) while the feature set was being locked down",
    ],
    features: [
      "Authentication and role-based access (buyer / vendor / admin)",
      "Product and inventory management per vendor",
      "Cart, wishlist, and coupons",
      "Stripe Connect-based per-vendor payments",
      "Order tracking and reviews",
      "Admin dashboard with sales analytics",
    ],
    futureImprovements: ["Complete end-to-end test coverage across vendor and payout flows"],
    github: "https://github.com/Rishabh893-ux/Bazaario-ECommerce-Platform",
    demo: "#",
    featured: false,
  },
  {
    slug: "ops-agent-platform",
    name: "Autonomous Business Operations Agent",
    tagline: "A multi-agent pipeline that triages, researches, and drafts responses to business inquiries — with a human approval step.",
    description:
      "A 4th-year major project: incoming business inquiries pass through intake, classification, research, drafting, and scheduling agents, escalate on low confidence, and require human approval before anything is sent.",
    category: "AI / Multi-Agent Systems",
    tech: ["Node.js / Express", "Prisma", "SQLite", "Gemini API", "React (Kanban dashboard)"],
    architecture: [
      "Incoming business inquiry",
      "Intake agent",
      "Classification agent",
      "Research agent",
      "Drafting agent",
      "Scheduling agent",
      "Confidence-based escalation",
      "Human approval checkpoint",
      "React Kanban dashboard",
    ],
    overview:
      "Chosen over an earlier academic-RAG idea specifically to be a heavier, more defensible major project, this platform is grounded in Rishabh's own freelance client work: handling inbound leads and inquiries.",
    problem:
      "Responding to business inquiries well requires triage, research, and drafting — repetitive work that's hard to automate safely without risking a bad response going out unsupervised.",
    solution:
      "A pipeline of specialized agents handles each stage of the response, escalates to a human whenever its own confidence is low, and never sends anything without an explicit human-in-the-loop approval — with every step logged in a full audit trail.",
    techDecisions: [
      "Reused the geminiService.js quota/caching pattern built for CareerOS AI rather than building a second Gemini wrapper from scratch",
      "Locked the feature set to exactly four pieces — core pipeline, confidence-based escalation, full audit trail, human-in-the-loop approval — and explicitly deferred calendar integration, translation, follow-up automation, a knowledge base, and an analytics dashboard",
      "Used his own freelance inquiry-handling work as the grounded demo use case instead of synthetic data",
    ],
    challenges: [
      "Deciding where to draw the scope line so the project stayed defensible and finishable rather than sprawling",
      "Designing a confidence signal that's meaningful enough to gate human escalation",
    ],
    features: [
      "Multi-agent pipeline: intake, classification, research, drafting, scheduling",
      "Confidence-based escalation to a human reviewer",
      "Full audit trail of every agent decision",
      "Human-in-the-loop approval before any response is sent",
      "React Kanban-style dashboard for tracking inquiries through the pipeline",
    ],
    futureImprovements: [
      "Calendar integration, translation, follow-up automation, a knowledge base, and an analytics dashboard — deliberately deferred, not implemented",
    ],
    github: "#",
    demo: "#",
    status: "In Development",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
