# CLAUDE.md

Ghid de context pentru Claude. Citește-l înainte de a lucra în acest repo.

## Ce este proiectul

Website de **portofoliu personal premium** pentru **Albot Ciprian** — Senior Backend
Engineer & Systems Architect (Chișinău, Moldova). Nu este un CV static: este o aplicație
web cu identitate vizuală retro de tip "ALBOT-OS / programming workstation" (temă
terminal/CRT), gândită să prezinte experiența, proiectele și blogul tehnic ale lui Ciprian.

Public țintă: recrutori, clienți de contract și colaboratori tehnici. Tonul produsului:
premium, dark, credibil la nivel de inginer senior.

## Stack tehnic

- **Next.js 16** — App Router, TypeScript în mod `strict`
- **React 19**
- **Tailwind CSS v4** (+ `@tailwindcss/postcss`)
- **Framer Motion** — animații de interfață
- **Three.js** via `@react-three/fiber` + `@react-three/drei` — fundal 3D
  (import dinamic, SSR dezactivat; se dezactivează pe mobil și la `prefers-reduced-motion`)
- **MDX** pentru blog: `@next/mdx` + `next-mdx-remote/rsc`, `remark-gfm`,
  `rehype-pretty-code`, `gray-matter`, `reading-time`
- Componente UI stil **shadcn** + `lucide-react`, `next-themes` (dark/light)
- Email: **Resend** (preferat) cu fallback **Nodemailer/SMTP**

## Structura repo-ului

- `app/` — rute (App Router), `layout.tsx`, `sitemap.ts`, `robots.ts` și API routes
  - `app/api/contact/route.ts` — formular de contact: validare, honeypot, rate-limit,
    reCAPTCHA v3, trimitere prin Resend/Nodemailer
  - `app/api/github/route.ts` — feed activitate GitHub, cache cu `revalidate = 3600`
  - pagini: `/` (one-page), `/projects`, `/resume`, `/blog`, `/blog/[slug]`
- `components/` — UI reutilizabil și secțiuni
  - `components/system/` — componentele temei retro (terminal, CRT overlay, boot sequence,
    status panel, architecture canvas)
  - `components/ui/` — primitive stil shadcn (button, card, input, badge, accordion…)
- `content/` — **sursa de adevăr** pentru conținut. Editează AICI datele, nu în componente:
  - `profile.ts` — date personale, titlu, about, skills, social links
  - `experience.ts` — experiență profesională / timeline
  - `projects.ts` — proiectele din portofoliu
  - `blog/*.mdx` — articole de blog
- `lib/` — `mdx.ts` (loader MDX), `seo.ts` (metadata, JSON-LD), `github.ts` (normalizare
  feed), `i18n.ts` / `i18n-server.ts` (traduceri), `motion.ts`, `utils.ts`
- `public/` — imagini și CV: `public/resume/Albot-Ciprian-CV.pdf`

## Internaționalizare (i18n)

- UI bilingv **EN / RO**, comutator în navbar
- Limba se persistă în cookie-ul `lang`
- Paginile server-rendered citesc limba din cookie via `lib/i18n-server.ts`
- Când adaugi text vizibil în UI, adaugă **ambele** variante (EN și RO) în stratul i18n.

## Variabile de mediu

Configurate în `.env.local` (vezi `.env.example` pentru lista completă):

- `NEXT_PUBLIC_SITE_URL` — pentru canonical URLs, JSON-LD, sitemap
- `GITHUB_TOKEN` — **puternic recomandat pe Vercel**; fără el `/api/github` poate întoarce
  intermitent `403` (Vercel folosește IP-uri outbound partajate)
- `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — necesare pentru trimiterea reală de email
- `RESEND_API_KEY` — provider preferat; alternativ `SMTP_*` pentru fallback
- `RECAPTCHA_V3_*` / `NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY` — protecție anti-spam la contact

`.env.local` conține secrete și NU se comite (este în `.gitignore`).

## Comenzi

```bash
npm install       # instalare dependențe
npm run dev       # server de development (http://localhost:3000)
npm run build     # build de producție
npm run lint      # ESLint
npm run start     # rulează build-ul de producție
```

## Convenții și așteptări de lucru

- **TypeScript strict** — fără `any` nejustificat; păstrează tipurile existente.
- **Conținut vs. cod**: modifică texte/date în `content/`, nu hardcoda în componente.
- **Bilingv**: orice text nou din UI primește variantă EN și RO.
- **Accesibilitate & performanță**: respectă `prefers-reduced-motion`; efectele grele
  (Three.js) rămân opționale și dezactivate pe mobil.
- **Verificare**: rulează `npm run lint` și `npm run build` înainte de a considera o
  schimbare gata — ambele trebuie să treacă.
- **Stil de cod**: potrivește codul existent (denumiri, structură, densitatea comentariilor).
- **Git**: nu comite `.env.local` și nu comite/push decât la cererea explicită a userului.

## Deploy

Hosting pe **Vercel**. Build: `npm run build`. Setează toate variabilele din `.env.example`
în Project Settings (inclusiv `NEXT_PUBLIC_SITE_URL` cu domeniul de producție și `GITHUB_TOKEN`).
