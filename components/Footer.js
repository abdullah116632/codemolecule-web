"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { Logo } from "./Logo";
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "./Icons";
import { site, whatsappLink } from "@/lib/site.config";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const socials = [
    { label: "Facebook", href: site.facebook, icon: <FacebookIcon /> },
    { label: "LinkedIn", href: site.linkedin, icon: <LinkedInIcon /> },
    { label: "Instagram", href: site.instagram, icon: <InstagramIcon /> },
    { label: "WhatsApp", href: whatsappLink(), icon: <WhatsAppIcon /> },
  ];

  return (
    <footer className="relative z-10 bg-[#060D1A] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs text-slate-400">{t.footer.tagline}</p>
          <div className="mt-6 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-white hover:bg-white hover:text-black"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">{t.footer.links}</h3>
          <ul className="mt-4 space-y-2.5 text-slate-400">
            {["services", "work", "pricing", "process", "faq"].map((id) => (
              <li key={id}>
                <Link href={`/#${id}`} className="transition hover:text-brand-300">
                  {t.nav[id]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">{t.footer.contact}</h3>
          <ul className="mt-4 space-y-2.5 text-slate-400">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="transition hover:text-brand-300">
                {site.whatsappDisplay || `+${site.whatsapp}`}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition hover:text-brand-300">
                {site.email}
              </a>
            </li>
            <li>{site.domain}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <p>{t.footer.madeIn} 🇧🇩</p>
        </div>
      </div>
    </footer>
  );
}
