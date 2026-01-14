import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Hedvig_Letters_Serif, Cormorant_Garamond } from "next/font/google";
import { HeaderWrapper } from "@/components/layout";
import "./globals.css";

// Font serif artistique pour les accents
const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin"],
  variable: "--font-hedvig",
  display: "swap",
});

// Font Cormorant Garamond pour les titres (plus légère)
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kb-com.fr"),
  title: {
    default: "KB-COM | Agence Web à Tours - Création de Sites Internet & SEO",
    template: "%s | KB-COM - Agence Web Tours",
  },
  description:
    "Agence web à Tours spécialisée en création de sites internet, référencement SEO, développement d'applications web et automatisation. Devis gratuit pour votre projet digital.",
  keywords: [
    "agence web tours",
    "création site internet tours",
    "référencement seo tours",
    "développeur web tours",
    "agence digitale tours",
    "site vitrine tours",
    "application web tours",
    "automatisation entreprise",
    "agence web 37",
    "webmaster tours",
  ],
  authors: [{ name: "KB-COM" }],
  creator: "KB-COM",
  publisher: "KB-COM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://kb-com.fr",
    siteName: "KB-COM",
    title: "KB-COM | Agence Web à Tours - Création de Sites Internet & SEO",
    description:
      "Agence web à Tours spécialisée en création de sites internet, référencement SEO, développement d'applications web et automatisation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KB-COM - Agence Web à Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KB-COM | Agence Web à Tours",
    description:
      "Création de sites internet, SEO, applications web et automatisation à Tours.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://kb-com.fr",
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
  verification: {
    google: "votre-code-verification-google",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable} ${hedvig.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        {/* Schema.org LocalBusiness avec AggregateRating */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://kb-com.fr/#business",
              "name": "KB-COM - Agence Web Tours",
              "alternateName": "KB-COM",
              "image": [
                "https://kb-com.fr/og-image.jpg",
                "https://kb-com.fr/logo.png"
              ],
              "description": "Agence web à Tours spécialisée en création de sites internet sur mesure, référencement SEO, développement d'applications web et automatisation. Experts Next.js et React.",
              "url": "https://kb-com.fr",
              "telephone": "+33640631953",
              "email": "contact@kb-com.fr",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rue de Clocheville",
                "addressLocality": "Tours",
                "addressRegion": "Centre-Val de Loire",
                "postalCode": "37000",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 47.394144,
                "longitude": 0.68484
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ],
              "priceRange": "€€",
              "currenciesAccepted": "EUR",
              "paymentAccepted": "Virement bancaire, Carte bancaire",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "20",
                "reviewCount": "20"
              },
              "sameAs": [
                "https://www.linkedin.com/in/kevin-boutant/",
                "https://www.instagram.com/agence.kbcom/"
              ],
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Tours",
                  "sameAs": "https://fr.wikipedia.org/wiki/Tours"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Indre-et-Loire"
                },
                {
                  "@type": "Country",
                  "name": "France"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services KB-COM",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Création de site internet sur mesure",
                      "description": "Sites vitrines et e-commerce performants en Next.js",
                      "url": "https://kb-com.fr/services/creation-site-internet"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Référencement SEO",
                      "description": "Audit SEO, optimisation on-page et stratégie de contenu",
                      "url": "https://kb-com.fr/services/agence-seo"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Développement application web",
                      "description": "Applications web sur mesure, SaaS et dashboards",
                      "url": "https://kb-com.fr/services/application-web"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Automatisation",
                      "description": "Automatisation des processus avec Make, n8n et IA",
                      "url": "https://kb-com.fr/services/automatisation"
                    }
                  }
                ]
              },
              "knowsAbout": [
                "Création de sites internet",
                "Référencement SEO",
                "Next.js",
                "React",
                "Développement web",
                "Automatisation",
                "Make",
                "n8n"
              ],
              "slogan": "Votre agence web à Tours pour des sites exceptionnels",
              "foundingDate": "2021",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": "1-5"
              }
            })
          }}
        />
        <HeaderWrapper />
        {children}
      </body>
    </html>
  );
}
