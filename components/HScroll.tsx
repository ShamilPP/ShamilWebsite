"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Card = {
  idx: string;
  year: string;
  title: string;
  body: string;
  tags: string[];
  glyph: ReactNode;
};

const CARDS: Card[] = [
  {
    idx: "01",
    year: "Mobile",
    title: "Build apps people keep using.",
    body: "Idea to App Store. Flutter and native, animated, responsive, indistinguishable from native.",
    tags: ["Flutter", "Dart", "iOS", "Android"],
    glyph: (
      <svg className="glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="14" y="4" width="20" height="40" rx="5" />
        <path d="M22 8h4" strokeLinecap="round" />
        <circle cx="24" cy="38" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    idx: "02",
    year: "Code",
    title: "Architecture you can read out loud.",
    body: "Clean, layered, well-tested. The kind of codebase a new engineer can understand in an afternoon.",
    tags: ["TypeScript", "Clean arch", "Tests"],
    glyph: (
      <svg className="glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14l-8 10 8 10" />
        <path d="M34 14l8 10-8 10" />
        <path d="M28 8L20 40" />
      </svg>
    ),
  },
  {
    idx: "03",
    year: "Problem",
    title: "Solve before you ship.",
    body: "I sit with the problem until the obvious solution stops feeling smart and starts feeling inevitable.",
    tags: ["Discovery", "UX", "Strategy"],
    glyph: (
      <svg className="glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <path d="M18 24l4 4 8-8" />
      </svg>
    ),
  },
  {
    idx: "04",
    year: "Design",
    title: "Pixels that breathe.",
    body: "Type, color, motion. Interfaces designed to feel inevitable, weighted, alive.",
    tags: ["UI", "Motion", "Type"],
    glyph: (
      <svg className="glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 36l12-18 8 8 10-14 6 8" />
        <rect x="4" y="4" width="40" height="40" rx="4" />
      </svg>
    ),
  },
  {
    idx: "05",
    year: "Speed",
    title: "Zero to live, fast.",
    body: "Velocity is a feature. I ship to production in days, not months — without cutting corners.",
    tags: ["Velocity", "MVP", "Iterate"],
    glyph: (
      <svg className="glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="20" />
        <path d="M24 4v16l12 8-12 8V20" />
      </svg>
    ),
  },
];

export default function HScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const compute = () => {
        const track = trackRef.current!;
        return track.scrollWidth - window.innerWidth + 100;
      };

      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: () => "+=" + compute() * 1.2,
        pin: wrapperRef.current!,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      gsap.to(trackRef.current!, {
        x: () => -compute(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top top",
          end: () => "+=" + compute() * 1.2,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="s-hscroll" id="work" data-scroll-section>
      <div ref={wrapperRef} className="hscroll-wrapper">
        <div className="hscroll-header">
          <span className="hscroll-eyebrow">§ 01 — Practice</span>
          <h2 className="hscroll-title">Things I do.</h2>
          <div className="hscroll-line" />
        </div>
        <div ref={trackRef} className="hscroll-track">
          {CARDS.map((c) => (
            <article key={c.idx} className="card">
              <div className="card-meta">
                <span className="card-idx">/ {c.idx}</span>
                <span>{c.year}</span>
              </div>
              <div className="card-visual">
                <div className="card-grid-bg" />
                {c.glyph}
              </div>
              <div className="card-body">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
              <div className="card-tags">
                {c.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
