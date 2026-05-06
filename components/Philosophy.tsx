"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelectorAll(".phil-line span"), {
        yPercent: 120,
        stagger: 0.12,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.to(sectionRef.current!.querySelector(".phil-blob"), {
        scale: 1.3,
        rotation: 180,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="s-philosophy" data-scroll-section>
      <div className="phil-blob" />
      <div className="phil-content">
        <div className="phil-line"><span>Code is</span></div>
        <div className="phil-line phil-accent"><span>poetry.</span></div>
      </div>
    </section>
  );
}
