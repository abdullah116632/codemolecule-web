import { Lato, Manrope, Nunito, Hind_Siliguri, Noto_Sans_Bengali, Anek_Bangla, Baloo_Da_2 } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

/* =========================================================
   FONT THEME SWITCHER
   Comment / Uncomment to switch between Lato (Light), Manrope (Bold), and Nunito (Rounded)
   ========================================================= */
// const FONT_THEME = "lato";
// const FONT_THEME = "manrope";
const FONT_THEME = "nunito";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

const noto = Noto_Sans_Bengali({
  variable: "--font-noto",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const anek = Anek_Bangla({
  variable: "--font-anek",
  subsets: ["bengali"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const baloo = Baloo_Da_2({
  variable: "--font-baloo",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://codemolecule.com"),
  title: "Code Molecule Beautiful websites for your business",
  description:
    "Code Molecule designs and builds fast, modern landing pages, portfolios and business websites in Bangladesh. Fixed prices, fast delivery, you own everything.",
  openGraph: {
    title: "Code Molecule Beautiful websites for your business",
    description: "Landing pages, portfolios and business websites delivered in days.",
    url: "https://codemolecule.com",
    siteName: "Code Molecule",
    type: "website",
  },
};

import AnimatedBackground from "@/components/AnimatedBackground";

export default function RootLayout({ children }) {
  let fontVariables = "";
  if (FONT_THEME === "lato") fontVariables = `${lato.variable} ${noto.variable}`;
  else if (FONT_THEME === "nunito") fontVariables = `${nunito.variable} ${baloo.variable}`;
  else fontVariables = `${manrope.variable} ${hind.variable} ${anek.variable}`;

  return (
    <html lang="en" data-font-theme={FONT_THEME} className={fontVariables}>
      <body className="min-h-screen">
        <AnimatedBackground />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
