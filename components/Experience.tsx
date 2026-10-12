"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Check,
  MapPin,
  Megaphone,
  MessageSquare,
  Sparkles,
  Star,
  Users,
  Workflow,
} from "lucide-react";
import { experience } from "@/data/experience";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { spotlightMove } from "@/lib/utils";

const [featured, ...others] = experience;
const otherIcons = [Megaphone, Users];

const pipeline = [
  { icon: Star, label: "Google Reviews", sub: "Business Profile API" },
  { icon: Workflow, label: "n8n workflow", sub: "OAuth2 · webhooks" },
  { icon: Sparkles, label: "OpenAI", sub: "Sentiment + reply draft" },
];

const outputs = [
  { icon: MessageSquare, label: "On-brand reply" },
  { icon: BarChart3, label: "Analytics dashboard" },
];

const listContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const listItem = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function Connector({ delay }: { delay: number }) {
  return (
    <div className="relative mx-auto h-8 w-px bg-border" aria-hidden="true">
      <motion.span
        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--c-accent)/0.9)]"
        initial={{ top: "0%", opacity: 0 }}
        animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, delay, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
      />
    </div>
  );
}

function Pipeline() {
  return (
    <div className="relative rounded-2xl border border-border bg-bg/60 p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
        <span>Review pipeline</span>
        <span className="inline-flex items-center gap-1.5 text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          real-time
        </span>
      </div>

      {pipeline.map((node, i) => (
        <div key={node.label}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.35 }}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface/80 px-3 py-2.5"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-accent/20">
              <node.icon size={15} className="text-accent" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-primary">{node.label}</div>
              <div className="truncate font-mono text-[11px] text-secondary">{node.sub}</div>
            </div>
          </motion.div>
          <Connector delay={i * 0.4} />
        </div>
      ))}

      <div className="grid grid-cols-2 gap-2">
        {outputs.map((o, i) => (
          <motion.div
            key={o.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 + i * 0.1, duration: 0.35 }}
            className="flex items-center gap-2 rounded-xl border border-accent/25 bg-accent/5 px-3 py-2.5"
          >
            <o.icon size={14} className="shrink-0 text-accent" strokeWidth={1.75} />
            <span className="text-xs font-medium text-primary">{o.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-rule py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          index="01"
          label="Experience"
          title="Where I've been building."
          description="Real production work, not just side projects — plus the community roles that taught me to communicate what I build."
        />

        <Reveal>
          <div
            onMouseMove={spotlightMove}
            className="gradient-border spotlight glass-card rounded-3xl border border-border p-6 sm:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                    {featured.company}
                  </h3>
                  {featured.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-terra/30 bg-terra/10 px-2.5 py-1 text-[11px] font-medium text-terra">
                      <span className="h-1.5 w-1.5 rounded-full bg-terra animate-pulse" />
                      Current
                    </span>
                  )}
                </div>
                <div className="mt-1 text-lg text-primary/90">{featured.role}</div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-secondary">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={12} /> {featured.period} · {featured.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={12} /> {featured.location}
                  </span>
                </div>

                <p className="mt-5 max-w-2xl leading-relaxed text-secondary">{featured.summary}</p>

                <motion.ul
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={listContainer}
                  className="mt-5 space-y-3"
                >
                  {featured.highlights.map((h) => (
                    <motion.li key={h} variants={listItem} className="flex gap-3 text-sm leading-relaxed text-primary/85">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                        <Check size={12} className="text-sage" strokeWidth={2.5} />
                      </span>
                      {h}
                    </motion.li>
                  ))}
                </motion.ul>

                {featured.stack && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-border bg-surface2/70 px-2.5 py-1 font-mono text-[11px] text-secondary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Pipeline />
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {others.map((job, i) => {
            const Icon = otherIcons[i % otherIcons.length];
            return (
              <Reveal key={job.id} delay={0.1 + i * 0.08} y={14}>
                <div
                  onMouseMove={spotlightMove}
                  className="gradient-border spotlight glass-card group h-full rounded-2xl border border-border p-5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={17} className="text-accent" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-medium text-primary">{job.company}</h3>
                      <div className="text-sm text-primary/80">{job.role}</div>
                      <div className="mt-1 font-mono text-[11px] text-secondary">
                        {job.period} · {job.duration}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-secondary">{job.summary}</p>
                  <ul className="mt-3 space-y-1.5">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-secondary">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
