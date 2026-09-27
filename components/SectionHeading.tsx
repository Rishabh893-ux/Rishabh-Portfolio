"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
}: {
  index: string;
  label: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div
        className={`inline-flex items-center gap-2 font-mono text-xs text-accent ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="h-px w-4 origin-left bg-gradient-to-r from-accent to-accent2"
        />
        {index} / {label}
      </div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-secondary leading-relaxed">{description}</p>}
    </Reveal>
  );
}
