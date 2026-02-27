"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Send } from "lucide-react";

import { Container } from "@/components/Container";
import { useI18n } from "@/components/providers/language-provider";
import { profile } from "@/content/profile";

export function Footer() {
  const { dictionary } = useI18n();

  const footerLinks = [
    {
      title: dictionary.footer.pages,
      items: [
        { label: dictionary.common.home, href: "/" },
        { label: dictionary.common.projects, href: "/projects" },
        { label: dictionary.common.resume, href: "/resume" },
        { label: dictionary.common.blog, href: "/blog" },
      ],
    },
    {
      title: dictionary.footer.social,
      items: [
        { label: dictionary.common.github, href: "https://github.com/AlbotCiprian" },
        { label: dictionary.common.linkedin, href: "https://www.linkedin.com/in/albot-ciprian-a04024208/" },
        { label: dictionary.common.email, href: "mailto:albotciprian05@gmail.com" },
      ],
    },
    {
      title: dictionary.footer.contact,
      items: [
        { label: profile.email, href: `mailto:${profile.email}` },
        { label: profile.phone, href: "tel:+37368968633" },
        { label: profile.location, href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-slate-100 dark:border-white/10 dark:bg-zinc-950">
      <span className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 text-[28vw] leading-none font-semibold tracking-[0.08em] text-slate-300/30 select-none dark:text-white/5">
        ALBOT
      </span>

      <Container className="relative z-10 py-16">
        <div className="grid gap-12 md:grid-cols-[1.25fr_2fr]">
          <div>
            <p className="text-xs tracking-[0.32em] text-slate-500 uppercase dark:text-zinc-500">{dictionary.footer.eyebrow}</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{dictionary.footer.title}</h3>
            <p className="mt-4 max-w-md text-slate-600 dark:text-zinc-400">{dictionary.footer.description}</p>

            <div className="mt-6 flex items-center gap-3 text-slate-600 dark:text-zinc-300">
              <Link
                href="https://github.com/AlbotCiprian"
                className="rounded-full border border-slate-300 p-2 hover:bg-slate-200 dark:border-white/15 dark:hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/albot-ciprian-a04024208/"
                className="rounded-full border border-slate-300 p-2 hover:bg-slate-200 dark:border-white/15 dark:hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href={`mailto:${profile.email}`}
                className="rounded-full border border-slate-300 p-2 hover:bg-slate-200 dark:border-white/15 dark:hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs tracking-[0.15em] text-slate-500 uppercase dark:text-zinc-500">{dictionary.footer.newsletterTitle}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">{dictionary.footer.newsletterDescription}</p>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-500">
                <Send className="h-4 w-4" />
                {dictionary.footer.newsletterPlaceholder}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200">{group.title}</h4>
                <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-zinc-400">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                      <Link href={item.href} className="group relative inline-flex pb-0.5">
                        <span>{item.label}</span>
                        <span className="absolute left-0 right-0 bottom-0 h-px origin-left scale-x-0 bg-cyan-500 transition-transform duration-300 group-hover:scale-x-100 dark:bg-cyan-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-white/10 dark:text-zinc-500">
          <p>
            © {new Date().getFullYear()} Albot Ciprian. {dictionary.footer.copyright}
          </p>
          <p>{dictionary.footer.builtWith}</p>
        </div>
      </Container>
    </footer>
  );
}
