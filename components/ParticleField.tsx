"use client";

import { useEffect, useRef } from "react";

type P = {
  x: number; y: number;
  tx: number; ty: number;
  vx: number; vy: number;
  r: number; a: number;
  hue: number;
};

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<P[]>([]);
  const stateRef = useRef<{ mode: "idle" | "burst" | "converge" }>({ mode: "idle" });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const seed = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const N = 1100;
      const arr: P[] = [];
      for (let i = 0; i < N; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 80 + Math.random() * 280;
        const x = cx + Math.cos(angle) * radius * (0.9 + Math.random() * 0.4);
        const y = cy + Math.sin(angle) * radius * 0.7;
        const tx = cx + (Math.random() - 0.5) * 700;
        const ty = cy + (Math.random() - 0.5) * 30;
        // green-cyan range to match accent palette
        const hue = Math.random() < 0.5 ? 75 + Math.random() * 20 : 180 + Math.random() * 20;
        arr.push({
          x, y, tx, ty,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6,
          r: 0.6 + Math.random() * 1.6,
          a: 0.25 + Math.random() * 0.6,
          hue,
        });
      }
      particlesRef.current = arr;
    };
    seed();

    const burst = () => {
      stateRef.current.mode = "burst";
      setTimeout(() => { stateRef.current.mode = "converge"; }, 600);
    };
    const reset = () => {
      stateRef.current.mode = "idle";
      seed();
    };
    window.addEventListener("particles:burst", burst);
    window.addEventListener("particles:reset", reset);

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const ps = particlesRef.current;
      const mode = stateRef.current.mode;

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        if (mode === "burst") {
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.x += p.vx * 2.4;
          p.y += p.vy * 2.4;
        } else if (mode === "converge") {
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          p.vx += dx * 0.0028;
          p.vy += dy * 0.0028;
          p.vx *= 0.92;
          p.vy *= 0.92;
          p.x += p.vx;
          p.y += p.vy;
        } else {
          p.x += p.vx * 0.2;
          p.y += p.vy * 0.2;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${p.a})`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("particles:burst", burst);
      window.removeEventListener("particles:reset", reset);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
