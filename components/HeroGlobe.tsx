"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const POINTS = 1400; // dots on the globe
const ARCS = 24; // data arcs between random dots
const STARS = 650; // background star field

/** "R G B" channel variables from globals.css → a three.js color. */
function cssColor(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  const [r, g, b] = v.split(/\s+/).map(Number);
  return new THREE.Color(r / 255, g / 255, b / 255);
}

/** A soft round sprite so points render as glowing dots instead of squares. */
function dotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Evenly spread points on a sphere (Fibonacci lattice). */
function fibonacciSphere(n: number, r: number) {
  const out: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = phi * i;
    out.push(new THREE.Vector3(Math.cos(theta) * rad * r, y * r, Math.sin(theta) * rad * r));
  }
  return out;
}

/**
 * Real-time 3D "neural globe" behind the hero: a dotted sphere with data arcs and
 * travelling pulses, inside a deep star field. It tilts toward the mouse, spins
 * faster and lifts as you scroll, follows the theme, and pauses when off-screen.
 */
export default function HeroGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const sprite = dotTexture();
    const disposables: { dispose: () => void }[] = [sprite];

    // --- Globe -------------------------------------------------------------
    const globe = new THREE.Group();
    scene.add(globe);
    const R = 1.7;
    const spherePts = fibonacciSphere(POINTS, R);
    const dotsGeo = new THREE.BufferGeometry().setFromPoints(spherePts);
    const dotsMat = new THREE.PointsMaterial({ size: 0.045, map: sprite, transparent: true, depthWrite: false });
    globe.add(new THREE.Points(dotsGeo, dotsMat));

    const shellGeo = new THREE.IcosahedronGeometry(R * 0.985, 3);
    const shellMat = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.06 });
    globe.add(new THREE.Mesh(shellGeo, shellMat));

    // Arcs: curves lifted off the surface between random pairs of dots.
    const curves: THREE.QuadraticBezierCurve3[] = [];
    const arcMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.38 });
    for (let i = 0; i < ARCS; i++) {
      const a = spherePts[Math.floor(Math.random() * POINTS)];
      const b = spherePts[Math.floor(Math.random() * POINTS)];
      if (a.distanceTo(b) < R * 0.6) continue;
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R * (1.25 + Math.random() * 0.35));
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      curves.push(curve);
      const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
      disposables.push(g);
      globe.add(new THREE.Line(g, arcMat));
    }

    // Pulses: one bright dot travelling along each arc.
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePos = new Float32Array(curves.length * 3);
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
    const pulseMat = new THREE.PointsMaterial({ size: 0.11, map: sprite, transparent: true, depthWrite: false });
    globe.add(new THREE.Points(pulseGeo, pulseMat));
    const pulseOffsets = curves.map(() => Math.random());

    // --- Star field ---------------------------------------------------------
    const starPos = new Float32Array(STARS * 3);
    for (let i = 0; i < STARS; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 26;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      starPos[i * 3 + 2] = -Math.random() * 12 + 1;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.04, map: sprite, transparent: true, depthWrite: false });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    disposables.push(dotsGeo, dotsMat, shellGeo, shellMat, arcMat, pulseGeo, pulseMat, starGeo, starMat);

    // --- Theme ---------------------------------------------------------------
    function applyTheme() {
      const light = document.documentElement.classList.contains("light");
      const accent = cssColor("--c-accent", "108 92 231");
      const glow = cssColor("--name-from", "156 144 255");
      const ink = cssColor("--c-ink", "255 255 255");
      // Additive glow suits the dark theme; on beige it would wash out, so blend normally.
      const blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      for (const m of [dotsMat, pulseMat, starMat]) m.blending = blending;
      dotsMat.color = light ? accent : glow;
      dotsMat.opacity = light ? 0.75 : 0.85;
      pulseMat.color = light ? accent.clone().multiplyScalar(0.8) : new THREE.Color(1, 1, 1);
      arcMat.color = light ? accent : glow;
      arcMat.opacity = light ? 0.45 : 0.38;
      shellMat.color = ink;
      shellMat.opacity = light ? 0.08 : 0.06;
      starMat.color = ink;
      starMat.opacity = light ? 0.35 : 0.55;
      for (const m of [dotsMat, pulseMat, starMat, arcMat, shellMat]) m.needsUpdate = true;
    }
    applyTheme();

    // --- Layout ---------------------------------------------------------------
    let wide = true;
    function resize() {
      const w = mount!.clientWidth;
      const h = mount!.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      wide = w >= 1024;
      // Desktop: the globe sits behind the photo on the right. Small screens: centered and smaller.
      globe.position.set(wide ? 1.9 : 0, wide ? 0.05 : 0.6, wide ? 0 : -1.5);
    }
    resize();

    // --- Interaction ----------------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let scrollY = window.scrollY;
    let lastScroll = scrollY;
    let spin = 0;

    function onPointer(e: PointerEvent) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    function onScroll() {
      scrollY = window.scrollY;
    }

    // --- Loop -------------------------------------------------------------------
    let raf = 0;
    let visible = true;
    const clock = new THREE.Clock();

    function frame() {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      eased.x += (pointer.x - eased.x) * 0.05;
      eased.y += (pointer.y - eased.y) * 0.05;
      const velocity = scrollY - lastScroll;
      lastScroll = scrollY;
      spin += (velocity * 0.0006 - spin) * 0.1;

      globe.rotation.y += dt * 0.12 + spin;
      globe.rotation.x = eased.y * 0.25 + 0.25;
      globe.rotation.z = eased.x * -0.08;
      globe.position.y = (wide ? 0.05 : 0.6) + Math.min(scrollY, 900) * 0.0012;

      camera.position.x = eased.x * 0.35;
      camera.position.y = -eased.y * 0.25;
      camera.lookAt(0, 0, 0);

      stars.rotation.y = t * 0.01 + eased.x * 0.05;
      stars.position.y = Math.min(scrollY, 900) * 0.0008;

      curves.forEach((c, i) => {
        const p = c.getPoint((t * 0.25 + pulseOffsets[i]) % 1);
        pulsePos[i * 3] = p.x;
        pulsePos[i * 3 + 1] = p.y;
        pulsePos[i * 3 + 2] = p.z;
      });
      pulseGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf || !visible || document.hidden) return;
      clock.getDelta();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(mount);
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("themechange", applyTheme);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("themechange", applyTheme);
      document.removeEventListener("visibilitychange", onVisibility);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      // Dimmed below the lg breakpoint, where the globe sits behind the text.
      className="pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(ellipse_90%_80%_at_60%_45%,black_45%,transparent)] lg:opacity-100"
    />
  );
}
