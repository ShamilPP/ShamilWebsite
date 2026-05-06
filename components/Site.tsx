"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/hooks/useLenis";
import Loader from "./Loader";
import Cursor from "./Cursor";
import ProgressBar from "./ProgressBar";
import CinematicHero from "./CinematicHero";
import Marquee from "./Marquee";
import TextReveal from "./TextReveal";
import HScroll from "./HScroll";
import Stack from "./Stack";
import Philosophy from "./Philosophy";
import Mantras from "./Mantras";
import FinalSignature from "./FinalSignature";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Site() {
  const [ready, setReady] = useState(false);
  useLenis();

  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(id);
  }, [ready]);

  return (
    <>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <Cursor />
      <ProgressBar />
      <main className={ready ? "is-ready" : "opacity-0 pointer-events-none"}>
        <CinematicHero />
        <Marquee />
        <TextReveal />
        <HScroll />
        <Stack />
        <Philosophy />
        <Mantras />
        <FinalSignature />
      </main>
    </>
  );
}
