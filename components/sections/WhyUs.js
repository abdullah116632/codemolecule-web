"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageProvider";
import { Icon } from "../Icons";
import { Reveal } from "../Reveal";

/* ==========================================================================
   SPOTLIGHT EFFECT OPTIONS (Uncomment one option below to use it):
   --------------------------------------------------------------------------
   Option 1: Clean background + Dotted spotlight on cards (Recommended ⭐)
   Option 2: Background dots + Smooth glow on cards (No inner dots)
   Option 3: Background dots + Aligned 28px dot grid on cards
   ========================================================================== */
const SPOTLIGHT_OPTION = 1; // <-- Option 1 ACTIVE
// const SPOTLIGHT_OPTION = 2; // <-- Option 2 ACTIVE
// const SPOTLIGHT_OPTION = 3; // <-- Option 3 ACTIVE



const icons = ["clipboard", "bolt", "mobile", "key"];

export function WhyUs() {
  const { t } = useLanguage();
  const w = t.why;
  const shutterRef = useRef(null);

  useEffect(() => {
    const shutter = shutterRef.current;
    if (!shutter) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, progress = null, previous = 0;
    const clamp = (value) => Math.max(0, Math.min(1, value));
    const update = (now) => {
      frame = 0;
      const rect = shutter.getBoundingClientRect();
      const raw = clamp((window.innerHeight * 0.88 - rect.top) / (window.innerHeight * 0.7));
      const target = reduced.matches ? 1 : raw * raw * (3 - 2 * raw);
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 1 / 60;
      previous = now;
      if (progress === null || reduced.matches) progress = target;
      else progress += (target - progress) * (1 - Math.exp(-dt * 14));
      if (Math.abs(progress - target) < 0.0005) progress = target;
      const cards = Array.from(shutter.querySelectorAll("[data-shutter-leaf]"));
      const base = cards[0]?.offsetTop || 0;
      shutter.dataset.curtainOpen = String(progress);
      const angle = (1 - progress) * 86;
      const projected = Math.cos(angle * Math.PI / 180);
      let cursor = base;
      cards.forEach((card) => {
        const shift = cursor - card.offsetTop;
        card.style.transform = `translateY(${shift}px) rotateX(${-angle}deg)`;
        card.style.boxShadow = `0 ${2 + (1 - progress) * 8}px ${4 + (1 - progress) * 12}px rgba(0,0,0,${(1 - progress) * 0.3})`;
        const content = card.querySelector("[data-shutter-content]");
        content.style.opacity = String(Math.max(0, (progress - 0.18) / 0.82));
        cursor += card.offsetHeight * projected + 8;
      });
      const last = cards[cards.length - 1];
      if (last) {
        const bottom = cursor - 8;
        const cord = shutter.querySelector("[data-shutter-cord]");
        const knob = shutter.querySelector("[data-shutter-knob]");
        const tapes = shutter.querySelector("[data-shutter-tapes]");
        cord.style.height = `${bottom + 24}px`;
        knob.style.top = `${bottom + 24}px`;
        tapes.style.height = `${bottom - base}px`;
      }
      if (progress !== target) frame = requestAnimationFrame(update);
    };
    const schedule = () => {
      if (!frame) { previous = performance.now(); frame = requestAnimationFrame(update); }
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(shutter);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      observer.disconnect();
    };
  }, [w.items]);

  return (
    <section id="why-code-molecule" className="relative overflow-hidden bg-transparent py-16 sm:py-24 lg:py-28">
      {/* Background Dots: Only visible in Option 2 & Option 3 */}
      {(SPOTLIGHT_OPTION === 2 || SPOTLIGHT_OPTION === 3) && (
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[28px_28px]" />
      )}

      {/* Ambient background glow blob */}
      <div className="absolute -top-32 left-1/2 h-80 w-160 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-sm font-medium uppercase tracking-[0.18em] text-brand-400">{w.eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl font-light tracking-tight text-white sm:text-4xl">{w.title}</h2>
        </Reveal>

        <div ref={shutterRef} data-shutter-destination className="relative [perspective:1600px] mx-auto mt-12 max-w-3xl px-4 pt-6 sm:mt-16 sm:px-6">
          <div data-shutter-rail aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-0 h-2 rounded-full border border-white/10 bg-[#141A28] shadow-lg" />
          <div data-shutter-tapes aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-6 sm:inset-x-6">
            <span className="absolute left-[22%] top-0 h-full w-px bg-brand-300/30" />
            <span className="absolute right-[22%] top-0 h-full w-px bg-brand-300/30" />
          </div>
          <div className="flex flex-col gap-2">
          {w.items.map((item, i) => (
            <WhyUsCard key={item.title} item={item} i={i} />
          ))}
          </div>
          <span data-shutter-cord aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-full w-px bg-brand-300/60" />
          <span data-shutter-knob aria-hidden="true" className="pointer-events-none absolute right-0 top-full h-2.5 w-2.5 translate-x-1/2 rounded-full bg-brand-400 shadow-[0_0_12px_rgba(34,197,94,0.3)]" />
        </div>
      </div>
    </section>
  );
}

function WhyUsCard({ item, i }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);


  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div ref={ref} data-shutter-leaf className="relative min-h-[104px] w-full origin-top">
      <div
      data-shutter-panel
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="group relative flex min-h-[104px] h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#141A28] p-4 sm:px-5 sm:py-4 backdrop-blur transition duration-300 hover:border-brand-400/40 hover:bg-[#1E2536] hover:shadow-2xl hover:shadow-black/40"
    >
      {/* 
        [OPTION 1 & 3] Dotted Grid Spotlight Layer:
        - In Option 1: 24px grid on clean background
        - In Option 3: 28px grid to align with background
        - In Option 2: Hidden (no inner dots)
      */}
      {(SPOTLIGHT_OPTION === 1 || SPOTLIGHT_OPTION === 3) && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out"
          style={{
            opacity,
            backgroundImage: `radial-gradient(rgb(34 197 94 / 0.4) 1px, transparent 1px)`,
            backgroundSize: SPOTLIGHT_OPTION === 3 ? "28px 28px" : "24px 24px",
            maskImage: `radial-gradient(250px circle at ${position.x}px ${position.y}px, black 20%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(250px circle at ${position.x}px ${position.y}px, black 20%, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* 
        [ALL OPTIONS] Soft Color Glow Spotlight:
        - In Option 2: Slightly wider radius & opacity for smooth spotlight look
      */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(${
            SPOTLIGHT_OPTION === 2 ? "450px" : "400px"
          } circle at ${position.x}px ${position.y}px, rgba(34, 197, 94, ${
            SPOTLIGHT_OPTION === 2 ? "0.14" : "0.08"
          }), transparent 60%)`,
          mixBlendMode: "screen",
        }}
        aria-hidden="true"
      />
      
      <div data-shutter-content className="relative z-10 flex items-center gap-4 h-full pointer-events-none">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
          <Icon name={icons[i]} className="h-5 w-5" />
        </span>
        <div className="min-w-0">
        <h3 className="font-display text-base font-bold text-white group-hover:text-brand-300 transition-colors">{item.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{item.desc}</p>
        </div>
      </div>
      </div>

    </div>
  );
}
