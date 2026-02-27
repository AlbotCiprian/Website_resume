"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/components/providers/language-provider";
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
          ? "border-white/12 bg-zinc-950/84 shadow-[0_8px_24px_rgba(2,8,20,0.35)]"
          : "border-white/10 bg-zinc-950/66"
      } backdrop-blur-xl`}
    >
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-zinc-200">
          +
        </span>

        <Link href="/" className="text-xs font-semibold tracking-[0.36em] text-zinc-200 uppercase hover:text-white">
          ALBOT
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/2 px-4 text-sm text-zinc-200 transition hover:border-white/30 hover:bg-white/8 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:outline-none">
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
                  item.active ? "text-white" : "text-zinc-300 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-[2px] h-[2px] origin-left rounded-full bg-cyan-300 transition-transform duration-300 ${
                    item.active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
