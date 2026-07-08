# Master Prompt — Claude Code (VS Code)

> Deschide Claude Code în rădăcina repo-ului `Resume/` și dă-i blocul de mai jos.
> E self-contained: conține context, reguli, starea curentă (Phase 3 deja
> implementat) și ce mai rămâne de finalizat + verificat.

---

```text
Ești senior full-stack/frontend engineer pe acest repo: portofoliu premium pentru
Albot Ciprian (Senior Backend Engineer & Systems Architect). Stack: Next.js 16
(App Router, TypeScript strict), React 19, Tailwind v4, Framer Motion, Three.js,
blog MDX. Temă retro „ALBOT-OS / terminal / CRT" (amber phosphor pe graphite, mono
IBM Plex, scanlines).

════════ CITEȘTE ÎNTÂI ════════
1) CLAUDE.md (context complet + reguli repo)
2) docs/REDESIGN.md (Phase 1 — hero/console)
3) docs/REDESIGN-PHASE-3.md (faza curentă — loading screen + bandă logouri + proiecte)

════════ REGULI OBLIGATORII ════════
- Conținut (texte/date) DOAR în content/ (profile.ts, experience.ts, projects.ts,
  clients.ts, blog/*.mdx). NU hardcoda text în componente.
- Orice text nou din UI primește AMBELE variante i18n (EN + RO) în lib/i18n.ts.
- Respectă prefers-reduced-motion; Three.js rămâne dezactivat pe mobil.
- Păstrează stilul retro existent (tokens din app/globals.css: canvas, ink, accent
  amber, accent-positive, line-*). Fără librării noi fără motiv. Fără scale pe hover
  (doar border/box-shadow). Nu strica rutele existente (/projects, /resume, /blog).
- Nu comite .env.local. NU face commit/push decât dacă îți cer explicit.
- Fișierele repo sunt UTF-8; lib/i18n.ts e CRLF, restul poate fi LF. Nu schimba
  encoding-ul/line-endings pe fișiere întregi (evită diff-uri uriașe).
- Răspunde-mi în ROMÂNĂ.

════════ CE E DEJA IMPLEMENTAT (nu recrea, doar verifică/finisează) ════════
- components/system/LoadingScreen.tsx — overlay boot ALBOT-OS la prima vizită
  (sessionStorage „albot-os-booted"), progress + skip, reduced-motion → fade scurt.
  Montat în app/layout.tsx în interiorul <LanguageProvider>.
- components/system/CompanyLogosMarquee.tsx + content/clients.ts — banda de logouri
  „worked with" (loop CSS, pauză la hover, fallback wordmark mono). Integrată în
  components/HomeSections.tsx sub <HeroSection/>.
- content/projects.ts — proiect nou „meghome-ecommerce-platform"
  (placeholder: public/images/projects/meghome.svg).
- app/globals.css — keyframes .marquee-* și .loader-*.
- lib/i18n.ts — chei noi: `loading` (system/subtitle/skip/aria) și `home.clients`
  (eyebrow/title), în EN și RO.

════════ CE AI DE FĂCUT ════════
1) VERIFICARE INTEGRITATE
   - Rulează `npm run lint` și `npm run build`. Repară orice eroare până trec AMBELE.
   - Dacă apar erori de tip react-hooks (ex. set-state-in-effect, refs-in-render) în
     LoadingScreen/TypewriterText/MonoLabel, corectează-le păstrând comportamentul.

2) BANDA DE LOGOURI — logouri reale
   - Pune fișierele în public/images/clients/ (SVG preferat; altfel PNG/WebP
     transparent, înălțime ~40px, monocrom deschis pe fundal întunecat).
   - Setează câmpul `logo: "/images/clients/<brand>.svg"` pentru fiecare intrare din
     content/clients.ts. Păstrează fallback-ul wordmark pentru cele fără logo.
   - Confirmă cu mine lista/ordinea finală (employer vs client) înainte de a o fixa.

3) PORTOFOLIU
   - Înlocuiește public/images/projects/meghome.svg cu screenshot real
     (meghome-real.webp, 1200×675) și actualizează `image` în projects.ts.
   - Întreabă-mă înainte de a adăuga alte proiecte (xelaktech.com nu expune o listă
     publică de proiecte — e landing de servicii; nu inventa proiecte).

4) POLISH DE IMPACT (non-breaking, în stilul existent)
   - Loading screen: rafinează timing-ul și tranziția de ieșire să fie „premium".
   - Bandă: verifică edge-fade, spacing, densitate; adaugă opțional un al doilea rând
     în direcție inversă (clasa .is-reverse există deja) dacă arată bine.
   - Micro-interacțiuni pe carduri (border/box-shadow), contrast AA pe textele mono
     ink-faint. Fără scale, fără efecte grele pe mobil.

5) VERIFICARE FINALĂ
   - `npm run lint` + `npm run build` VERZI.
   - Test manual: prima vizită → loader; refresh în aceeași sesiune → fără loader;
     hover pe bandă → pauză; prefers-reduced-motion → totul static.
   - Test responsive (mobil/desktop) și că rutele existente nu au regresii.

════════ LIVRABIL ════════
La final dă-mi un rezumat scurt în română: fișierele atinse, ce ai schimbat, și
rezultatul exact la `npm run lint` și `npm run build`. Nu face commit/push.
```
