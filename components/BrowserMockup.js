"use client";

import { useState, useEffect } from "react";
import { Icon } from "./Icons";

export function BrowserMockup({ card, onSlideChange }) {
  const isBn = card?.speed === "পেজ স্পিড";

  // ============================================================
  // BADGE TOGGLES: true/false করে খুব সহজে অন বা অফ করতে পারেন
  // ============================================================
  const SHOW_LEFT_BADGE = true   // false করলে বাম পাশের ব্যাজ বন্ধ হবে
  const SHOW_RIGHT_BADGE = true  // false করলে ডান পাশের ব্যাজ বন্ধ হবে

  const MOCKUPS = [
    {
      url: "yourportfolio.com",
      badgeLeft: {
        label: isBn ? "ক্লায়েন্ট রেটিং" : "Client rating",
        value: "5.0",
        unit: "★",
        textColor: "text-indigo-600",
        barColor: "bg-indigo-500",
        barWidth: "w-full",
      },
      badgeRight: {
        icon: "portfolio",
        iconBg: "bg-indigo-100 text-indigo-700",
        title: isBn ? "১৫+ লাইভ প্রজেক্ট" : "15+ Live projects",
        subtitle: isBn ? "২ সপ্তাহে হায়ার্ড · রেডি" : "Hired in 2 wks · Ready",
      },
      content: (
        <div className="p-5 h-full flex flex-col justify-between bg-slate-50/80">
          {/* Portfolio Nav */}
          <div className="flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "0ms" }}>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-indigo-600" />
              <div className="h-2.5 w-16 rounded-full bg-slate-800" />
            </div>
            <div className="flex gap-2">
              <div className="h-2 w-8 rounded-full bg-slate-300" />
              <div className="h-2 w-8 rounded-full bg-slate-300" />
              <div className="h-2 w-8 rounded-full bg-slate-300" />
            </div>
          </div>

          {/* Portfolio Hero (Split: Left info, Right portrait) */}
          <div className="grid grid-cols-5 items-center gap-4 pt-1">
            {/* Left Content */}
            <div className="col-span-3 space-y-2">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 border border-emerald-200 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="h-1.5 w-16 rounded-full bg-emerald-700/60" />
              </div>

              {/* Headline & Bio */}
              <div className="space-y-1.5 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <div className="h-3.5 w-full rounded-full bg-slate-800" />
                <div className="h-3.5 w-4/5 rounded-full bg-slate-800" />
                <div className="h-2 w-3/4 rounded-full bg-slate-400 pt-0.5" />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
                <div className="h-6 w-20 rounded-full bg-indigo-600 shadow-sm shadow-indigo-200" />
                <div className="h-6 w-16 rounded-full border border-slate-300 bg-white" />
              </div>
            </div>

            {/* Right Portrait */}
            <div className="col-span-2 flex justify-center relative animate-fade-in-up" style={{ animationDelay: "600ms" }}>
              <div className="relative">
                <div className="h-24 w-24 rounded-2xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-400 p-1 shadow-md shadow-indigo-100 rotate-2 hover:rotate-0 transition-transform">
                  <div className="h-full w-full rounded-xl bg-white flex flex-col items-center justify-end overflow-hidden p-1">
                    <div className="h-14 w-14 rounded-full bg-linear-to-b from-indigo-300 to-indigo-500" />
                  </div>
                </div>
                {/* Floating mini badge on portrait */}
                <div className="absolute -bottom-2 -left-2 bg-white rounded-lg shadow-sm border border-slate-100 px-2 py-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-1.5 w-8 rounded-full bg-slate-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Featured Works / Projects */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "750ms" }}>
              <div className="h-2 w-16 rounded-full bg-slate-400" />
              <div className="h-2 w-10 rounded-full bg-indigo-400/60" />
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div 
                className="group relative h-14 rounded-xl overflow-hidden shadow-xs border border-indigo-100 animate-fade-in-up" 
                style={{ animationDelay: "850ms" }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-sky-400 opacity-85" />
                <div className="absolute bottom-1.5 left-2 right-2 h-1.5 rounded-full bg-white/80" />
              </div>

              <div 
                className="group relative h-14 rounded-xl overflow-hidden shadow-xs border border-purple-100 animate-fade-in-up" 
                style={{ animationDelay: "950ms" }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 opacity-85" />
                <div className="absolute bottom-1.5 left-2 right-2 h-1.5 rounded-full bg-white/80" />
              </div>

              <div 
                className="group relative h-14 rounded-xl overflow-hidden shadow-xs border border-emerald-100 animate-fade-in-up" 
                style={{ animationDelay: "1050ms" }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-emerald-400 to-teal-500 opacity-85" />
                <div className="absolute bottom-1.5 left-2 right-2 h-1.5 rounded-full bg-white/80" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      url: "yourlandingpage.com",
      badgeLeft: {
        label: isBn ? "কনভার্সন রেট" : "Conversion rate",
        value: "+38%",
        unit: "",
        textColor: "text-rose-600",
        barColor: "bg-linear-to-r from-rose-500 to-orange-400",
        barWidth: "w-[88%]",
      },
      badgeRight: {
        icon: "bolt",
        iconBg: "bg-rose-100 text-rose-600",
        title: isBn ? "A/B টেস্টেড ও ফাস্ট" : "A/B tested & fast",
        subtitle: isBn ? "হাই CTR · এসইও রেডি" : "High CTR · SEO ready",
      },
      content: (
        <div className="p-5 h-full flex flex-col justify-between bg-linear-to-b from-rose-50/40 via-white to-orange-50/20">
          {/* Landing Nav */}
          <div className="flex justify-between items-center animate-fade-in-up" style={{ animationDelay: "0ms" }}>
            <div className="flex items-center gap-1.5">
              <div className="h-4 w-4 rounded-md bg-linear-to-tr from-rose-500 to-orange-400 shadow-xs" />
              <div className="h-2.5 w-16 rounded-full bg-slate-800" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-7 rounded-full bg-slate-300" />
              <div className="h-2 w-7 rounded-full bg-slate-300" />
              <div className="h-5 w-16 rounded-full bg-linear-to-r from-rose-500 to-orange-400 shadow-xs" />
            </div>
          </div>

          {/* Landing Hero */}
          <div className="flex flex-col items-center text-center space-y-2 pt-1">
            {/* SaaS Badge */}
            <div className="inline-flex items-center gap-1 rounded-full bg-rose-100/70 px-2 py-0.5 border border-rose-200 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span className="h-1.5 w-20 rounded-full bg-rose-700/70" />
            </div>

            {/* Headline */}
            <div className="space-y-1.5 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="h-4 w-4/5 rounded-full bg-slate-800" />
              <div className="h-2.5 w-3/5 rounded-full bg-slate-400" />
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2 pt-0.5 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
              <div className="h-6 w-24 rounded-full bg-linear-to-r from-rose-500 to-orange-500 shadow-sm shadow-rose-200" />
              <div className="h-6 w-18 rounded-full border border-slate-300 bg-white flex items-center justify-center gap-1">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span className="h-1.5 w-8 rounded-full bg-slate-400" />
              </div>
            </div>
          </div>

          {/* SaaS App Dashboard Preview Card */}
          <div 
            className="w-full rounded-xl bg-white border border-slate-200/80 p-2.5 shadow-sm shadow-slate-200 relative overflow-hidden animate-fade-in-up" 
            style={{ animationDelay: "600ms" }}
          >
            {/* Mini Dashboard Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span className="h-1.5 w-16 rounded-full bg-slate-400" />
              </div>
              <div className="flex gap-1.5">
                <span className="h-3 w-8 rounded-sm bg-slate-100" />
                <span className="h-3 w-8 rounded-sm bg-rose-50 border border-rose-100" />
              </div>
            </div>

            {/* Mini Charts & Stats inside Dashboard */}
            <div className="grid grid-cols-5 gap-2 pt-2 items-center">
              {/* Stat metric */}
              <div className="col-span-2 space-y-1">
                <div className="h-1.5 w-12 rounded-full bg-slate-400" />
                <div className="h-3.5 w-20 rounded-full bg-slate-800" />
                <div className="inline-flex items-center gap-1 rounded-sm bg-emerald-50 px-1 py-0.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  <span className="h-1 w-8 rounded-full bg-emerald-600" />
                </div>
              </div>

              {/* Bar Chart Visualization */}
              <div className="col-span-3 flex items-end justify-end gap-1.5 h-10 pt-1">
                <div className="w-3 h-4 rounded-t-xs bg-rose-200" />
                <div className="w-3 h-6 rounded-t-xs bg-rose-300" />
                <div className="w-3 h-8 rounded-t-xs bg-orange-300" />
                <div className="w-3 h-5 rounded-t-xs bg-rose-300" />
                <div className="w-3 h-9 rounded-t-xs bg-linear-to-t from-rose-500 to-orange-400 shadow-xs" />
                <div className="w-3 h-7 rounded-t-xs bg-orange-400" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      url: "yourbusiness.com",
      badgeLeft: {
        label: card.speed || (isBn ? "পেজ স্পিড" : "Page speed"),
        value: isBn ? "৯৮" : "98",
        unit: "",
        textColor: "text-brand-600",
        barColor: "bg-brand-500",
        barWidth: "w-[98%]",
      },
      badgeRight: {
        icon: "check",
        iconBg: "bg-brand-100 text-brand-700",
        title: card.delivered || (isBn ? "৫ দিনে ডেলিভারি" : "Delivered in 5 days"),
        subtitle: `${card.mobile || (isBn ? "মোবাইল রেডি" : "Mobile ready")} · ${card.live || (isBn ? "লাইভ" : "Live")}`,
      },
      content: (
        <div className="p-5 h-full flex flex-col justify-between bg-white">
          {/* Business Header */}
          <div className="flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "0ms" }}>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-md bg-linear-to-br from-emerald-500 to-teal-700 shadow-xs" />
              <div className="h-3 w-20 rounded-full bg-ink" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-8 rounded-full bg-slate-200" />
              <div className="h-2 w-8 rounded-full bg-slate-200" />
              <div className="h-5 w-16 rounded-full bg-emerald-50 border border-emerald-200" />
            </div>
          </div>

          {/* Hero Split */}
          <div className="grid grid-cols-5 items-center gap-4 pt-1">
            {/* Left Content */}
            <div className="col-span-3 space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-0.5 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="h-1.5 w-16 rounded-full bg-slate-500" />
              </div>

              <div className="space-y-1.5 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <div className="h-3.5 w-full rounded-full bg-slate-800" />
                <div className="h-3.5 w-4/5 rounded-full bg-slate-800" />
                <div className="h-2 w-3/4 rounded-full bg-slate-400" />
              </div>

              <div className="flex gap-2 pt-0.5 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
                <div className="h-6 w-20 rounded-full bg-brand-600 shadow-xs shadow-brand-200" />
                <div className="h-6 w-16 rounded-full border border-slate-300 bg-white" />
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="col-span-2 relative animate-fade-in-up" style={{ animationDelay: "600ms" }}>
              <div className="aspect-square rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-teal-950 p-3 shadow-md shadow-slate-200 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="h-2 w-8 rounded-full bg-emerald-400" />
                  <div className="h-2 w-2 rounded-full bg-white/40" />
                </div>
                {/* Visual curve/bar */}
                <div className="space-y-1.5">
                  <div className="flex items-end gap-1 h-8">
                    <div className="flex-1 h-3 bg-emerald-500/30 rounded-t-xs" />
                    <div className="flex-1 h-5 bg-emerald-500/50 rounded-t-xs" />
                    <div className="flex-1 h-7 bg-emerald-400 rounded-t-xs" />
                    <div className="flex-1 h-4 bg-emerald-500/40 rounded-t-xs" />
                  </div>
                  <div className="h-1.5 w-full bg-white/20 rounded-full" />
                </div>
              </div>

              {/* Floating mini stat pill */}
              <div className="absolute -bottom-2 -left-2 bg-white rounded-lg shadow-sm border border-slate-100 px-2 py-1 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="h-1.5 w-10 rounded-full bg-slate-700" />
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div 
              className="rounded-xl border border-slate-100 p-2.5 bg-slate-50/70 shadow-2xs animate-fade-in-up" 
              style={{ animationDelay: "750ms" }}
            >
              <div className="mb-1.5 h-4 w-4 rounded-md bg-emerald-100 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </div>
              <div className="h-2 w-full rounded-full bg-slate-300" />
              <div className="mt-1 h-1.5 w-2/3 rounded-full bg-slate-200" />
            </div>

            <div 
              className="rounded-xl border border-slate-100 p-2.5 bg-slate-50/70 shadow-2xs animate-fade-in-up" 
              style={{ animationDelay: "900ms" }}
            >
              <div className="mb-1.5 h-4 w-4 rounded-md bg-sky-100 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-sky-600" />
              </div>
              <div className="h-2 w-full rounded-full bg-slate-300" />
              <div className="mt-1 h-1.5 w-2/3 rounded-full bg-slate-200" />
            </div>

            <div 
              className="rounded-xl border border-slate-100 p-2.5 bg-slate-50/70 shadow-2xs animate-fade-in-up" 
              style={{ animationDelay: "1050ms" }}
            >
              <div className="mb-1.5 h-4 w-4 rounded-md bg-amber-100 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-600" />
              </div>
              <div className="h-2 w-full rounded-full bg-slate-300" />
              <div className="mt-1 h-1.5 w-2/3 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      ),
    },
    {
      url: "yourmobileapp.com",
      badgeLeft: {
        label: isBn ? "অ্যাপ স্টোর রেটিং" : "App store rating",
        value: "4.9",
        unit: "★",
        textColor: "text-violet-600",
        barColor: "bg-violet-500",
        barWidth: "w-[96%]",
      },
      badgeRight: {
        icon: "bolt",
        iconBg: "bg-violet-100 text-violet-700",
        title: isBn ? "স্মুথ পারফরম্যান্স" : "Smooth performance",
        subtitle: isBn ? "আইওএস ও অ্যান্ড্রয়েড" : "iOS & Android",
      },
      content: (
        <div className="p-5 sm:p-8 h-full flex flex-col justify-center bg-linear-to-r from-violet-50/80 to-fuchsia-50/30 relative overflow-hidden">
          {/* Decorative background blobs for the landing page */}
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-fuchsia-200/30 blur-2xl" />

          <div className="max-w-[70%] sm:max-w-[60%] space-y-3 relative z-10">
             {/* App Logo/Icon */}
             <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 shadow-md shadow-violet-300 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-white/90" />
             </div>
             
             {/* Landing Page Headline */}
             <div className="space-y-2 pt-1 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
               <div className="h-4 sm:h-5 w-full rounded-full bg-slate-800" />
               <div className="h-4 sm:h-5 w-4/5 rounded-full bg-slate-800" />
             </div>
             
             {/* Landing Page Subtitle */}
             <div className="space-y-1.5 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
               <div className="h-2 sm:h-2.5 w-full rounded-full bg-slate-500" />
               <div className="h-2 sm:h-2.5 w-5/6 rounded-full bg-slate-500" />
             </div>
             
             {/* Download Buttons (App Store / Play Store style) */}
             <div className="flex flex-col sm:flex-row gap-2 pt-3 animate-fade-in-up" style={{ animationDelay: "550ms" }}>
               <div className="h-8 sm:h-9 w-28 sm:w-32 rounded-lg bg-slate-900 flex items-center px-2 gap-2 shadow-sm hover:scale-105 transition-transform">
                  <div className="h-4 w-4 rounded-full bg-white/20" />
                  <div className="space-y-0.5">
                    <div className="h-1 w-8 bg-slate-400 rounded-full" />
                    <div className="h-1.5 w-12 bg-white rounded-full" />
                  </div>
               </div>
               <div className="h-8 sm:h-9 w-28 sm:w-32 rounded-lg bg-slate-900 flex items-center px-2 gap-2 shadow-sm hover:scale-105 transition-transform">
                  <div className="h-4 w-4 rounded-full bg-white/20" />
                  <div className="space-y-0.5">
                    <div className="h-1 w-8 bg-slate-400 rounded-full" />
                    <div className="h-1.5 w-12 bg-white rounded-full" />
                  </div>
               </div>
             </div>
          </div>
        </div>
      ),
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(2); // Start with yourbusiness.com
  const [displayedText, setDisplayedText] = useState(MOCKUPS[2].url);
  const [isTyping, setIsTyping] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(true);

  useEffect(() => {
    let active = true;
    let timer;

    const sleep = (ms) =>
      new Promise((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    const runSequence = async () => {
      let index = 2; // starts with yourbusiness.com

      while (active) {
        // Step 1: Wait 4.5s for user to view the slide with badges visible
        await sleep(4500);
        if (!active) break;

        // Step 2: Smoothly slide badges away
        setBadgeVisible(false);

        // Step 3: Allow full 450ms for badges to visibly slide out
        await sleep(450);
        if (!active) break;

        const nextIndex = (index + 1) % MOCKUPS.length;
        const currentUrl = MOCKUPS[index].url;
        const nextUrl = MOCKUPS[nextIndex].url;

        if (nextIndex === 3) {
          // Skip typing completely for the Mobile App slide
          await sleep(200);
          setIsTyping(false);
        } else {
          // Step 4: Backspace old URL
          setIsTyping(true);
          // If coming from slide 3, the displayed text is actually the URL from slide 2
          const textToBackspace = index === 3 ? MOCKUPS[2].url : currentUrl;
          
          for (let i = textToBackspace.length - 1; i >= 0; i--) {
            setDisplayedText(textToBackspace.slice(0, i));
            await sleep(35);
            if (!active) break;
          }
          if (!active) break;

          // Step 5: Brief pause at blank address bar
          await sleep(200);
          if (!active) break;

          // Step 6: Type new URL
          for (let i = 1; i <= nextUrl.length; i++) {
            setDisplayedText(nextUrl.slice(0, i));
            await sleep(55);
            if (!active) break;
          }
          if (!active) break;

          // Step 7: Brief natural pause as if pressing Enter / navigating
          setIsTyping(false);
          await sleep(180);
          if (!active) break;
        }

        // Step 8: The link opens the website! Switch page content and notify simultaneously
        index = nextIndex;
        setCurrentIndex(nextIndex);
        onSlideChange?.(nextIndex);

        // Step 9: Wait 1000ms for page layout elements to cascade into place
        await sleep(1000);
        if (!active) break;

        // Step 10: Spring the new badges in from the sides
        setBadgeVisible(true);
      }
    };

    runSequence();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const currentMockup = MOCKUPS[currentIndex];

  return (
    <div className="relative mx-auto w-full max-w-lg transition-all duration-500">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-linear-to-tr from-brand-200/60 via-amber-100/60 to-sky-100/60 blur-2xl transition-all duration-700" />

      {/* Browser Window */}
      <div 
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transform: (currentIndex === 3 && !isTyping) ? "scale(0.95) translateY(10px)" : "scale(1) translateY(0)",
          opacity: (currentIndex === 3 && !isTyping) ? 0 : 1,
          pointerEvents: (currentIndex === 3 && !isTyping) ? "none" : "auto",
        }}
      >
        {/* Top Browser Bar */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3 relative z-10">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-1 min-h-[24px] text-xs text-slate-500 ring-1 ring-slate-200">
            <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 text-brand-600" fill="currentColor" aria-hidden>
              <path d="M17 10V8A5 5 0 0 0 7 8v2H5v12h14V10h-2Zm-8 0V8a3 3 0 0 1 6 0v2H9Z" />
            </svg>
            <span className={`border-slate-400 pr-0.5 min-h-[16px] inline-block ${isTyping ? "border-r-2 animate-pulse" : ""}`}>
              {displayedText}&#8203;
            </span>
          </div>
        </div>
        
        {/* Dynamic Web Content */}
        <div className="aspect-[3/2] relative bg-white overflow-hidden">
          <div className="absolute inset-0" key={currentIndex}>
            {currentMockup.content}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. LEFT BADGE (Page Speed / Client Rating / Conversion Rate) */}
      {/* বন্ধ করতে SHOW_LEFT_BADGE = false করুন অথবা এই ব্লকটি কমেন্ট করুন */}
      {/* ============================================================ */}
      {SHOW_LEFT_BADGE && (
        <div className={`animate-float absolute top-12 sm:top-24 z-40 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${currentIndex === 3 ? "left-[22px] sm:left-[30px] lg:left-12" : "-left-4 sm:-left-8 lg:-left-16"}`}>
          <div 
            className="rounded-lg lg:rounded-2xl border border-slate-200 bg-white p-1.5 lg:p-4 shadow-xl min-w-[80px] lg:min-w-[136px] pointer-events-auto origin-left [--badge-scale:0.75] sm:[--badge-scale:0.85] lg:[--badge-scale:1]"
            style={{
              transform: badgeVisible ? `translateX(0) scale(var(--badge-scale))` : "translateX(-50px) scale(0.5)",
              opacity: badgeVisible ? 1 : 0,
              transition: badgeVisible
                ? "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out"
                : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease-in",
            }}
          >
            <p className="text-[8px] lg:text-xs font-medium text-slate-500">{currentMockup.badgeLeft.label}</p>
            <div className="flex items-baseline gap-0.5 lg:gap-1 mt-0.5">
              <span className={`font-display text-sm sm:text-lg lg:text-2xl font-light ${currentMockup.badgeLeft.textColor}`}>
                {currentMockup.badgeLeft.value}
              </span>
              {currentMockup.badgeLeft.unit && (
                <span className={`text-[9px] lg:text-base font-bold ${currentMockup.badgeLeft.textColor}`}>
                  {currentMockup.badgeLeft.unit}
                </span>
              )}
            </div>
            <div className="mt-1 lg:mt-1.5 h-0.5 lg:h-1.5 w-12 lg:w-24 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full ${currentMockup.badgeLeft.barWidth} ${currentMockup.badgeLeft.barColor} transition-all duration-500`} />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. RIGHT BADGE (Delivered in 5 days / Live projects / Fast)  */}
      {/* বন্ধ করতে SHOW_RIGHT_BADGE = false করুন অথবা এই ব্লকটি কমেন্ট করুন */}
      {/* ============================================================ */}
      {SHOW_RIGHT_BADGE && (
        <div 
          className={`animate-float absolute bottom-6 sm:bottom-10 z-40 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${currentIndex === 3 ? "right-0 sm:right-2 lg:-right-2" : "-right-4 sm:-right-12 lg:-right-24"}`}
          style={{ animationDelay: "1.5s" }}
        >
          <div 
            className="flex items-center gap-1.5 lg:gap-3 rounded-lg lg:rounded-2xl border border-slate-200 bg-white px-2 py-1.5 lg:px-4 lg:py-3 shadow-xl pointer-events-auto origin-right [--badge-scale:0.75] sm:[--badge-scale:0.85] lg:[--badge-scale:1]"
            style={{
              transform: badgeVisible ? `translateX(0) scale(var(--badge-scale))` : "translateX(50px) scale(0.5)",
              opacity: badgeVisible ? 1 : 0,
              transition: badgeVisible
                ? "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 150ms, opacity 0.4s ease-out 150ms"
                : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease-in",
            }}
          >
            <span className={`flex h-5 w-5 lg:h-9 lg:w-9 items-center justify-center rounded-full ${currentMockup.badgeRight.iconBg} transition-colors duration-300`}>
              <Icon name={currentMockup.badgeRight.icon} className="h-3 w-3 lg:h-5 lg:w-5" />
            </span>
            <div>
              <p className="text-[9px] sm:text-[10px] lg:text-sm font-bold text-ink transition-colors duration-300 whitespace-nowrap">{currentMockup.badgeRight.title}</p>
              <p className="text-[8px] lg:text-xs text-slate-500 whitespace-nowrap">{currentMockup.badgeRight.subtitle}</p>
            </div>
          </div>
        </div>
      )}
      {/* ============================================================ */}
      {/* 3. MOBILE APP PHONE MOCKUP (Only visible on slide 3) */}
      {/* ============================================================ */}
      <div 
        className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
        style={{
          transform: (currentIndex === 3 && !isTyping) ? "translateY(0) scale(1)" : "translateY(60px) scale(0.8)",
          opacity: (currentIndex === 3 && !isTyping) ? 1 : 0,
          transition: (currentIndex === 3 && !isTyping)
            ? "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 100ms, opacity 0.5s ease-out 100ms"
            : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-in",
        }}
      >
        {/* Phone Frame */}
        <div className="relative h-[280px] w-[140px] sm:h-[340px] sm:w-[170px] rounded-[28px] sm:rounded-[34px] border-[6px] sm:border-[8px] border-slate-900 bg-white shadow-2xl shadow-violet-900/40 overflow-hidden flex flex-col pointer-events-auto">
          {/* Top Notch/Dynamic Island */}
          <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 h-3.5 sm:h-4 w-12 sm:w-14 bg-slate-900 rounded-full z-20" />
          
          {/* App Header */}
          <div className="pt-7 sm:pt-8 pb-2.5 px-3 bg-violet-600 text-white flex items-center justify-between z-10">
             <div className="h-2 w-12 rounded-full bg-violet-300" />
             <div className="h-4 w-4 rounded-full bg-violet-400" />
          </div>

          {/* App Body */}
          <div className="flex-1 p-2 sm:p-3 space-y-2.5 sm:space-y-3 bg-slate-50 overflow-hidden">
             {/* Hero Banner inside App */}
             <div className="h-16 w-full rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-400 p-2 relative overflow-hidden shadow-xs">
                <div className="absolute top-2 left-2 h-2 w-10 rounded-full bg-white/40" />
                <div className="absolute bottom-2 left-2 h-1.5 w-16 rounded-full bg-white/60" />
             </div>
             
             {/* Grid items */}
             <div className="grid grid-cols-2 gap-2">
                <div className="h-10 sm:h-12 rounded-lg bg-white shadow-xs border border-slate-100 flex items-center justify-center">
                   <div className="h-4 w-4 rounded-full bg-sky-200" />
                </div>
                <div className="h-10 sm:h-12 rounded-lg bg-white shadow-xs border border-slate-100 flex items-center justify-center">
                   <div className="h-4 w-4 rounded-full bg-emerald-200" />
                </div>
             </div>

             {/* List item */}
             <div className="h-8 w-full rounded-lg bg-white shadow-xs border border-slate-100 flex items-center px-2 gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-200" />
                <div className="h-1.5 w-12 rounded-full bg-slate-200" />
             </div>
          </div>

          {/* App Bottom Nav */}
          <div className="h-10 bg-white border-t border-slate-100 flex justify-around items-center px-3">
             <div className="h-3.5 w-3.5 rounded-full bg-violet-500 shadow-sm shadow-violet-200" />
             <div className="h-3 w-3 rounded-full bg-slate-200" />
             <div className="h-3 w-3 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
