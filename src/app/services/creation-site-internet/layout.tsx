import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Création de Site Internet à Tours | À partir de 690€",
  description:
    "Création de site internet professionnel à Tours pour artisans et TPE. Sites ultra-rapides en Next.js, design sur-mesure, à partir de 690€. Devis gratuit sous 24h.",
  keywords: [
    "création site internet tours",
    "site internet artisan tours",
    "site web professionnel tours",
    "agence web tours",
    "site vitrine tours",
    "création site internet pas cher",
    "webmaster tours",
    "site internet 37",
    "site internet indre-et-loire",
    "développeur web tours",
  ],
  openGraph: {
    title: "Création de Site Internet à Tours | KB-COM",
    description:
      "Sites internet professionnels pour artisans et TPE d'Indre-et-Loire. Design sur-mesure, ultra-rapide, à partir de 690€.",
    url: "https://kb-com.fr/services/creation-site-internet",
    type: "website",
    images: [
      {
        url: "/og-creation-site.jpg",
        width: 1200,
        height: 630,
        alt: "Création de site internet à Tours - KB-COM",
      },
    ],
  },
  alternates: {
    canonical: "https://kb-com.fr/services/creation-site-internet",
  },
};

export default function CreationSiteInternetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
