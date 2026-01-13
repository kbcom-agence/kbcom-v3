import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Réalisations | Sites Web, Applications & Automatisations",
  description:
    "Découvrez nos projets clients : sites internet, applications web sur-mesure et automatisations. Startups, PME et artisans nous font confiance. Basés à Tours.",
  keywords: [
    "portfolio agence web",
    "réalisations sites internet",
    "projets web",
    "études de cas",
    "références clients",
    "agence web tours portfolio",
  ],
  openGraph: {
    title: "Nos Réalisations | KB-COM",
    description:
      "Découvrez nos projets clients : sites internet, applications web sur-mesure et automatisations.",
    url: "https://kb-com.fr/realisations",
    type: "website",
    images: [
      {
        url: "/og-realisations.jpg",
        width: 1200,
        height: 630,
        alt: "Réalisations KB-COM - Agence Web Tours",
      },
    ],
  },
  alternates: {
    canonical: "https://kb-com.fr/realisations",
  },
};

export default function RealisationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
