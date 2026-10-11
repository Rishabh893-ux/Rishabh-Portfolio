"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const reduce = useReducedMotion();
  const words = title.split(" ");
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
      <h2
        aria-label={title}
        className="mt-3 font-serif text-4xl font-normal leading-[1.05] tracking-tight text-primary sm:text-5xl"
      >
        {/* Each word rises out of its own clipping box, one after another. */}
        {words.map((word, i) => (
          <span key={i} aria-hidden="true">
            <span className="inline-block overflow-hidden pb-[0.12em] align-top">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </h2>
      {description && <p className="mt-3 text-secondary leading-relaxed">{description}</p>}
    </Reveal>
  );
}
