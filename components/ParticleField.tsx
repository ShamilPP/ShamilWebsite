"use client";

import { useEffect, useRef } from "react";

type P = {
  x: number; y: number;
  tx: number; ty: number;
  vx: number; vy: number;
  r: number; a: number;
  spriteIdx: number; // 0 = green, 1 = cyan
};

// Two pre-baked sprites (green / cyan) — built once, drawn many times.
function buildSprite(hue: number, size: number) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, `hsla(${hue}, 90%, 70%, 1)`);
  g.addColorStop(0.4, `hsla(${hue}, 90%, 60%, 0.55)`);
  g.addColorStop(1, `hsla(${hue}, 90%, 50%, 0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<P[]>([]);
  const stateRef = useRef<{ mode: "idle" | "burst" | "converge"; visible: boolean }>({
    mode: "idle",
    visible: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;

    const SPRITE_PX = 64;
    const sprites = [buildSprite(85, SPRITE_PX), buildSprite(190, SPRITE_PX)];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // capped lower for perf
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle count scales with viewport — fewer on small screens
    const targetCount = () => {
      const w = window.innerWidth;
      if (w < 600) return 280;
      if (w < 1024) return 420;
      return 600;
    };

    const seed = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const N = targetCount();
      const arr: P[] = [];
      for (let i = 0; i < N; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 80 + Math.random() * 280;
        const x = cx + Math.cos(angle) * radius * (0.9 + Math.random() * 0.4);
        const y = cy + Math.sin(angle) * radius * 0.7;
        const tx = cx + (Math.random() - 0.5) * 700;
        const ty = cy + (Math.random() - 0.5) * 30;
        arr.push({
          x, y, tx, ty,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6,
          r: 0.6 + Math.random() * 1.6,
          a: 0.25 + Math.random() * 0.55,
          spriteIdx: Math.random() < 0.5 ? 0 : 1,
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

    // Visibility — pause when host parent is hidden (opacity 0)
    let lastVisCheck = 0;
    const checkVisible = () => {
      const host = canvas.parentElement as HTMLElement | null;
      if (!host) return true;
      const op = parseFloat(getComputedStyle(host).opacity);
      return op > 0.02;
    };

    const tick = () => {
      const now = performance.now();
      // Re-check visibility 4×/sec — cheap, stops the heavy draw when hidden
      if (now - lastVisCheck > 250) {
        stateRef.current.visible = checkVisible();
        lastVisCheck = now;
      }

      // Skip draw entirely while hidden — biggest perf win when scrolling away
      if (!stateRef.current.visible) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const ps = particlesRef.current;
      const mode = stateRef.current.mode;
      ctx.globalCompositeOperation = "lighter";

      const half = SPRITE_PX / 2;

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

        // drawImage with pre-baked sprite — ~5× cheaper than per-particle gradient
        const size = p.r * 8;
        ctx.globalAlpha = p.a;
        ctx.drawImage(sprites[p.spriteIdx], p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;

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

  return (
    <div ref={hostRef} className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
