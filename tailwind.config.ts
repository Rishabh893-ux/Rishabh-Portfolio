import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#08080A",
        surface: "#0F0F12",
        surface2: "#17171B",
        border: "rgba(255,255,255,0.08)",
        primary: "#F5F5F6",
        secondary: "#96969E",
        muted: "#6B6B72",
        // Single vivid accent — the only hue in the UI.
        accent: {
          DEFAULT: "#6C5CE7",
          dim: "#5747C7",
          bright: "#9C90FF",
        },
        // Repurposed as a neutral silver "sheen" — never a second hue, only ever
        // paired with `accent` for depth (gradients, glows, borders).
        accent2: {
          DEFAULT: "#A6A6B3",
          dim: "#75757F",
          bright: "#E3E3E8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jbmono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.35)",
        glow: "0 0 0 1px rgba(108,92,231,0.18), 0 8px 30px rgba(108,92,231,0.10)",
        glow2: "0 0 0 1px rgba(255,255,255,0.10), 0 8px 30px rgba(255,255,255,0.05)",
        lift: "0 24px 60px -20px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
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
