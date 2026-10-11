import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Theme colors are RGB channels in CSS variables (see globals.css) so
        // opacity modifiers like bg-surface/60 work in both light and dark mode.
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        surface2: "rgb(var(--c-surface2) / <alpha-value>)",
        border: "rgb(var(--c-ink) / var(--border-alpha))",
        primary: "rgb(var(--c-primary) / <alpha-value>)",
        secondary: "rgb(var(--c-secondary) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        // "white" overlays (bg-white/5, border-white/20…) follow the theme's ink:
        // white on dark, near-black on light.
        white: "rgb(var(--c-ink) / <alpha-value>)",
        // Single accent — the only hue in the UI: violet in dark mode, antique gold
        // in the beige light theme (values in globals.css).
        accent: {
          DEFAULT: "rgb(var(--c-accent) / <alpha-value>)",
          dim: "rgb(var(--c-accent-dim) / <alpha-value>)",
          bright: "rgb(var(--c-accent-bright) / <alpha-value>)",
        },
        // Repurposed as a neutral silver "sheen" — never a second hue, only ever
        // paired with `accent` for depth (gradients, glows, borders).
        accent2: {
          DEFAULT: "rgb(var(--c-accent2) / <alpha-value>)",
          dim: "rgb(var(--c-accent2-dim) / <alpha-value>)",
          bright: "rgb(var(--c-accent2-bright) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jbmono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        soft: "0 8px 30px rgb(0 0 0 / var(--shadow-alpha))",
        glow: "0 0 0 1px rgb(var(--c-accent) / 0.18), 0 8px 30px rgb(var(--c-accent) / 0.10)",
        glow2: "0 0 0 1px rgb(var(--c-ink) / 0.10), 0 8px 30px rgb(var(--c-ink) / 0.05)",
        lift: "0 24px 60px -20px rgb(0 0 0 / calc(var(--shadow-alpha) * 1.7))",
      },
      backgroundImage: {
        grid: "linear-gradient(rgb(var(--c-ink) / 0.035) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--c-ink) / 0.035) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
      },
      keyframes: {
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        float: {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(10px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(14px) translateX(-14px)" },
        },
        "gradient-shift": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 30s linear infinite",
        float: "float 9s ease-in-out infinite",
        "float-slow": "float-slow 13s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
