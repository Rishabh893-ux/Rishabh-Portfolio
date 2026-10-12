"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import { site } from "@/data/site";
import { categoricalColor } from "@/lib/chartColors";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { spotlightMove } from "@/lib/utils";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

function useLanguageCounts(repos: Repo[]) {
  return useMemo(() => {
    const map = new Map<string, number>();
    repos.forEach((r) => {
      if (!r.language) return;
      map.set(r.language, (map.get(r.language) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([language, count], i) => ({ language, count, color: categoricalColor(i) }));
  }, [repos]);
}

function LanguageBreakdown({ counts }: { counts: { language: string; count: number; color: string }[] }) {
  const total = counts.reduce((sum, c) => sum + c.count, 0);
  if (total === 0) return null;

  return (
    <div className="mb-8 rounded-2xl border border-border bg-surface/40 p-5">
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
        Languages across these repositories
      </div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/5">
        {counts.map((c, i) => {
          const pct = (c.count / total) * 100;
          return (
            <motion.div
              key={c.language}
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{ backgroundColor: c.color, marginLeft: i === 0 ? 0 : 2 }}
              title={`${c.language}: ${c.count} repo${c.count > 1 ? "s" : ""} (${Math.round(pct)}%)`}
            />
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {counts.map((c) => (
          <div key={c.language} className="flex items-center gap-1.5 text-xs text-secondary">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
            {c.language}
            <span className="text-secondary/60">{Math.round((c.count / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState(false);
  const languageCounts = useLanguageCounts(repos ?? []);
  const languageColors = useMemo(
    () => new Map(languageCounts.map((c) => [c.language, c.color])),
    [languageCounts]
  );

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${site.githubHandle}/repos?sort=updated&per_page=6`)
      .then((res) => {
        if (!res.ok) throw new Error("GitHub API error");
        return res.json();
      })
      .then((data: Repo[]) => {
        if (!cancelled) setRepos(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="section-rule section-sand py-24 sm:py-32">
      <div className="section-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            index="06"
            label="GitHub"
            title="Recent Repositories"
            description={
              <>
                Live from the GitHub API — pulled directly from{" "}
                <a href={site.githubUrl} target="_blank" className="text-accent hover:text-accent-bright focus-ring rounded">
                  @{site.githubHandle}
                </a>
                .
              </>
            }
          />
          <a
            href={site.githubUrl}
            target="_blank"
            className="mb-12 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm text-primary hover:border-white/25 hover:bg-white/5 transition-colors focus-ring"
          >
            <Github size={15} /> View GitHub Profile
          </a>
        </div>

        {repos && repos.length > 0 && <LanguageBreakdown counts={languageCounts} />}

        {error && (
          <p className="text-sm text-secondary">
            Couldn&apos;t load live repository data right now — visit the{" "}
            <a href={site.githubUrl} target="_blank" className="text-accent hover:text-accent-bright focus-ring rounded">
              GitHub profile
            </a>{" "}
            directly.
          </p>
        )}

        {!error && !repos && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl border border-border bg-surface/40" />
            ))}
          </div>
        )}

        {repos && repos.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, i) => {
              const langColor = repo.language ? languageColors.get(repo.language) : undefined;
              return (
              <Reveal key={repo.id} delay={(i % 3) * 0.06} y={14}>
              <a
                href={repo.html_url}
                target="_blank"
                onMouseMove={spotlightMove}
                className="gradient-border spotlight group block h-full rounded-xl border border-border bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface2/50 focus-ring"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-primary truncate">{repo.name}</span>
                  <ExternalLink size={14} className="mt-0.5 shrink-0 text-secondary opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-2 text-xs text-secondary line-clamp-2 min-h-[2rem]">
                  {repo.description ?? "No description provided."}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-secondary">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: langColor }} />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star size={12} /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} /> {repo.forks_count}
                  </span>
                </div>
              </a>
              </Reveal>
              );
            })}
          </div>
        )}

        {repos && repos.length === 0 && (
          <p className="text-sm text-secondary">No public repositories returned by the GitHub API yet.</p>
        )}
      </div>
    </section>
  );
}
