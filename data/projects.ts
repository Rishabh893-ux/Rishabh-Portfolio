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
  video?: string; // short muted preview under /public, played on hover
  // Tailwind aspect class for the card frame when the screenshot isn't 16:10
  // (written out in full so Tailwind can see it), e.g. "aspect-[1280/580]".
  imageAspect?: string;
  featured: boolean;
  status?: "In Development" | "Hackathon Submission";
};

// NOTE: All content below reflects only information actually provided about
// each project. Live-demo and GitHub links are left as placeholders ("#")
// where a public URL has not been confirmed — wire these up in this file
// once repos/deployments are public.

export const projects: Project[] = [
  {
    slug: "ai-navigator",
    name: "AI Navigator",
    tagline: "An AI learning platform with a skill tree, quizzes and an agent mentor that acts inside the app.",
    description:
      "A game-style skill tree of 17 AI skills with quizzes, an adaptive learning path, badges and stats. Its Gemini mentor uses function calling to quiz you, save study plans and update your progress — with Undo.",
    category: "AI / Agents / Full-Stack",
    tech: ["Next.js 16", "React 19", "TypeScript", "Gemini API (function calling)", "Vitest"],
    architecture: [
      "Learner state (skills, quizzes, streaks) in the browser",
      "Agent loop on the client — up to 4 tool rounds per reply",
      "/api/mentor route — validation, origin check, rate limit, timeout",
      "Gemini with 5 declared tools",
      "Tool calls validated and applied to the UI, each with Undo",
    ],
    overview:
      "AI Navigator turns 'learn AI' into a clear path: 17 skills from 'What is AI?' to AI agents, each with prerequisites, free resources and a 4-question quiz. The mentor is a real agent — it doesn't just chat, it takes actions in the app on the learner's behalf.",
    problem:
      "Beginners face an endless list of AI tutorials with no sense of order, no way to check what they actually understood, and chatbots that give advice but can't help them act on it.",
    solution:
      "A skill tree with prerequisites and quizzes (80% to master) gives structure and proof of progress, while an agent mentor built on Gemini function calling can mark skills complete, start a quiz, open a page, save a study plan or set the learner's level — every action shown as a card with Undo.",
    systemFlow: [
      "Learner asks the mentor something — profile and progress are sent as context",
      "The server route validates the request and forwards it to Gemini with 5 tool declarations",
      "Gemini replies with text or one or more function calls",
      "The client validates each call, runs it against current progress and returns the result",
      "Gemini writes the final reply; the UI shows action cards with Undo",
    ],
    techDecisions: [
      "Ran the agent loop on the client so progress stays in the learner's browser with no accounts or database",
      "Validated every tool call before running it, and read the latest progress through refs so several calls in one round don't overwrite each other",
      "Protected the shared server key with an origin check, a per-visitor rate limit and a request timeout; visitors can also bring their own key",
      "Covered the skill, achievement and mentor logic with 31 Vitest unit tests",
    ],
    challenges: [
      "Gemini's thought signatures must be sent back unchanged with tool results, or the next request fails",
      "Keeping state correct when the model calls several tools in parallel",
      "Detecting used-up API quotas so they aren't retried pointlessly, with a clear message instead",
    ],
    features: [
      "17-skill tree with prerequisites, free resources and quizzes",
      "Adaptive 'Up next' recommendation and a suggested learning path",
      "Agent mentor with 5 tools: mark complete, start quiz, open page, save study plan, set level",
      "Study plans on the dashboard, 14 achievements and a stats tab with an activity heatmap",
      "Dark mode, keyboard access and charts with table views",
    ],
    futureImprovements: ["Optional accounts to sync progress across devices"],
    github: "https://github.com/Rishabh893-ux/AI-Navigator-",
    demo: "https://ai-navigator-five-nu.vercel.app",
    image: "/projects/ai-navigator.jpg",
    video: "/projects/previews/ai-navigator.mp4",
    featured: true,
  },
  {
    slug: "careeros-ai",
    name: "CareerOS AI",
    tagline: "A career-readiness platform that tells you exactly what to fix — and shows its working.",
    description:
      "Profile, resume, GitHub, mock interviews, outreach, job tracking and a public portfolio in one place. Every score is computed from signals the app can verify; AI only reads, summarizes and drafts.",
    category: "AI / Full-Stack",
    tech: ["Next.js 16", "React 19", "TypeScript", "Node.js / Express", "MongoDB Atlas", "Groq API", "Cloudinary", "GitHub Actions"],
    architecture: [
      "Next.js frontend",
      "Express API routes (zod validation, helmet, rate limits)",
      "Scoring services — ATS, resume health, GitHub, job match",
      "AI service — quota + cache in front of Groq",
      "MongoDB Atlas · Cloudinary (resume files)",
      "GitHub REST API · Adzuna job search",
    ],
    overview:
      "CareerOS AI brings a job seeker's whole search into one place. Each tool gives feedback you can act on: the ATS check lists the exact keywords a job asks for that the resume doesn't mention, the GitHub analyzer names the repos missing a README, and the job tracker shows which required skills are missing for each application.",
    problem:
      "Students get generic 'improve your resume' advice and opaque AI scores, with no clear explanation of where they actually stand or what to fix first.",
    solution:
      "Scores are measured, not guessed: each number is computed from verifiable signals (keywords found in the resume, READMEs present on GitHub) with a fixed, explainable weighting. AI is used only for what it is good at — extracting keywords from a job description, writing summaries and drafting messages — never to invent a score.",
    systemFlow: [
      "User uploads a resume — three-tier text extraction (pdf-parse → pdfjs-dist → vision OCR) handles scanned files",
      "Pasting a job description lets the AI extract required and nice-to-have keywords",
      "Each keyword is matched against the full resume text with aliases and false-match guards",
      "GitHub analyzer scores five measured signals and names the repos to fix",
      "Results feed the dashboard, job tracker and AI copilot, which answers only from saved data",
    ],
    techDecisions: [
      "Kept every score deterministic and explainable (e.g. ATS = 70% keyword coverage + 30% format checks) so it can be defended, not tuned as a black box",
      "Put all AI calls behind one service with a quota and cache to protect the shared API key",
      "Falls back to a built-in skill list when the AI is unavailable, and the report says so",
      "CI on GitHub Actions runs lint, typecheck, build and tests on every push",
    ],
    challenges: [
      "Keyword matching that is strict enough to be trusted ('next steps' isn't Next.js) yet handles aliases like k8s → Kubernetes",
      "Extracting text from scanned and image-based resumes reliably",
    ],
    features: [
      "Career score, profile completeness and a growth roadmap for a target role",
      "GitHub analyzer with a five-signal score and next steps that name your repos",
      "Resume parser, ATS match, resume health checks, resume builder and cover letters",
      "Kanban job tracker with live job search and per-job resume tailoring",
      "Mock interviews (written or MCQ) with an interview journal",
      "Outreach drafts, company research briefs, an AI copilot and a shareable public portfolio",
      "Try-the-demo mode with a sample profile — no sign-up needed",
    ],
    futureImprovements: [],
    github: "https://github.com/Rishabh893-ux/CareerOS-AI",
    demo: "https://career-os-ai-ten.vercel.app",
    image: "/projects/careeros-ai.jpg",
    video: "/projects/previews/careeros-ai.mp4",
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
    slug: "vendly",
    name: "Vendly",
    tagline: "A multi-vendor e-commerce platform with per-vendor payouts, inventory, and analytics.",
    description:
      "A full-featured multi-vendor marketplace covering authentication, product and inventory management, cart/wishlist, coupons, order tracking, reviews, and a seller-facing admin dashboard with sales analytics.",
    category: "Full-Stack",
    tech: ["Next.js 14", "Prisma", "MongoDB", "NextAuth", "Stripe Connect", "Redux Toolkit"],
    architecture: [
      "Buyer / Vendor / Admin roles",
      "NextAuth — authentication",
      "Prisma ORM",
      "MongoDB",
      "Stripe Connect — per-vendor payouts",
      "Redux Toolkit — client state",
    ],
    overview:
      "Vendly (iterated from an earlier name, GoCart, then Bazaario) is built as a placement-portfolio piece that goes beyond a single-vendor storefront into genuine marketplace mechanics — most notably split payouts across independent vendors.",
    problem:
      "Most student e-commerce projects stop at a single-seller cart-and-checkout flow, which doesn't demonstrate multi-tenant data modeling or marketplace-specific payment splitting.",
    solution:
      "Model vendors as first-class tenants with their own inventory and order streams, route payments through Stripe Connect so each vendor is paid directly, and give admins a sales-analytics view across the whole marketplace.",
    techDecisions: [
      "Chose Stripe Connect specifically to handle the per-vendor payout problem rather than settling all revenue into one account",
      "Modeled vendors, products, orders, coupons and reviews as separate Prisma models on MongoDB so ownership stays clear per vendor",
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
    futureImprovements: ["Add automated tests and CI across vendor and payout flows"],
    github: "https://github.com/Rishabh893-ux/Bazaario-ECommerce-Platform",
    demo: "https://vendly-dun.vercel.app",
    image: "/projects/vendly-v3.jpg",
    video: "/projects/previews/vendly-v3.mp4",
    imageAspect: "aspect-[1280/580]",
    featured: true,
  },
  {
    slug: "ai-ats-resume",
    name: "AI ATS Resume Platform",
    tagline: "A resume builder and ATS score checker that helps you tailor your resume to any job.",
    description:
      "A drag-and-drop resume builder with live preview, an ATS scoring engine, a job-description matcher, AI cover letters and version history, with PDF and DOCX export.",
    category: "AI / Full-Stack",
    tech: ["Next.js 14", "TypeScript", "MongoDB / Mongoose", "NextAuth (Google OAuth)", "Gemini API", "Zustand", "dnd-kit"],
    architecture: [
      "Next.js App Router — protected app routes",
      "API routes — resumes, analyze, job-match, tailor, cover letter, upload",
      "Custom ATS engine — keywords, semantic match, formatting, sections",
      "Gemini — cover letters, summaries, tailoring",
      "MongoDB — resumes and version history",
    ],
    overview:
      "The platform analyzes a resume the way an Applicant Tracking System would, scores it, and helps the user fix it — then lets them build, tailor and export a polished version in the same place.",
    problem:
      "Many resumes are filtered out by Applicant Tracking Systems before a person reads them, and candidates rarely know which keywords or formatting choices caused it.",
    solution:
      "A custom ATS engine extracts keywords, checks semantic matches, formatting and sections, and produces a score with targeted suggestions. Gemini handles the writing tasks: cover letters, summaries, bullet improvements and one-click tailoring to a job description.",
    techDecisions: [
      "Built the ATS scoring as its own engine (keyword extractor, semantic matcher, formatting checker, section validator) instead of asking an LLM for a score",
      "Used Zustand for lightweight builder state and dnd-kit for accessible drag-and-drop",
      "Parsed uploads with pdf-parse and Mammoth so both PDF and DOCX resumes can be analyzed",
    ],
    challenges: [
      "Making the score explainable enough that users know exactly what to change",
      "Keeping a live preview in sync with a drag-and-drop editor",
    ],
    features: [
      "Drag-and-drop resume builder with live preview and templates",
      "ATS score checker and job-description matcher",
      "AI cover letters, bullet improver, summary generator and resume tailoring",
      "Version history with compare and restore",
      "PDF and DOCX export, Google sign-in",
    ],
    futureImprovements: [],
    github: "https://github.com/Rishabh893-ux/AI-ATS-RESUME-PLATFOORM",
    demo: "https://ai-ats-resume-platfoorm.vercel.app",
    image: "/projects/ai-ats-resume.jpg",
    video: "/projects/previews/ai-ats-resume.mp4",
    featured: true,
  },
  {
    slug: "waypoint",
    name: "Waypoint — AI Learning Path Recommender",
    tagline: "Conversational learner profiling that generates and adapts a personalized learning roadmap.",
    description:
      "An AI-powered platform, built for the Amplified HCL program, that profiles a learner through conversation and produces a structured, explorable, and adaptive learning roadmap.",
    category: "AI / Full-Stack",
    tech: ["Next.js 16", "TypeScript", "Gemini API", "Recharts"],
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
    futureImprovements: ["Record a short demo video walkthrough"],
    github: "https://github.com/Rishabh893-ux/WaypointLearningPath",
    demo: "https://waypointlearningpath.vercel.app",
    image: "/projects/waypoint.jpg",
    featured: true,
  },
  {
    slug: "library-api",
    name: "Library Management API",
    tagline: "A .NET 8 REST API for running a library — loans with late fines, a fair reservation queue and reports.",
    description:
      "An ASP.NET Core Web API with JWT roles, Entity Framework Core on SQL Server, Swagger docs and 24 unit tests.",
    category: "Backend",
    tech: ["C# / .NET 8", "ASP.NET Core Web API", "EF Core 8", "SQL Server", "JWT", "xUnit"],
    architecture: [
      "Controllers — auth, books, loans, reservations, reports",
      "Services — business rules (fines, queue, holds)",
      "EF Core 8 — code-first migrations",
      "SQL Server",
      "JWT bearer auth with Librarian and Member roles",
    ],
    overview:
      "A backend that covers the real rules of running a library: lending, returns with automatic fines, a first-come-first-served reservation queue, and reports for librarians.",
    problem:
      "Library systems need correct, auditable rules — who can borrow, what happens when a book is late, and who gets a returned copy when several people are waiting.",
    solution:
      "Loans run for 14 days with a ₹5/day late fine calculated on return. When every copy is lent out, members join a first-come-first-served queue, and a returned copy is held for the next person. Librarians get reports on overdue loans and the most-borrowed books.",
    techDecisions: [
      "Enforced roles on every endpoint with JWT bearer tokens",
      "Used consistent RFC 7807 error responses and validated request DTOs",
      "Made lending concurrency-safe so two members can't take the last copy at once",
      "Tested the business rules with xUnit against in-memory SQLite",
    ],
    challenges: [
      "Keeping the reservation queue fair: a returned copy must be held for the next member in line, not grabbed by whoever asks first",
      "Writing the most-borrowed report as hand-written SQL with GROUP BY / ORDER BY",
    ],
    features: [
      "Book catalogue with search, paging and ISBN validation",
      "Loans with automatic late fines",
      "First-come-first-served reservation queue with holds",
      "Librarian reports: overdue loans and top 5 most-borrowed books",
      "Swagger docs, a runnable .http demo file and 24 unit tests",
    ],
    futureImprovements: [],
    github: "https://github.com/Rishabh893-ux/Library-management-system",
    demo: "#",
    featured: false,
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
    featured: false,
  },
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
    github: "https://github.com/Rishabh893-ux/AI-Revenue-Recovery-System",
    demo: "https://ai-revenue-recovery-system.vercel.app",
    image: "/projects/ai-revenue-recovery.jpg",
    video: "/projects/previews/ai-revenue-recovery.mp4",
    featured: true,
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
