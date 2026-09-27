import type { MouseEvent } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Tracks cursor position for the `.spotlight` cursor-following glow effect (see globals.css).
export function spotlightMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}
