import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultant SEO Technique | Audit & Référencement Naturel",
  description:
    "Consultant SEO technique pour améliorer votre visibilité Google. Audit SEO complet, optimisation on-page, stratégie de contenu. Basés à Tours, nous accompagnons les entreprises en France.",
  keywords: [
    "consultant seo",
    "audit seo",
    "référencement naturel",
    "seo technique",
    "optimisation google",
    "agence seo",
    "expert seo",
    "visibilité google",
    "trafic organique",
    "positionnement google",
  ],
  openGraph: {
    title: "Consultant SEO Technique | KB-COM",
    description:
      "Améliorez votre visibilité sur Google avec notre expertise SEO technique. Audit complet, optimisation on-page et stratégie de contenu.",
    url: "https://kb-com.fr/services/agence-seo",
    type: "website",
    images: [
      {
        url: "/og-seo.jpg",
        width: 1200,
        height: 630,
        alt: "Consultant SEO Technique - KB-COM",
      },
    ],
  },
  alternates: {
    canonical: "https://kb-com.fr/services/agence-seo",
  },
};

// Schema.org Service pour les rich snippets Google
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Consultant SEO Technique",
  "name": "Référencement SEO & Audit Technique",
  "description": "Consultant SEO technique pour améliorer votre visibilité Google. Audit SEO complet, optimisation on-page, stratégie de contenu et suivi des positions.",
  "provider": {
    "@type": "ProfessionalService",
    "@id": "https://kb-com.fr/#business",
    "name": "KB-COM - Agence Web Tours",
    "url": "https://kb-com.fr"
  },
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Offres SEO",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Audit SEO Complet",
        "description": "Analyse technique approfondie de votre site avec recommandations"
      },
      {
        "@type": "Offer",
        "name": "Optimisation On-Page",
        "description": "Optimisation des balises, du contenu et de la structure technique"
      },
      {
        "@type": "Offer",
        "name": "Suivi SEO Mensuel",
        "description": "Accompagnement continu avec reporting et amélioration continue"
      }
    ]
  },
  "url": "https://kb-com.fr/services/agence-seo"
};

// Schema.org FAQPage pour les rich snippets Google
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien de temps pour voir les premiers résultats SEO ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le SEO est un investissement à moyen/long terme. Les premiers résultats apparaissent généralement entre 3 et 6 mois après le début des optimisations. Cependant, certaines améliorations techniques peuvent avoir un impact visible dès les premières semaines."
      }
    },
    {
      "@type": "Question",
      "name": "Garantissez-vous la première position Google ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, et méfiez-vous de ceux qui le promettent ! Google utilise plus de 200 facteurs de classement que personne ne maîtrise entièrement. Ce que nous garantissons : une méthodologie rigoureuse, des optimisations techniques solides et un suivi transparent de vos positions."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre SEO et SEA ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le SEO (référencement naturel) vise les résultats organiques gratuits de Google. Le SEA (Google Ads) concerne les annonces payantes. Le SEO est un investissement durable, le SEA génère du trafic immédiat mais s'arrête dès que vous stoppez le budget."
      }
    },
    {
      "@type": "Question",
      "name": "Comment se déroule un audit SEO ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notre audit SEO analyse : la structure technique de votre site, la qualité du contenu, les backlinks, les performances de chargement, et votre positionnement actuel. Vous recevez un rapport détaillé avec des recommandations priorisées et un plan d'action."
      }
    }
  ]
};

export default function AgenceSeoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
