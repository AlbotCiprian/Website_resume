import Link from "next/link";

import { Container } from "@/components/Container";
import { getServerDictionary } from "@/lib/i18n-server";

export default async function NotFound() {
  const dictionary = await getServerDictionary();

  return (
    <section className="py-24">
      <Container className="max-w-3xl text-center">
        <p className="text-xs tracking-[0.2em] text-slate-500 uppercase dark:text-zinc-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">{dictionary.notFound.title}</h1>
        <p className="mt-4 text-slate-600 dark:text-zinc-400">{dictionary.notFound.description}</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-white/15 dark:bg-transparent dark:text-zinc-200 dark:hover:bg-white/10"
        >
          {dictionary.notFound.cta}
        </Link>
      </Container>
    </section>
  );
}
