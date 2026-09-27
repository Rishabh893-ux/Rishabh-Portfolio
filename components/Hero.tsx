"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import Terminal from "./Terminal";
import CountUp from "./CountUp";
import Magnetic from "./Magnetic";
import { spotlightMove } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const roles = site.role.split("•").map((r) => r.trim());

function TypedRole() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? roles[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const full = roles[index];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === full) delay = 1800;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      } else {
        setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, reduce]);

  return (
    <span aria-label={roles.join(", ")}>
      <span className="text-secondary" aria-hidden="true">
        &gt;{" "}
      </span>
      <span aria-hidden="true">{text}</span>
      <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.15em] animate-blink bg-accent" aria-hidden="true" />
    </span>
  );
}

const stats = [
  { value: `${projects.length}`, label: "Case studies" },
  { value: `${experience.length}`, label: "Roles & internships" },
  { value: `${certifications.length}`, label: "Certifications" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="glow-orb -left-24 top-10 h-72 w-72 bg-accent/20 animate-float" />
      <div className="glow-orb -right-16 top-40 h-80 w-80 bg-accent2/20 animate-float-slow" />

      <div className="section-container relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
        <div className="min-w-0">
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-secondary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to SDE &amp; Full Stack roles
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-primary sm:text-6xl lg:text-7xl"
          >
            <span className="block">Rishabh</span>
            <span className="block gradient-text-static pb-1">Kasaudhan</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 h-6 whitespace-nowrap font-mono text-sm text-accent-bright sm:text-base"
          >
            <TypedRole />
          </motion.p>

          <motion.h2
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-6 max-w-xl text-pretty font-display text-xl font-medium leading-snug text-primary/90 sm:text-2xl"
          >
            I build full-stack web apps and AI&#8209;powered automations — and keep them running in production.
          </motion.h2>

          <motion.p
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-4 max-w-xl text-pretty leading-relaxed text-secondary"
          >
            4th-year B.Tech CSE student working across React/Next.js, Node.js/Express and MongoDB/PostgreSQL.
            At <span className="text-primary">ImpulseAI</span> I keep a live Google Reviews automation reliable
            and make its AI replies sharper.
          </motion.p>

          <motion.div custom={5} initial="hidden" animate="show" variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="gradient-btn group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-bg shadow-glow focus-ring"
              >
                View Projects
                <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={site.resumeUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-primary transition-colors hover:border-white/25 hover:bg-white/5 focus-ring"
              >
                Download Resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.div custom={6} initial="hidden" animate="show" variants={fadeUp} className="mt-7 flex items-center gap-4 text-secondary">
            {[
              { href: site.githubUrl, label: "GitHub", Icon: Github, external: true },
              { href: site.linkedinUrl, label: "LinkedIn", Icon: Linkedin, external: true },
              { href: `mailto:${site.email}`, label: "Email", Icon: Mail, external: false },
            ].map(({ href, label, Icon, external }) => (
              <motion.a
                key={label}
                whileHover={{ y: -3, scale: 1.1 }}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="rounded transition-colors hover:text-primary focus-ring"
                aria-label={label}
              >
                <Icon size={19} />
              </motion.a>
            ))}
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <a
              href="#contact"
              className="inline-flex items-center gap-1 rounded text-sm text-secondary transition-colors hover:text-primary focus-ring"
            >
              Get in touch <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="min-w-0 lg:pt-14"
        >
          <Terminal />

          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                onMouseMove={spotlightMove}
                className="gradient-border spotlight rounded-2xl border border-border bg-surface/50 p-3 sm:p-4"
              >
                <div className="font-display text-2xl font-semibold text-primary">
                  <CountUp value={stat.value} />
                </div>
                <div className="mt-1 text-[11px] leading-tight text-secondary sm:text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute inset-x-0 bottom-6 hidden justify-center rounded text-secondary transition-colors hover:text-accent focus-ring sm:flex"
        aria-label="Scroll to Experience"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
