"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeroNetwork from "./HeroNetwork";

// three.js is loaded only when the 3D scene will actually be shown.
const HeroGlobe = dynamic(() => import("./HeroGlobe"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The 3D globe when the browser has WebGL and motion is welcome; otherwise the
 * lighter 2D network (which itself draws a still frame for reduced motion).
 */
export default function HeroBackground() {
  const [mode, setMode] = useState<"globe" | "network" | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(!reduce && supportsWebGL() ? "globe" : "network");
  }, []);

  if (mode === "globe") return <HeroGlobe />;
  if (mode === "network") return <HeroNetwork />;
  return null;
}
