"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MANTRAS = [
  { label: "Mantra 01", text: "Less is more." },
  { label: "Mantra 02", text: "Ship, iterate, repeat." },
  { label: "Mantra 03", text: "Details make the design." },
  { label: "Mantra 04", text: "Never stop learning." },
];

export default function Mantras() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll(".mantra-card");
      const cardCount = cards.length;
      const scrollPerCard = window.innerHeight * 0.85;
      const totalHeight = scrollPerCard * cardCount + window.innerHeight;

      (sectionRef.current as HTMLElement).style.height = totalHeight + "px";

      cards.forEach((card, i) => {
        gsap.set(card, { y: 220, opacity: 0, scale: 0.92 });

        gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: () => "top+=" + i * scrollPerCard + " top",
            end: () => "top+=" + (i * scrollPerCard + scrollPerCard * 0.5) + " top",
            scrub: 1,
          },
        });

        if (i < cardCount - 1) {
          gsap.to(card, {
            y: -60,
            scale: 0.9,
            opacity: 0.25,
            ease: "power2.in",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => "top+=" + (i + 1) * scrollPerCard + " top",
              end: () => "top+=" + ((i + 1) * scrollPerCard + scrollPerCard * 0.4) + " top",
              scrub: 1,
            },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="s-mantras" id="index" data-scroll-section>
      <div className="mantra-sticky">
        {MANTRAS.map((m, i) => (
          <div key={i} className="mantra-card">
            <span className="mantra-label">{m.label}</span>
            <h3>{m.text}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
