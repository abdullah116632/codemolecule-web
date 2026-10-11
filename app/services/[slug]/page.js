import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceDetail } from "@/components/ServiceDetail";
import { getService, services } from "@/lib/services";

// Only the slugs below exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const description = `${service.en.tagline} ${service.en.summary}`;
  return {
    title: service.en.title,
    description,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${service.en.title} — Code Molecule`,
      description,
      url: `https://codemolecule.com/services/${slug}`,
      siteName: "Code Molecule",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.en.title} — Code Molecule`,
      description,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  if (!getService(slug)) notFound();

  return (
    <>
      <Header />
      <main>
        <ServiceDetail slug={slug} />
      </main>
      <Footer />
    </>
  );
}
