"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Power, Send, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/Container";
import { useI18n } from "@/components/providers/language-provider";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

/**
 * Footer — ALBOT-OS system status footer.
 *
 * Three composed strips:
 *   1. Top strip — terminal-style sign-off with mono prompt and the
 *      "ALBOT" oversized phantom watermark fixed in the background.
 *   2. Middle grid — three navigation columns + a contact channel block.
 *   3. Bottom status bar — fixed-height system bar with clock, build tag,
 *      and "system online" indicator.
 */
export function Footer() {
  const { dictionary } = useI18n();
  const clock = useUtcClock();

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
        { label: dictionary.common.email, href: `mailto:${profile.email}` },
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
    <footer className="relative isolate overflow-hidden border-t border-line bg-canvas">
      {/* Oversized phantom watermark — sits behind everything */}
      <span
        aria-hidden
        className="mono pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 text-[22vw] leading-none font-medium tracking-[0.04em] text-ink/2.5 select-none uppercase md:text-[18vw]"
      >
        ALBOT-OS
      </span>

      {/* Top edge phosphor rule */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/35 to-transparent"
      />

      <Container className="relative z-10 py-16">
        {/* Terminal-style sign-off */}
        <div className="mono flex flex-wrap items-center gap-2 text-[11px] tracking-[0.18em] text-ink-mono uppercase">
          <Terminal className="h-3.5 w-3.5 text-accent" />
          <span className="text-ink-faint">$</span>
          <span>{dictionary.footer.eyebrow}</span>
          <span aria-hidden className="hidden text-ink-faint sm:inline">·</span>
          <span className="hidden text-ink sm:inline">{dictionary.footer.title}</span>
        </div>

        {/* Headline + description */}
        <div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <h3 className="text-2xl font-semibold text-ink md:text-3xl">
              {dictionary.footer.title}
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-ink-soft">
              {dictionary.footer.description}
            </p>

            <div className="mt-6 flex items-center gap-2 text-ink-soft">
              <ChannelLink href="https://github.com/AlbotCiprian" label="GitHub">
                <Github className="h-4 w-4" />
              </ChannelLink>
              <ChannelLink
                href="https://www.linkedin.com/in/albot-ciprian-a04024208/"
                label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </ChannelLink>
              <ChannelLink href={`mailto:${profile.email}`} label="Email">
                <Mail className="h-4 w-4" />
              </ChannelLink>
            </div>

            {/* Secure channel block — replaces fake newsletter */}
            <div className="mt-8 rounded-md border border-line bg-elevated/95 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="mono flex items-center justify-between text-[10px] tracking-[0.2em] text-ink-mono uppercase">
                <span className="text-ink-faint">channel.secure</span>
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-positive shadow-[0_0_6px_rgba(123,181,110,0.55)]" />
                  <span>ready</span>
                </span>
              </div>
              <p className="mono mt-3 text-[12.5px] leading-6 text-ink-soft">
                <span className="text-ink-faint">$ </span>
                establish_connection
                <span className="text-accent"> --to </span>
                ciprian.albot
              </p>
              <Link
                href={`mailto:${profile.email}`}
                className="mt-4 inline-flex items-center gap-2 rounded-sm border border-accent/40 bg-accent-soft px-3 py-2 mono text-[11px] tracking-[0.18em] text-accent uppercase transition-colors hover:bg-accent hover:text-canvas"
              >
                <Send className="h-3.5 w-3.5" />
                open transmission
              </Link>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <FooterGroup key={group.title} group={group} />
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom status bar — the system's "task bar" */}
      <div className="relative z-10 border-t border-line bg-elevated/80">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 mono text-[10px] tracking-[0.18em] text-ink-faint uppercase md:px-6">
          <span className="inline-flex items-center gap-1.5 text-ink-mono">
            <Power className="h-3 w-3 text-accent-positive" />
            system online
          </span>
          <span className="text-ink-faint">
            ALBOT-OS © {new Date().getFullYear()} · {dictionary.footer.copyright}
          </span>
          <span className="inline-flex items-center gap-3 text-ink-faint">
            <span>{dictionary.footer.builtWith}</span>
            <span aria-hidden className="hidden h-1 w-1 rounded-full bg-ink-faint md:inline-block" />
            <span className="hidden text-ink-mono md:inline">{clock}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------- */
/* FooterGroup                                                      */
/* --------------------------------------------------------------- */

function FooterGroup({
  group,
}: {
  group: { title: string; items: { label: string; href: string }[] };
}) {
  return (
    <div>
      <h4 className="mono text-[10px] tracking-[0.22em] text-ink-mono uppercase">
        <span aria-hidden className="text-ink-faint">{"// "}</span>
        {group.title}
      </h4>
      <ul className="mt-4 space-y-3 text-[14px] text-ink-soft">
        {group.items.map((item) => (
          <li key={`${group.title}-${item.label}`}>
            <Link
              href={item.href}
              className="group relative inline-flex items-baseline gap-2 transition-colors hover:text-ink"
            >
              <span aria-hidden className="mono text-[10px] tracking-[0.18em] text-ink-faint opacity-0 transition-opacity group-hover:opacity-100">
                {">"}
              </span>
              <span className="relative pb-0.5">
                {item.label}
                <span
                  aria-hidden
                  className="absolute right-0 bottom-0 left-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------- */
/* ChannelLink                                                      */
/* --------------------------------------------------------------- */

function ChannelLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-elevated transition-colors",
        "hover:border-accent/50 hover:bg-accent-soft hover:text-accent",
      )}
    >
      {children}
    </Link>
  );
}

/* --------------------------------------------------------------- */
/* useUtcClock — small hook for the status bar clock                */
/* --------------------------------------------------------------- */

function useUtcClock() {
  const [now, setNow] = useState<string>("--:--:--");

  useEffect(() => {
    const tick = () => {
      const date = new Date();
      const pad = (value: number) => value.toString().padStart(2, "0");
      setNow(`${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} UTC`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}
