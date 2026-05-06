"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FinalSignature() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelector(".final-eyebrow"), {
        opacity: 0, y: 20, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
      });
      gsap.from(sectionRef.current!.querySelectorAll(".final-name-row"), {
        scale: 0.5, opacity: 0, y: 80, duration: 1.4, stagger: 0.1, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none reverse" },
      });
      gsap.from(sectionRef.current!.querySelector(".final-tagline"), {
        opacity: 0, y: 30, duration: 1, delay: 0.3, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%", toggleActions: "play none none reverse" },
      });
      gsap.from(sectionRef.current!.querySelector(".final-cta"), {
        opacity: 0, y: 30, duration: 0.9, delay: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 50%", toggleActions: "play none none reverse" },
      });
      gsap.from(sectionRef.current!.querySelectorAll(".final-links a"), {
        opacity: 0, y: 14, duration: 0.7, delay: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 50%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(
        sectionRef.current!.querySelector(".final-ghost"),
        { y: 60, opacity: 0 },
        {
          y: -60, opacity: 1, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="s-final" id="contact" data-scroll-section>
      <div className="final-ghost">SHAMIL</div>
      <div className="final-wrap">
        <div className="final-eyebrow">
          <span className="dot" />
          <span>Available for select projects · Q2 2026</span>
        </div>
        <div className="final-name-row">SHAMIL</div>
        <p className="final-tagline">
          Got an idea? <em>Let&apos;s build something inevitable.</em>
        </p>
        <a href="mailto:shamilpp4115@gmail.com" className="final-cta" data-cursor="hover">
          Start a project
          <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
        <div className="final-links">
          <a href="mailto:shamilpp4115@gmail.com" data-cursor="hover">Email</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" data-cursor="hover">Github</a>
          <a href="https://x.com/" target="_blank" rel="noreferrer" data-cursor="hover">Twitter</a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" data-cursor="hover">LinkedIn</a>
          <a href="https://dribbble.com/" target="_blank" rel="noreferrer" data-cursor="hover">Dribbble</a>
        </div>
      </div>
      <div className="final-foot">
        <span>© Shamil · MMXXVI</span>
        <span>Designed in motion · Composed in light</span>
      </div>
      <div className="film-grain" />
    </section>
  );
}
