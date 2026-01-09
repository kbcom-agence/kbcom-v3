import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { PortfolioCarousel } from '@/components/sections/PortfolioCarousel';
import { TrustBar } from '@/components/sections/TrustBar';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyKBCOM } from '@/components/sections/WhyKBCOM';
import { Stats } from '@/components/sections/Stats';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { generateLocalBusinessSchema } from '@/lib/seo/homepage-schema';

export const metadata: Metadata = {
  title: 'Agence Web à Tours | Création de Sites Internet | KB-COM',
  description:
    'KB-COM, agence web à Tours, crée des sites internet performants et référencés. Expertise Next.js, React, SEO. Devis gratuit sous 24h.',
  keywords: [
    'agence web Tours',
    'création site internet Tours',
    'développement web Tours',
    'agence digitale Tours',
    'SEO Tours',
  ],
  openGraph: {
    title: 'Agence Web à Tours | Création de Sites Internet | KB-COM',
    description:
      'KB-COM, agence web à Tours, crée des sites internet performants et référencés. Expertise Next.js, React, SEO. Devis gratuit sous 24h.',
    url: 'https://kb-com.fr',
    siteName: 'KB-COM',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://kb-com.fr',
  },
};

export default function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      {/* LocalBusiness Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <main>
        <Hero />
        <PortfolioCarousel />
        <TrustBar />
        <ServicesSection />
        <WhyKBCOM />
        <Stats />
        <FinalCTA />
      </main>
    </>
  );
}
