"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT =
  "I believe great software is invisible. It just works. Every pixel, every interaction, every millisecond matters. I obsess over the details so users never have to think twice.";

const ACCENT_WORDS = new Set(["invisible.", "details", "obsess"]);

export default function TextReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!pRef.current) return;
    const words = pRef.current.querySelectorAll(".word");
    const tw = gsap.to(words, {
      opacity: 1,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        end: "bottom 45%",
        scrub: true,
      },
    });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  const words = TEXT.split(/\s+/);

  return (
    <section ref={sectionRef} className="s-text-reveal" data-scroll-section>
      <div className="container-x">
        <p ref={pRef} className="reveal-paragraph">
          {words.map((w, i) => (
            <span key={i} className={`word${ACCENT_WORDS.has(w) ? " accent" : ""}`}>
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
