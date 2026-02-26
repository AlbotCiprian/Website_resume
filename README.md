# Albot Ciprian Portfolio

Premium personal portfolio website for **Albot Ciprian** (Senior Backend Engineer & Systems Architect), built with Next.js App Router and a dark premium UI style.

## Tech Stack

- Next.js 16 (App Router, TypeScript strict)
- Tailwind CSS v4
- Framer Motion
- shadcn-style UI components + lucide-react
- next-themes (dark/light toggle)
- MDX blog with @next/mdx + `next-mdx-remote/rsc`
- GitHub Activity feed via Next API route with caching
- Subtle Three.js background (`@react-three/fiber` + `drei`, dynamic import, SSR disabled)
- Contact API with validation, honeypot, rate-limit, Resend/Nodemailer

## Pages

- `/` Home one-page sections
- `/projects` Projects grid + filters
- `/resume` Online resume + PDF download
- `/blog` Blog list + search + tag filter
- `/blog/[slug]` Static MDX post pages (with next/prev navigation)

## Languages

- English and Romanian UI support (`EN` / `RO` toggle in navbar)
- Locale persisted in `lang` cookie
- Server-rendered pages read locale from cookie via `lib/i18n-server.ts`

## Project Structure

- `app/` routes, layout, APIs, sitemap, robots
- `components/` reusable UI and sections
- `content/` source of truth for profile/experience/projects/blog MDX
- `lib/` mdx loader, seo helpers, github normalization, utilities
- `public/` images and `public/resume/Albot-Ciprian-CV.pdf`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

3. Run development server:

```bash
npm run dev
```

4. Open:

- http://localhost:3000

## Environment Variables

Required for full contact functionality:

- `CONTACT_TO_EMAIL` recipient email
- `CONTACT_FROM_EMAIL` sender email (must be verified with provider)

Preferred email provider (Resend):

- `RESEND_API_KEY`

Optional SMTP fallback (if not using Resend):

- `SMTP_HOST`
- `SMTP_PORT` (default: 465)
- `SMTP_USER`
- `SMTP_PASSWORD`

Optional project metadata and GitHub rate-limit support:

- `NEXT_PUBLIC_SITE_URL` (for canonical URLs, JSON-LD, sitemap)
- `GITHUB_TOKEN` (optional, higher GitHub API limits)

## Build & Quality

```bash
npm run lint
npm run build
```

Both commands pass successfully on this codebase.

## Deploy to Vercel

1. Push repository to GitHub/GitLab/Bitbucket.
2. Import project in Vercel.
3. Add the environment variables from `.env.example` in Vercel Project Settings.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain (for example `https://yourdomain.com`).
5. Deploy.

Vercel uses:

- Build command: `npm run build`
- Output: Next.js default

## Notes

- GitHub feed endpoint: `app/api/github/route.ts` (`revalidate = 3600`)
- Contact endpoint: `app/api/contact/route.ts` with validation + anti-spam protections
- Three.js background auto-disables on mobile and on `prefers-reduced-motion`
