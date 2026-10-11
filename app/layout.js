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

import { site } from "@/lib/site.config";

export const metadata = {
  metadataBase: new URL("https://codemolecule.com"),
  title: {
    default: "Code Molecule — Websites, Web Applications & Mobile Apps",
    template: "%s — Code Molecule",
  },
  description:
    "Code Molecule designs and builds modern websites, custom web applications, and iOS & Android mobile apps. Based in Dhaka, Bangladesh. Fast delivery, fixed pricing, and clean code.",
  keywords: [
    "Code Molecule",
    "CodeMolecule",
    "Code Molecule BD",
    "Code Molecule Bangladesh",
    "web development",
    "software company Bangladesh",
    "software company Dhaka",
    "mobile app development",
    "iOS apps",
    "Android apps",
    "Flutter app development",
    "React Native",
    "web applications",
    "custom software",
    "landing pages",
    "business websites",
    "portfolio websites",
    "web design agency",
  ],
  authors: [{ name: "Code Molecule", url: "https://codemolecule.com" }],
  creator: "Code Molecule",
  publisher: "Code Molecule",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Code Molecule — Websites, Web Applications & Mobile Apps",
    description:
      "Modern websites, custom web applications, and iOS & Android mobile apps. High quality, fixed pricing, and fast delivery for businesses and startups in Bangladesh and worldwide.",
    url: "https://codemolecule.com",
    siteName: "Code Molecule",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    type: "website",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "Code Molecule",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Molecule — Websites, Web Applications & Mobile Apps",
    description:
      "Modern websites, custom web applications, and iOS & Android mobile apps. High quality, fixed pricing, and fast delivery for businesses and startups.",
    images: ["/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "BD-13",
    "geo.placename": "Dhaka",
    "geo.position": "23.8103;90.4125",
    "ICBM": "23.8103, 90.4125",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://codemolecule.com/#organization",
      name: "Code Molecule",
      alternateName: [
        "Code Molecule",
        "CodeMolecule",
        "Code Molecule BD",
        "Code Molecule Bangladesh",
        "Code Molecule Software",
      ],
      legalName: "Code Molecule",
      url: "https://codemolecule.com",
      logo: "https://codemolecule.com/icon-512.png",
      image: "https://codemolecule.com/icon-512.png",
      description:
        "Code Molecule is a digital studio and software company based in Dhaka, Bangladesh, designing and building modern websites, custom web applications, and iOS & Android mobile apps.",
      email: site.email,
      telephone: site.whatsappDisplay,
      sameAs: [site.facebook, site.linkedin, site.instagram],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Bangladesh",
        },
        {
          "@type": "AdministrativeArea",
          name: "Worldwide",
        },
      ],
      foundingLocation: {
        "@type": "Place",
        name: "Dhaka, Bangladesh",
      },
      knowsAbout: [
        "Web Development",
        "Mobile App Development",
        "Android Apps",
        "iOS Apps",
        "Web Applications",
        "Landing Pages",
        "Business Websites",
        "Portfolio Websites",
        "Flutter",
        "React Native",
        "Next.js",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://codemolecule.com/#website",
      url: "https://codemolecule.com",
      name: "Code Molecule",
      alternateName: ["Code Molecule", "CodeMolecule", "Code Molecule BD"],
      publisher: {
        "@id": "https://codemolecule.com/#organization",
      },
      inLanguage: ["en", "bn"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://codemolecule.com/#service",
      name: "Code Molecule",
      alternateName: ["Code Molecule", "CodeMolecule", "Code Molecule BD"],
      url: "https://codemolecule.com",
      parentOrganization: {
        "@id": "https://codemolecule.com/#organization",
      },
      logo: "https://codemolecule.com/icon-512.png",
      image: "https://codemolecule.com/icon-512.png",
      description:
        "Code Molecule designs and builds modern websites, custom web applications, and iOS & Android mobile apps for businesses and startups.",
      email: site.email,
      telephone: site.whatsappDisplay,
      priceRange: "$$",
      currenciesAccepted: "BDT, USD",
      paymentAccepted: "Cash, Bank Transfer, bKash, Nagad",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
      sameAs: [site.facebook, site.linkedin, site.instagram],
      areaServed: {
        "@type": "Country",
        name: "Bangladesh",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Services",
        itemListElement: [
          {
        "@type": "OfferCatalog",
        name: "Websites & Web Development",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Landing Pages",
              description: "Focused, high-converting landing pages for products, offers, and marketing campaigns.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Portfolio Websites",
              description: "Elegant personal portfolio websites for creatives, freelancers, and professionals.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Business Websites",
              description: "Complete multi-page business websites for shops, companies, clinics, and organizations.",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Web Applications",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Web Applications",
              description: "Custom dashboards, booking systems, admin panels, inventory management, and business portals.",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Mobile App Development",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "iOS & Android Mobile Apps",
              description: "Cross-platform mobile applications built with Flutter or React Native published under your store accounts.",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Hosting & Care",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Hosting & Maintenance Care",
              description: "Fast hosting setup, free SSL certificate, daily backups, uptime monitoring, and small monthly updates.",
            },
          },
        ],
      },
    ],
  },
},
],
};

export default function RootLayout({ children }) {
  let fontVariables = "";
  if (FONT_THEME === "lato") fontVariables = `${lato.variable} ${noto.variable}`;
  else if (FONT_THEME === "nunito") fontVariables = `${nunito.variable} ${baloo.variable}`;
  else fontVariables = `${manrope.variable} ${hind.variable} ${anek.variable}`;

  return (
    <html lang="en" data-font-theme={FONT_THEME} className={fontVariables}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
