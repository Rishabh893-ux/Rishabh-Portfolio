"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { site } from "@/data/site";
import Reveal from "./Reveal";

function FloatingField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="group relative">
      <input
        {...props}
        placeholder=" "
        className="peer w-full rounded-xl border border-border bg-surface/60 px-4 pb-2.5 pt-5 text-sm text-primary placeholder-transparent focus-ring focus:border-accent2/50"
      />
      <label className="pointer-events-none absolute left-4 top-3.5 text-sm text-secondary/70 transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent2 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]">
        {label}
      </label>
    </div>
  );
}

// Create a free form at formspree.io and set NEXT_PUBLIC_FORMSPREE_ID; without it the form falls back to mailto.
const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit() {
    if (!formspreeId) {
      window.location.href = mailtoHref;
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Portfolio inquiry from ${form.name || "your site"}`
  )}&body=${encodeURIComponent(
    `${form.message}\n\n— ${form.name || ""}${form.email ? ` (${form.email})` : ""}`
  )}`;

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-border">
      <div className="section-container">
        <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface/50 p-6 sm:p-8 lg:p-10">
          <div className="glow-orb -left-16 -top-16 h-64 w-64 bg-accent/15" />
          <div className="glow-orb -right-16 bottom-0 h-64 w-64 bg-accent2/15" />
          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-accent">
                <span className="h-px w-4 bg-gradient-to-r from-accent to-accent2" />
                07 / Contact
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                Let&apos;s build something meaningful.
              </h2>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg/50 px-3 py-1.5 text-xs text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Currently open to new opportunities
              </div>
              <p className="mt-4 max-w-md text-secondary leading-relaxed">
                I&apos;m open to SDE and Full Stack Developer roles, internships, and freelance builds. The fastest way to reach me is the form or email.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-bg/50 p-3 text-primary transition-colors hover:border-white/20 hover:bg-white/5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent2/15 text-accent ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
                    <Mail size={16} />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-secondary">Email</span>
                    <span className="text-sm font-medium">{site.email}</span>
                  </span>
                </a>

                <a
                  href={site.linkedinUrl}
                  target="_blank"
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-bg/50 p-3 text-primary transition-colors hover:border-white/20 hover:bg-white/5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent2/15 text-accent ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
                    <Linkedin size={16} />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-secondary">LinkedIn</span>
                    <span className="text-sm font-medium">Rishabh Kasaudhan</span>
                  </span>
                </a>

                <a
                  href={site.githubUrl}
                  target="_blank"
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-bg/50 p-3 text-primary transition-colors hover:border-white/20 hover:bg-white/5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent2/15 text-accent ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
                    <Github size={16} />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-secondary">GitHub</span>
                    <span className="text-sm font-medium">@{site.githubHandle}</span>
                  </span>
                </a>
              </div>
            </div>

            <form
              className="gradient-border rounded-2xl border border-border bg-bg/60 p-5 sm:p-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <p className="mb-5 text-sm text-secondary">
                Send a quick note and I&apos;ll get back to you.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <FloatingField
                  label="Your name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                <FloatingField
                  label="Your email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="group relative mt-4">
                <textarea
                  required
                  rows={5}
                  placeholder=" "
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="peer w-full rounded-xl border border-border bg-surface/60 px-4 pb-2.5 pt-5 text-sm text-primary placeholder-transparent focus-ring focus:border-accent2/50"
                />
                <label className="pointer-events-none absolute left-4 top-3.5 text-sm text-secondary/70 transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent2 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]">
                  What are you looking to build?
                </label>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-secondary">
                  {formspreeId
                    ? "Your message goes straight to my inbox."
                    : "This opens your email app with a pre-filled message."}
                </p>
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="gradient-btn inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-bg focus-ring disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Send message
                    </>
                  )}
                </motion.button>
              </div>
              <AnimatePresence>
                {(status === "sent" || status === "mailto" || status === "error") && (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                    role="status"
                  >
                    {status === "error" ? (
                      <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-3.5 py-2.5 text-sm text-red-300">
                        <AlertCircle size={15} /> Couldn&apos;t send that. Email me directly at {site.email}.
                      </div>
                    ) : (
                      <div className="mt-4 flex items-center gap-2 rounded-xl border border-accent/25 bg-accent/10 px-3.5 py-2.5 text-sm text-accent-bright">
                        <Check size={15} />
                        {status === "sent" ? "Thanks — your message is on its way. I'll get back to you soon." : "Opening your email app…"}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
