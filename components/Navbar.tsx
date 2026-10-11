"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // #top is observed so scrolling back to the hero clears the highlight.
    const sections = ["#top", ...links.map((l) => l.href)]
      .map((href) => document.querySelector(href))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          className="pointer-events-none absolute left-0 top-0 h-[3px] rounded-r-full bg-gradient-to-r from-accent-dim via-accent to-accent-bright shadow-[0_0_12px_rgba(108,92,231,0.7)] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
        <div className="section-container">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl border border-border px-4 transition-all duration-300",
              scrolled
                ? "bg-bg/70 backdrop-blur-xl shadow-soft py-2"
                : "bg-transparent py-3"
            )}
          >
            <a href="#top" className="font-mono text-sm font-medium tracking-tight text-primary focus-ring rounded">
              rishabh<span className="text-accent">.</span>dev
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative px-3 py-2 text-sm rounded-lg transition-colors focus-ring",
                    active === l.href
                      ? "text-primary"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  {l.label}
                  {active === l.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-accent to-accent2"
                    />
                  )}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
                className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-secondary hover:text-primary hover:border-white/20 transition-colors focus-ring"
                aria-label="Open command palette"
              >
                <Command size={12} />
                <span>K</span>
              </button>
              <Magnetic>
                <a
                  href={site.resumeUrl}
                  className="gradient-btn rounded-lg px-3.5 py-1.5 text-sm font-medium text-bg focus-ring"
                >
                  Resume
                </a>
              </Magnetic>
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle />
              <button
                className="p-2 text-primary focus-ring rounded-lg"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between section-container py-4">
              <span className="font-mono text-sm text-primary">rishabh.dev</span>
              <button onClick={() => setOpen(false)} className="p-2 text-primary focus-ring rounded-lg" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-col gap-1 section-container mt-4"
            >
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                  className="rounded-xl px-4 py-4 text-lg text-primary border-b border-border focus-ring"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href={site.resumeUrl}
                onClick={() => setOpen(false)}
                className="gradient-btn mt-4 rounded-xl px-4 py-3 text-center font-medium text-bg"
              >
                Download Resume
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
