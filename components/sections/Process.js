"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "../LanguageProvider";
import { SectionHeading } from "../Reveal";
import { toBanglaDigits } from "@/lib/format";

const drawings = [
  "M21 11.5a8.4 8.4 0 0 1-9 8.4 9.2 9.2 0 0 1-4-.9L3 21l1.5-5A8.5 8.5 0 1 1 21 11.5ZM8 11h8M8 14h5",
  "M9 4H5a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-4M9 3h6v4H9ZM8 12h8M8 16h5",
  "M4 6h14a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13M20 10h-5v5h5M16 12.5h.01",
  "m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16",
  "M14 5c3-3 7-2 7-2s1 4-2 7l-7 7-5-5ZM14 5H8L4 9l5 1M19 10v6l-4 4-1-5M5 15l-2 6 6-2M16 7h.01",
];

export function Process() {
  const { t, lang } = useLanguage();
  const p = t.process;
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, progress = null, previous = 0;
    const clamp = (value) => Math.max(0, Math.min(1, value));
    const update = (now) => {
      frame = 0;
      const rect = timeline.getBoundingClientRect();
      const raw = window.innerWidth >= 1024
        ? clamp((window.innerHeight * 0.92 - rect.top) / (window.innerHeight * 0.6))
        : clamp((window.innerHeight * 0.7 - rect.top) / Math.max(1, rect.height - 48));
      const target = reduced.matches ? 1 : raw;
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 1 / 60;
      previous = now;
      if (progress === null || reduced.matches) progress = target;
      else progress += (target - progress) * (1 - Math.exp(-dt * 12));
      if (Math.abs(progress - target) < 0.0005) progress = target;
      timeline.style.setProperty("--process-progress", String(progress));
      timeline.querySelectorAll("[data-process-step]").forEach((step, index) => {
        // Mobile rows enter individually while retaining one continuous timeline.
        const mobile = window.innerWidth < 1024;
        const row = step.getBoundingClientRect();
        const local = reduced.matches ? 1 : mobile
          ? clamp((window.innerHeight * 0.94 - row.top) / (window.innerHeight * 0.4))
          : clamp((progress - index * 0.12) / 0.4);
        const eased = local * local * (3 - 2 * local);
        step.style.setProperty("--step-entry", String(eased));
        step.classList.toggle("is-active", eased > 0.7);
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
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, [p.steps]);

  return (
    <section id="process" className="relative overflow-hidden bg-canvas-alt py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} />
        <div ref={timelineRef} className="process-timeline relative mt-12 sm:mt-16">
          <div aria-hidden="true" className="process-track"><span className="process-track-fill" /></div>
          <ol className="relative grid gap-5 lg:grid-cols-5 lg:gap-5">
            {p.steps.map((step, index) => {
              const number = String(index + 1).padStart(2, "0");
              return (
                <li key={step.title} data-process-step className={`process-step group relative grid grid-cols-[48px_1fr] gap-4 lg:flex lg:flex-col lg:gap-6 ${index === 4 ? "process-launch" : ""}`}>
                  <div className="process-node relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-canvas-alt text-slate-400 lg:mx-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={drawings[index]} /></svg>
                    <span className="process-node-halo pointer-events-none absolute -inset-1 rounded-[20px] border border-brand-400/20" />
                  </div>
                  <div className="process-card relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 lg:min-h-[208px]">
                    <div aria-hidden="true" className="process-card-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,197,94,0.09),transparent_70%)]" />
                    <span className="relative mb-3 font-mono text-[11px] font-medium tracking-[0.2em] text-brand-300/65">{lang === "bn" ? toBanglaDigits(number) : number}</span>
                    <h3 className="relative font-display text-base font-semibold leading-snug text-white">{step.title}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
                    <span aria-hidden="true" className="process-card-accent absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-brand-400/60 to-transparent" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
