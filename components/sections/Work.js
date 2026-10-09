"use client";

import { useLanguage } from "../LanguageProvider";
import { Reveal, SectionHeading } from "../Reveal";
import { SpotlightCard } from "../SpotlightCard";

// Each concept is drawn with CSS only, so there are no placeholder images to replace.
// Swap these for real screenshots once you have client work.
const themes = {
  amber: { bg: "from-amber-400 to-orange-500", soft: "bg-amber-50", dot: "bg-orange-500", layout: "food" },
  violet: { bg: "from-violet-500 to-fuchsia-500", soft: "bg-violet-50", dot: "bg-violet-500", layout: "gallery" },
  emerald: { bg: "from-brand-500 to-teal-600", soft: "bg-brand-50", dot: "bg-brand-600", layout: "edu" },
  sky: { bg: "from-sky-500 to-blue-600", soft: "bg-sky-50", dot: "bg-sky-600", layout: "clinic" },
};

function Preview({ theme, title }) {
  const th = themes[theme];
  return (
    <div className={`aspect-[16/10] overflow-hidden ${th.soft} p-5 sm:p-6 transition-colors duration-300`}>
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/10 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.025] group-hover:shadow-2xl group-hover:shadow-slate-900/20">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
          <span className="text-[11px] font-bold tracking-tight text-ink">{title}</span>
          <div className="flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-slate-200" />
            <span className="h-1.5 w-6 rounded-full bg-slate-200" />
            <span className={`h-1.5 w-8 rounded-full ${th.dot}`} />
          </div>
        </div>

        {th.layout === "gallery" ? (
          <div className="grid flex-1 grid-cols-3 gap-1.5 p-3">
            <div className={`col-span-2 row-span-2 rounded-lg bg-linear-to-br ${th.bg}`} />
            <div className="rounded-lg bg-slate-800" />
            <div className="rounded-lg bg-violet-200" />
            <div className="rounded-lg bg-fuchsia-200" />
            <div className="rounded-lg bg-slate-300" />
            <div className="rounded-lg bg-violet-300" />
          </div>
        ) : (
          <div className={`relative flex flex-1 items-center bg-linear-to-br ${th.bg} px-5`}>
            <div className="w-3/5 space-y-2">
              <div className="h-3 w-full rounded-full bg-white/90" />
              <div className="h-3 w-3/4 rounded-full bg-white/90" />
              <div className="h-1.5 w-full rounded-full bg-white/50" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/50" />
              <div className="mt-3 h-5 w-16 rounded-full bg-white" />
            </div>
            {th.layout === "food" && (
              <div className="absolute right-5 h-20 w-20 rounded-full border-8 border-white/30 bg-white/20 sm:h-24 sm:w-24" />
            )}
            {th.layout === "edu" && (
              <div className="absolute right-5 grid grid-cols-2 gap-1.5">
                {[0, 1, 2, 3].map((n) => (
                  <div key={n} className="h-9 w-9 rounded-lg bg-white/25 sm:h-10 sm:w-10" />
                ))}
              </div>
            )}
            {th.layout === "clinic" && (
              <div className="absolute right-5 w-24 space-y-1.5 rounded-lg bg-white p-2 sm:w-28">
                <div className="h-1.5 w-2/3 rounded-full bg-slate-300" />
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-full rounded bg-sky-500" />
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 p-3">
          {[0, 1, 2].map((n) => (
            <div key={n} className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-slate-200" />
              <div className="h-1.5 w-2/3 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const { t } = useLanguage();
  const w = t.work;

  return (
    <section id="work" className="py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={w.eyebrow} title={w.title} subtitle={w.subtitle} />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {w.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 120}>
              <SpotlightCard as="a" href={item.backupUrl ? `/api/redirect?primary=${encodeURIComponent(item.url)}&backup=${encodeURIComponent(item.backupUrl)}` : item.url} target="_blank" rel="noopener noreferrer" tilt={true} className="cursor-pointer block">
                {item.image ? (
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 p-5 sm:p-6">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover object-top rounded-xl shadow-lg transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.025]" />
                  </div>
                ) : (
                  <Preview theme={item.theme} title={item.title} />
                )}
                <div className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink transition-colors duration-200 group-hover:text-brand-800">{item.title}</h3>
                    <p className="text-[15px] text-slate-600">{item.type}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 transition-colors duration-200 group-hover:border-brand-300 group-hover:bg-brand-50/60 group-hover:text-brand-700 flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    {w.label}
                  </span>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
