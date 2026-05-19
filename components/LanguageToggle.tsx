"use client";

import { type Locale } from "@/lib/i18n";
import { useI18n } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

const localeOrder: Locale[] = ["en", "ro"];

/**
 * LanguageToggle — mono segmented control matching the engineering console
 * design language. Hairline divider between the two locale cells.
 */
export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="mono inline-flex items-stretch divide-x divide-line-subtle rounded-full border border-line bg-white/2 text-[11px] tracking-[0.16em] uppercase">
      {localeOrder.map((item) => {
        const active = locale === item;

        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            aria-pressed={active}
            className={cn(
              "min-h-7 px-3 py-1 transition-colors first:rounded-l-full last:rounded-r-full",
              active ? "text-accent" : "text-ink-faint hover:text-ink",
            )}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
