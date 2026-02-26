"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { defaultLocale, getDictionary, isLocale, type Dictionary, type Locale } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (next: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: string;
}) {
  const router = useRouter();
  const resolvedInitialLocale = isLocale(initialLocale) ? initialLocale : defaultLocale;
  const [locale, setLocaleState] = useState<Locale>(resolvedInitialLocale);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      locale,
      dictionary: getDictionary(locale),
      setLocale: (next) => {
        if (next === locale) {
          return;
        }

        document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
        window.localStorage.setItem("portfolio-lang", next);
        document.documentElement.lang = next;
        setLocaleState(next);
        router.refresh();
      },
    };
  }, [locale, router]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }

  return context;
}
