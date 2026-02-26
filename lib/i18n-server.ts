import { cookies } from "next/headers";

import { defaultLocale, getDictionary, isLocale, type Locale } from "@/lib/i18n";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("lang")?.value;

  return isLocale(rawLocale) ? rawLocale : defaultLocale;
}

export async function getServerDictionary() {
  const locale = await getServerLocale();
  return getDictionary(locale);
}
