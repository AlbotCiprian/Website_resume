"use client";

import { Languages } from "lucide-react";

import { type Locale } from "@/lib/i18n";
import { useI18n } from "@/components/providers/language-provider";

const localeOrder: Locale[] = ["en", "ro"];

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white/80 px-1 py-1 dark:border-white/15 dark:bg-white/5">
      <span className="grid h-7 w-7 place-items-center rounded-full text-slate-500 dark:text-zinc-400">
        <Languages className="h-3.5 w-3.5" />
      </span>
      {localeOrder.map((item) => {
        const active = locale === item;

        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium uppercase transition ${
              active
                ? "bg-cyan-500/15 text-cyan-700 dark:bg-cyan-400/20 dark:text-cyan-100"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
            }`}
            aria-pressed={active}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
