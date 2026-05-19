"use client";

/**
 * CRTOverlay — fixed-position decorative layer that lives above every page.
 *
 * Three thin layers compose the CRT feel without obscuring content:
 *   1. Scanlines: a repeating linear-gradient at 3% global opacity
 *   2. Grain: an inline SVG turbulence noise at 4% global opacity
 *   3. Vignette: a soft radial darkening at the screen edges
 *
 * The whole stack is `pointer-events: none` so it never intercepts clicks
 * and `prefers-reduced-motion` switches the subtle flicker off.
 */
export function CRTOverlay() {
  const noise =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
        <filter id="n">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.9  0 0 0 0 0.86  0 0 0 0 0.74  0 0 0 0.55 0"/>
        </filter>
        <rect width="160" height="160" filter="url(#n)" opacity="1"/>
      </svg>`,
    );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      {/* Grain — most subtle, blended in screen for warm sparkle */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-screen"
        style={{ backgroundImage: `url("${noise}")`, backgroundSize: "160px 160px" }}
      />

      {/* Scanlines */}
      <div className="crt-scanlines crt-flicker absolute inset-0 opacity-30" />

      {/* Vignette */}
      <div className="crt-vignette absolute inset-0" />
    </div>
  );
}
