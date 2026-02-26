"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/components/providers/language-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const observedSections = [
  "about",
  "experience",
  "featured-projects",
  "tech-stack",
  "github",
  "blog-preview",
  "contact",
];

export function Navbar() {
  const pathname = usePathname();
  const { dictionary } = useI18n();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -52% 0px",
        threshold: [0.2, 0.35, 0.6],
      },
    );

    observedSections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  const aboutHref = pathname === "/" ? "#about" : "/#about";
  const contactHref = pathname === "/" ? "#contact" : "/#contact";

  const pages = useMemo(
    () => [
      { label: dictionary.common.home, href: "/" },
      { label: dictionary.common.projects, href: "/projects" },
      { label: dictionary.common.resume, href: "/resume" },
      { label: dictionary.common.blog, href: "/blog" },
    ],
    [dictionary],
  );

  const navItems = [
    { label: dictionary.common.blog, href: "/blog", active: pathname === "/blog" || pathname.startsWith("/blog/") },
    {
      label: dictionary.common.about,
      href: aboutHref,
      active: pathname === "/" && activeSection.length > 0 && activeSection !== "contact",
    },
    {
      label: dictionary.common.contact,
      href: contactHref,
      active: pathname === "/" && activeSection === "contact",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-slate-200/85 bg-white/88 shadow-sm dark:border-white/10 dark:bg-zinc-950/82"
          : "border-slate-200/70 bg-white/72 dark:border-white/10 dark:bg-zinc-950/62"
      } backdrop-blur-xl`}
    >
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 text-slate-700 dark:border-white/15 dark:text-zinc-200">
          +
        </span>

        <Link
          href="/"
          className="text-xs font-semibold tracking-[0.36em] text-slate-700 uppercase hover:text-slate-900 dark:text-zinc-200 dark:hover:text-white"
        >
          ALBOT
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/15 dark:bg-transparent dark:text-zinc-200 dark:hover:border-white/30 dark:hover:text-white">
                <Menu className="h-4 w-4" />
                {dictionary.common.allPages}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{dictionary.common.navigate}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {pages.map((page) => (
                <DropdownMenuItem key={page.href} asChild>
                  <Link href={page.href}>{page.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative rounded-full px-3 py-2 text-sm transition ${
                  item.active
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-[2px] h-[2px] origin-left rounded-full bg-cyan-500 transition-transform duration-300 dark:bg-cyan-300 ${
                    item.active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
