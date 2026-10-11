"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";
import { spotlightMove } from "@/lib/utils";
import Screenshot from "./Screenshot";

const archContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const archLine = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function ProjectCard({
  project,
  index,
  spotlight = false,
}: {
  project: Project;
  index: number;
  spotlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: "easeOut" }}
      onMouseMove={spotlightMove}
      className={`group spotlight relative overflow-hidden rounded-2xl border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface2/60 hover:shadow-lift sm:p-8 ${
        spotlight ? "border-accent2/25" : "border-border hover:border-white/20"
      }`}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {spotlight && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent2/30 bg-accent2/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-accent2-bright">
                <Sparkles size={11} /> Featured
              </span>
            )}
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-secondary">
              {project.category}
            </span>
            {project.status && (
              <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                {project.status}
              </span>
            )}
          </div>
          <Link href={`/project/${project.slug}`} className="focus-ring rounded">
            <h3
              className={`font-display font-semibold tracking-tight text-primary flex items-center gap-2 ${
                spotlight ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
              }`}
            >
              {project.name}
              <ArrowUpRight
                size={spotlight ? 20 : 18}
                className="text-accent opacity-0 -translate-x-1 -translate-y-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </h3>
          </Link>
          <p className="mt-2 text-secondary leading-relaxed">{project.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 6).map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-secondary transition-colors group-hover:bg-white/[0.08]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              href={`/project/${project.slug}`}
              className="text-sm font-medium text-accent hover:text-accent-bright transition-colors focus-ring rounded"
            >
              Case Study →
            </Link>
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors focus-ring rounded"
              >
                <Github size={14} /> GitHub
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors focus-ring rounded"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        </div>

        {project.image ? (
          <Link href={`/project/${project.slug}`} tabIndex={-1} aria-hidden="true" className="block w-full shrink-0 lg:w-80">
            <Screenshot
              src={project.image}
              alt={`${project.name} screenshot`}
              url={project.demo !== "#" ? project.demo : undefined}
              className="transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </Link>
        ) : (
        <div className="w-full shrink-0 rounded-xl border border-border bg-bg/60 lg:w-64">
          <div className="flex items-center gap-1.5 border-b border-border px-3.5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="ml-1.5 font-mono text-[10px] text-secondary/70">architecture</span>
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={archContainer}
            className="p-4 font-mono text-[11px] leading-5 text-secondary"
          >
            {project.architecture.slice(0, 6).map((step, i) => (
              <motion.div key={i} variants={archLine}>
                {i > 0 && (
                  <div className="pl-0.5 text-transparent bg-gradient-to-r from-accent to-accent2 bg-clip-text">↓</div>
                )}
                <div className="text-primary/80">{step}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        )}
      </div>
    </motion.div>
  );
}
