"use client";

import Image from "next/image";
import { useLanguage } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { SpotlightCard } from "../SpotlightCard";
import cplPreview from "@/public/projects/cpl27.png";
import expensePreview from "@/public/projects/expensetracker.png";
import portfolioPreview from "@/public/projects/arman-portfolio.png";

const projects = [
  { title: "CPL 27", type: "Cricket Tournament Web App", url: "https://cpl27.codemolecule.com/", image: cplPreview },
  { title: "Expense Tracker", type: "Web Application", url: "https://expensetracker.codemolecule.com/", image: expensePreview },
  { title: "Arman Hossain", type: "Personal Portfolio", url: "https://myportfolio-three-lyart-69.vercel.app/", image: portfolioPreview },
];

const copy = {
  en: { eyebrow: "Our Work", title: "Projects we are proud of", subtitle: "A selection of our recent live projects showing the style and quality you can expect." },
  bn: {"eyebrow":"আমাদের কাজ","title":"যে প্রজেক্টগুলো নিয়ে আমরা গর্বিত","subtitle":"আমাদের সাম্প্রতিক লাইভ প্রজেক্টের কয়েকটি — কাজের ধরন ও মান দেখে নিন।"},
};

export function Work() {
  const { lang } = useLanguage();
  const heading = copy[lang] || copy.en;
  return (
    <section id="work" className="relative bg-transparent pb-16 pt-8 sm:pb-20 sm:pt-8">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">{heading.eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl font-normal tracking-tight text-white sm:text-4xl">{heading.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">{heading.subtitle}</p>
        </Reveal>
        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3 sm:mt-16">
          {projects.map((project, index) => (
            <Reveal key={project.url} delay={index * 100} className="h-full">
              <SpotlightCard
                as="a"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                tilt={true}
                aria-label={`Visit ${project.title} (opens in a new tab)`}
                className="!bg-white/[0.04] backdrop-blur flex flex-col h-full !border-white/10 hover:!bg-white/[0.07] hover:!border-emerald-400/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 !rounded-[24px]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/[0.02] p-3 sm:p-4 flex items-center justify-center">
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#0B1120] shadow-lg shadow-black/40 border border-white/10 transition-all duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-[1.025] group-hover:shadow-2xl group-hover:shadow-emerald-900/30">
                    <Image src={project.image} alt={`${project.title} live website homepage`} fill sizes="(min-width: 1440px) 442px, (min-width: 1280px) 32vw, (min-width: 768px) 48vw, 95vw" quality={100} className="object-cover object-top" placeholder="blur" />
                  </div>
                </div>
                <div className="relative flex min-h-[110px] flex-1 items-center justify-between gap-3 px-4 py-5 sm:px-6 pointer-events-none">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-emerald-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative min-w-0">
                    <h3 className="font-display text-lg font-bold text-white transition-colors duration-200 group-hover:text-emerald-400">{project.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-slate-300">{project.type}</p>
                  </div>
                  <span className="relative inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/20 px-3 py-1 text-xs font-medium text-emerald-300 transition-colors duration-200 group-hover:border-emerald-400/40 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 pointer-events-auto">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.12)]" />
                    Live
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
