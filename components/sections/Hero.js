"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "../LanguageProvider";
import { Icon, WhatsAppIcon } from "../Icons";
import { whatsappLink } from "@/lib/site.config";


// Dynamically import the heavy 3D orb (client-only, no SSR)


const HERO_VARIATIONS = {
  en: [
    {
      titleA: "We Build",
      titleB: "Digital Products",
      titleC: "that people love",
      subtitle:
        "From custom apps and web platforms to landing pages and portfolios — Code Molecule crafts fast, modern digital experiences for startups and businesses in Bangladesh.",
    },
    {
      titleA: "Beautiful websites",
      titleB: "for your business",
      titleC: "delivered in days",
      subtitle:
        "Code Molecule designs and builds fast, modern landing pages, portfolios and business websites. Everything is agreed upfront — scope, price and timeline — so there are no surprises.",
    },
    {
      titleA: "Stunning apps",
      titleB: "built for iOS",
      titleC: "& Android",
      subtitle:
        "We design and develop beautiful, fast native mobile applications that your users will love. Launch your app on both platforms simultaneously.",
    },
  ],
  bn: [
    {
      titleA: "আমরা বানাই",
      titleB: "ডিজিটাল প্রোডাক্ট",
      titleC: "যা মানুষ ভালোবাসে",
      subtitle:
        "কাস্টম অ্যাপ, ওয়েব প্ল্যাটফর্ম, ল্যান্ডিং পেজ থেকে পোর্টফোলিও — Code Molecule বাংলাদেশের স্টার্টআপ ও ব্যবসার জন্য দ্রুত ও আধুনিক ডিজিটাল এক্সপেরিয়েন্স তৈরি করে।",
    },
    {
      titleA: "আপনার ব্যবসার জন্য",
      titleB: "সুন্দর ওয়েবসাইট",
      titleC: "মাত্র কয়েক দিনে",
      subtitle:
        "Code Molecule দ্রুত ও আধুনিক ল্যান্ডিং পেজ, পোর্টফোলিও আর বিজনেস ওয়েবসাইট ডিজাইন করে বানিয়ে দেয়। কাজের পরিধি, দাম আর সময় — সবকিছু শুরুর আগেই ঠিক করে নেওয়া হয়।",
    },
    {
      titleA: "আপনার বিজনেসের",
      titleB: "জন্য আইওএস ও",
      titleC: "অ্যান্ড্রয়েড অ্যাপ",
      subtitle:
        "আমরা দৃষ্টিনন্দন ও ফাস্ট নেটিভ মোবাইল অ্যাপ্লিকেশন ডিজাইন এবং ডেভেলপ করি। একই সাথে দুটি প্ল্যাটফর্মেই আপনার অ্যাপ লঞ্চ করুন।",
    },
  ],
};

export function Hero() {
  const { t, lang } = useLanguage();
  const h = t.hero;

  const [slide, setSlide] = useState(0);
  const [animPhase, setAnimPhase] = useState("visible");
  const timerRef = useRef(null);

  // Auto-rotate slides every 4 s
  useEffect(() => {
    const langKey = lang === "bn" ? "bn" : "en";
    const count = HERO_VARIATIONS[langKey].length;
    const id = setInterval(() => {
      setAnimPhase("exiting");
      timerRef.current = setTimeout(() => {
        setSlide((s) => (s + 1) % count);
        setAnimPhase("idle-bottom");
        requestAnimationFrame(() => setTimeout(() => setAnimPhase("visible"), 20));
      }, 280);
    }, 4000);
    return () => { clearInterval(id); clearTimeout(timerRef.current); };
  }, [lang]);

  const langKey = lang === "bn" ? "bn" : "en";
  const hero = HERO_VARIATIONS[langKey][slide] || HERO_VARIATIONS[langKey][0];

  const animClass =
    animPhase === "visible"     ? "hero-text-enter"
    : animPhase === "exiting"   ? "hero-text-exit"
    : "hero-text-idle-bottom";

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050a0e] pt-20"
    >
      {/* 3-D Particle Orb — fills the whole section */}


      {/* Soft vignette — center stays clear so ring shows, outer edge fades */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(5,10,14,0.55) 65%, #050a0e 90%)",
        }}
      />

      {/* Subtle inner glow behind text for legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 45% at 50% 50%, rgba(5,10,14,0.75) 0%, transparent 100%)",
        }}
      />

      {/* Centered content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        {/* Fixed height container so buttons don't jump when text changes */}
        <div className="flex w-full flex-col items-center justify-center min-h-[320px] sm:min-h-[280px] md:min-h-[320px] xl:min-h-[380px]">
          {/* Animated heading */}
          <div className={animClass}>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl leading-[1.1]">
              {hero.titleA}{" "}
              <span className="bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#2DD4BF] bg-clip-text text-transparent">
                {hero.titleB}
              </span>
              <br />
              <span className="text-white/90">{hero.titleC}</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg xl:text-xl max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2">
          <a
            href={whatsappLink(t.contact.form.intro)}
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-fancy btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] px-7 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(34,197,94,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(34,197,94,0.7)] sm:text-base"
          >
            <WhatsAppIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            <span>{h.primary}</span>
          </a>
          <a
            href="#pricing"
            className="group btn-fancy inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#22C55E]/60 hover:bg-white/10 sm:text-base"
          >
            <span>{h.secondary}</span>
            <Icon name="arrow" className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </a>
        </div>


      </div>
    </section>
  );
}
