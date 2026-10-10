"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "../LanguageProvider";
import { Icon } from "../Icons";
import { Reveal } from "../Reveal";

const icons = ["clipboard", "bolt", "mobile", "key"];

export function WhyUs() {
  const { t } = useLanguage();
  const w = t.why;
  const frameworkRef = useRef(null);

  useEffect(() => {
    const framework = frameworkRef.current;
    if (!framework) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, progress = null, previous = 0;
    const clamp = (value) => Math.max(0, Math.min(1, value));
    const update = (now) => {
      frame = 0;
      const rect = framework.getBoundingClientRect();
      const raw = clamp((window.innerHeight * 0.9 - rect.top) / (window.innerHeight * 0.6));
      const target = reduced.matches ? 1 : raw * raw * (3 - 2 * raw);
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 1 / 60;
      previous = now;
      if (progress === null || reduced.matches) progress = target;
      else progress += (target - progress) * (1 - Math.exp(-dt * 14));
      if (Math.abs(progress - target) < 0.0005) progress = target;
      framework.dataset.frameworkOpen = String(progress);
      framework.querySelector("[data-framework-line]").style.transform = `scaleY(${progress})`;
      framework.querySelectorAll("[data-framework-row]").forEach((row, index) => {
        const local = reduced.matches ? 1 : clamp((progress - index * 0.065) / (1 - index * 0.065));
        row.style.transform = `translate3d(${(1 - local) * 18}px, ${(1 - local) * 10}px, 0)`;
        row.style.opacity = String(local);
      });
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
    observer.observe(framework);
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
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-80 w-160 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-sm font-medium uppercase tracking-[0.18em] text-brand-400">{w.eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl font-light tracking-tight text-white sm:text-4xl">{w.title}</h2>
        </Reveal>
        <div ref={frameworkRef} data-framework-destination className="relative mx-auto mt-12 max-w-3xl pl-8 sm:mt-16 sm:pl-10">
          <span data-framework-line aria-hidden="true" className="pointer-events-none absolute bottom-12 left-2 top-12 w-px origin-top bg-gradient-to-b from-brand-300/10 via-brand-400/50 to-brand-300/10" />
          <div className="flex flex-col gap-3">
            {w.items.map((item, index) => (
              <div key={item.title} data-framework-row className="relative">
                <span aria-hidden="true" className="pointer-events-none absolute -left-6 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-300/60 bg-[#050a0e] shadow-[0_0_10px_rgba(34,197,94,0.2)] sm:-left-8" />
                <span aria-hidden="true" className="pointer-events-none absolute -left-6 top-1/2 h-px w-6 bg-brand-400/20 sm:-left-8 sm:w-8" />
                <div className="group relative flex min-h-[100px] items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-[#141A28] p-4 transition-colors duration-300 hover:border-brand-400/40 hover:bg-[#1E2536] sm:px-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-colors group-hover:bg-brand-500/25">
                    <Icon name={icons[index]} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
