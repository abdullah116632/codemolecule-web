"use client";

import { useRef, useState } from "react";
import { useLanguage } from "../LanguageProvider";
import { Icon } from "../Icons";
import { Reveal, SectionHeading } from "../Reveal";
import { MobileCarousel } from "../MobileCarousel";

/* ==========================================================================
   SPOTLIGHT EFFECT OPTIONS (Uncomment one option below to use it):
   --------------------------------------------------------------------------
   Option 1: Clean background + Dotted spotlight on cards (Recommended ⭐)
   Option 2: Background dots + Smooth glow on cards (No inner dots)
   Option 3: Background dots + Aligned 28px dot grid on cards
   ========================================================================== */
const SPOTLIGHT_OPTION = 1; // <-- Option 1 ACTIVE

export function Pricing() {
  const { t } = useLanguage();
  const p = t.pricing;

  return (
    <section id="pricing" className="relative overflow-hidden bg-transparent py-16 sm:py-24 lg:py-28">
      {/* Background Dots: Only visible in Option 2 & Option 3 */}
      {(SPOTLIGHT_OPTION === 2 || SPOTLIGHT_OPTION === 3) && (
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[28px_28px] opacity-[0.06]" />
      )}

      {/* Ambient background glow blobs */}
      <div aria-hidden className="absolute top-1/2 left-1/2 h-96 w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/18 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-brand-400/12 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} dark />

        <Reveal className="mt-12 sm:mt-16">
          <MobileCarousel
            dark
            gridClass="lg:grid-cols-3"
          >
            {p.plans.map((plan, i) => (
              <div key={plan.name} className="flex w-full h-full">
                <div className="w-full flex-1 transition-transform duration-300 lg:hover:-translate-y-2">
                  <PricingCard plan={plan} p={p} t={t} />
                </div>
              </div>
            ))}
          </MobileCarousel>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-2xl text-center text-[15px] text-slate-400">{p.note}</Reveal>
      </div>
    </section>
  );
}

function PricingCard({ plan, p, t }) {
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
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-8 backdrop-blur transition-colors duration-300 hover:shadow-2xl hover:shadow-brand-950/60 hover:border-brand-400/40 hover:bg-white/[0.07]"
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
            backgroundImage: `radial-gradient(rgb(34 197 94 / 0.15) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            maskImage: `radial-gradient(250px circle at ${position.x}px ${position.y}px, black 20%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(250px circle at ${position.x}px ${position.y}px, black 20%, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Soft Color Glow Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(${
            SPOTLIGHT_OPTION === 2 ? "450px" : "400px"
          } circle at ${position.x}px ${position.y}px, rgba(34, 197, 94, 0.15), transparent 60%)`,
          mixBlendMode: "screen",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        <h3 className="font-display text-[19px] sm:text-xl font-bold text-white">{plan.name}</h3>
        <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-sm text-slate-300/80">{plan.desc}</p>

        <div className="mt-4 mb-6 sm:mt-6 sm:mb-8 relative">
          {/* Subtle separator */}
          <div className="absolute -bottom-3 sm:-bottom-4 left-0 right-0 h-px bg-white/10" />
          
          <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-slate-400 mb-0.5 sm:mb-1">{p.from}</p>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-display text-[26px] sm:text-4xl font-bold tracking-tight text-white">{plan.price}</span>
            <span className="text-[13px] sm:text-sm text-brand-300/80 font-medium whitespace-nowrap">· {plan.time}</span>
          </div>
        </div>

        <ul className="flex-1 space-y-2.5 sm:space-y-4">
          {plan.features.map((f, idx) => (
            <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-[13px] sm:text-sm">
              <span className="mt-0.5 flex h-[18px] w-[18px] sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                <Icon name="check" className="h-[10px] w-[10px] sm:h-3 sm:w-3" />
              </span>
              <span className="text-slate-200">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#contact"
        onClick={(e) => {
          if (window.location.pathname !== "/") {
            return; // Let the browser navigate to /#contact normally
          }
          e.preventDefault();
          
          const serviceSelect = document.getElementById("contact-service");
          if (serviceSelect) {
            const optionExists = Array.from(serviceSelect.options).some(opt => opt.value === plan.name);
            if (optionExists) {
              serviceSelect.value = plan.name;
            }
          }

          const formContainer = document.getElementById("contact-form-container");
          if (formContainer) {
            const y = formContainer.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
          } else {
            const el = document.getElementById("contact");
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }
          
          const nameInput = document.getElementById("contact-name");
          if (nameInput) {
            // Focus it without disrupting the smooth scroll
            nameInput.focus({ preventScroll: true });
          }
        }}
        className="relative z-20 mt-6 sm:mt-10 inline-flex items-center justify-center gap-2 rounded-full px-5 sm:px-6 py-3 sm:py-3.5 font-medium transition-all duration-200 btn-fancy bg-brand-500 text-white shadow-lg shadow-brand-500/25 hover:bg-brand-400 hover:shadow-brand-500/40 hover:-translate-y-0.5"
      >
        <span>{p.cta}</span>
        <Icon name="arrow" className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      </a>
    </div>
  );
}
