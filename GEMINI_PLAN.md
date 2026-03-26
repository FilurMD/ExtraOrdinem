# GEMINI_PLAN.md — Cinematic Landing Page Architecture

> Planning document only. No production code. Meant to be handed to an agent (or used directly) to scaffold the full site.

---

## 0. Pre-Build Checklist (Agent: ask these 5 questions first)

| # | Question | Purpose |
|---|----------|---------|
| 1 | Brand name + one-line purpose | Drives all copy generation |
| 2 | Aesthetic preset (A/B/C/D) | Locks design tokens |
| 3 | 3 key value propositions | Maps to Feature cards |
| 4 | Primary CTA | Used in navbar, hero, footer |
| 5 | Brand tone of voice | Informs all microcopy |

---

## 1. Design Token Map (by Preset)

| Token | Preset A (Organic Tech) | Preset B (Midnight Luxe) | Preset C (Brutalist Signal) | Preset D (Vapor Clinic) |
|-------|------------------------|--------------------------|------------------------------|-------------------------|
| Primary | `#2E4036` | `#0D0D12` | `#E8E4DD` | `#0A0A14` |
| Accent | `#CC5833` | `#C9A84C` | `#E63B2E` | `#7B61FF` |
| Background | `#F2F0E9` | `#FAF8F5` | `#F5F3EE` | `#F0EFF4` |
| Text/Dark | `#1A1A1A` | `#2A2A35` | `#111111` | `#18181B` |
| Heading font | Plus Jakarta Sans / Outfit | Inter | Space Grotesk | Sora |
| Drama font | Cormorant Garamond Italic | Playfair Display Italic | DM Serif Display Italic | Instrument Serif Italic |
| Data font | IBM Plex Mono | JetBrains Mono | Space Mono | Fira Code |
| Image mood | dark forest, moss, lab glassware | dark marble, gold, luxury interiors | concrete, brutalist, industrial | bioluminescence, neon, microscopy |

**Hero line pattern per preset:**
- A: `"[Concept noun] is the"` (Bold Sans) / `"[Power word]."` (Massive Serif Italic)
- B: `"[Aspirational noun] meets"` (Bold Sans) / `"[Precision word]."` (Massive Serif Italic)
- C: `"[Direct verb] the"` (Bold Sans) / `"[System noun]."` (Massive Serif Italic)
- D: `"[Tech noun] beyond"` (Bold Sans) / `"[Boundary word]."` (Massive Serif Italic)

---

## 2. Section Map

```
┌─────────────────────────────────────┐
│  A. NAVBAR (fixed, floating pill)   │
├─────────────────────────────────────┤
│  B. HERO (100dvh, full-bleed)       │
├─────────────────────────────────────┤
│  C. FEATURES (3 interactive cards)  │
├─────────────────────────────────────┤
│  D. PHILOSOPHY (manifesto)          │
├─────────────────────────────────────┤
│  E. PROTOCOL (sticky stacking, ×3)  │
├─────────────────────────────────────┤
│  F. MEMBERSHIP / CTA                │
├─────────────────────────────────────┤
│  G. FOOTER                          │
└─────────────────────────────────────┘
```

---

## 3. Component Hierarchy

```
App.jsx
├── index.css                    (Tailwind + noise overlay + custom utilities)
├── components/
│   ├── Navbar.jsx               (Client — scroll-reactive)
│   ├── Hero.jsx                 (Client — GSAP entrance)
│   ├── Features.jsx             (Client — orchestrates 3 cards)
│   │   ├── DiagnosticShuffler.jsx   (Card 1 — cycling stack)
│   │   ├── TelemetryTypewriter.jsx  (Card 2 — monospace live feed)
│   │   └── CursorScheduler.jsx      (Card 3 — animated SVG cursor + calendar grid)
│   ├── Philosophy.jsx           (Client — parallax + SplitText reveal)
│   ├── Protocol.jsx             (Client — GSAP pin + stacking)
│   │   ├── ProtocolCard.jsx         (reusable card shell)
│   │   ├── HelixCanvas.jsx          (rotating geometric — canvas/SVG)
│   │   ├── LaserGrid.jsx            (scanning laser line — SVG)
│   │   └── WaveformPath.jsx         (EKG stroke-dashoffset — SVG)
│   ├── Membership.jsx           (3-tier pricing grid or single CTA)
│   └── Footer.jsx               (status indicator + nav grid)
```

---

## 4. Layout Structure (per section)

### A. NAVBAR — "The Floating Island"
```
[FIXED, z-50, top-6, left-0 right-0]
  → centered pill container: max-w-fit mx-auto px-6 py-3 rounded-full
    → [Logo text] [Nav links ×3–4] [CTA button (accent)]
```
- **Default state:** `bg-transparent`, light text
- **Scrolled state:** `bg-[background]/60 backdrop-blur-xl border border-[primary]/20`
- **Trigger:** IntersectionObserver on hero sentinel element (bottom of hero)
- **Mobile:** Logo + hamburger icon only, no nav links visible

---

### B. HERO — "The Opening Shot"
```
[section, h-[100dvh], relative, overflow-hidden]
  → [img] full-bleed, object-cover, absolute inset-0
  → [div] gradient overlay: bg-gradient-to-t from-[primary] via-[primary]/60 to-transparent
  → [div] content container: absolute bottom-0 left-0 px-8 md:px-16 pb-16 md:pb-24
      → [span] small label / eyebrow (monospace, accent color, tracking-widest)
      → [h1 line 1] Bold sans, ~text-5xl md:text-7xl
      → [h1 line 2] Drama serif italic, ~text-7xl md:text-[9rem], accent color on keyword
      → [button] CTA, accent bg, rounded-full, overflow-hidden (sliding hover layer)
```
- **GSAP entrance:** all children `opacity:0, y:40` → stagger `0.08s` fade-up, `power3.out`, delay after page load

---

### C. FEATURES — "Interactive Functional Artifacts"
```
[section, py-24 md:py-32, bg-[background]]
  → [h2] section heading, centered
  → [grid, grid-cols-1 md:grid-cols-3, gap-6, max-w-6xl mx-auto px-6]
      → DiagnosticShuffler   (value prop 1)
      → TelemetryTypewriter  (value prop 2)
      → CursorScheduler      (value prop 3)
```

**Card shell** (shared): `bg-[background] rounded-[2rem] border border-[primary]/10 shadow-lg p-6 min-h-[360px]`

**Card 1 — DiagnosticShuffler:**
- 3 sub-cards derived from value prop 1 (generate labels)
- Overlap stack via absolute positioning, z-index layers
- Every 3s: `array.unshift(array.pop())`, translate top card down + fade, spring-bounce easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`

**Card 2 — TelemetryTypewriter:**
- Monospace font, accent-colored blinking cursor `|`
- Message queue (3–5 messages) types char-by-char, ~50ms/char, 1.5s pause between
- "Live Feed" label + pulsing green dot (animate-pulse)

**Card 3 — CursorScheduler:**
- 7-column grid: S M T W T F S
- SVG cursor animates: enter → move to a day cell → scale(0.95) press → cell turns accent → move to "Save" button → fade out → loop
- Animation loop: `gsap.timeline({repeat: -1, repeatDelay: 2})`

---

### D. PHILOSOPHY — "The Manifesto"
```
[section, bg-[primary], py-32, relative, overflow-hidden]
  → [img] organic texture, absolute inset-0, opacity-10, object-cover, parallax
  → [div] content, max-w-4xl mx-auto px-8, relative z-10
      → [p] neutral statement (smaller, lighter weight)
      → [p] contrast statement (massive drama serif italic, accent keyword)
```
- **ScrollTrigger reveal:** words split into `<span>` tags, stagger fade-up from `y:30, opacity:0` → `y:0, opacity:1`
- Parallax on texture img: `ScrollTrigger` scrub, y from `-5%` to `5%`

---

### E. PROTOCOL — "Sticky Stacking Archive"
```
[section, relative]
  → [pin-spacer] (GSAP creates automatically)
      → ProtocolCard ×3 (stacked via absolute positioning)
```

**Stacking mechanic:**
- Each card is `100dvh, w-full, absolute top-0`
- ScrollTrigger `pin: true` on container
- On scroll: outgoing card → `scale(0.9)`, `filter: blur(20px)`, `opacity: 0.5`
- Incoming card → slides up from bottom, full scale/opacity
- Each card occupies one "page" worth of scroll distance

**Card layout:**
```
[div] full-screen card, flex items-center justify-center
  → [div] content + canvas, side-by-side on md+
      → [canvas/svg] unique animation (Helix / LaserGrid / Waveform)
      → [div] text
          → [span] step number (monospace, accent)
          → [h3] step title (heading font, large)
          → [p] 2-line description
```

**Canvas animations:**
- **Helix:** `requestAnimationFrame`, rotate angle += 0.005/frame, draw double-helix with `ctx.arc`
- **Laser:** SVG `<line>` or `<rect>`, GSAP `x` from left to right over 2s, repeat, over dot grid
- **Waveform:** SVG `<path>`, `stroke-dashoffset` animates via GSAP from full offset to 0, loop

---

### F. MEMBERSHIP / PRICING
```
[section, py-24, bg-[background]]
  → [h2] section heading, centered
  → [grid, grid-cols-1 md:grid-cols-3, gap-6, max-w-5xl mx-auto px-6, items-end]
      → [card] Essential — base card, bg-[background], border
      → [card] Performance — PRIMARY BG, accent CTA, scale-105 or ring-2
      → [card] Enterprise — base card, bg-[background], border
```

Each card: tier name, price/description, bullet list (3–4 items), CTA button

If pricing doesn't apply: single full-width card with large headline + accent CTA button.

---

### G. FOOTER
```
[footer, bg-[primary], rounded-t-[4rem], pt-16 pb-12, px-8]
  → [grid, grid-cols-1 md:grid-cols-4]
      → [col 1] Brand name (heading font) + tagline (2 lines)
      → [col 2] Nav column (Product links)
      → [col 3] Nav column (Company links)
      → [col 4] Nav column (Legal / Social)
  → [divider]
  → [bottom row, flex justify-between]
      → [span] © 2025 [Brand]
      → [status indicator] pulsing green dot + "System Operational" (monospace, small)
```

---

## 5. Animation Flows

### Entrance (page load)
```
1. Navbar fades in (opacity 0→1, y:-10→0, delay 0.2s)
2. Hero content staggers up (y:40→0, opacity 0→1, stagger 0.08s, delay 0.4s)
3. Hero CTA button last (delay after headline)
```

### Scroll-triggered
```
Section entry (all sections):
  → Elements fade up as they enter viewport (threshold 0.2)
  → GSAP ScrollTrigger, start: "top 80%", power3.out

Philosophy word reveal:
  → Words split into spans
  → ScrollTrigger, start: "top 70%", stagger 0.04s per word

Protocol stacking:
  → Pin container for 300vh (3 cards × 100vh)
  → Each card transition at 33% and 66% scroll progress

Navbar morph:
  → IntersectionObserver on hero bottom sentinel
  → Toggle class on observed entry/exit
```

### Micro-interactions (all interactive elements)
```
Buttons: scale(1.03) + sliding bg span on hover, cubic-bezier(0.25, 0.46, 0.45, 0.94)
Links: translateY(-1px) on hover
Cards (Features): subtle shadow deepening on hover
```

---

## 6. Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `< 768px` (mobile) | Single column layout everywhere. Hero font size 50–60% of desktop. Navbar: logo + hamburger only. Feature cards stack vertically. Protocol cards full-width. Pricing stack. |
| `768px–1024px` (tablet) | 2-col features grid. Protocol cards: content stacked (canvas top, text bottom). |
| `> 1024px` (desktop) | Full 3-col features. Protocol cards: canvas + text side-by-side. Full navbar. |

Hero font scaling:
```
h1 line 1: text-4xl → md:text-6xl → lg:text-7xl
h1 line 2: text-6xl → md:text-8xl → lg:text-[9rem]
```

---

## 7. Global CSS Utilities (index.css)

```css
/* Noise overlay */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,..."); /* inline SVG feTurbulence */
}

/* Rounded system */
.rounded-card { border-radius: 2rem; }
.rounded-card-lg { border-radius: 3rem; }

/* Magnetic button */
.btn-magnetic {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.btn-magnetic:hover { transform: scale(1.03); }
```

---

## 8. Implementation Plan

### Phase 1 — Setup
1. `npm create vite@latest [brand] -- --template react`
2. Install deps: `tailwindcss@3.4.17 gsap lucide-react`
3. Configure `tailwind.config.js` with preset color tokens
4. Add Google Fonts `<link>` tags to `index.html` based on preset
5. Write `index.css` with Tailwind directives + noise overlay + utilities

### Phase 2 — Static Shell
6. Write `App.jsx` importing all section components
7. Implement `Navbar.jsx` (static, no scroll logic yet)
8. Implement `Hero.jsx` (layout + image, no animation yet)
9. Implement `Features.jsx` shell + 3 empty card components
10. Implement `Philosophy.jsx` (layout + copy)
11. Implement `Protocol.jsx` shell + 3 `ProtocolCard.jsx` instances
12. Implement `Membership.jsx`
13. Implement `Footer.jsx`

### Phase 3 — Animations
14. Wire GSAP `gsap.context()` + cleanup in all animated components
15. Hero: entrance stagger
16. Navbar: IntersectionObserver morph
17. Features Card 1: interval cycling + spring-bounce
18. Features Card 2: typewriter loop
19. Features Card 3: GSAP SVG cursor timeline
20. Philosophy: ScrollTrigger word reveal + parallax
21. Protocol: ScrollTrigger pin + stacking transitions
22. Canvas animations: Helix, LaserGrid, Waveform

### Phase 4 — Polish
23. Verify all Unsplash images load (correct keyword params in URLs)
24. Test responsive at 375px, 768px, 1280px
25. Verify GSAP cleanup (`ctx.revert()`) on unmount
26. Audit micro-interactions (buttons, links)
27. Noise overlay opacity check (0.05 target)
28. Accessibility: semantic HTML, focus states on buttons/links

---

## 9. Wireframe Descriptions

### Hero
```
┌──────────────────────────────────────────┐
│  [Full-bleed image, darkened gradient]   │
│                                          │
│                                          │
│                                          │
│  [eyebrow label — monospace, accent]     │
│  [H1 line 1 — bold sans, large]          │
│  [H1 line 2 — drama serif italic, huge]  │
│  [CTA button — accent, rounded-full]     │
└──────────────────────────────────────────┘
```

### Features
```
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Card 1     │ │ Card 2     │ │ Card 3     │
│ [stacked   │ │ [typewriter│ │ [calendar  │
│  sub-cards]│ │  monospace]│ │  grid +    │
│            │ │ Live Feed●│ │  cursor]   │
│ [title]    │ │ [title]    │ │ [title]    │
│ [desc]     │ │ [desc]     │ │ [desc]     │
└────────────┘ └────────────┘ └────────────┘
```

### Protocol (single card, full screen)
```
┌──────────────────────────────────────────┐
│                                          │
│  [Canvas animation]   [01]               │
│                       [Step Title]       │
│                       [Description      │
│                        line 1 & 2]      │
│                                          │
└──────────────────────────────────────────┘
   ← card below is scaled 0.9, blurred →
```

### Footer
```
┌──────────────────────────────────────────┐
│  [Brand]        [Product]  [Company]     │
│  [Tagline]      Link       Link          │
│                 Link       Link          │
│──────────────────────────────────────────│
│  © 2025 Brand         ● System Operational│
└──────────────────────────────────────────┘
```

---

## 10. File Checklist

```
/
├── index.html              ← Google Fonts link tags
├── index.css               ← Tailwind + noise overlay
├── App.jsx                 ← Root, imports all sections
├── tailwind.config.js      ← Design tokens from preset
└── components/
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── Features.jsx
    ├── DiagnosticShuffler.jsx
    ├── TelemetryTypewriter.jsx
    ├── CursorScheduler.jsx
    ├── Philosophy.jsx
    ├── Protocol.jsx
    ├── ProtocolCard.jsx
    ├── HelixCanvas.jsx
    ├── LaserGrid.jsx
    ├── WaveformPath.jsx
    ├── Membership.jsx
    └── Footer.jsx
```

---

> **Stack:** React 19 + Vite, Tailwind CSS v3.4.17, GSAP 3 (ScrollTrigger), Lucide React
> Note: this project deviates from the default Next.js stack in AGENTS.md by design — the prompt spec requires Vite + React 19 + GSAP for cinematic scroll animations.
