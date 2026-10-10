"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "../LanguageProvider";
import { mixedTechLogos } from "@/lib/techLogos";

// A thin strip of tech logos drifting right-to-left in one line.
// Hover slows it down; drag (mouse or touch) moves it by hand, with momentum on release.

const AUTO_SPEED = 45; // px per second while idle
const HOVER_SPEED = 8; // px per second while the pointer is over the strip
const FRICTION = 4; // how fast drag momentum fades (per second)

// Dark logos would vanish on the dark strip, so they get a light slate instead.
function logoColor(hex) {
  const n = parseInt(hex, 16);
  const lum = 0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return lum < 50 ? "#cbd5e1" : `#${hex}`;
}

const logos = mixedTechLogos.map((icon) => ({ icon, color: logoColor(icon.hex) }));

export function TechStrip() {
  const { t } = useLanguage();
  const stripRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    const track = trackRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The track holds the logo list twice; wrapping by one copy's width keeps the loop seamless.
    let copyWidth = track.scrollWidth / 2;
    let x = 0;
    let speed = reduceMotion ? 0 : AUTO_SPEED; // current auto speed, eased toward its target
    let momentum = 0; // px/s left over from a drag
    let hovering = false;
    let drag = null; // { lastX, lastT, velocity } while the pointer is down

    const wrap = () => {
      x = (((x % copyWidth) - copyWidth) % copyWidth); // keep x in (-copyWidth, 0]
    };

    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!drag) {
        const target = reduceMotion ? 0 : hovering ? HOVER_SPEED : AUTO_SPEED;
        speed += (target - speed) * Math.min(1, dt * 5);
        momentum *= Math.exp(-FRICTION * dt);
        if (Math.abs(momentum) < 1) momentum = 0;
        x += (-speed + momentum) * dt;
      }
      wrap();
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    });

    const onDown = (e) => {
      strip.setPointerCapture(e.pointerId);
      drag = { lastX: e.clientX, lastT: performance.now(), velocity: 0 };
      momentum = 0;
      strip.dataset.dragging = "true";
    };
    const onMove = (e) => {
      if (!drag) return;
      const now = performance.now();
      const dx = e.clientX - drag.lastX;
      const dts = Math.max(0.001, (now - drag.lastT) / 1000);
      x += dx;
      drag.velocity = drag.velocity * 0.6 + (dx / dts) * 0.4; // smoothed, for the release fling
      drag.lastX = e.clientX;
      drag.lastT = now;
    };
    const onUp = () => {
      if (!drag) return;
      momentum = Math.max(-3000, Math.min(3000, drag.velocity));
      drag = null;
      delete strip.dataset.dragging;
    };
    const onEnter = () => (hovering = true);
    const onLeave = () => (hovering = false);
    const onResize = () => {
      copyWidth = track.scrollWidth / 2;
    };

    strip.addEventListener("pointerdown", onDown);
    strip.addEventListener("pointermove", onMove);
    strip.addEventListener("pointerup", onUp);
    strip.addEventListener("pointercancel", onUp);
    strip.addEventListener("pointerenter", onEnter);
    strip.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      strip.removeEventListener("pointerdown", onDown);
      strip.removeEventListener("pointermove", onMove);
      strip.removeEventListener("pointerup", onUp);
      strip.removeEventListener("pointercancel", onUp);
      strip.removeEventListener("pointerenter", onEnter);
      strip.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section aria-label={t.techStrip.label} className="relative h-17 border-y border-white/5 bg-[#0D1426] hidden lg:block lg:sticky lg:top-[calc(100dvh-4.25rem)]">
      <p className="sr-only">
        {t.techStrip.label}: {mixedTechLogos.map((i) => i.title).join(", ")}
      </p>
      <div
        ref={stripRef}
        aria-hidden
        className="flex h-full cursor-grab touch-pan-y items-center overflow-hidden select-none data-[dragging]:cursor-grabbing mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div ref={trackRef} className="flex w-max shrink-0 will-change-transform">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center gap-10 pr-10">
              {logos.map(({ icon, color }) => (
                <li key={icon.slug} title={icon.title} className="shrink-0 transition-transform duration-200 hover:scale-125">
                  <svg viewBox="0 0 24 24" className="pointer-events-none h-7 w-7" fill={color}>
                    <path d={icon.path} />
                  </svg>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
