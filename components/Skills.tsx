"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { skillCategories, type Skill } from "@/data/skills";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { categoricalColor } from "@/lib/chartColors";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { spotlightMove } from "@/lib/utils";

const maxCount = Math.max(...skillCategories.map((c) => c.skills.length));

const pillContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const pillItem = {
  hidden: { opacity: 0, y: 8, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

export default function Skills() {
  const [active, setActive] = useState<Skill | null>(null);

  return (
    <section id="skills" className="py-24 sm:py-32 border-t border-border">
      <div className="section-container">
        <SectionHeading
          index="04"
          label="Skills"
          title="Technical Toolkit"
          description='Click a technology to see which projects actually use it.'
        />

        <div className="grid grid-flow-row-dense grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Distribution chart tile — full width */}
          <Reveal
            delay={0}
            className="spotlight gradient-border col-span-2 rounded-2xl border border-border bg-surface/40 p-5 lg:col-span-4"
            onMouseMove={spotlightMove}
          >
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
              Skills by category
            </div>
            <div className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {skillCategories.map((cat, i) => {
                const color = categoricalColor(i);
                const widthPct = (cat.skills.length / maxCount) * 100;
                return (
                  <div key={cat.category} className="flex items-center gap-3 text-xs">
                    <span className="w-28 shrink-0 truncate text-secondary" title={cat.category}>
                      {cat.category}
                    </span>
                    <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${widthPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.05, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    </span>
                    <span className="w-4 shrink-0 text-right text-secondary" title={`${cat.skills.length} skills`}>
                      {cat.skills.length}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Category tiles — wider tiles for categories with more skills */}
          {skillCategories.map((cat, ci) => {
            const color = categoricalColor(ci);
            const wide = cat.skills.length >= 6;
            return (
              <Reveal
                key={cat.category}
                delay={0.1 + ci * 0.05}
                y={14}
                className={`col-span-2 ${wide ? "lg:col-span-2" : "lg:col-span-1"}`}
              >
                <div className="gradient-border spotlight glass-card h-full rounded-2xl border border-border p-5" onMouseMove={spotlightMove}>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                    {cat.category}
                  </h3>
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={pillContainer}
                    className="flex flex-wrap gap-2"
                  >
                    {cat.skills.map((skill) => (
                      <motion.button
                        key={skill.name}
                        variants={pillItem}
                        whileHover={{ scale: 1.06, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActive(skill)}
                        className="rounded-lg border border-border bg-surface/50 px-3 py-1.5 text-sm text-secondary transition-colors hover:text-primary focus-ring"
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}66`)}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
                      >
                        {skill.name}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-border bg-surface2 p-6 shadow-soft"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between">
                <h4 className="text-lg font-semibold text-primary">{active.name}</h4>
                <button onClick={() => setActive(null)} className="text-secondary hover:text-primary focus-ring rounded" aria-label="Close">
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-secondary">Used in</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {active.usedAt?.map((id) => {
                    const job = experience.find((e) => e.id === id);
                    return (
                      <span key={id} className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent-bright">
                        {job ? `${job.role} @ ${job.company}` : id}
                      </span>
                    );
                  })}
                  {active.usedIn.map((slug) => {
                    const p = projects.find((pr) => pr.slug === slug);
                    return (
                      <span key={slug} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-primary">
                        {p?.name ?? slug}
                      </span>
                    );
                  })}
                  {!active.usedIn.length && !active.usedAt?.length && (
                    <span className="text-sm text-secondary">Explored independently, not yet in a shipped project</span>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-secondary">Relevant concepts</div>
                <ul className="mt-2 space-y-1">
                  {active.concepts.map((c) => (
                    <li key={c} className="text-sm text-secondary">
                      • {c}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
