"use client";

import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import Reveal from "./Reveal";
import { spotlightMove } from "@/lib/utils";

export default function OtherProjects({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-secondary">More Projects</h3>
        <span className="text-xs text-secondary/70">{projects.length} feature-rich builds</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06} y={14}>
            <Link
              href={`/project/${project.slug}`}
              onMouseMove={spotlightMove}
              className="gradient-border spotlight group flex h-full flex-col rounded-xl border border-border bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface2/50 focus-ring"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium text-secondary">
                  {project.category}
                </span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-secondary opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent"
                />
              </div>
              <h4 className="mt-3 font-display text-base font-medium text-primary">{project.name}</h4>
              <p className="mt-1.5 text-sm text-secondary leading-relaxed line-clamp-2">{project.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-secondary">
                    {t}
                  </span>
                ))}
              </div>
              {project.github && project.github !== "#" && (
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-secondary">
                  <Github size={12} /> Source available
                </span>
              )}
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
