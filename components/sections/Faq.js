"use client";

import { useState } from "react";
import { useLanguage } from "../LanguageProvider";
import { Icon } from "../Icons";
import { Reveal, SectionHeading } from "../Reveal";

export function Faq() {
  const { t } = useLanguage();
  const f = t.faq;
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="pt-16 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={f.eyebrow} title={f.title} center={false} />
        </div>

        <Reveal className="divide-y divide-slate-200 border-y border-slate-200">
          {f.items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            return (
              <div key={i}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-bold text-ink">{item.q}</span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                        isOpen ? "rotate-45 border-ink bg-ink text-white" : "border-slate-300 text-slate-600"
                      }`}
                    >
                      <Icon name="plus" className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden pr-12 text-slate-600">{item.a}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
