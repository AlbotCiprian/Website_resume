"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const pages = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();

  const aboutHref = pathname === "/" ? "#about" : "/#about";
  const contactHref = pathname === "/" ? "#contact" : "/#contact";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-zinc-200">+</span>

        <Link href="/" className="text-xs font-semibold tracking-[0.36em] text-zinc-200 uppercase hover:text-white">
          ALBOT
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-zinc-200 transition hover:border-white/30 hover:text-white">
                <Menu className="h-4 w-4" />
                All Pages
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Navigate</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {pages.map((page) => (
                <DropdownMenuItem key={page.href} asChild>
                  <Link href={page.href}>{page.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/blog"
              className="rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              Blog
            </Link>
            <Link
              href={aboutHref}
              className="rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              About
            </Link>
            <Link
              href={contactHref}
              className="rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              Contact
            </Link>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
