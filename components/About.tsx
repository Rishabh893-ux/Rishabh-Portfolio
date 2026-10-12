"use client";

import { GraduationCap, Layers3, Sparkles, Zap, Workflow, Compass, Boxes, Lightbulb, MapPin } from "lucide-react";
import { site } from "@/data/site";
import Avatar from "./Avatar";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { spotlightMove } from "@/lib/utils";

const stats = [
  { label: "B.Tech CSE", detail: "AKTU, Class of 2027", icon: GraduationCap },
  { label: "Full-Stack Dev", detail: "Next.js · Node.js · MongoDB", icon: Layers3 },
  { label: "AI / ML", detail: "Gemini pipelines, RAG, CV", icon: Sparkles },
  { label: "Automation", detail: "n8n + OpenAI @ ImpulseAI", icon: Zap },
];

const focusAreas = [
  {
    title: "Product-minded engineering",
    text: "I design systems that balance technical quality, business context, and user experience rather than just shipping code.",
    icon: Boxes,
  },
  {
    title: "AI + automation",
    text: "I enjoy turning complex processes into clear, useful automations.",
    icon: Workflow,
  },
  {
    title: "Practical problem solving",
    text: "I care about explainability and building solutions that are maintainable beyond the prototype stage.",
    icon: Compass,
  },
];

const buildSteps = [
  { title: "Understand", desc: "Clarify the real problem and the constraints nobody stated out loud." },
  { title: "Design", desc: "Sketch architecture, data flow and trade-offs before writing code." },
  { title: "Build", desc: "Ship a thin, working end-to-end slice first, then add breadth." },
  { title: "Test", desc: "Break my own assumptions early — my bugs are cheaper than a user's." },
  { title: "Deploy", desc: "Get it running somewhere real, with honest docs on what works." },
  { title: "Iterate", desc: "Treat the first working version as a baseline, not the finish line." },
];

function Tile({
  span,
  delay,
  className = "",
  children,
}: {
  span: string;
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay} y={14} className={span}>
      <div
        onMouseMove={spotlightMove}
        className={`gradient-border spotlight glass-card group flex h-full flex-col rounded-2xl border border-border p-5 transition-all duration-300 hover:-translate-y-1 ${className}`}
      >
        {children}
      </div>
    </Reveal>
  );
}

export default function About() {
  const FeaturedIcon = focusAreas[0].icon;

  return (
    <section id="about" className="section-rule py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          index="03"
          label="About"
          title="Engineer, builder, and problem solver."
          description="A Computer Science & Engineering student building at the intersection of full-stack engineering, applied AI, and automation — with a bias toward systems that are explainable, maintainable, and ready for real adoption."
        />

        <div className="grid grid-flow-row-dense grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Bio tile */}
          <Tile span="col-span-2" delay={0}>
            <div className="mb-4 flex items-center gap-4">
              <Avatar />
              <div className="min-w-0">
                <div className="font-display text-lg font-semibold text-primary">{site.name}</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-secondary">
                  <MapPin size={12} className="text-accent" /> {site.location}
                </div>
              </div>
            </div>
            <h3 className="flex items-center gap-2 font-display text-lg font-medium text-primary">
              <Lightbulb size={16} className="text-accent" strokeWidth={1.75} /> Why I build this way
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">
              I enjoy turning early ideas into reliable end-to-end systems, and I care about the
              decisions behind the architecture, not just the final output. Every project is meant
              to be useful, explainable, and grounded in real product constraints — not just a
              working demo.
            </p>
          </Tile>

          {/* Stat tiles */}
          {stats.map((s, i) => (
            <Tile key={s.label} span="col-span-1" delay={0.05 + i * 0.05} className="justify-center">
              <s.icon size={18} className="text-accent" strokeWidth={1.75} />
              <div className="mt-3 text-sm font-medium text-primary">{s.label}</div>
              <div className="mt-1 text-xs text-secondary">{s.detail}</div>
            </Tile>
          ))}

          {/* Featured focus area */}
          <Tile span="col-span-2" delay={0.25}>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20 transition-transform duration-300 group-hover:scale-110">
              <FeaturedIcon size={18} className="text-accent" strokeWidth={1.75} />
            </div>
            <h3 className="font-display text-lg font-medium text-primary">{focusAreas[0].title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{focusAreas[0].text}</p>
          </Tile>

          {focusAreas.slice(1).map((area, i) => (
            <Tile key={area.title} span="col-span-1" delay={0.3 + i * 0.05}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20 transition-transform duration-300 group-hover:scale-110">
                <area.icon size={18} className="text-accent" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base font-medium text-primary">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{area.text}</p>
            </Tile>
          ))}
        </div>
      </div>

      <Reveal className="section-container mt-6">
        <div className="rounded-2xl border border-border bg-surface/40 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="font-display text-lg font-medium text-primary">How I build</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">6-step loop</span>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {buildSteps.map((step, i) => (
              <li key={step.title} className="group bg-bg p-4 transition-colors duration-300 hover:bg-surface">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium text-primary">{step.title}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-secondary">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
