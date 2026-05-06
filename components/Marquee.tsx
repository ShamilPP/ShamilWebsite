"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ROWS: Array<{ items: Array<{ text: string; stroke?: boolean }>; speed: number }> = [
  {
    speed: 1,
    items: [
      { text: "Creative" }, { text: "Developer", stroke: true },
      { text: "Thinker" }, { text: "Builder", stroke: true },
      { text: "Creative" }, { text: "Developer", stroke: true },
      { text: "Thinker" }, { text: "Builder", stroke: true },
    ],
  },
  {
    speed: -0.85,
    items: [
      { text: "Pixel", stroke: true }, { text: "Perfect" },
      { text: "Code", stroke: true }, { text: "Craft" },
      { text: "Pixel", stroke: true }, { text: "Perfect" },
      { text: "Code", stroke: true }, { text: "Craft" },
    ],
  },
];

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = sectionRef.current?.querySelectorAll(".marquee-content");
    if (!rows) return;
    const tweens: gsap.core.Tween[] = [];

    rows.forEach((row, i) => {
      const speed = ROWS[i]?.speed ?? 1;
      const totalWidth = (row as HTMLElement).scrollWidth / 2;
      const duration = Math.max(20, Math.abs(totalWidth / (50 * Math.abs(speed))));
      const tw = gsap.fromTo(
        row,
        { x: speed > 0 ? 0 : -totalWidth },
        {
          x: speed > 0 ? -totalWidth : 0,
          duration,
          ease: "none",
          repeat: -1,
        }
      );
      tweens.push(tw);

      const skewTw = gsap.to(row, {
        skewX: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          onUpdate: (self) => {
            const v = self.getVelocity() / 1000;
            gsap.to(row, {
              skewX: Math.max(-12, Math.min(12, v * 0.8)),
              duration: 0.4,
              overwrite: true,
            });
          },
        },
      });
      tweens.push(skewTw);
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="s-marquee" data-scroll-section>
      {ROWS.map((row, ri) => (
        <div key={ri} className="marquee-row">
          <div className="marquee-content">
            {[...row.items, ...row.items].map((it, i) => (
              <span key={i} className={`mq-item ${it.stroke ? "mq-stroke" : "mq-fill"}`}>
                {it.text}
                {(i + 1) % 2 === 0 && <span className="mq-dot" style={{ display: "inline-block", marginLeft: "1.5rem" }} />}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
