import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import Screenshot from "@/components/Screenshot";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border py-8 first:border-t-0 first:pt-0">
      <h2 className="mb-3 text-sm font-mono uppercase tracking-wide text-accent">{title}</h2>
      {children}
    </div>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 sm:pt-40">
        <div className="section-container max-w-4xl">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors focus-ring rounded"
          >
            <ArrowLeft size={15} /> Back to Work
          </Link>

          <div className="mt-6">
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-secondary">
              {project.category}
            </span>
            <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.05] tracking-tight text-primary sm:text-6xl">{project.name}</h1>
            <p className="mt-3 max-w-2xl text-secondary leading-relaxed">{project.description}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-secondary">
                  {t}
                </span>
              ))}
            </div>

            {project.image && (
              <Screenshot
                src={project.image}
                alt={`${project.name} screenshot`}
                url={project.demo !== "#" ? project.demo : undefined}
                className="mt-8"
                natural
                sizes="(min-width: 896px) 896px, 100vw"
                priority
              />
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {project.demo && project.demo !== "#" && (
                <Magnetic>
                  <a
                    href={project.demo}
                    target="_blank"
                    className="gradient-btn inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-bg focus-ring"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                </Magnetic>
              )}
              {project.github && project.github !== "#" && (
                <Magnetic>
                  <a
                    href={project.github}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-primary hover:border-white/25 hover:bg-white/5 transition-colors focus-ring"
                  >
                    <Github size={14} /> GitHub
                  </a>
                </Magnetic>
              )}
            </div>
          </div>

          <div className="mt-14">
            <Section title="Overview">
              <p className="text-secondary leading-relaxed">{project.overview}</p>
            </Section>

            <Section title="Problem">
              <p className="text-secondary leading-relaxed">{project.problem}</p>
            </Section>

            <Section title="Solution">
              <p className="text-secondary leading-relaxed">{project.solution}</p>
            </Section>

            <Section title="Architecture">
              <div className="gradient-border rounded-xl border border-border bg-surface/50 p-5 font-mono text-sm leading-7 text-secondary">
                {project.architecture.map((step, i) => (
                  <div key={i}>
                    {i > 0 && (
                      <div className="text-transparent bg-gradient-to-r from-accent to-accent2 bg-clip-text">↓</div>
                    )}
                    <div className="text-primary/90">{step}</div>
                  </div>
                ))}
              </div>
            </Section>

            {project.systemFlow && (
              <Section title="System Flow">
                <ol className="space-y-2">
                  {project.systemFlow.map((step, i) => (
                    <li key={i} className="flex gap-3 text-secondary leading-relaxed">
                      <span className="shrink-0 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            <Section title="Technology Decisions">
              <ul className="space-y-2">
                {project.techDecisions.map((d, i) => (
                  <li key={i} className="flex gap-3 text-secondary leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Features">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex gap-3 text-secondary leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Challenges">
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex gap-3 text-secondary leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {project.futureImprovements.length > 0 && (
              <Section title="Future Improvements">
                <ul className="space-y-2">
                  {project.futureImprovements.map((f, i) => (
                    <li key={i} className="flex gap-3 text-secondary leading-relaxed">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section title="Repository">
              {project.github && project.github !== "#" ? (
                <a href={project.github} target="_blank" className="text-accent hover:text-accent-bright focus-ring rounded">
                  {project.github}
                </a>
              ) : (
                <p className="text-secondary">Add the public repository link in data/projects.ts once available.</p>
              )}
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
