"use client";

import { useRef, useState } from "react";
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

import { MobileCarousel } from "../MobileCarousel";

const icons = ["clipboard", "bolt", "mobile", "key"];

export function WhyUs() {
  const { t } = useLanguage();
  const w = t.why;

  return (
    <section className="relative overflow-hidden bg-transparent py-16 sm:py-24 lg:py-28">
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

        <Reveal className="mt-12 sm:mt-16">
          <MobileCarousel
            dark
            gridClass="lg:grid-cols-4"
          >
            {w.items.map((item, i) => (
              <div key={item.title} className="flex w-full h-full">
                <WhyUsCard item={item} i={i} />
              </div>
            ))}
          </MobileCarousel>
        </Reveal>
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
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#141A28] p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-[#1E2536] hover:shadow-2xl hover:shadow-black/40"
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
      
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
          <Icon name={icons[i]} className="h-6 w-6" />
        </span>
        <h3 className="font-display mt-6 text-lg font-bold text-white group-hover:text-brand-300 transition-colors">{item.title}</h3>
        <p className="mt-3 text-[15px] text-slate-300">{item.desc}</p>
      </div>
    </div>
  );
}
