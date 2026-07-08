"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { useI18n } from "@/components/providers/language-provider";

/**
 * LoadingScreen — first-visit ALBOT-OS boot overlay.
 *
 * Behaviour:
 *   - Shows once per browser session (guarded by sessionStorage) so it
 *     never gets in the way of internal navigation or repeat visits.
 *   - Fixed full-screen, above everything, then fades out and unmounts.
 *   - Animates a boot log + progress fill to 100%, then releases.
 *   - Click / any key skips immediately.
 *   - prefers-reduced-motion: no typing/sweep, a short static hold then
 *     an instant, gentle fade — accessible and non-nauseating.
 *
 * SSR-safe: the visibility decision runs after mount inside a rAF
 * callback (never a bare setState in the effect body), so there is no
 * hydration mismatch and no lint friction. Uses sessionStorage, which is
 * allowed in the real app (the ban only applies to sandboxed artifacts).
 */

const SESSION_KEY = "albot-os-booted";

const BOOT_STEPS = [
  { label: "mount /dev/albot-os", pct: 12 },
  { label: "load backend.architecture", pct: 34 },
  { label: "spin up api.gateway", pct: 58 },
  { label: "validate database.layer", pct: 79 },
  { label: "warm cache · render ui", pct: 94 },
  { label: "system ready", pct: 100 },
];

export function LoadingScreen() {
  const reducedMotion = useReducedMotion();
  const { dictionary } = useI18n();
  const t = dictionary.loading;

  // Starts hidden; a rAF after mount decides whether to show it.
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);
  const timers = useRef<number[]>([]);
  const prevOverflow = useRef<string>("");

  const dismiss = useCallback(() => setVisible(false), []);

  useEffect(() => {
    let raf = 0;

    const start = () => {
      let alreadyBooted = false;
      try {
        alreadyBooted = window.sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        alreadyBooted = false;
      }
      if (alreadyBooted) return;

      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* private mode — still show the loader, just don't persist */
      }

      // Lock scroll while the overlay is up.
      prevOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setVisible(true);

      if (reducedMotion) {
        setPct(100);
        setStep(BOOT_STEPS.length - 1);
        timers.current.push(window.setTimeout(dismiss, 700));
        return;
      }

      BOOT_STEPS.forEach((s, index) => {
        timers.current.push(
          window.setTimeout(() => {
            setStep(index);
            setPct(s.pct);
            if (index === BOOT_STEPS.length - 1) {
              timers.current.push(window.setTimeout(dismiss, 520));
            }
          }, 340 + index * 300),
        );
      });
    };

    raf = window.requestAnimationFrame(start);

    return () => {
      window.cancelAnimationFrame(raf);
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
      document.body.style.overflow = prevOverflow.current;
    };
  }, [reducedMotion, dismiss]);

  // Restore scroll as soon as the overlay is dismissed.
  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = prevOverflow.current;
    }
  }, [visible]);

  // Skip on any key while visible.
  useEffect(() => {
    if (!visible) return;
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="albot-os-loader"
          role="status"
          aria-live="polite"
          aria-label={t.aria}
          onClick={dismiss}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-canvas"
        >
          {/* Ambient blueprint + vignette */}
          <div
            aria-hidden
            className="blueprint-grid pointer-events-none absolute inset-0 opacity-70"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          <motion.div
            className="loader-flicker relative mx-auto w-full max-w-md px-6"
            exit={{ y: reducedMotion ? 0 : -10 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.44, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Wordmark */}
            <div className="mb-8 text-center">
              <p className="mono text-[10.5px] tracking-[0.4em] text-ink-faint uppercase">
                {t.system}
              </p>
              <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.02em] text-ink md:text-[40px]">
                ALBOT<span className="text-ink-soft">-OS</span>
                <span className="text-accent term-glow">.</span>
              </h1>
              <p className="mono mt-2 text-[11px] tracking-[0.16em] text-ink-mono">
                {t.subtitle}
              </p>
            </div>

            {/* Boot log — current line + live percentage */}
            <div className="mono mb-4 h-10 text-[12px] leading-5 text-ink-soft">
              <div className="flex items-center gap-2">
                <span aria-hidden className="text-accent-positive">
                  {">"}
                </span>
                <span className="flex-1 truncate">{BOOT_STEPS[step]?.label}</span>
                <span className="text-ink-faint">
                  [ {String(Math.min(pct, 100)).padStart(3, " ")}% ]
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-[6px] w-full overflow-hidden rounded-full border border-line bg-surface/60">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ boxShadow: "0 0 12px rgba(232,163,61,0.45)" }}
              />
              {!reducedMotion ? (
                <div
                  aria-hidden
                  className="loader-sweep absolute inset-y-0 left-0 w-1/4"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(240,233,210,0.35), transparent)",
                  }}
                />
              ) : null}
            </div>

            {/* Skip hint */}
            <p className="mono mt-5 text-center text-[10px] tracking-[0.22em] text-ink-faint uppercase">
              {t.skip}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
