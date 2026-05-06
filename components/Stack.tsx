"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Tool = { label: string; meta: string; speed: number; icon: ReactNode };

const ITEMS: Tool[] = [
  {
    label: "Flutter", meta: "framework", speed: 0.8,
    icon: <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><path d="M14 4L4 14l4 4L18 8z"/><path d="M14 12L8 18l4 4 6-6z"/></svg>,
  },
  {
    label: "Dart", meta: "language", speed: 1.2,
    icon: <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11l6-6 8 8-2 8H7L5 11z"/><path d="M11 5l8 8"/></svg>,
  },
  {
    label: "Firebase", meta: "platform", speed: 0.6,
    icon: <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><path d="M5 18l5-15 4 6 5-3-2 13H5z"/></svg>,
  },
  {
    label: "React", meta: "library", speed: 1.0,
    icon: <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>,
  },
  {
    label: "TypeScript", meta: "type-safe", speed: 0.9,
    icon: <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 13h6M12 13v6"/><path d="M14 8c.5-1 4-1 4 1.5s-3 2-3 4 4 1.5 4 0"/></svg>,
  },
  {
    label: "UI / UX", meta: "design", speed: 1.1,
    icon: <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 17h18M9 21h6"/></svg>,
  },
  {
    label: "Motion", meta: "animation", speed: 0.7,
    icon: <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12c4-9 14-9 18 0M3 12c4 9 14 9 18 0"/></svg>,
  },
  {
    label: "APIs", meta: "integration", speed: 1.3,
    icon: <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><path d="M9 12h6M3 12h.01M21 12h.01"/></svg>,
  },
];

export default function Stack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".stack-item");
      gsap.from(items, {
        y: 80,
        opacity: 0,
        scale: 0.92,
        stagger: { each: 0.07, from: "random" },
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
      items.forEach((item) => {
        const speed = parseFloat((item as HTMLElement).dataset.speed || "1");
        gsap.to(item, {
          y: -30 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      gsap.from(sectionRef.current!.querySelector(".stack-center-text"), {
        scale: 0.6,
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Cursor-tracking orb
  useEffect(() => {
    if (!sectionRef.current || !orbRef.current) return;
    if (window.innerWidth <= 768) return;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: MouseEvent) => {
      const rect = sectionRef.current!.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    };
    sectionRef.current.addEventListener("mousemove", onMove);
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };
    gsap.ticker.add(tick);
    return () => {
      sectionRef.current?.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <section ref={sectionRef} className="s-stack" id="process" data-scroll-section>
      <div className="stack-eyebrow">§ 02 — Toolkit</div>
      <div ref={orbRef} className="stack-cursor-orb" />
      <div className="stack-grid">
        {ITEMS.map((it, i) => (
          <div key={i} className="stack-item" data-speed={it.speed}>
            {it.icon}
            <span>{it.label}</span>
            <div className="meta">{it.meta}</div>
          </div>
        ))}
      </div>
      <div className="stack-center-text">My toolkit.</div>
    </section>
  );
}
