import Link from "next/link";

import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="max-w-3xl text-center">
        <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-zinc-400">The page you requested does not exist or was moved.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm text-zinc-200 hover:bg-white/10">
          Go back home
        </Link>
      </Container>
    </section>
  );
}
