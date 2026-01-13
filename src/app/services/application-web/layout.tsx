import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Développement Application Web sur Mesure | SaaS & Dashboard",
  description:
    "Développement d'applications web sur mesure : SaaS, dashboards, outils métier. Technologies React & Next.js pour des solutions performantes. Basés à Tours, nous intervenons partout en France.",
  keywords: [
    "développement application web",
    "application web sur mesure",
    "développement saas",
    "création dashboard",
    "outil métier",
    "application react",
    "développeur next.js",
    "plateforme web",
    "logiciel sur mesure",
    "application entreprise",
  ],
  openGraph: {
    title: "Développement Application Web sur Mesure | KB-COM",
    description:
      "Applications web sur mesure : SaaS, dashboards, outils métier. Technologies modernes React & Next.js pour des solutions performantes.",
    url: "https://kb-com.fr/services/application-web",
    type: "website",
    images: [
      {
        url: "/og-application-web.jpg",
        width: 1200,
        height: 630,
        alt: "Développement Application Web - KB-COM",
      },
    ],
  },
  alternates: {
    canonical: "https://kb-com.fr/services/application-web",
  },
};

// Schema.org FAQPage pour les rich snippets Google
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelle est la différence entre un site web et une application web ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un site web est principalement informatif (vitrine, blog). Une application web est un logiciel interactif accessible via navigateur : dashboards, outils de gestion, plateformes SaaS. Elle permet aux utilisateurs d'effectuer des actions et manipuler des données."
      }
    },
    {
      "@type": "Question",
      "name": "Combien coûte le développement d'une application web ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le coût dépend de la complexité : un MVP simple démarre autour de 5 000€, une application métier complète entre 15 000€ et 50 000€, un SaaS complet peut dépasser 100 000€. Nous proposons un développement itératif pour maîtriser votre budget."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi choisir React et Next.js pour mon application ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "React est la technologie leader (utilisée par Facebook, Netflix, Airbnb) offrant performances, maintenabilité et un vaste écosystème. Next.js ajoute le SSR pour un meilleur SEO, des performances optimales et une expérience développeur excellente."
      }
    },
    {
      "@type": "Question",
      "name": "Proposez-vous la maintenance de l'application après livraison ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, nous proposons des contrats de maintenance incluant : corrections de bugs, mises à jour de sécurité, évolutions fonctionnelles, monitoring et support technique. Votre application reste performante et sécurisée dans le temps."
      }
    }
  ]
};

export default function ApplicationWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
