import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatisation Processus Entreprise | Make, n8n & IA",
  description:
    "Automatisation des processus entreprise avec Make, n8n et IA. Gagnez du temps, réduisez les erreurs et boostez votre productivité. Basés à Tours, nous accompagnons les entreprises en France.",
  keywords: [
    "automatisation entreprise",
    "automatisation processus",
    "make automatisation",
    "n8n workflow",
    "automatisation ia",
    "workflow automatisé",
    "gain de temps",
    "productivité entreprise",
    "intégration api",
    "no code automation",
  ],
  openGraph: {
    title: "Automatisation Processus Entreprise | KB-COM",
    description:
      "Automatisez vos processus avec Make, n8n et l'IA. Gagnez du temps et boostez votre productivité grâce à des workflows intelligents.",
    url: "https://kb-com.fr/services/automatisation",
    type: "website",
    images: [
      {
        url: "/og-automatisation.jpg",
        width: 1200,
        height: 630,
        alt: "Automatisation Processus Entreprise - KB-COM",
      },
    ],
  },
  alternates: {
    canonical: "https://kb-com.fr/services/automatisation",
  },
};

// Schema.org Service pour les rich snippets Google
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Automatisation des processus entreprise",
  "name": "Automatisation & Workflows Intelligents",
  "description": "Automatisation des processus entreprise avec Make, n8n et IA. Gagnez du temps, réduisez les erreurs et boostez votre productivité grâce à des workflows intelligents.",
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
    "name": "Offres Automatisation",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Audit des Processus",
        "description": "Cartographie et identification des tâches automatisables"
      },
      {
        "@type": "Offer",
        "name": "Workflow Simple",
        "description": "Automatisation d'un processus unique avec Make ou n8n"
      },
      {
        "@type": "Offer",
        "name": "Automatisation Complète",
        "description": "Suite de workflows interconnectés avec intégration IA"
      }
    ]
  },
  "url": "https://kb-com.fr/services/automatisation"
};

// Schema.org FAQPage pour les rich snippets Google
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quels processus peuvent être automatisés dans mon entreprise ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pratiquement tous les processus répétitifs : facturation, relances clients, synchronisation de données entre outils, génération de rapports, onboarding clients, gestion des leads, publications réseaux sociaux, notifications et alertes, et bien plus encore."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre Make et n8n ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Make (ex-Integromat) est une solution cloud simple à utiliser, idéale pour démarrer. n8n est open-source et peut être auto-hébergé pour plus de contrôle et confidentialité. Nous choisissons l'outil le plus adapté à vos besoins et contraintes."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps puis-je économiser grâce à l'automatisation ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos clients économisent en moyenne 10 à 20 heures par semaine sur les tâches répétitives. Un workflow bien conçu peut remplacer des heures de travail manuel tout en éliminant les erreurs humaines."
      }
    },
    {
      "@type": "Question",
      "name": "L'automatisation va-t-elle remplacer mes employés ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, l'automatisation libère vos équipes des tâches répétitives à faible valeur ajoutée. Ils peuvent ainsi se concentrer sur des missions stratégiques, la relation client, et les tâches créatives qui nécessitent une intervention humaine."
      }
    }
  ]
};

export default function AutomatisationLayout({
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
