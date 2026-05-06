# SHAMIL — Portfolio

A cinematic, scroll-driven personal portfolio. Built as a single long-scroll experience that opens with a five-phase pinned 3D scroll sequence and continues through eight typographically-driven sections, ending in a black-curtain signature reveal.

Live concept: a phone is approached, powered on, exploded into a stack of supporting app screens, dissolved into a particle cloud, and re-formed as the wordmark **SHAMIL**.

---

## Stack

| Layer       | Choice                                  |
| ----------- | --------------------------------------- |
| Framework   | Next.js 14 (App Router, RSC + client)   |
| Language    | TypeScript (strict)                     |
| Styling     | Tailwind CSS 3 + design-token CSS       |
| Animation   | GSAP 3 + ScrollTrigger                  |
| Smooth scroll | Lenis 1.1                             |
| Particles   | Custom Canvas 2D (no WebGL dep)         |
| Type        | Fraunces (display) · Outfit (sans) · JetBrains Mono |

No 3D library is used — the phone, app screens, and stack are pure CSS 3D transforms. The particle cloud is a hand-rolled 1100-point Canvas system with three modes (idle drift / burst / converge).

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # production server
```

Requires Node 18.17+.

---

## Structure

```
ShamilWebsite-next/
├─ app/
│  ├─ layout.tsx        Fonts, metadata, favicons
│  ├─ page.tsx          Mounts <Site /> client-only via next/dynamic
│  └─ globals.css       Design tokens + every section's styles
├─ components/
│  ├─ Site.tsx          Top-level orchestrator + Lenis hook
│  ├─ Loader.tsx        0→100 counter intro, slides up off-screen
│  ├─ Cursor.tsx        Acid-green dot + ambient glow (desktop only)
│  ├─ ProgressBar.tsx   Top scroll progress (page-wide)
│  ├─ CinematicHero.tsx ★ THE pinned 5-phase scroll sequence
│  ├─ AppScreen.tsx     Parametric phone-screen variants (6 layouts)
│  ├─ ParticleField.tsx Canvas 2D particle system
│  ├─ Marquee.tsx       Dual-row infinite text marquee
│  ├─ TextReveal.tsx    Word-by-word scrub-in paragraph
│  ├─ HScroll.tsx       "Things I do" — horizontal pinned cards
│  ├─ Stack.tsx         Tech toolkit grid + cursor-follow orb
│  ├─ Philosophy.tsx    "Code is poetry" + animated blob
│  ├─ Mantras.tsx       Sticky stacking mantra cards
│  └─ FinalSignature.tsx  Outro — ghost wordmark, CTA, links
├─ hooks/
│  └─ useLenis.ts       Lenis ↔ ScrollTrigger ↔ GSAP ticker bridge
├─ public/              Favicons + manifest
├─ tailwind.config.js
├─ tsconfig.json
└─ next.config.js
```

---

## The cinematic hero (★)

Pinned for ~700vh and scrubbed by scroll. Five phases drive a single GSAP timeline tied to one ScrollTrigger:

| Phase | Range  | What happens                                                            |
| ----- | ------ | ----------------------------------------------------------------------- |
| I     | 0–15%  | **Approach** — phone floats in, slow rotation; hero copy fades out      |
| II    | 15–32% | **Power-on** — lens flare flash, phone screen lights with dashboard     |
| III   | 32–58% | **Stack reveal** — 5 supporting phones (onboarding, profile, chart, chat, settings) fan out in 3D, annotations fade in |
| IV    | 58–80% | **Dissolution** — phones blur and shrink into a 1100-point particle burst |
| V     | 80–100%| **Signature** — black curtain swallows the scene; SHAMIL lands with chromatic aberration + light sweep |

Implementation is in [components/CinematicHero.tsx](components/CinematicHero.tsx). The signature reveal sits at `z-40` outside the scene's stacking context so the curtain at `z-35` cleanly blacks out particles, orbs, vignette — everything — while the wordmark stays crisp on pure black.

UI chrome layered on top:
- Top progress meter
- Right-edge scroll rail with 25% ticks
- Top-left brand mark (`shamil.studio`)
- Top-right roman-numeral chapter indicator (auto-updates by scroll progress)
- Bottom-left phase label
- Mix-blend-difference nav

---

## The other sections

Each one is a self-contained component with its own scroll-bound GSAP context, cleaning up via `gsap.context().revert()` on unmount.

- **Marquee** — two infinite rows running in opposite directions, with velocity-driven skew on scroll
- **TextReveal** — paragraph split into words, each word's opacity scrubbed from 0.08 → 1 by scroll position
- **HScroll** — pinned horizontal scroll showcasing five practice cards (Mobile, Code, Problem, Design, Speed) with mini visual, tag pills, year label
- **Stack** — eight-item toolkit grid with random-from-center stagger entrance, parallax on scroll, and a cursor-tracking acid-green orb behind
- **Philosophy** — *"Code is poetry."* — masked line reveal over an animated conic-gradient blob
- **Mantras** — four sticky cards that stack and offset as you scroll past them
- **FinalSignature** — giant ghost wordmark (parallax), live status pill, contact CTA pill, link row, footer line

---

## Design system

Tokens live in `app/globals.css`:

```css
--bg: #06060a            /* near-black, not pure */
--fg: #e7e7ea            /* off-white */
--accent:  #c8ff00       /* acid lime — primary accent */
--accent2: #00d4ff       /* electric cyan — secondary accent */
--muted:   #6a6a72
--border:  rgba(255,255,255,0.07)
--radius:  20px
```

Type rules:
- Display = Fraunces italic (300 weight) — every headline, every name, every "feel-good" moment
- Sans = Outfit — body, marquee, card body
- Mono = JetBrains Mono — meta, eyebrows, chapter, status, links

Color rules:
- Pure black (`#000`) is reserved for the SHAMIL signature reveal — the entire site otherwise sits on `#06060a` so blacks never feel dead
- The acid-cyan gradient (`var(--accent)` → `var(--accent2)`) is reserved for: emphasis text in headlines, the active stack-item icon, the loader bar, the progress bar, and the contact CTA hover state

---

## Animation principles

1. **One ScrollTrigger per timeline.** No manual scroll listeners. All scroll-bound work goes through ScrollTrigger so Lenis stays in sync via the global `gsap.ticker.add(lenis.raf)` bridge in [hooks/useLenis.ts](hooks/useLenis.ts).
2. **`gsap.context()` everywhere.** Every component scopes its tweens with `gsap.context(() => {...}, sectionRef)` and reverts on unmount — no leaked triggers across hot reloads.
3. **`invalidateOnRefresh: true`** on layout-dependent triggers (HScroll especially) so resize math stays correct.
4. **`prefers-reduced-motion: reduce`** is respected globally — all animations collapse to ~0.01ms.
5. **No transforms on text that will be screen-clipped.** SHAMIL signature uses `background-clip: text` on stacked layers (glow, ±aberration, base, sweep) instead of filters that would blur edges.

---

## Performance

- Initial JS payload: **~88 kB** First Load (gzipped, measured via `npm run build`)
- The cinematic hero is `dynamic(..., { ssr: false })` — no hydration cost
- Particles run only when their layer is visible (opacity-gated)
- Canvas DPR is capped at 2× to keep retina cost in check
- `will-change` is set only on actively-animating layers
- Cursor + glow are completely disabled below 768px

---

## Browser support

- Chrome / Edge / Safari (modern, last two majors)
- Firefox (verified)
- Mobile: works, but the 3D stage is auto-tuned for ≥1024px — narrow viewports get the same content with reduced 3D depth
- Touch devices skip the custom cursor

---

## Editing

| To change…              | Edit                                      |
| ----------------------- | ----------------------------------------- |
| Hero headline / status  | `components/CinematicHero.tsx`            |
| Phone screen content    | `components/AppScreen.tsx` (6 variants)   |
| Stack reveal screens    | `STACK_SCREENS` const at top of `CinematicHero.tsx` |
| Practice cards          | `CARDS` const in `components/HScroll.tsx` |
| Tech toolkit            | `ITEMS` const in `components/Stack.tsx`   |
| Mantras                 | `MANTRAS` const in `components/Mantras.tsx` |
| Contact links           | `components/FinalSignature.tsx`           |
| Tokens / palette        | `:root` in `app/globals.css`              |
| Site title / metadata   | `app/layout.tsx`                          |

---

## Deployment

Static export-friendly. Recommended hosts:

- **Vercel** — `vercel deploy`. Zero config.
- **Netlify** — auto-detects Next.js. Build command `next build`, publish `.next`.
- **Cloudflare Pages** — works via the `@cloudflare/next-on-pages` adapter.

---

## Credits

- Type: [Fraunces](https://fonts.google.com/specimen/Fraunces) · [Outfit](https://fonts.google.com/specimen/Outfit) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — Google Fonts
- Animation: [GSAP](https://gsap.com/) by Greensock
- Smooth scroll: [Lenis](https://lenis.darkroom.engineering/) by Darkroom Engineering

Built by **Shamil** — MMXXVI.

---

## License

Personal portfolio — all rights reserved. Code patterns are free to learn from; please don't copy the design wholesale.
