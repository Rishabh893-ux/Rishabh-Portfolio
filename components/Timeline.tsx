"use client";

import { site } from "@/data/site";
import { certifications } from "@/data/certifications";
import { ExternalLink, GraduationCap, Award } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { spotlightMove } from "@/lib/utils";

const events = [
  {
    period: site.education.period,
    title: site.education.degree,
    subtitle: site.education.institute,
    detail: `CGPA: ${site.education.cgpa}`,
    icon: GraduationCap,
  },
  {
    period: "Jun – Aug",
    title: "Full-Stack Development Training",
    subtitle: "Grasstech — frontend, backend, APIs and databases",
    icon: Award,
  },
];

export default function Timeline() {
  return (
    <section id="education" className="py-24 sm:py-32 border-t border-border">
      <div className="section-container">
        <SectionHeading index="05" label="Education" title="Education & Certifications" />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative pl-2">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent2 to-transparent" />
            <div className="space-y-8">
              {events.map((e, i) => (
                <Reveal key={e.title} delay={i * 0.1} className="relative flex gap-4">
                  <div className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface2 text-accent shadow-glow">
                    <e.icon size={17} />
                  </div>
                  <div className="pt-1.5">
                    <div className="text-sm text-secondary font-mono">{e.period}</div>
                    <div className="mt-1 font-medium text-primary">{e.title}</div>
                    <div className="text-sm text-secondary">{e.subtitle}</div>
                    {e.detail && <div className="mt-1 text-sm text-secondary">{e.detail}</div>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-primary">Certifications</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {certifications.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.04} y={12}>
                  <div
                    onMouseMove={spotlightMove}
                    className="gradient-border spotlight group h-full rounded-xl border border-border bg-surface/50 p-4 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium text-primary leading-snug">{c.name}</div>
                      {c.link && (
                        <a href={c.link} target="_blank" className="shrink-0 text-secondary hover:text-accent focus-ring rounded" aria-label={`Verify ${c.name}`}>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    <div className="mt-1.5 text-xs text-secondary">{c.issuer}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
