"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useLanguage } from "../LanguageProvider";
import { Icon } from "../Icons";
import { Reveal, SectionHeading } from "../Reveal";
import { services } from "@/lib/services";
import { MobileCarousel } from "../MobileCarousel";

export const serviceAccents = [
  "bg-[#2DD4BF]/10 text-[#2DD4BF] ring-[#2DD4BF]/20",
  "bg-sky-500/10 text-sky-400 ring-sky-500/20",
  "bg-blue-500/10 text-blue-400 ring-blue-500/20",
  "bg-indigo-500/10 text-indigo-400 ring-indigo-500/20",
  "bg-white/10 text-slate-300 ring-white/10",
];

/* 3. আইকন টুইস্ট, স্কেল এবং কালার্ড নিয়ন গ্লো থিমস */
export const serviceIconThemes = [
  {
    // 0: Landing Pages -> Cyan to Royal Blue
    gradient: "from-[#38bdf8] to-[#2563eb]",
    glow: "shadow-[0_8px_22px_rgba(37,99,235,0.35)]",
    hoverGlow: "group-hover:shadow-[0_12px_28px_rgba(37,99,235,0.48)]",
  },
  {
    // 1: Portfolio Websites -> Indigo to Purple
    gradient: "from-[#818cf8] to-[#6366f1]",
    glow: "shadow-[0_8px_22px_rgba(99,102,241,0.35)]",
    hoverGlow: "group-hover:shadow-[0_12px_28px_rgba(99,102,241,0.48)]",
  },
  {
    // 2: Business Websites -> Brand / Sapphire Blue
    gradient: "from-[#39699F] to-[#1e40af]",
    glow: "shadow-[0_8px_22px_rgba(57,105,159,0.38)]",
    hoverGlow: "group-hover:shadow-[0_12px_28px_rgba(57,105,159,0.52)]",
  },
  {
    // 3: Web Applications -> Emerald to Teal
    gradient: "from-[#10b981] to-[#0d9488]",
    glow: "shadow-[0_8px_22px_rgba(13,148,136,0.35)]",
    hoverGlow: "group-hover:shadow-[0_12px_28px_rgba(13,148,136,0.48)]",
  },
  {
    // 4: Mobile -> Coral to Rose
    gradient: "from-[#f43f5e] to-[#ea580c]",
    glow: "shadow-[0_8px_22px_rgba(244,63,94,0.35)]",
    hoverGlow: "group-hover:shadow-[0_12px_28px_rgba(244,63,94,0.48)]",
  },
  {
    // 5: Hosting & Maintenance -> Azure / Cyan to Sky
    gradient: "from-[#06b6d4] to-[#0284c7]",
    glow: "shadow-[0_8px_22px_rgba(2,132,199,0.35)]",
    hoverGlow: "group-hover:shadow-[0_12px_28px_rgba(2,132,199,0.48)]",
  },
];

function ServiceCard({ service, item, i, t }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [spotlightOpacity, setSpotlightOpacity] = useState(0);

  // ১. ৩ডি মাউস ট্র্যাকিং টিল্ট লজিক (3D Perspective Tilt on MouseMove)
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 8;
    const rotateY = (x / rect.width) * 8;

    setTilt({ rotateX, rotateY, isHovered: true });
    setSpotlightPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setSpotlightOpacity(1);
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, isHovered: false });
    setSpotlightOpacity(0);
  };

  const theme = serviceIconThemes[i % serviceIconThemes.length];

  return (
    <Link
      ref={cardRef}
      href={`/services/${service.slug}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-8px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: tilt.isHovered
          ? "transform 0.12s ease-out, box-shadow 0.38s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.38s cubic-bezier(0.16, 1, 0.3, 1)"
          : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.38s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.38s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      // ২. কার্ড লিফট-আপ এবং ডিপ শ্যাডো গ্লো (Card Lift & Dynamic Shadow on Hover)
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border-2 border-transparent bg-[#141A28] p-8 transition-all duration-[380ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:border-brand-400 hover:shadow-[0_22px_50px_rgba(57,105,159,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
    >
      {/* Dotted grid spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out"
        style={{
          opacity: spotlightOpacity,
          backgroundImage: `radial-gradient(rgb(34 197 94 / 0.35) 1.5px, transparent 1.5px)`,
          backgroundSize: "22px 22px",
          maskImage: `radial-gradient(260px circle at ${spotlightPos.x}px ${spotlightPos.y}px, black 30%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(260px circle at ${spotlightPos.x}px ${spotlightPos.y}px, black 30%, transparent 100%)`,
        }}
        aria-hidden="true"
      />
      {/* Soft color glow spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out mix-blend-multiply"
        style={{
          opacity: spotlightOpacity,
          background: `radial-gradient(380px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(34, 197, 94, 0.15), transparent 65%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        {/* ৩. আইকন টুইস্ট, স্কেল এবং কালার্ড গ্লো (Icon Twist & Scale Animation) */}
        <div
          className={`flex h-[62px] w-[62px] items-center justify-center rounded-[18px] bg-gradient-to-br ${theme.gradient} ${theme.glow} ${theme.hoverGlow} text-white transition-all duration-350 ease-out group-hover:scale-110 group-hover:rotate-6`}
        >
          <Icon name={service.icon} className="h-7 w-7 text-white" />
        </div>

        <h3 className="font-display mt-6 text-xl font-bold text-white group-hover:text-[#4ADE80] transition-colors">
          {item.title}
        </h3>
        <p className="mt-3 flex-1 text-slate-300 leading-relaxed">{item.summary}</p>

        {/* ৪. লিংক অ্যারো এক্সপ্যানশন মাইক্রো-ইন্টারেকশন (Arrow Gap Slide) */}
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#4ADE80] transition-all duration-200 ease-out group-hover:gap-2.5 group-hover:text-white">
          <span>{t.serviceDetail.viewDetails}</span>
          <Icon name="arrow" className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function Services() {
  const { t, lang } = useLanguage();
  const s = t.services;

  return (
    <section id="services" className="py-10 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

        <Reveal className="mt-12 sm:mt-16">
          <MobileCarousel
            gridClass="lg:grid-cols-3"
          >
            {services.map((service, i) => {
              const item = service[lang];
              return (
                <div key={service.slug} className="flex w-full h-full">
                  <ServiceCard service={service} item={item} i={i} t={t} />
                </div>
              );
            })}
          </MobileCarousel>
        </Reveal>
      </div>
    </section>
  );
}
