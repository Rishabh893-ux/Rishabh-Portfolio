"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import CountUp from "./CountUp";

type Stat = { value: string; label: string };

// Where each floating stat badge sits around the photo (first three stats). The
// offsets live on a plain wrapper because Framer Motion owns the inner transform.
const badgePositions = [
  "left-0 top-8 -translate-x-[30%] sm:-translate-x-[55%]",
  "right-0 top-[46%] translate-x-[30%] sm:translate-x-[55%]",
  "left-0 bottom-8 -translate-x-[25%] sm:-translate-x-[45%]",
];

/**
 * Large hero photo in a portrait card with a rotating gradient border and glow,
 * with the hero stats floating as glass badges over its edges.
 */
export default function HeroPortrait({ stats }: { stats: Stat[] }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px]">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2.5rem] bg-accent/25 blur-3xl"
      />
      <div className="relative aspect-[413/531] overflow-hidden rounded-[2rem] p-[3px] shadow-lift">
        {/* Oversized conic layer spinning behind the photo; only its edge shows. */}
        <div
          aria-hidden="true"
          className="absolute -inset-1/2 animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,rgb(var(--c-accent)),rgb(var(--c-accent2-bright)),rgb(var(--name-from)),rgb(var(--c-accent)))]"
        />
        <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-3px)] bg-surface">
          <Image
            src="/profile-hero.jpg"
            alt={`Photo of ${site.name}`}
            fill
            priority
            sizes="(min-width: 640px) 340px, 300px"
            className="object-cover object-top"
          />
          {/* Soft fade at the bottom so the badges read well over the suit. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
          />
        </div>
      </div>

      {stats.slice(0, 3).map((stat, i) => (
        <div key={stat.label} className={`absolute ${badgePositions[i]}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { delay: 0.6 + i * 0.12, duration: 0.4 },
              scale: { delay: 0.6 + i * 0.12, duration: 0.4 },
              y: {
                delay: 1 + i * 0.4,
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="rounded-2xl border border-border bg-surface/80 px-3.5 py-2.5 shadow-soft backdrop-blur-md"
          >
            <div className="font-display text-xl font-semibold leading-none text-primary">
              <CountUp value={stat.value} />
            </div>
            <div className="mt-1 whitespace-nowrap text-[11px] text-secondary">
              {stat.label}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
