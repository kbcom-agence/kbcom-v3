import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Création de Site Internet sur Mesure | À partir de 690€",
  description:
    "Création de site internet professionnel pour artisans et TPE en France. Sites ultra-rapides en Next.js, design sur-mesure, à partir de 690€. Basés à Tours, nous intervenons partout.",
  keywords: [
    "création site internet sur mesure",
    "site internet professionnel",
    "création site internet pas cher",
    "site vitrine entreprise",
    "site web next.js",
    "agence web tours",
    "développeur web freelance",
    "site internet artisan",
    "site internet TPE PME",
    "création site web france",
  ],
  openGraph: {
    title: "Création de Site Internet sur Mesure | KB-COM",
    description:
      "Sites internet professionnels pour artisans et TPE en France. Design sur-mesure, ultra-rapide, à partir de 690€. Basés à Tours.",
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

// Schema.org Service pour les rich snippets Google
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Création de site internet sur mesure",
  "name": "Création de Site Internet Professionnel",
  "description": "Création de sites internet sur mesure pour artisans, TPE et PME. Sites vitrines, e-commerce et landing pages développés en Next.js pour des performances optimales.",
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
    "name": "Offres Création de Sites",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Site Vitrine One-Page",
        "description": "Site vitrine simple et efficace sur une seule page",
        "price": "690",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "Site Vitrine Multi-Pages",
        "description": "Site vitrine complet avec plusieurs pages",
        "price": "1500",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "Site E-commerce",
        "description": "Boutique en ligne complète avec gestion des produits",
        "price": "3000",
        "priceCurrency": "EUR"
      }
    ]
  },
  "url": "https://kb-com.fr/services/creation-site-internet"
};

// Schema.org FAQPage pour les rich snippets Google
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien de temps prend la création d'un site internet ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En moyenne, comptez 2 à 4 semaines pour un site vitrine complet. Le délai dépend de la complexité du projet et de votre réactivité pour les retours. Nous travaillons en sprints courts pour vous montrer des résultats rapidement."
      }
    },
    {
      "@type": "Question",
      "name": "Combien coûte un site internet professionnel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos sites démarrent à partir de 690€ pour un site vitrine one-page. Un site vitrine complet multi-pages est généralement entre 1 500€ et 3 000€. Le prix dépend du nombre de pages, des fonctionnalités et du niveau de personnalisation souhaité."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi choisir Next.js plutôt que WordPress ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Next.js offre des performances supérieures (score 100/100 sur Google), une sécurité renforcée (pas de plugins vulnérables), et un meilleur référencement naturel grâce au rendu côté serveur. Votre site charge en moins d'une seconde."
      }
    },
    {
      "@type": "Question",
      "name": "Le site sera-t-il optimisé pour le référencement (SEO) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, tous nos sites sont optimisés SEO dès la conception : structure Hn correcte, balises meta, données structurées Schema.org, vitesse de chargement optimale, et responsive mobile. Nous pouvons aussi vous accompagner sur une stratégie SEO complète."
      }
    }
  ]
};

export default function CreationSiteInternetLayout({
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
