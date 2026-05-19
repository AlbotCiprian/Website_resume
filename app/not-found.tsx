import Link from "next/link";
import { Power, Terminal } from "lucide-react";

import { Container } from "@/components/Container";
import { getServerDictionary } from "@/lib/i18n-server";

/**
 * Not-found page — ALBOT-OS direction.
 *
 * Renders as a retro kernel panic / "command not found" terminal panel:
 *   - mono header with traffic-light dots
 *   - large 404 in mono, amber
 *   - dictionary-translated title and description
 *   - return-home button as a retro command button
 */
export default async function NotFound() {
  const dictionary = await getServerDictionary();

  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-2xl">
        <article className="overflow-hidden rounded-md border border-line bg-elevated/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_50px_-26px_rgba(0,0,0,0.7)]">
          {/* Title bar */}
          <header className="flex items-center gap-3 border-b border-line-subtle bg-canvas/65 px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent-critical/80" />
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent-warning/80" />
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent-positive/80" />
            </div>
            <span className="mono flex-1 truncate text-[11px] tracking-[0.16em] text-ink-mono uppercase">
              albot-os ~ kernel.panic
            </span>
            <span className="mono inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-accent-critical uppercase">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-critical" />
              halt
            </span>
          </header>

          <div className="p-6 md:p-10">
            <p className="mono flex items-center gap-2 text-[11px] tracking-[0.22em] text-ink-faint uppercase">
              <Terminal className="h-3.5 w-3.5 text-accent" />
              <span className="text-ink-faint">$</span>
              <span className="text-ink-soft">whereis page</span>
            </p>

            <p className="mono mt-6 text-[72px] leading-none font-semibold tracking-[-0.02em] text-accent term-glow md:text-[96px]">
              404
            </p>

            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.01em] text-ink md:text-4xl">
              {dictionary.notFound.title}
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-ink-soft">
              {dictionary.notFound.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="mono inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-[13px] tracking-[0.04em] text-canvas transition-colors hover:bg-accent-warning"
              >
                <span aria-hidden className="text-canvas/70">{">"}</span>
                <span>{dictionary.notFound.cta}</span>
              </Link>
              <span className="mono inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.18em] text-ink-faint uppercase">
                <Power className="h-3 w-3 text-accent-positive" />
                system online
              </span>
            </div>
          </div>

          {/* Bottom prompt */}
          <div className="flex items-center justify-between gap-3 border-t border-line-subtle bg-canvas/65 px-3 py-2 mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
            <span>{"> press [enter] to return"}</span>
            <span>ALBOT-OS · 2026</span>
          </div>
        </article>
      </Container>
    </section>
  );
}
