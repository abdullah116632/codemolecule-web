"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { Icon, WhatsAppIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { serviceIconThemes } from "./sections/Services";
import { getService, services } from "@/lib/services";
import { whatsappLink } from "@/lib/site.config";
import { toBanglaDigits } from "@/lib/format";
import { SpotlightCard } from "./SpotlightCard";

function Eyebrow({ children, className = "text-brand-600" }) {
  return <p className={`eyebrow text-sm font-medium uppercase tracking-[0.18em] ${className}`}>{children}</p>;
}

export function ServiceDetail({ slug }) {
  const { t, lang } = useLanguage();
  const service = getService(slug);
  const index = services.indexOf(service);
  const s = service[lang];
  const d = t.serviceDetail;
  const quoteLink = whatsappLink(`${t.contact.form.intro}\n${t.contact.form.labels.service}: ${s.title}`);
  const others = services.filter((x) => x.slug !== slug);
  const theme = serviceIconThemes[index % serviceIconThemes.length];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="absolute -top-40 right-0 h-128 w-lg rounded-full bg-brand-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            {d.back}
          </Link>

          <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="group">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-[22px] bg-gradient-to-br ${theme.gradient} ${theme.glow} text-white transition-all duration-350 ease-out group-hover:scale-105 group-hover:rotate-6 group-hover:shadow-[0_12px_28px_rgba(37,99,235,0.25)]`}
              >
                <Icon name={service.icon} className="h-10 w-10 text-white" />
              </div>
              <h1 className="font-display mt-8 text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
                {s.title}
              </h1>
              <p className="font-display mt-4 text-xl font-medium text-[#4ADE80] sm:text-2xl">{s.tagline}</p>
              <p className="mt-6 max-w-2xl text-lg text-slate-400">{s.intro}</p>
            </div>

            <SpotlightCard as="aside" className="p-8 shadow-2xl shadow-slate-900/10 lg:sticky lg:top-28">
              <p className="text-sm text-slate-500">{d.from}</p>
              <p className="font-display mt-1 text-4xl font-light tracking-tight text-white">{s.price}</p>
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#151b23] px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-[#4ADE80]">
                  <Icon name="bolt" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">{d.timeline}</p>
                  <p className="font-medium text-white">{s.time}</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {/* Skip the hero's "delivery from 3 days" point — each service shows its own timeline. */}
                {t.hero.points.slice(1).map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[#4ADE80]">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 group btn-fancy btn-shimmer btn-glow-brand inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                <WhatsAppIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>{d.ctaPrimary}</span>
              </a>
              <Link
                href="/#pricing"
                className="mt-3 group btn-fancy inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:border-brand-500 hover:text-brand-600 hover:-translate-y-0.5"
              >
                <span>{d.ctaSecondary}</span>
                <Icon name="arrow" className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </Link>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <Eyebrow>{s.title}</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-light tracking-tight text-white sm:text-4xl">{d.included}</h2>
            <p className="mt-4 text-lg text-slate-400">{d.includedSub}</p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {s.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 90}>
                <SpotlightCard className="h-full p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2DD4BF]/10 text-[#4ADE80] ring-1 ring-white/10">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-5 text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-[15px] text-slate-400">{f.desc}</p>
              </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal for */}
      <section className="bg-transparent py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:px-8">
          <Reveal>
            <Eyebrow className="text-brand-400">{s.title}</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-light tracking-tight sm:text-4xl">{d.idealFor}</h2>
          </Reveal>
          <Reveal delay={100} as="ul" className="flex flex-wrap gap-3">
            {s.idealFor.map((x) => (
              <li
                key={x}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[15px] font-medium text-slate-100"
              >
                {x}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-transparent py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.process.eyebrow}</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-light tracking-tight text-white sm:text-4xl">{d.process}</h2>
          </Reveal>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {t.process.steps.map((step, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <Reveal as="li" key={step.title} delay={i * 80}>
                  <SpotlightCard className="h-full p-6">
                  <span className="font-display text-sm font-light text-brand-600">
                    {lang === "bn" ? toBanglaDigits(num) : num}
                  </span>
                  <h3 className="font-display mt-3 text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-[15px] text-slate-400">{step.desc}</p>
                </SpotlightCard>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <Eyebrow>{t.faq.eyebrow}</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-light tracking-tight text-white sm:text-4xl">{d.faq}</h2>
          </Reveal>
          <Reveal className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {s.faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg font-bold text-white">{item.q}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-slate-400 transition duration-300 group-open:rotate-45 group-open:border-white group-open:bg-white group-open:text-black">
                    <Icon name="plus" className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-3 pr-12 text-slate-400">{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-linear-to-br from-brand-700 via-brand-800 to-ink px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <div className="bg-grid absolute inset-0 opacity-20 invert" />
          <div className="relative">
            <h2 className="font-display text-3xl font-light tracking-tight sm:text-4xl">{d.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100/90">{d.ctaSub}</p>
            <a
              href={quoteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 group btn-fancy btn-shimmer inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 font-bold text-brand-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-[#2DD4BF]/10 hover:shadow-2xl"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#25D366] transition-transform duration-200 group-hover:scale-110" />
              <span>{d.ctaPrimary}</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* Other services */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-light tracking-tight text-white">{d.others}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => {
              const oTheme = serviceIconThemes[services.indexOf(o) % serviceIconThemes.length];
              return (
              <SpotlightCard
                as={Link}
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group flex items-center gap-3 p-4"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${oTheme.gradient} text-white shadow-sm transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md`}
                >
                  <Icon name={o.icon} className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-white group-hover:text-[#4ADE80] transition-colors">{o[lang].title}</span>
              </SpotlightCard>
            )})}
          </div>
        </div>
      </section>
    </>
  );
}
