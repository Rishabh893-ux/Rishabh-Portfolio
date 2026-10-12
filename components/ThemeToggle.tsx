"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { getTheme, toggleTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function subscribeTheme(onChange: () => void) {
  window.addEventListener("themechange", onChange);
  return () => window.removeEventListener("themechange", onChange);
}

export default function ThemeToggle({ className }: { className?: string }) {
  // null on the server, which can't know the visitor's theme.
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, getTheme, () => null);

  const next = theme === "light" ? "dark" : "light";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme ? `Switch to ${next} mode` : "Toggle color theme"}
      title={theme ? `Switch to ${next} mode` : undefined}
      className={cn(
        "relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-border text-secondary transition-colors hover:border-white/20 hover:text-primary focus-ring",
        className
      )}
    >
      <Sun
        size={15}
        className={cn(
          "absolute transition-all duration-300",
          theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        )}
      />
      <Moon
        size={15}
        className={cn(
          "absolute transition-all duration-300",
          theme === "light" ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        )}
      />
    </button>
  );
}
