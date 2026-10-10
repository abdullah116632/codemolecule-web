"use client";

import { useEffect, useRef } from "react";

const STRIP_HEIGHT = 68; // px — must match the tech strip's height (h-17)
const RADIUS = 40; // px
const SHADOW_ALPHA = 0.28;

// The page content that slides up over the pinned tech strip (desktop only).
// While it covers the strip it shows rounded corners and a shadow so the motion
// reads clearly; both fade to nothing as the strip disappears, so afterwards the
// hero and the next section join seamlessly, with no sign the strip was there.
export function CoverSheet({ children }) {
  const ref = useRef(null);
  const fadeRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const fadeEl = fadeRef.current;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!desktop.matches) {
        el.style.borderRadius = "";
        el.style.boxShadow = "";
        if (fadeEl) fadeEl.style.opacity = "0";
        return;
      }
      const covered = Math.min(1, Math.max(0, (window.innerHeight - el.getBoundingClientRect().top) / STRIP_HEIGHT));
      const left = 1 - covered;
      el.style.borderRadius = `${RADIUS * left}px ${RADIUS * left}px 0 0`;
      el.style.boxShadow = left > 0 ? `0 -24px 60px -12px rgb(11 18 32 / ${SHADOW_ALPHA * left})` : "none";
      if (fadeEl) fadeEl.style.opacity = covered.toString();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={ref} className="relative z-10 bg-canvas bg-grid">
      <div 
        ref={fadeRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-40 -translate-y-full bg-gradient-to-b from-transparent to-canvas opacity-0"
      />
      {/* Ambient background glow glob matching screenshot 2 */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-[800px] w-[800px] translate-x-1/3 translate-y-1/3 rounded-full bg-brand-500/10 blur-[120px]" />
      {children}
    </div>
  );
}
