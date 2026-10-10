"use client";

import { useLanguage } from "../LanguageProvider";
import { FacebookIcon, Icon, LinkedInIcon, WhatsAppIcon } from "../Icons";
import { Reveal } from "../Reveal";
import { site, whatsappLink } from "@/lib/site.config";

const inputClass =
  "w-full rounded-xl border border-slate-200/90 bg-slate-50/70 px-4 py-3 text-[15px] text-ink placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 focus:shadow-sm";

export function Contact() {
  const { t, lang } = useLanguage();
  const c = t.contact;
  const f = c.form;

  // No backend needed: the form composes a message and opens WhatsApp with it.
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fields = ["name", "email", "service", "message"]
      .filter((key) => data.get(key)?.trim())
      .map((key) => `${f.labels[key]}: ${data.get(key).trim()}`);
    const text = [f.intro, "", ...fields].join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  const channels = [
    {
      label: c.whatsapp,
      value: site.whatsappDisplay || `+${site.whatsapp}`,
      href: whatsappLink(f.intro),
      icon: <WhatsAppIcon className="h-6 w-6" />,
      gradient: "from-[#25D366] to-[#128C7E]",
      glow: "group-hover:shadow-[0_8px_24px_rgba(37,211,102,0.35)]",
      badge: lang === "bn" ? "দ্রুত উত্তর" : "Fast Reply",
    },
    {
      label: c.facebook,
      value: "fb.com/codemolecule",
      href: site.facebook,
      icon: <FacebookIcon className="h-6 w-6" />,
      gradient: "from-[#1877F2] to-[#0D5EC8]",
      glow: "group-hover:shadow-[0_8px_24px_rgba(24,119,242,0.35)]",
    },
    {
      label: c.linkedin,
      value: "linkedin.com/company/codemolecule",
      href: site.linkedin,
      icon: <LinkedInIcon className="h-6 w-6" />,
      gradient: "from-[#0A66C2] to-[#004182]",
      glow: "group-hover:shadow-[0_8px_24px_rgba(10,102,194,0.35)]",
    },
    {
      label: c.email,
      value: site.email,
      href: `mailto:${site.email}`,
      icon: <Icon name="mail" className="h-6 w-6" />,
      gradient: "from-[#059669] to-[#047857]",
      glow: "group-hover:shadow-[0_8px_24px_rgba(5,150,105,0.35)]",
    },
  ];

  return (
    <section id="contact" className="relative px-3 sm:px-6 pb-16 sm:pb-24 lg:px-8 lg:pb-32">
      {/* Main Glass / Luminous Card */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-emerald-500/20 bg-gradient-to-br from-[#072417] via-[#051810] to-[#030e0a] px-4 sm:px-12 py-10 sm:py-20 lg:p-16 shadow-[0_30px_90px_-20px_rgba(5,24,16,0.7)]">
        {/* Ambient Glowing Orbs */}
        <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-[100px]" />
        <div aria-hidden className="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-teal-400/15 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-emerald-600/15 blur-[90px]" />

        {/* Subtle Dotted Pattern Mesh */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-[size:28px_28px] opacity-80"
        />

        <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left Column: Heading & Interactive Channels */}
          <Reveal className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              {c.eyebrow}
            </div>

            <h2 className="font-display mt-4 text-3xl font-light tracking-tight sm:text-5xl lg:text-[46px] leading-[1.15]">
              {c.title}
            </h2>
            <p className="mt-4 max-w-md text-base sm:text-lg text-emerald-100/75 leading-relaxed">
              {c.subtitle}
            </p>

            <ul className="mt-10 space-y-3.5 w-full">
              {channels.map((ch) => (
                <li key={ch.label}>
                  <a
                    href={ch.href}
                    target={ch.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={`group relative flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:gap-4 sm:p-4 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.09] hover:shadow-xl ${ch.glow}`}
                  >
                    <div
                      className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${ch.gradient} text-white shadow-md transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6`}
                    >
                      {ch.icon}
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
                          {ch.label}
                        </span>
                        {ch.badge && (
                          <span className="rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold text-emerald-300 whitespace-nowrap">
                            {ch.badge}
                          </span>
                        )}
                      </div>
                      <span className="block truncate text-[13px] sm:text-[15px] font-medium text-white/95 transition-colors group-hover:text-emerald-200">
                        {ch.value}
                      </span>
                    </div>
                    <span className="hidden xs:flex flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/40 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:text-emerald-200 group-hover:translate-x-1">
                      <Icon name="arrow" className="h-3 w-3 sm:h-4 sm:w-4" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right Column: High-End Frosted Glass Form */}
          <Reveal delay={120}>
            <div id="contact-form-container" className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-4 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl ring-1 ring-white/5 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
              {/* Inner Ambient Glow */}
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

              {/* Form Card Header */}
              <div className="relative mb-6 border-b border-white/10 pb-5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {lang === "bn" ? "ইনস্ট্যান্ট রেসপন্স" : "Instant Response"}
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                  {lang === "bn" ? "আপনার অর্ডার দিন" : "Start your order"}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                  {lang === "bn" ? "ফর্মটি পূরণ করে WhatsApp-এ আপনার প্রজেক্টটি কনফার্ম করুন" : "Fill the form to confirm your order via WhatsApp"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="relative space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Name input */}
                  <label className="block">
                    <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
                      {f.name} <span className="text-slate-500">*</span>
                    </span>
                    <div className="relative flex items-center rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-200 focus-within:border-white/30 focus-within:bg-white/[0.06] focus-within:ring-4 focus-within:ring-white/10 hover:border-white/20">
                      <span className="pointer-events-none pl-3.5 pr-2 text-slate-400">
                        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <input
                        id="contact-name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder={lang === "bn" ? "আপনার নাম" : "Your full name"}
                        className="w-full bg-transparent py-3 pr-4 text-[15px] text-white placeholder:text-white/30 outline-none"
                      />
                    </div>
                  </label>

                  {/* Email input */}
                  <label className="block">
                    <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
                      {f.email}
                    </span>
                    <div className="relative flex items-center rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-200 focus-within:border-white/30 focus-within:bg-white/[0.06] focus-within:ring-4 focus-within:ring-white/10 hover:border-white/20">
                      <span className="pointer-events-none pl-3.5 pr-2 text-slate-400">
                        <Icon name="mail" className="h-4.5 w-4.5" />
                      </span>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="w-full bg-transparent py-3 pr-4 text-[15px] text-white placeholder:text-white/30 outline-none"
                      />
                    </div>
                  </label>
                </div>

                {/* Service select */}
                <label className="block">
                  <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
                    {f.service} <span className="text-slate-500">*</span>
                  </span>
                  <div className="relative flex items-center rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-200 focus-within:border-white/30 focus-within:bg-white/[0.06] focus-within:ring-4 focus-within:ring-white/10 hover:border-white/20">
                    <span className="pointer-events-none pl-3.5 pr-2 text-slate-400">
                      <Icon name="bolt" className="h-4.5 w-4.5" />
                    </span>
                    <select
                      id="contact-service"
                      name="service"
                      required
                      defaultValue=""
                      className="w-full appearance-none bg-transparent py-3 pr-10 text-[15px] text-white outline-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-slate-900 text-white/50">
                        — {lang === "bn" ? "সার্ভিস নির্বাচন করুন" : "Select a service"} —
                      </option>
                      {f.options.map((o) => (
                        <option key={o} value={o} className="bg-slate-900 text-white py-2">
                          {o}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 text-slate-500">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </label>

                {/* Message textarea */}
                <label className="block">
                  <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
                    {f.message}
                  </span>
                  <div className="relative rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-all duration-200 focus-within:border-white/30 focus-within:bg-white/[0.06] focus-within:ring-4 focus-within:ring-white/10 hover:border-white/20">
                    <textarea
                      name="message"
                      rows={4}
                      placeholder={
                        lang === "bn"
                          ? "আপনার প্রজেক্ট, বাজেট বা সময়সীমা সম্পর্কে লিখুন..."
                          : "Tell us about your requirements, timeline or budget..."
                      }
                      className="w-full bg-transparent text-[15px] text-white placeholder:text-white/30 outline-none resize-none"
                    />
                  </div>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 group btn-fancy btn-shimmer btn-glow-whatsapp relative flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#25D366] via-[#22c55e] to-[#16a34a] px-6 py-4 text-base font-bold text-white shadow-[0_12px_28px_rgba(37,211,102,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(37,211,102,0.55)] active:translate-y-0"
                >
                  <WhatsAppIcon className="h-5.5 w-5.5 transition-transform duration-200 group-hover:scale-110" />
                  <span>{f.submit}</span>
                  <Icon name="arrow" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                {/* Trust & Guarantee Pill Footer */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-center text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {lang === "bn" ? "১৫ মিনিটে রিপ্লাই" : "15-min avg reply"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Icon name="check" className="h-3.5 w-3.5 text-emerald-400" />
                    {lang === "bn" ? "কোনো স্প্যাম নেই" : "No spam guaranteed"}
                  </span>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
