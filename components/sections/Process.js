"use client";

import { useLanguage } from "../LanguageProvider";
import { Reveal, SectionHeading } from "../Reveal";
import { toBanglaDigits } from "@/lib/format";

export function Process() {
  const { t, lang } = useLanguage();
  const p = t.process;

  return (
    <section id="process" className="bg-canvas-alt py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} />

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 bg-linear-to-r from-brand-200 via-brand-400 to-brand-200 lg:block"
          />
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5 md:gap-6">
          {p.steps.map((step, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal as="li" key={step.title} delay={i * 100} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
                <span className="font-display relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-canvas-alt bg-white/10 text-lg font-bold text-white shadow-lg">
                  {lang === "bn" ? toBanglaDigits(num) : num}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white lg:mt-5">{step.title}</h3>
                  <p className="mt-2 text-[15px] text-slate-400">{step.desc}</p>
                </div>
              </Reveal>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
