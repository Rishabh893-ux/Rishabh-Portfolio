"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  User,
  Layers,
  Briefcase,
  Github,
  Linkedin,
  FileDown,
  Mail,
  Sun,
} from "lucide-react";
import { site } from "@/data/site";
import { toggleTheme } from "@/lib/theme";

type Cmd = {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const goTo = (id: string) => {
    setOpen(false);
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: Cmd[] = useMemo(
    () => [
      { id: "search-projects", label: "Search Projects", icon: <Search size={15} />, action: () => goTo("work"), group: "Navigate" },
      { id: "go-about", label: "Go to About", icon: <User size={15} />, action: () => goTo("about"), group: "Navigate" },
      { id: "go-skills", label: "Go to Skills", icon: <Layers size={15} />, action: () => goTo("skills"), group: "Navigate" },
      { id: "go-experience", label: "Go to Experience", icon: <Briefcase size={15} />, action: () => goTo("experience"), group: "Navigate" },
      { id: "open-github", label: "Open GitHub", icon: <Github size={15} />, action: () => window.open(site.githubUrl, "_blank"), group: "Links" },
      { id: "open-linkedin", label: "Open LinkedIn", icon: <Linkedin size={15} />, action: () => window.open(site.linkedinUrl, "_blank"), group: "Links" },
      { id: "download-resume", label: "Download Resume", icon: <FileDown size={15} />, action: () => window.open(site.resumeUrl, "_blank"), group: "Links" },
      { id: "contact", label: "Contact Rishabh", icon: <Mail size={15} />, action: () => goTo("contact"), group: "Links" },
      {
        id: "toggle-theme",
        label: "Toggle Light / Dark Theme",
        icon: <Sun size={15} />,
        action: () => {
          toggleTheme();
          setOpen(false);
        },
        group: "Preferences",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.action();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-24 sm:pt-32"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface2 shadow-soft"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search size={16} className="text-secondary" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command…"
                className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-secondary/60"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-secondary">esc</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-3 py-6 text-center text-sm text-secondary">No matching commands</div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    i === activeIndex
                      ? "bg-gradient-to-r from-accent/10 to-accent2/10 text-primary ring-1 ring-inset ring-white/10"
                      : "text-secondary"
                  }`}
                >
                  <span className="text-accent">{cmd.icon}</span>
                  {cmd.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
