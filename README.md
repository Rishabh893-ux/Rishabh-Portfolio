<div align="center">

# Rishabh Kasaudhan — Portfolio

**Full Stack Developer · Next.js · Node.js · MongoDB · AI Automation**

Personal portfolio of a Full Stack Intern at ImpulseAI and final-year B.Tech CSE student.
Built with Next.js 16, React 19, TypeScript, Tailwind CSS and Framer Motion.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-6C5CE7.svg)](LICENSE)

**[Live site](https://rishabh-kasaudhan.vercel.app) · [Resume](public/resume.pdf) · [LinkedIn](https://www.linkedin.com/in/rishabh-kasaudhan-0a960724a/) · [GitHub](https://github.com/Rishabh893-ux)**

<br />

<img src="docs/preview.jpg" alt="Portfolio hero section: name, typed role, tagline, profile photo and stats" width="100%" />

</div>

---

## Highlights

- **"Ask my AI" assistant** — a chat that answers visitors' questions about me from the portfolio's own data, with streamed replies from Gemini. The key stays on the server behind an origin check, a per-visitor rate limit and a timeout.
- **Blog** — MDX posts in `content/blog/` with syntax highlighting for both themes, reading time and an "On this page" table of contents.
- **Dark by default, beige on request** — a violet dark theme for every visitor, with a warm beige-and-gold theme one click away (the choice is remembered). Serif display type and a cursor glow.
- **Experience-first layout** — the ImpulseAI internship leads the page, with an animated diagram of the Google Reviews pipeline (Google Business Profile API → n8n → OpenAI → reply + dashboard).
- **Project case studies** — every project has its own page (`/project/[slug]`) with problem, solution, system flow, tech decisions and challenges. Live projects show real screenshots.
- **Interactive terminal** in the hero — try `help`, `experience`, `projects`, `github`, `resume`.
- **`Ctrl/⌘ + K` command palette** for keyboard navigation across the site.
- **Clickable skills** — each technology shows which projects and roles actually used it.
- **Live GitHub repos** pulled client-side from the public GitHub API, with a language breakdown chart.
- **Working contact form** via Formspree, falling back to `mailto:` when not configured.
- **SEO ready** — metadata, generated Open Graph image, `sitemap.xml` and `robots.txt`.
- **Accessible and motion-aware** — keyboard navigable, visible focus states, and animations respect `prefers-reduced-motion`.
- **Responsive** — tested down to 390px phone width.

## Projects

Every project has a full case study on the site. Live demos run on Vercel.

| Project | What it is | Stack | Links |
| --- | --- | --- | --- |
| **AI Navigator** | AI learning platform with a skill tree, quizzes and an agent mentor that acts inside the app | Next.js 16, Gemini (function calling) | [Live](https://ai-navigator-five-nu.vercel.app) · [Code](https://github.com/Rishabh893-ux/AI-Navigator-) |
| **CareerOS AI** | Career-readiness platform that tells you exactly what to fix — and shows its working | Next.js 16, Express, MongoDB Atlas, Groq | [Live](https://career-os-ai-ten.vercel.app) · [Code](https://github.com/Rishabh893-ux/CareerOS-AI) |
| **EdgePilot AI** | Edge intelligence for heavy machinery: predictive maintenance and computer-vision safety | FastAPI, YOLOv8n, MQTT, Gemini | [Live](https://edge-pilot-ai.vercel.app) · [Code](https://github.com/Rishabh893-ux/EdgePilot_AI) |
| **Vendly** | Multi-vendor e-commerce with per-vendor payouts, inventory and analytics | Next.js, Prisma, MongoDB, Stripe Connect | [Live](https://vendly-dun.vercel.app) · [Code](https://github.com/Rishabh893-ux/Bazaario-ECommerce-Platform) |
| **AI ATS Resume** | Resume builder and ATS score checker that tailors your resume to any job | Next.js, MongoDB, NextAuth, Gemini | [Live](https://ai-ats-resume-platfoorm.vercel.app) · [Code](https://github.com/Rishabh893-ux/AI-ATS-RESUME-PLATFOORM) |
| **Waypoint** | Conversational learner profiling that generates an adaptive learning roadmap | Next.js 16, TypeScript, Gemini | [Live](https://waypointlearningpath.vercel.app) · [Code](https://github.com/Rishabh893-ux/WaypointLearningPath) |
| **ReviveAI** | Detects abandoned carts and failed payments, then runs AI-drafted recovery workflows | React, Express, Supabase, n8n, Gemini, Razorpay | [Live](https://ai-revenue-recovery-system.vercel.app) · [Code](https://github.com/Rishabh893-ux/AI-Revenue-Recovery-System) |
| **Rishabh Studio** | AI video SaaS that turns a text prompt into a Short or long-form video | React, FastAPI, 8-agent Gemini pipeline, Whisper | [Code](https://github.com/Rishabh893-ux/rishabh-studio) |
| **Library Management API** | .NET 8 REST API with loans, late fines, a reservation queue and reports | ASP.NET Core, EF Core, SQL Server, JWT | [Code](https://github.com/Rishabh893-ux/Library-management-system) |

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS 3.4; Instrument Serif, Space Grotesk, Inter and JetBrains Mono via `next/font` |
| Animation | Framer Motion 11 |
| Blog | MDX via `next-mdx-remote`, `rehype-pretty-code` + Shiki, `rehype-slug` |
| AI | Gemini API (streaming), through the `/api/ask` route |
| Logos | `simple-icons` |
| Icons | lucide-react |
| Social image | `next/og` (generated at request time on the Edge runtime) |
| Analytics | Vercel Analytics |
| Forms | Formspree (optional) |

## Getting started

Requires **Node.js 20.9+**.

```bash
git clone https://github.com/Rishabh893-ux/Rishabh-Portfolio.git
cd Rishabh-Portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Check the code with ESLint (Next.js rules) |

## Environment variables

All are optional. Copy `.env.example` to `.env.local` for local development.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID (the part after `/f/`). Defaults to this site's own form; set it to use another form, or to an empty value to make the contact form open the visitor's email app instead. |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for metadata, the sitemap and `robots.txt`. On Vercel it's detected automatically, so set this only for a custom domain. |
| `GEMINI_API_KEY` | Turns on the "Ask my AI" chat. Get a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey). Server-only; without it the chat shows the contact email instead. |
| `GEMINI_MODEL` | Optional model override for the chat (default `gemini-3.8-flash`). |

## Editing content

All content lives in `data/`, so updating the site rarely means touching components.

| File | Controls |
| --- | --- |
| `data/site.ts` | Name, rotating roles, links, email, education |
| `data/experience.ts` | Internship and leadership roles |
| `data/projects.ts` | Projects, case-study content, GitHub/demo links, screenshots |
| `data/skills.ts` | Skill categories and which projects/roles use each skill |
| `data/certifications.ts` | Certifications (add `link` for a verify button) |
| `public/resume.pdf` | The file behind every "Resume" button |
| `public/projects/` | Project screenshots (`image`) and hover-preview videos (`previews/`, `video`) referenced in `projects.ts` |
| `content/blog/*.mdx` | Blog posts. Front matter: `title`, `description`, `date` (YYYY-MM-DD) and `tags`. `## ` headings become the table of contents. |

A GitHub or demo link set to `"#"` is hidden automatically, so unfinished links never show as broken buttons.

## Project structure

```
app/
  layout.tsx              Root layout: fonts, theme script, metadata, analytics
  page.tsx                Home page — composes the sections
  project/[slug]/         Statically generated case-study pages
  blog/, blog/[slug]/     Blog index and MDX post pages
  api/ask/route.ts        "Ask my AI" endpoint (streams Gemini replies)
  opengraph-image.tsx     Generated social preview image
  sitemap.ts, robots.ts   SEO routes
  globals.css             Theme variables (dark + beige), base styles, utilities
components/               Sections (Hero, Experience, ProjectGrid, Skills…) and shared UI
content/blog/             Blog posts (.mdx)
data/                     All site content (see above)
lib/                      Helpers: AI context, blog loader, theme, site URL, tech icons
public/                   Resume, favicon, project screenshots and hover previews
docs/                     README assets
```

## Deployment

The site is designed for [Vercel](https://vercel.com):

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). The defaults for Next.js work as-is.
3. The contact form already sends through Formspree, so no environment variables are needed.
4. To use a custom domain, add it under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to it.

Every push to `main` then deploys automatically.

## License

The **source code** is released under the [MIT License](LICENSE) — feel free to learn from it or use it as a starting point for your own portfolio.

The **personal content** — my resume, bio, experience and project descriptions, and screenshots — is not covered by the license. Please don't republish it as your own.

## Contact

**Rishabh Kasaudhan** — [rkasaudhan87@gmail.com](mailto:rkasaudhan87@gmail.com) · [LinkedIn](https://www.linkedin.com/in/rishabh-kasaudhan-0a960724a/) · [GitHub](https://github.com/Rishabh893-ux)
