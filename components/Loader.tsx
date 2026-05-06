"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = { onDone: () => void };

export default function Loader({ onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { v: 0 };
    const tl = gsap.timeline();
    tl.to(obj, {
      v: 100,
      duration: 2.0,
      ease: "power2.inOut",
      onUpdate() {
        if (counterRef.current) counterRef.current.textContent = String(Math.round(obj.v));
        if (barRef.current) barRef.current.style.width = `${obj.v}%`;
      },
    });
    tl.to(rootRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () => {
        if (rootRef.current) rootRef.current.style.display = "none";
        onDone();
      },
    });
  }, [onDone]);

  return (
    <div ref={rootRef} className="loader">
      <div ref={counterRef} className="loader-counter">0</div>
      <div className="loader-meta">
        Shamil<br />
        Portfolio · MMXXVI<br />
        Cinematic Reveal · Vol. 01
      </div>
      <div ref={barRef} className="loader-bar" />
    </div>
  );
}
