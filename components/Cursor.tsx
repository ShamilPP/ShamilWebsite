"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };
    document.addEventListener("mousemove", onMove);

    const tick = () => {
      gx += (mx - gx) * 0.1;
      gy += (my - gy) * 0.1;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
      }
    };
    gsap.ticker.add(tick);

    const enter = () => dotRef.current?.classList.add("is-hover");
    const leave = () => dotRef.current?.classList.remove("is-hover");
    const targets = document.querySelectorAll(
      'a, button, [data-cursor="hover"], .card, .stack-item, .mantra-card'
    );
    targets.forEach((t) => {
      t.addEventListener("mouseenter", enter);
      t.addEventListener("mouseleave", leave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", enter);
        t.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  );
}
