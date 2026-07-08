# Redesign — Phase 3: Loading Screen, Client Logo Marquee & Portfolio Expansion

> Continuare a `docs/REDESIGN.md` (Phase 1 hero/console). Această fază adaugă
> impact la prima impresie: un **loading screen** ALBOT-OS, o **bandă de logouri**
> cu companiile/produsele pentru care a construit Ciprian, extinderea
> portofoliului și polish de design — **fără a rupe stilul retro existent**.
>
> Referință de „polish" (nu de copiat): bogdanrusu.dev. Direcția rămâne
> originală: ALBOT-OS / terminal / CRT.

---

## 1. Obiective

1. **Loading screen la prima vizită** — o secvență de boot full-screen, premium,
   care setează tonul „sistem care pornește", apoi dispare fluid.
2. **Bandă de logouri companii** (marquee) care se mișcă din stânga în dreapta,
   sub hero — dovada socială („worked with").
3. **Extindere portofoliu** — adăugare MegHome + orice proiecte confirmate.
4. **Polish de design** păstrând identitatea (amber phosphor, mono, CRT).
5. **Bilingv EN/RO** pentru orice text nou. `prefers-reduced-motion` respectat.
   `npm run lint` + `npm run build` trebuie să treacă.

---

## 2. Ce s-a implementat deja în această rundă (DONE)

| Zonă | Fișier | Stare |
|------|--------|-------|
| Loading screen | `components/system/LoadingScreen.tsx` (nou) | ✅ implementat |
| Montare loader | `app/layout.tsx` (montat în `LanguageProvider`) | ✅ |
| Bandă logouri | `components/system/CompanyLogosMarquee.tsx` (nou) | ✅ |
| Date companii | `content/clients.ts` (nou, sursă de adevăr) | ✅ |
| Integrare bandă | `components/HomeSections.tsx` (sub hero) | ✅ |
| Animații CSS | `app/globals.css` (`marquee-*`, `loader-*`) | ✅ |
| Proiect nou | `content/projects.ts` — MegHome | ✅ |
| Placeholder vizual | `public/images/projects/meghome.svg` (nou) | ✅ |
| i18n EN/RO | `lib/i18n.ts` — chei `loading` + `home.clients` | ✅ |

### Detalii tehnice cheie

- **LoadingScreen**: full-screen `z-100`, se afișează **o singură dată pe sesiune**
  (`sessionStorage: albot-os-booted`), blochează scroll-ul cât e activ, progress
  bar cu phosphor sweep, log de boot, **skip** la click / orice tastă, iar la
  `prefers-reduced-motion` face doar un hold scurt + fade (fără typing/sweep).
- **CompanyLogosMarquee**: două copii ale listei translatate `-50%` pentru loop
  fără cusătură (transform-only → pe compositor), edge fade cu `mask-image`,
  **pauză la hover**, iar la reduced-motion devine strip static scrollabil.
  Fiecare item randează `<Image>` dacă are `logo`, altfel un **wordmark mono**
  stilat — deci banda arată bine chiar înainte să existe fișierele reale de logo.
- **content/clients.ts**: `kind: "employer" | "client"`, câmp `logo?` opțional.
  Când pui un logo real în `public/images/clients/…`, doar setezi `logo`.

---

## 3. Ce mai trebuie (TODO / next)

### 3.1 Logouri reale (input de la tine)
- [ ] Adaugă fișierele în `public/images/clients/` (SVG preferat, altfel PNG/WebP
      transparent, înălțime ~40px). Recomandat monocrom deschis pe fundal întunecat.
- [ ] Setează `logo: "/images/clients/<brand>.svg"` în `content/clients.ts`.
- [ ] Confirmă lista finală de companii (employer vs client) și ordinea.

### 3.2 Proiecte
- [ ] Înlocuiește `public/images/projects/meghome.svg` cu un screenshot real
      (`meghome-real.webp`, 1200×675) și actualizează `image` în `projects.ts`.
- [ ] Confirmă dacă mai adăugăm proiecte (xelaktech.com nu expune o listă publică
      de proiecte — e landing de servicii; „Baking Academia" nu apare acolo).

### 3.3 Polish de design (opțional, non-breaking)
- [ ] Micro-interacțiuni pe carduri (border/box-shadow, fără scale) — deja în stil.
- [ ] Secțiune „stats/impact" sub bandă (ani experiență, proiecte, uptime).
- [ ] Revizuire contrast AA pe textele mono `ink-faint` (accesibilitate).

### 3.4 Verificare (obligatoriu înainte de „gata")
- [ ] `npm run lint` — fără erori noi introduse de această fază.
- [ ] `npm run build` — trebuie să treacă.
- [ ] Test manual: prima vizită arată loaderul; refresh în aceeași sesiune NU;
      banda se mișcă și se oprește la hover; reduced-motion → totul static.

---

## 4. Checklist rapid (status)

- [x] Loading screen implementat + montat + i18n + reduced-motion
- [x] Bandă logouri (marquee) + date + integrare + i18n
- [x] MegHome adăugat în portofoliu
- [x] Chei i18n EN/RO pentru tot textul nou
- [ ] Logouri reale în `/public/images/clients` (așteaptă fișierele)
- [ ] Screenshot real MegHome
- [ ] `lint` + `build` verde confirmate
- [ ] Confirmare listă finală companii + proiecte

---

## 5. Note despre „nu strica nimic"

- Nicio componentă existentă nu a fost ștearsă; doar **adăugări** + 2 integrări
  minime (o linie în `layout.tsx`, o secțiune în `HomeSections.tsx`).
- Tot textul nou trece prin dicționarul i18n (EN + RO), conform regulilor repo.
- Three.js rămâne neatins (dezactivat pe mobil / reduced-motion ca înainte).
- `.env.local` neatins; niciun commit/push efectuat.

---

## 6. Prompt pentru Claude Code (VS Code)

> Copiază blocul de mai jos și dă-l în Claude Code, deschis în rădăcina repo-ului.
> Presupune că fișierele din Phase 3 există deja (vezi secțiunea 2). Îl folosești
> ca să **finalizezi** logourile, screenshot-urile și polish-ul, cu verificare.

```text
Ești un senior frontend engineer pe acest repo (Next.js 16 App Router, TypeScript
strict, React 19, Tailwind v4, Framer Motion, temă retro „ALBOT-OS / terminal").
Citește mai întâi CLAUDE.md și docs/REDESIGN-PHASE-3.md pentru context complet.

Reguli obligatorii:
- Conținutul (texte/date) se editează DOAR în content/ (profile.ts, experience.ts,
  projects.ts, clients.ts, blog/*.mdx). Nu hardcoda text în componente.
- Orice text nou din UI primește AMBELE variante i18n (EN + RO) în lib/i18n.ts.
- Respectă prefers-reduced-motion; Three.js rămâne dezactivat pe mobil.
- Nu comite .env.local. Nu face commit/push decât dacă îți cer explicit.
- La final rulează `npm run lint` și `npm run build`; ambele TREBUIE să treacă.
- Răspunde-mi în română.

Task:
1) Loading screen (components/system/LoadingScreen.tsx): verifică că apare doar la
   prima vizită pe sesiune, că blochează scroll-ul, are progress + skip (click/tastă)
   și că la reduced-motion e doar un fade scurt. Corectează orice warning ESLint
   (ex. react-hooks/set-state-in-effect) fără a schimba comportamentul.
2) Bandă logouri (components/system/CompanyLogosMarquee.tsx + content/clients.ts):
   - Adaugă fișierele de logo în public/images/clients/ (SVG/PNG transparent,
     ~40px înălțime, monocrom deschis) și setează câmpul `logo` pentru fiecare intrare.
   - Menține fallback-ul wordmark pentru intrările fără logo.
   - Loop fluid, pauză la hover, static la reduced-motion.
3) Portofoliu: înlocuiește placeholderul public/images/projects/meghome.svg cu un
   screenshot real (meghome-real.webp, 1200×675) și actualizează `image` în projects.ts.
   Confirmă cu mine dacă mai adăugăm alte proiecte înainte să le scrii.
4) Polish non-breaking, păstrând stilul: micro-interacțiuni pe carduri (doar
   border/box-shadow, fără scale), edge-fade consistent, contrast AA pe textele mono.
5) Verificare finală: `npm run lint` + `npm run build` verzi; testează manual prima
   vizită (loader), refresh (fără loader), hover pe bandă (pauză) și reduced-motion.

Livrează un rezumat scurt: ce ai schimbat, fișierele atinse, și rezultatul lint/build.
```
