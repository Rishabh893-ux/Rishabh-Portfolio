"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import Terminal from "./Terminal";
import HeroBackground from "./HeroBackground";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/useMediaQuery";
import HeroPortrait from "./HeroPortrait";
import Magnetic from "./Magnetic";

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
  const reduce = useMediaQuery(REDUCED_MOTION);
  const [index, setIndex] = useState(0);
  // Always start empty: the server can't know the visitor's motion preference,
  // so rendering the full role here would make hydration fail with reduced motion.
  const [text, setText] = useState("");
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
      <span aria-hidden="true">{reduce ? roles[0] : text}</span>
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
  const reduce = useReducedMotion();
  // Gentle parallax: the photo drifts up a little slower than the page scrolls.
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -70]);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
      <HeroBackground />
      <div className="glow-orb -left-24 top-10 h-72 w-72 bg-accent/20 animate-float" />
      <div className="glow-orb -right-16 top-40 h-80 w-80 bg-accent2/20 animate-float-slow" />

      <div className="section-container relative grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
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

          <h1
            aria-label={site.name}
            className="mt-6 font-serif text-6xl font-normal leading-[0.92] tracking-tight text-primary sm:text-7xl lg:text-[5.5rem]"
          >
            {/* First name: letter by letter. */}
            <span aria-hidden="true" className="block">
              {"Rishabh".split("").map((ch, k) => (
                <motion.span
                  key={k}
                  className="inline-block"
                  initial={reduce ? false : { opacity: 0, y: "0.4em", rotate: 4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.15 + k * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            {/* Surname: the gradient word is wiped in from the left, like ink. */}
            <motion.span
              aria-hidden="true"
              className="block pb-2 pr-2 italic gradient-text-static"
              initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ delay: 0.55, duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            >
              Kasaudhan
            </motion.span>
          </h1>

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
          transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
          className="min-w-0 px-6 sm:px-10"
        >
          <motion.div style={{ y: portraitY }}>
            <HeroPortrait stats={stats} />
          </motion.div>
        </motion.div>
      </div>

      {/* The interactive terminal now sits in its own row under the hero. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
        className="section-container relative mt-16 sm:mt-20"
      >
        <div className="mx-auto max-w-3xl">
          <Terminal />
        </div>
      </motion.div>

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
