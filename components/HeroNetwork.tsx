"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

const LINK_DIST = 140; // px between nodes before a line is drawn
const MOUSE_DIST = 180; // px within which nodes connect to (and lean toward) the cursor

/** Reads "R G B" channel variables from globals.css so the canvas follows the theme. */
function readColors() {
  const css = getComputedStyle(document.documentElement);
  const light = document.documentElement.classList.contains("light");
  return {
    accent: "108 92 231",
    ink: css.getPropertyValue("--c-ink").trim() || "255 255 255",
    lineAlpha: light ? 0.22 : 0.16,
    nodeAlpha: light ? 0.55 : 0.6,
  };
}

/**
 * A slowly drifting network of nodes behind the hero. Nodes near the cursor link
 * to it and drift toward it. Pauses off-screen and in background tabs, and draws a
 * single still frame for visitors who prefer reduced motion.
 */
export default function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = readColors();
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, active: false };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Density scales with area, capped so large screens stay cheap.
      const count = Math.min(Math.round((width * height) / 15000), 80);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.4 + 0.8,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const { accent, ink, lineAlpha, nodeAlpha } = colors;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            ctx!.strokeStyle = `rgb(${ink} / ${(1 - d / LINK_DIST) * lineAlpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
        if (mouse.active) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (d < MOUSE_DIST) {
            ctx!.strokeStyle = `rgb(${accent} / ${(1 - d / MOUSE_DIST) * 0.55})`;
            ctx!.lineWidth = 1.2;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        const near = mouse.active && Math.hypot(n.x - mouse.x, n.y - mouse.y) < MOUSE_DIST;
        ctx!.fillStyle = near ? `rgb(${accent} / 0.95)` : `rgb(${ink} / ${nodeAlpha})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, near ? n.r + 0.8 : n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function step() {
      for (const n of nodes) {
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_DIST && d > 1) {
            n.vx += (dx / d) * 0.012;
            n.vy += (dy / d) * 0.012;
          }
        }
        // Gentle damping keeps speeds calm after the cursor pulls on them.
        n.vx *= 0.99;
        n.vy *= 0.99;
        const speed = Math.hypot(n.vx, n.vy);
        if (speed < 0.08) {
          n.vx += (Math.random() - 0.5) * 0.02;
          n.vy += (Math.random() - 0.5) * 0.02;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }
    }

    function loop() {
      step();
      draw();
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (reduceMotion || frame || !visible || document.hidden) return;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    }

    resize();
    draw();
    start();

    const section = canvas.parentElement!;
    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
    }
    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }
    function onTheme() {
      colors = readColors();
      draw();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("themechange", onTheme);

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("themechange", onTheme);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black_40%,transparent)]"
    />
  );
}
