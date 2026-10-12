"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import HeroNetwork from "./HeroNetwork";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/useMediaQuery";

// three.js is loaded only when the 3D scene will actually be shown.
const HeroGlobe = dynamic(() => import("./HeroGlobe"), { ssr: false });

let webgl: boolean | undefined;
/** Whether WebGL works here; probed once, then cached. */
function supportsWebGL() {
  if (webgl === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      webgl = false;
    }
  }
  return webgl;
}
const noSubscribe = () => () => {};

/**
 * The 3D globe when the browser has WebGL and motion is welcome; otherwise the
 * lighter 2D network (which itself draws a still frame for reduced motion).
 */
export default function HeroBackground() {
  const reduce = useMediaQuery(REDUCED_MOTION);
  // null on the server: nothing is drawn until the browser has been checked.
  const hasWebGL = useSyncExternalStore<boolean | null>(noSubscribe, supportsWebGL, () => null);
  const mode = hasWebGL === null ? null : !reduce && hasWebGL ? "globe" : "network";

  if (mode === "globe") return <HeroGlobe />;
  if (mode === "network") return <HeroNetwork />;
  return null;
}
