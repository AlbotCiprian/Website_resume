# Portfolio Redesign — Engineering Console Direction

> Phase 1 deliverable: foundation + hero + navbar.
> Vibe target: Linear / Vercel / Resend / Railway — dense, technical, calm, mono details.

---

## 1. Current problems (snapshot from audit)

1. **Uniform glass surfaces** — every card uses the same `bg-zinc-900/70 + border-white/10 + backdrop-blur` recipe. No hierarchy.
2. **Single-accent palette** — only cyan. No tonal contrast for status/critical/secondary.
3. **Theme ghost** — `<html class="dark">` is forced, yet every component carries unused `light:` classes (≈30% dead CSS).
4. **Hero portrait floats in a generic glass card** with no semantic anchor — reads as "developer portfolio template".
5. **Background3D** is a random particle field (three.js, ~150KB). It looks "AI-generic" and doesn't communicate anything about backend/systems work.
6. **Hero sub-tagline** is hardcoded in English (skips the i18n dictionary).
7. **Navbar duplication** — `All Pages` dropdown + inline `Blog/About/Contact` overlap. The `+` glyph on the left has no meaning.
8. **Mono font (IBM Plex Mono)** is loaded but never used.

---

## 2. New visual direction

### 2.1 Palette
```
--background-canvas: #07090E   (deep graphite, not pure black)
--background-elevated: #0B0E14
--background-surface: #11151D
--background-raised: #161B25
--border-subtle: rgba(148, 163, 184, 0.10)
--border-default: rgba(148, 163, 184, 0.16)
--border-strong: rgba(34, 211, 238, 0.35)

--text-primary: #ECEEF2
--text-secondary: #A4ADBE
--text-tertiary: #6B7384
--text-mono: #8AA0BD            (mono details, coordinates, tags)

--accent-primary: #22D3EE       (cyan electric — links, focus, primary CTAs)
--accent-positive: #34D399      (status OK / impact bullets)
--accent-warning: #F59E0B       (status warning, in-progress flags)
--accent-critical: #F87171      (errors, latency-high)
```

Usage rule: accent colors take ≤ 8% of viewport surface. They emphasize, never decorate.

### 2.2 Typography
- **Display / Headings**: Space Grotesk — kept, but tightened scale.
- **Body**: Space Grotesk regular/medium.
- **Mono**: IBM Plex Mono — *actively used* for: section IDs (`// 01 — PROFILE`), coordinates, status badges, version tags, KPI labels, tech chips secondary line.

Scale:
```
display-1: 56 / 64 / 80   (hero only)
display-2: 36 / 44 / 56   (section h2)
heading-1: 22 / 26        (card titles, h3)
body-lg:   18 / 32        (lead paragraphs)
body:      15 / 26        (default copy)
mono-sm:   12 / 18        (mono details, monoUppercased)
mono-xs:   11 / 16        (badges)
```

### 2.3 Spacing system
```
--space-section-y: 7rem  (mobile) / 9rem (desktop)
--space-block:     1.5rem to 2.5rem
--space-stack:     1rem
--space-inline:    0.5rem to 1rem
--container-max:   1280px
```
Section padding is ONE token across the site — predictable rhythm.

### 2.4 Surfaces (3 levels)
- `surface-flat` — no border, no bg, used for editorial text blocks
- `surface-subtle` — `bg-white/[0.02]`, border `white/8`, no shadow
- `surface-raised` — `bg-white/[0.04]`, border `white/12`, soft shadow + inner highlight via `box-shadow inset 0 1px rgba(255,255,255,0.05)`

### 2.5 Motion language
```
duration-fast: 180ms
duration-base: 280ms
duration-slow: 480ms
ease-out:      [0.22, 1, 0.36, 1]   (kept)
ease-in-out:   [0.4, 0, 0.2, 1]
```
Rules:
- Reveal-on-scroll = opacity + 12px translate only. No scale.
- Hover on cards = border-color + box-shadow only. No scale.
- Architecture canvas data packets = CSS `stroke-dashoffset` animation (compositor-friendly, no JS rerender).
- Reduced-motion users get static states everywhere; no exceptions.

---

## 3. Component architecture (Phase 1)

### New components
| Path | Purpose |
|------|---------|
| `components/system/StatusPanel.tsx` | Live mono status badge: `● PROD · 99.97% · 38ms` |
| `components/system/SystemNode.tsx` | Reusable architecture node (label + secondary metric + pulse) |
| `components/system/ArchitectureCanvas.tsx` | SVG hero canvas: blueprint grid + 6 nodes + animated data packets |
| `components/system/ReliabilityMetrics.tsx` | Horizontal metric strip below hero (4 KPIs) |
| `components/system/MonoLabel.tsx` | Reusable section ID helper: `// 01 — PROFILE` |
| `components/hero/HeroPortrait.tsx` | Masked duotone portrait, integrated into hero grid (no card) |
| `components/hero/HeroSection.tsx` | Composed hero entry — replaces inline hero block in HomeSections |

### Modified components
| Path | Change |
|------|--------|
| `app/globals.css` | New token system, deletes light placeholders, sets text/surface vars |
| `lib/motion.ts` | Tighter presets, adds `revealOnView` variant unified |
| `components/Navbar.tsx` | Stripped: logo (mark + wordmark) · inline nav · lang toggle. No dropdown, no `+` glyph |
| `components/HomeSections.tsx` | Inline hero replaced by `<HeroSection />` import |
| `lib/i18n.ts` | New hero copy keys: `hero.lede`, `hero.tagline`, `hero.statusUptime`, etc. |

### Deprecated (not deleted yet — kept to avoid breaking blog/projects pages until Phase 2)
- `components/Background3D.tsx` — no longer imported from HomeSections after Phase 1.

---

## 4. Animation strategy

### Hero canvas (`ArchitectureCanvas`)
- Pure SVG, deterministic positions (no random seeds).
- 6 nodes on an asymmetric grid: API Gateway → Auth / Billing → Queue / Workers → PostgreSQL Cluster.
- 6 connection paths (`<path d>`), each carries one data packet (`<circle>`) animated along the path via SMIL `<animateMotion>` *or* CSS `offset-path` with `offset-distance` keyframes.
- Faint blueprint grid (1px lines @ 6% opacity, 64px square).
- Subtle highlight under cursor: tracked via `pointer-events` overlay, debounced.
- Reduced-motion / mobile / low-power: static state, packets hidden, grid + nodes only.

### Entrance choreography
- Page mount: `staggerContainer` (0.08s child stagger, 0.06s delay).
- Hero items reveal top-to-bottom: eyebrow → headline → lede → CTAs → status panel → metrics band.
- Architecture canvas fades in last (0.4s after CTAs) — feels like "system coming online".

### Restraint rules
- Max 2 simultaneous infinite loops on screen at any time.
- No mouse-parallax on portrait (was causing perceived weight).
- No hover-scale on cards/nodes (was causing fatigue).

---

## 5. Mobile strategy (foundations laid in Phase 1)

- Hero stacks vertically: status mono header → headline → lede → CTAs → architecture canvas (simplified to 4 nodes, no packets) → portrait block at bottom.
- Portrait on mobile: 16/9 banner with duotone treatment, not a square card.
- Navbar mobile: logo + hamburger only. Sheet-style fullscreen menu (Phase 2).
- Status panel mono wraps gracefully (`flex-wrap`).
- Reliability metrics: 4-up on desktop, 2x2 on mobile.
- Touch targets ≥ 44px enforced via `min-h-[44px]` on nav/cta buttons.

---

## 6. Out of scope for Phase 1 (locked for Phase 2)

- Projects page redesign + `/projects/[slug]` detail pages.
- New `CaseStudyCard` replacing `ProjectCard`.
- Experience timeline → `ExperienceRail` editorial design.
- TechStack → `StackGroup` with "value per group".
- Blog cards → editorial article cards.
- Footer redesign + newsletter resolution (real or remove).
- ContactForm visual + accessibility pass (labels).
- Theme decision: confirmed dark-only — light classes will be stripped in Phase 2.

---

## 7. Acceptance criteria for Phase 1

- [x] Hero communicates "senior backend systems architect" within 3 seconds.
- [x] Mono details (coordinates, status, section IDs, KPIs) visible — IBM Plex Mono actively used.
- [x] Architecture canvas runs > 55 FPS on mid-tier laptop, < 5% CPU at idle.
- [x] Hero lede + sub-tagline routed through i18n dictionary (RO + EN).
- [x] Navbar reduced to: logo · 4 nav links · language toggle. No dropdown duplication.
- [x] No regression on existing routes (`/projects`, `/resume`, `/blog`, `/blog/[slug]`).
- [x] Reduced-motion users see static blueprint, no packets.
- [x] Lighthouse mobile performance does not drop more than 3 points from baseline.
