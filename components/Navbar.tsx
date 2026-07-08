"use client";

import Link from "next/link";
import { Menu, Power, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

const observedSections = ["profile", "about", "experience", "featured-projects", "tech-stack", "blog-preview", "contact"];

type NavItem = {
  /** Display label in caps — rendered between `[ ]` brackets. */
  label: string;
  href: string;
  /** Optional keyboard hint (e.g. "F2") shown as a mono accent. */
  hotkey?: string;
  match: (pathname: string, activeSection: string) => boolean;
};

/**
 * Navbar — ALBOT-OS menu bar.
 *
 * Mimics a retro DOS-era menu bar: bracketed labels, optional hotkey hints,
 * amber phosphor underline on the active item. On mobile, the bar collapses
 * to a compact "system menu" sheet that opens from below the header.
 */
export function Navbar() {
  const pathname = usePathname();
  const { dictionary } = useI18n();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);

  // Adjust state on route change during render (instead of in an effect):
  // close the mobile sheet, and clear the active section when leaving home.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    if (pathname !== "/") setActiveSection("");
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-32% 0px -52% 0px", threshold: [0.2, 0.4, 0.6] },
    );

    observedSections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const aboutHref = pathname === "/" ? "#about" : "/#about";
  const contactHref = pathname === "/" ? "#contact" : "/#contact";

  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: dictionary.common.home,
        href: "/",
        hotkey: "F1",
        match: (path) => path === "/",
      },
      {
        label: dictionary.common.projects,
        href: "/projects",
        hotkey: "F2",
        match: (path) => path === "/projects" || path.startsWith("/projects/"),
      },
      {
        label: dictionary.common.resume,
        href: "/resume",
        hotkey: "F3",
        match: (path) => path === "/resume",
      },
      {
        label: dictionary.common.blog,
        href: "/blog",
        hotkey: "F4",
        match: (path) => path === "/blog" || path.startsWith("/blog/"),
      },
      {
        label: dictionary.common.about,
        href: aboutHref,
        match: (path, section) =>
          path === "/" && section.length > 0 && section !== "contact" && section !== "profile",
      },
      {
        label: dictionary.common.contact,
        href: contactHref,
        match: (path, section) => path === "/" && section === "contact",
      },
    ],
    [aboutHref, contactHref, dictionary],
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-300",
          isScrolled
            ? "border-line bg-canvas/90 backdrop-blur-xl"
            : "border-line-subtle bg-canvas/70 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-4 md:h-14 md:px-6">
          {/* Brand — small logomark + ALBOT-OS wordmark */}
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
            aria-label="Home — ALBOT-OS"
          >
            <Logomark />
            <span className="mono flex items-baseline gap-2 text-[11px] tracking-[0.22em] uppercase">
              <span className="text-ink">ALBOT-OS</span>
              <span aria-hidden className="text-ink-faint">v2026.05</span>
            </span>
          </Link>

          {/* Desktop nav — bracketed menu items */}
          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active = item.match(pathname, activeSection);
              return (
                <MenuLink key={item.label} item={item} active={active} />
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              title="System online"
              className="hidden items-center gap-1.5 mono text-[10px] tracking-[0.2em] text-ink-faint uppercase md:inline-flex"
            >
              <Power className="h-3 w-3 text-accent-positive" />
              <span>online</span>
            </span>

            <div className="hidden md:block">
              <LanguageToggle />
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line bg-canvas/60 text-ink-soft transition-colors hover:border-accent/50 hover:text-accent md:hidden"
            >
              {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <MobileSheet
        open={isMobileOpen}
        navItems={navItems}
        pathname={pathname}
        activeSection={activeSection}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Logomark                                                            */
/* ------------------------------------------------------------------ */

function Logomark() {
  return (
    <span className="relative grid h-8 w-8 place-items-center rounded-sm border border-line bg-elevated text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
        <path d="M3 16 L10 4 L17 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.4 12 L13.6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <circle cx="10" cy="4" r="1.4" fill="currentColor" />
      </svg>
      <span aria-hidden className="pointer-events-none absolute -bottom-0.75 left-1/2 h-px w-3 -translate-x-1/2 bg-accent/70" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop menu link — bracketed label                                 */
/* ------------------------------------------------------------------ */

function MenuLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "mono group relative inline-flex h-9 items-center gap-2 rounded-sm px-2.5 text-[11px] tracking-[0.2em] transition-colors uppercase",
        active ? "text-accent term-glow" : "text-ink-soft hover:text-ink",
      )}
    >
      <span aria-hidden className={cn("text-ink-faint", active && "text-accent/60")}>{"["}</span>
      <span>{item.label}</span>
      <span aria-hidden className={cn("text-ink-faint", active && "text-accent/60")}>{"]"}</span>
      {item.hotkey ? (
        <span
          aria-hidden
          className="hidden text-[9px] tracking-[0.18em] text-ink-faint xl:inline"
        >
          {item.hotkey}
        </span>
      ) : null}
      {active ? (
        <span
          aria-hidden
          className="absolute inset-x-2 -bottom-0.5 h-px origin-center rounded-full bg-accent shadow-[0_0_8px_rgba(232,163,61,0.55)]"
        />
      ) : null}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile sheet                                                        */
/* ------------------------------------------------------------------ */

type MobileSheetProps = {
  open: boolean;
  navItems: NavItem[];
  pathname: string;
  activeSection: string;
  onClose: () => void;
};

function MobileSheet({ open, navItems, pathname, activeSection, onClose }: MobileSheetProps) {
  return (
    <div
      id="mobile-menu"
      data-open={open}
      className={cn(
        "fixed inset-x-0 top-14 bottom-0 z-40 md:hidden",
        "transition-[opacity,visibility] duration-200",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-canvas/90 backdrop-blur-xl"
        aria-hidden
      />

      <nav
        className="relative mx-4 mt-4 rounded-md border border-line bg-elevated/95 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
        aria-label="Mobile primary"
      >
        <div className="flex items-center justify-between border-b border-line-subtle bg-canvas/60 px-3 py-2">
          <span className="mono text-[10px] tracking-[0.22em] text-ink-mono uppercase">
            albot-os · menu
          </span>
          <span className="mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
            ESC to close
          </span>
        </div>

        <ul className="flex flex-col p-2">
          {navItems.map((item) => {
            const active = item.match(pathname, activeSection);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex min-h-11 items-center justify-between rounded-sm px-3 text-[14px] transition-colors mono tracking-[0.14em] uppercase",
                    active ? "bg-accent-soft text-accent" : "text-ink-soft hover:bg-canvas/40 hover:text-ink",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="text-ink-faint">{"["}</span>
                    <span>{item.label}</span>
                    <span aria-hidden className="text-ink-faint">{"]"}</span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "text-[10px] tracking-[0.18em]",
                      active ? "text-accent" : "text-ink-faint",
                    )}
                  >
                    {active ? "● open" : "→"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-line-subtle bg-canvas/55 px-3 py-3">
          <span className="mono inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-ink-faint uppercase">
            <Power className="h-3 w-3 text-accent-positive" />
            online
          </span>
          <LanguageToggle />
        </div>
      </nav>
    </div>
  );
}
