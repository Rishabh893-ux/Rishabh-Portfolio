"use client";

import { featuredProjects, otherProjects } from "@/data/projects";
import FeaturedRail from "./FeaturedRail";
import OtherProjects from "./OtherProjects";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { spotlightMove } from "@/lib/utils";

const capabilities = [
  {
    title: "AI product building",
    text: "From prototype to production, I design systems that translate ideas into workflows, interfaces, and reasoning layers that people can actually use.",
  },
  {
    title: "Full-stack delivery",
    text: "I build the product, UX, and backend plumbing together so projects are not just working in isolation, but are cohesive end-to-end experiences.",
  },
  {
    title: "Automation & optimization",
    text: "I enjoy turning repetitive or fragile processes into reliable, measurable systems that save time and reduce operational friction.",
  },
];

const stackHighlights = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "FastAPI",
  "MongoDB",
  "Gemini API",
  ".NET 8",
  "n8n",
  "Python",
  "Tailwind",
  "GitHub Actions",
];

export default function ProjectGrid() {
  return (
    <section id="work" className="section-rule section-sand py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          index="02"
          label="Work"
          title="Products, automation, and AI systems."
          description="I build software that connects strong product thinking with real engineering execution — especially where AI, workflow design, and end-to-end user experience meet."
        />

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div
                onMouseMove={spotlightMove}
                className="gradient-border spotlight glass-card group h-full rounded-2xl border border-border p-5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent2/15 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-accent">•</span>
                </div>
                <h3 className="font-display text-lg font-medium text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mb-10 overflow-hidden rounded-2xl border border-border bg-surface/40 p-5">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Core stack</div>
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee gap-2 [animation-play-state:running] hover:[animation-play-state:paused]">
              {[...stackHighlights, ...stackHighlights].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="shrink-0 rounded-full border border-border bg-surface2/70 px-3 py-1.5 text-xs text-secondary transition-colors hover:border-accent2/40 hover:text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <FeaturedRail projects={featuredProjects} />

        <OtherProjects projects={otherProjects} />
      </div>
    </section>
  );
}
