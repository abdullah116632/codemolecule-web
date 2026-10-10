"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Logo } from "./Logo";
import { Icon } from "./Icons";
import { whatsappLink } from "@/lib/site.config";

const sections = ["services", "work", "process", "pricing", "faq"];

function LanguageToggle({ className = "" }) {
  const { lang, setLang } = useLanguage();
  const options = [
    { code: "en", label: "EN" },
    { code: "bn", label: "বাংলা" },
  ];
  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative inline-flex items-center rounded-full border border-slate-200 bg-white p-[3px] sm:p-1 text-[11px] sm:text-sm font-medium shadow-sm ${className}`}
    >
      <span
        aria-hidden
        className={`absolute top-[3px] bottom-[3px] sm:top-1 sm:bottom-1 w-[calc(50%-3px)] sm:w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-300 ${
          lang === "bn" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          aria-pressed={lang === o.code}
          className={`relative z-10 min-w-[40px] sm:min-w-[56px] rounded-full px-2 py-[2px] sm:px-3 sm:py-1 transition-colors ${
            lang === o.code ? "text-white" : "text-slate-600 hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoverState, setHoverState] = useState({ id: null, left: 0, width: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${
        scrolled || open 
          ? "border-white/5 bg-[#050a0e]/80 backdrop-blur-md shadow-sm shadow-black/20" 
          : "border-white/5 bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link 
          href="/" 
          aria-label="Code Molecule home" 
          className="flex items-center shrink min-w-0 translate-y-[2px]"
          onClick={(e) => {
            setOpen(false);
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Logo />
        </Link>

        <nav 
          className="relative hidden items-center lg:flex" 
          aria-label="Main"
          onMouseLeave={() => setHoverState(prev => ({ ...prev, id: null }))}
        >
          {/* Magic Sliding Pill Background */}
          <div 
            className={`absolute left-0 h-[36px] rounded-full bg-[#22C55E]/10 shadow-md ring-1 ring-[#22C55E]/30 transition-all duration-300 ease-out ${hoverState.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{
              width: hoverState.width || 0,
              transform: `translateX(${hoverState.left || 0}px)`,
            }}
          />

          {sections.map((id) => (
            <Link
              key={id}
              href={`/#${id}`}
              onMouseEnter={(e) => setHoverState({ id, left: e.currentTarget.offsetLeft, width: e.currentTarget.offsetWidth })}
              className={`relative z-10 px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${hoverState.id === id ? 'text-white' : 'text-white hover:text-white'}`}
            >
              {t.nav[id]}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <LanguageToggle className="inline-flex" />
          <Link
            href="/#contact"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                const formContainer = document.getElementById("contact-form-container");
                if (formContainer) {
                  const y = formContainer.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: y, behavior: "smooth" });
                } else {
                  const el = document.getElementById("contact");
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }
                const nameInput = document.getElementById("contact-name");
                if (nameInput) {
                  // Small delay ensures scroll finishes or starts before focus lock
                  setTimeout(() => nameInput.focus({ preventScroll: true }), 50);
                }
              }
            }}
            className="group btn-fancy btn-shimmer btn-glow-brand hidden items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-700 md:inline-flex"
          >
            <span>{t.nav.cta}</span>
            <Icon name="arrow" className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Link>
          <button
            type="button"
            className="btn-fancy shrink-0 inline-flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-[#22C55E] hover:text-[#22C55E] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t.nav.menu}
          >
            <Icon name={open ? "close" : "menu"} className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      <div 
        id="mobile-menu" 
        className={`absolute top-[4.5rem] left-0 w-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-[#050a0e] lg:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"}`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-6 sm:px-6" aria-label="Mobile">
          {sections.map((id, index) => (
            <Link
              key={id}
              href={`/#${id}`}
              onClick={() => setOpen(false)}
              className={`font-display border-b border-white/10 py-4 text-2xl font-bold transition-all duration-500 transform ${open ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"} text-white hover:text-white`}
              style={{ transitionDelay: open ? `${100 + index * 50}ms` : "0ms" }}
            >
              {t.nav[id]}
            </Link>
          ))}
          <div 
            className={`mt-8 flex flex-col gap-4 transition-all duration-500 transform ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{ transitionDelay: open ? `${100 + sections.length * 50}ms` : "0ms" }}
          >
            <a
              href={whatsappLink(t.contact.form.intro)}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-fancy btn-shimmer btn-glow-brand inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 font-medium text-white transition hover:bg-brand-700"
            >
              {t.hero.primary}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
