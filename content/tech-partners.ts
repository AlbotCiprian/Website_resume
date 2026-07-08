import type { MarqueeLogo } from "@/components/system/CompanyLogosMarquee";

/**
 * Tech stack, integrations & certifications — rendered in the second logo
 * band ("// stack, integrations & certifications") lower on the home page
 * (light chips).
 *
 * SINGLE SOURCE OF TRUTH. Edit here, never hardcode in components.
 * Assets live in /public/images/tech/ (normalised, no-space filenames).
 * Order flows stack → infra → vcs → payments → AI → certifications.
 */
export const techPartners: MarqueeLogo[] = [
  // ---- Core stack ------------------------------------------------------
  { name: "React", tag: "ui", logo: "/images/tech/react.png" },
  { name: "Next.js", tag: "framework", logo: "/images/tech/nextjs.png" },
  { name: "TypeScript", tag: "language", logo: "/images/tech/typescript.webp" },
  { name: "Node.js", tag: "runtime", logo: "/images/tech/nodejs.png" },
  { name: "PostgreSQL", tag: "database", logo: "/images/tech/postgresql.jpeg" },
  { name: "Redis", tag: "cache", logo: "/images/tech/redis.jpg" },
  { name: "Prisma", tag: "orm", logo: "/images/tech/prisma.png" },

  // ---- Infrastructure & delivery --------------------------------------
  { name: "Docker", tag: "containers", logo: "/images/tech/docker.png" },
  { name: "Cloudflare", tag: "edge / cdn", logo: "/images/tech/cloudflare.webp" },
  { name: "DigitalOcean", tag: "cloud", logo: "/images/tech/digitalocean.png" },
  { name: "Vercel", tag: "hosting", logo: "/images/tech/vercel.png" },
  { name: "GitHub", tag: "vcs", logo: "/images/tech/github.png" },
  { name: "GitLab", tag: "ci/cd", logo: "/images/tech/gitlab.svg" },

  // ---- Payment integrations -------------------------------------------
  { name: "Visa", tag: "payments", logo: "/images/tech/visa.jpg" },
  { name: "Mastercard", tag: "payments", logo: "/images/tech/mastercard.svg" },
  { name: "Apple Pay", tag: "payments", logo: "/images/tech/apple-pay.svg" },
  { name: "Google Pay", tag: "payments", logo: "/images/tech/google-pay.svg" },
  { name: "Amex SafeKey", tag: "3-D secure", logo: "/images/tech/amex-safekey.png" },
  { name: "MIA", tag: "instant payments", logo: "/images/tech/mia.webp" },

  // ---- AI ---------------------------------------------------------------
  { name: "Claude", tag: "ai", logo: "/images/tech/claude.png" },
  { name: "OpenAI", tag: "ai", logo: "/images/tech/openai.jpg" },

  // ---- Certifications ---------------------------------------------------
  { name: "Apple Developer", tag: "certification", logo: "/images/tech/apple-developer.png" },
  { name: "Certified Partner", tag: "certification", logo: "/images/tech/certifications-partners.png" },
];
