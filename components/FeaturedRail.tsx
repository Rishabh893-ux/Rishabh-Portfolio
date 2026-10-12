"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/useMediaQuery";

// useLayoutEffect warns during server rendering; fall back to useEffect there.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Featured projects. On large screens the section pins while the cards slide
 * horizontally as you scroll down (a scroll-driven "rail"). On smaller screens and
 * for reduced motion it stays a plain vertical list.
 */
export default function FeaturedRail({ projects }: { projects: Project[] }) {
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduce = useMediaQuery(REDUCED_MOTION);
  const horizontal = wide && !reduce;

  if (!horizontal) {
    return (
      <div className="flex flex-col gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} spotlight={i === 0} />
        ))}
      </div>
    );
  }
  return <Rail projects={projects} />;
}

function Rail({ projects }: { projects: Project[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(0);

  // How far the track has to travel: its width minus the visible width.
  useIsoLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setCurrent(Math.min(projects.length - 1, Math.round(p * (projects.length - 1))));
  });

  return (
    // Full-bleed: break out of the centered container without transforms (which
    // would interfere with the sticky panel).
    <div
      ref={outerRef}
      className="relative mx-[calc(50%-50vw)]"
      // Vertical room to scroll through the whole track, plus one screen for the pinned panel.
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-6 flex w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-secondary">
            Featured work <span className="text-accent">— keep scrolling →</span>
          </span>
          <span className="font-mono text-xs text-secondary" aria-live="polite">
            <span className="text-primary">{String(current + 1).padStart(2, "0")}</span> /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-6 pl-[max(1.25rem,calc((100vw-72rem)/2+2rem))] pr-[max(1.25rem,calc((100vw-72rem)/2+2rem))]"
        >
          {projects.map((project, i) => (
            <div key={project.slug} className="w-[min(82vw,1120px)] shrink-0">
              <ProjectCard project={project} index={i} spotlight={i === 0} large />
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-8 h-px w-full max-w-6xl px-5 sm:px-8">
          <div className="h-px w-full bg-border">
            <motion.div className="h-px origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </div>
  );
}
