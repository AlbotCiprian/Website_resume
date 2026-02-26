import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { Container } from "@/components/Container";
import { profile } from "@/content/profile";

const footerLinks = [
  {
    title: "Pages",
    items: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Resume", href: "/resume" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Social",
    items: [
      { label: "GitHub", href: "https://github.com/AlbotCiprian" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/albot-ciprian" },
      { label: "Email", href: "mailto:albotciprian05@gmail.com" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: profile.email, href: `mailto:${profile.email}` },
      { label: profile.phone, href: "tel:+37368968633" },
      { label: profile.location, href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-zinc-950">
      <span className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 text-[28vw] leading-none font-semibold tracking-[0.08em] text-white/4 select-none">
        ALBOT
      </span>

      <Container className="relative z-10 py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_2fr]">
          <div>
            <p className="text-xs tracking-[0.32em] text-zinc-500 uppercase">Backend Systems</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Designing reliable systems for product growth.</h3>
            <p className="mt-4 max-w-md text-zinc-400">
              Open for backend architecture, platform modernization, and production-critical API engineering.
            </p>
            <div className="mt-6 flex items-center gap-3 text-zinc-300">
              <Link href="https://github.com/AlbotCiprian" className="rounded-full border border-white/15 p-2 hover:bg-white/10">
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/albot-ciprian"
                className="rounded-full border border-white/15 p-2 hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href={`mailto:${profile.email}`} className="rounded-full border border-white/15 p-2 hover:bg-white/10">
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold text-zinc-200">{group.title}</h4>
                <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                      <Link href={item.href} className="transition hover:text-zinc-100">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Albot Ciprian. All rights reserved.</p>
          <p>Built with Next.js, TypeScript, Tailwind and Framer Motion.</p>
        </div>
      </Container>
    </footer>
  );
}
