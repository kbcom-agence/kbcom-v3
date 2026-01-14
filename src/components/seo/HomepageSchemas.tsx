// Schemas JSON-LD pour la homepage
// Ces schemas améliorent le SEO en permettant à Google de comprendre le contenu

// Schema FAQ pour les rich snippets
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte la création d'un site internet ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le prix varie selon la complexité du projet. Un site vitrine démarre à partir de 1 500€, un site e-commerce à partir de 3 000€, et une application web sur mesure à partir de 5 000€. Nous établissons toujours un devis détaillé et gratuit après analyse de vos besoins."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les délais de réalisation ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En moyenne, comptez 2 à 4 semaines pour un site vitrine, 4 à 8 semaines pour un e-commerce, et 2 à 4 mois pour une application web complexe. Ces délais peuvent varier selon votre réactivité pour les retours et validations."
      }
    },
    {
      "@type": "Question",
      "name": "Proposez-vous la maintenance et l'hébergement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, nous proposons des forfaits de maintenance incluant les mises à jour de sécurité, les sauvegardes régulières, et un support technique réactif. Pour l'hébergement, nous travaillons avec des serveurs haute performance pour garantir la rapidité de votre site."
      }
    },
    {
      "@type": "Question",
      "name": "Mon site sera-t-il bien référencé sur Google ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tous nos sites sont développés avec les meilleures pratiques SEO : structure optimisée, temps de chargement rapide, balises meta, responsive design. Nous proposons également des prestations de référencement avancé pour améliorer votre positionnement."
      }
    },
    {
      "@type": "Question",
      "name": "Travaillez-vous uniquement sur Tours ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, bien que basés à Tours, nous accompagnons des clients partout en France. Grâce aux outils de visioconférence et de collaboration en ligne, la distance n'est plus un obstacle. Nous avons des clients à Paris, Lyon, Bordeaux et dans toute la France."
      }
    },
    {
      "@type": "Question",
      "name": "Puis-je modifier mon site moi-même après la livraison ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument ! Nous développons des sites avec des interfaces d'administration intuitives. Nous vous formons à la prise en main et restons disponibles pour répondre à vos questions. Vous êtes autonome pour les modifications courantes."
      }
    }
  ]
};

// Schema Review pour les témoignages clients
// Note: Ces avis doivent correspondre à de vrais témoignages clients
export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://kb-com.fr/#organization",
  "name": "KB-COM - Agence Web Tours",
  "url": "https://kb-com.fr",
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sophie Martin"
      },
      "reviewBody": "Une équipe réactive et professionnelle. Notre site e-commerce a vu ses ventes augmenter de 40% en 3 mois !",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "KB-COM"
      }
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Pierre Dubois"
      },
      "reviewBody": "Excellent travail sur notre site vitrine. Le design est moderne et le référencement efficace.",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "KB-COM"
      }
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Marie Lambert"
      },
      "reviewBody": "KB-COM a parfaitement compris nos besoins. Le site reflète exactement l'ambiance de notre établissement.",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "KB-COM"
      }
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Thomas Petit"
      },
      "reviewBody": "L'application web développée a révolutionné notre gestion interne. Un gain de temps considérable !",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "KB-COM"
      }
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Claire Bernard"
      },
      "reviewBody": "Très satisfaite du travail réalisé. L'équipe est à l'écoute et les délais sont respectés.",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "KB-COM"
      }
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "François Moreau"
      },
      "reviewBody": "L'automatisation mise en place nous fait gagner plusieurs heures par semaine. Investissement rentabilisé !",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "KB-COM"
      }
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Julie Rousseau"
      },
      "reviewBody": "Un site magnifique qui attire de nouveaux clients chaque semaine. Je recommande vivement !",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "KB-COM"
      }
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Antoine Leroy"
      },
      "reviewBody": "Professionnalisme et créativité au rendez-vous. Notre visibilité en ligne a été transformée.",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "KB-COM"
      }
    }
  ]
};

// Composant pour injecter les schemas dans le DOM
export default function HomepageSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </>
  );
}
