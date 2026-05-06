"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppScreen from "./AppScreen";
import ParticleField from "./ParticleField";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STACK_SCREENS: Array<{
  variant: "profile" | "chat" | "onboarding" | "settings" | "chart";
  // Final 3D position relative to the lead phone
  x: number;
  y: number;
  z: number;
  ry: number;
}> = [
  { variant: "onboarding", x: -440, y: -60, z: -60, ry: 22 },
  { variant: "profile",    x: -260, y:  60, z:  20, ry: 18 },
  { variant: "chart",      x:  260, y: -60, z:  20, ry: -18 },
  { variant: "chat",       x:  440, y:  60, z: -60, ry: -22 },
  { variant: "settings",   x:    0, y: 220, z:  40, ry:  0 },
];

export default function CinematicHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const screenGlowRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const annotsRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const particleHostRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const stageLabelRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const flareStreakRef = useRef<HTMLDivElement>(null);
  const letterTopRef = useRef<HTMLDivElement>(null);
  const letterBotRef = useRef<HTMLDivElement>(null);
  const orbBlueRef = useRef<HTMLDivElement>(null);
  const orbVioletRef = useRef<HTMLDivElement>(null);
  const orbCyanRef = useRef<HTMLDivElement>(null);
  const orbWarmRef = useRef<HTMLDivElement>(null);
  const orbAcidRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const topMeterRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Idle ambient orb drift
      gsap.to(orbBlueRef.current, { x: 80, y: -60, duration: 14, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(orbVioletRef.current, { x: -100, y: 70, duration: 18, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(orbCyanRef.current, { x: 60, y: 50, duration: 12, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(orbAcidRef.current, { x: -80, y: -40, duration: 16, yoyo: true, repeat: -1, ease: "sine.inOut" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stageRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (railFillRef.current) {
              railFillRef.current.style.height = `${self.progress * 100}%`;
            }
            if (topMeterRef.current) {
              topMeterRef.current.style.width = `${self.progress * 100}%`;
            }
            if (chapterRef.current) {
              const p = self.progress;
              const label =
                p < 0.15 ? "I · Approach" :
                p < 0.32 ? "II · Power-On" :
                p < 0.58 ? "III · Stack Reveal" :
                p < 0.80 ? "IV · Dissolution" :
                "V · Signature";
              if (chapterRef.current.dataset.label !== label) {
                chapterRef.current.dataset.label = label;
                chapterRef.current.textContent = label;
              }
            }
          },
        },
      });

      // ── Phase 1: Approach (0–1)
      tl.fromTo(
        phoneRef.current,
        { rotateX: -12, rotateY: -22, y: 30, scale: 1, opacity: 1 },
        { rotateX: -8, rotateY: 6, y: -10, scale: 1.05, duration: 1 },
        0
      );
      tl.to(heroCopyRef.current, { opacity: 0, y: -30, duration: 0.5 }, 0.2);

      // Letterbox in
      tl.to(letterTopRef.current, { height: 56, duration: 0.6 }, 0.4);
      tl.to(letterBotRef.current, { height: 56, duration: 0.6 }, 0.4);

      // ── Phase 2: Power-On (1–2.5)
      tl.to(phoneRef.current, { rotateX: -2, rotateY: -2, scale: 1.1, duration: 1.2 }, 1);
      tl.to(flareRef.current, { opacity: 1, scale: 1.2, duration: 0.35, ease: "power2.out" }, 1.4);
      tl.to(flareRef.current, { opacity: 0.35, scale: 1, duration: 0.5 }, 1.75);
      tl.fromTo(flareStreakRef.current, { opacity: 0, x: "-50%" }, { opacity: 0.9, duration: 0.15 }, 1.45);
      tl.to(flareStreakRef.current, { opacity: 0, duration: 0.4 }, 1.65);

      tl.to(screenGlowRef.current, { opacity: 1, duration: 0.7 }, 1.45);
      tl.to(screenRef.current, { opacity: 1, duration: 0.7 }, 1.6);
      tl.to(stageLabelRef.current, { opacity: 1, duration: 0.4 }, 1.3);

      // Color grade: cool blue → cyan
      tl.to(orbBlueRef.current, { opacity: 0.9, duration: 1 }, 1);
      tl.to(orbCyanRef.current, { opacity: 0.7, duration: 1 }, 1.5);

      // ── Phase 3: Stack reveal (2.5–4.5)
      tl.to(phoneRef.current, { scale: 0.85, rotateX: -10, rotateY: -8, duration: 1.4 }, 2.5);
      tl.to(screenRef.current, { opacity: 0.7, duration: 0.6 }, 2.5);

      // Reveal each surrounding screen
      const stackEls = stackRef.current?.querySelectorAll(".phone") ?? [];
      stackEls.forEach((el, i) => {
        const cfg = STACK_SCREENS[i];
        if (!cfg) return;
        tl.fromTo(
          el,
          { opacity: 0, x: 0, y: 0, z: -200, rotateY: cfg.ry, scale: 0.7 },
          { opacity: 1, x: cfg.x, y: cfg.y, z: cfg.z, rotateY: cfg.ry, scale: 0.55, duration: 1.2 },
          2.7 + i * 0.12
        );
      });

      // Annotations fade in
      const annotEls = annotsRef.current?.querySelectorAll(".annot") ?? [];
      tl.to(annotEls, { opacity: 1, stagger: 0.07, duration: 0.5 }, 3.4);

      // Slow rotation while exploded
      tl.to(phoneRef.current, { rotateY: 18, duration: 1.4 }, 3.0);
      tl.to(phoneRef.current, { rotateY: -10, duration: 1.4 }, 4.4);

      tl.to(orbVioletRef.current, { opacity: 0.8, duration: 1 }, 3.0);
      tl.to(orbAcidRef.current, { opacity: 0.6, duration: 1 }, 3.4);

      // ── Phase 4: Dissolution (4.5–6)
      tl.to(annotEls, { opacity: 0, duration: 0.5 }, 5.2);
      tl.to(
        [phoneRef.current, ...Array.from(stackEls)],
        { opacity: 0, filter: "blur(24px)", scale: 0.4, duration: 1.0 },
        5.4
      );
      tl.to(stageLabelRef.current, { opacity: 0, duration: 0.4 }, 5.4);

      tl.to(
        particleHostRef.current,
        {
          opacity: 1,
          duration: 0.4,
          onStart: () => { window.dispatchEvent(new CustomEvent("particles:burst")); },
          onReverseComplete: () => { window.dispatchEvent(new CustomEvent("particles:reset")); },
        },
        5.5
      );

      tl.to(letterTopRef.current, { height: 0, duration: 0.8 }, 6.2);
      tl.to(letterBotRef.current, { height: 0, duration: 0.8 }, 6.2);

      // ── Phase 5: SHAMIL signature on PURE BLACK
      // Black curtain swallows particles, orbs, vignette — name lands on void
      tl.to(curtainRef.current, { opacity: 1, duration: 0.6, ease: "power2.inOut" }, 6.0);
      tl.to(particleHostRef.current, { opacity: 0, duration: 0.6 }, 6.0);
      tl.to(
        [orbBlueRef.current, orbVioletRef.current, orbCyanRef.current, orbWarmRef.current, orbAcidRef.current],
        { opacity: 0, duration: 0.6 },
        6.0
      );

      tl.to(finalRef.current, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2 }, 6.5);
      tl.fromTo(
        finalRef.current,
        { letterSpacing: "0.5em" },
        { letterSpacing: "-0.04em", duration: 1.6, ease: "power3.out" },
        6.5
      );
      tl.fromTo(
        sweepRef.current,
        { backgroundPosition: "-100% 0" },
        { backgroundPosition: "200% 0", duration: 2.2, ease: "power2.inOut" },
        7.1
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative" style={{ height: "780vh" }}>
      <div
        ref={stageRef}
        className="ambient-bg vignette grain relative w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div ref={topMeterRef} className="top-meter" />

        {/* Ambient orbs */}
        <div ref={orbBlueRef}   className="orb orb-blue"   style={{ width: 600, height: 600, top: "10%", left: "5%", opacity: 0.5 }} />
        <div ref={orbVioletRef} className="orb orb-violet" style={{ width: 500, height: 500, bottom: "5%", right: "5%", opacity: 0.3 }} />
        <div ref={orbCyanRef}   className="orb orb-cyan"   style={{ width: 400, height: 400, top: "55%", left: "55%", opacity: 0 }} />
        <div ref={orbWarmRef}   className="orb orb-warm"   style={{ width: 700, height: 700, top: "20%", left: "30%", opacity: 0 }} />
        <div ref={orbAcidRef}   className="orb orb-acid"   style={{ width: 450, height: 450, bottom: "20%", left: "20%", opacity: 0 }} />

        {/* Letterbox */}
        <div ref={letterTopRef} className="letterbox top" />
        <div ref={letterBotRef} className="letterbox bot" />

        {/* Top nav */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-[clamp(1.25rem,4vw,3rem)] py-6 mix-blend-difference pointer-events-none">
          <div className="font-display italic text-xl tracking-tight">
            shamil<span className="opacity-40">.studio</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.2em] uppercase opacity-70 font-mono pointer-events-auto">
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#index">Index</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="text-[11px] tracking-[0.25em] uppercase opacity-50 font-mono">
            MMXXVI / Reveal 01
          </div>
        </div>

        {/* Hero copy */}
        <div
          ref={heroCopyRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 pointer-events-none"
        >
          <div className="text-center max-w-[860px] px-6">
            <div className="hero-status mb-6">
              <span className="hero-status-dot" />
              <span>Available for select projects · Q2 2026</span>
            </div>
            <h1 className="hero-headline">
              Pixels with a<br />
              <em>pulse.</em>
            </h1>
            <p className="hero-sub">
              Shamil — a creative developer crafting mobile interfaces that feel inevitable.
              Scroll to disassemble the work. What remains is the signature.
            </p>
            <div className="hero-scroll-hint">
              <span className="dot" /> scroll
            </div>
          </div>
        </div>

        {/* Stage label */}
        <div
          ref={stageLabelRef}
          className="absolute left-8 bottom-8 z-20 opacity-0 pointer-events-none"
        >
          <div className="eyebrow mb-1">Stack</div>
          <div className="font-display italic text-2xl">Anatomy of an app.</div>
        </div>

        {/* Chapter chrome */}
        <div className="absolute right-8 bottom-8 z-20 text-right pointer-events-none">
          <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">CHAPTER</div>
          <div ref={chapterRef} className="font-display italic text-2xl mt-1 min-w-[260px]">
            I · Approach
          </div>
        </div>

        {/* Right scroll rail */}
        <div className="scroll-rail">
          <div ref={railFillRef} className="scroll-rail-fill" />
          {[0, 25, 50, 75, 100].map((p) => (
            <div key={p} className="scroll-rail-tick" style={{ top: `${p}%` }} />
          ))}
        </div>

        {/* Scene */}
        <div className="absolute inset-0 z-10 scene-3d">
          <div ref={cameraRef} className="camera">
            {/* Particle layer */}
            <div ref={particleHostRef} className="absolute inset-0 opacity-0 pointer-events-none">
              <ParticleField />
            </div>

            {/* Lens flare */}
            <div ref={flareRef} className="flare" style={{ left: "50%", top: "42%", marginLeft: -600, marginTop: -600 }} />
            <div ref={flareStreakRef} className="flare-streak" style={{ left: "-20%", top: "44%" }} />

            {/* Stack of supporting phones */}
            <div ref={stackRef} className="phone-stack" style={{ width: 0, height: 0 }}>
              {STACK_SCREENS.map((s, i) => (
                <div key={i} className="phone">
                  <div className="phone-body" />
                  <div className="phone-button left-1" />
                  <div className="phone-button left-2" />
                  <div className="phone-button left-3" />
                  <div className="phone-button right" />
                  <div className="phone-bezel">
                    <AppScreen variant={s.variant} />
                  </div>
                  <div className="phone-notch" />
                  <div className="phone-glare" />
                </div>
              ))}
            </div>

            {/* Lead phone */}
            <div ref={phoneRef} className="phone">
              <div className="phone-body" />
              <div className="phone-button left-1" />
              <div className="phone-button left-2" />
              <div className="phone-button left-3" />
              <div className="phone-button right" />
              <div className="phone-bezel">
                <div ref={screenGlowRef} className="phone-screen-glow" />
                <div ref={screenRef} className="phone-screen">
                  <AppScreen variant="dashboard" />
                </div>
              </div>
              <div className="phone-notch" />
              <div className="phone-glare" />
            </div>

            {/* Annotations */}
            <div ref={annotsRef} className="absolute inset-0 z-20 pointer-events-none">
              <div className="annot" style={{ left: "10%", top: "26%" }}>
                <span className="num">01</span> Onboarding — first frame
              </div>
              <div className="annot right" style={{ right: "10%", top: "26%" }}>
                Analytics — live data <span className="num">02</span>
              </div>
              <div className="annot" style={{ left: "8%", bottom: "30%" }}>
                <span className="num">03</span> Profile — identity layer
              </div>
              <div className="annot right" style={{ right: "10%", bottom: "30%" }}>
                Messaging — realtime <span className="num">04</span>
              </div>
              <div className="annot" style={{ left: "50%", top: "78%", transform: "translateX(-50%)" }}>
                <span className="num">05</span> Settings — every detail
              </div>
            </div>
          </div>
        </div>

        {/* Black curtain — sibling of scene so it can sit between scene and final reveal */}
        <div ref={curtainRef} className="reveal-curtain" />

        {/* Final SHAMIL reveal — lifted out of scene to render above curtain */}
        <div
          ref={finalRef}
          className="reveal-final"
          style={{ transform: "scale(0.92)", filter: "blur(8px)" }}
        >
          <div className="text-center">
            <div className="eyebrow mb-6 opacity-70">— Presented —</div>
            <div className="shamil-stack">
              <h2 className="shamil-glow font-display text-[clamp(5rem,18vw,18rem)] leading-none">SHAMIL</h2>
              <h2 className="shamil-aberration-r font-display text-[clamp(5rem,18vw,18rem)] leading-none">SHAMIL</h2>
              <h2 className="shamil-aberration-b font-display text-[clamp(5rem,18vw,18rem)] leading-none">SHAMIL</h2>
              <h2 className="shamil-text font-display text-[clamp(5rem,18vw,18rem)] leading-none">SHAMIL</h2>
              <h2 ref={sweepRef} className="shamil-sweep absolute inset-0 text-[clamp(5rem,18vw,18rem)] leading-none">SHAMIL</h2>
            </div>
            <div className="eyebrow mt-8 opacity-50">
              Designed in motion · Composed in light
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
