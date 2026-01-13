export interface Realisation {
  id: number;
  slug: string;
  name: string;
  nameAccent?: string;
  accentColor: string;
  client: string;
  industry: string;
  year: string;
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  image: string;
  gallery: string[];
  tags: string[];
  technologies: string[];
  serviceType: "sites" | "seo" | "apps" | "automation";
  color: string;
  url?: string;
  featured: boolean;
}

export const realisations: Realisation[] = [
  {
    id: 1,
    slug: "favikon",
    name: "Favikon",
    nameAccent: "",
    accentColor: "#EC4899",
    client: "Favikon",
    industry: "SaaS / Influence Marketing",
    year: "2024",
    shortDescription: "Refonte du site pour une image SaaS premium digne d'une startup post-levée.",
    fullDescription: "Favikon est une plateforme SaaS leader dans l'analyse d'influenceurs. Après leur levée de fonds, ils avaient besoin d'un site web à la hauteur de leur ambition : moderne, performant et qui inspire confiance aux grands comptes.",
    challenge: "Le site existant ne reflétait pas le positionnement premium de Favikon. L'UX était confuse, les temps de chargement lents, et le design daté ne correspondait plus à l'image d'une startup en pleine croissance.",
    solution: "Nous avons conçu un nouveau site en Next.js avec un design épuré et moderne. Animations subtiles, gradients élégants, et une architecture optimisée pour la conversion. Le tout avec un score Lighthouse de 98/100.",
    results: [
      "+45% de taux de conversion sur les demandes de démo",
      "Temps de chargement divisé par 3",
      "Score Lighthouse passé de 62 à 98",
      "+30% de temps passé sur le site"
    ],
    testimonial: {
      quote: "KB-COM a parfaitement compris notre vision. Le nouveau site reflète enfin qui nous sommes : une startup tech ambitieuse.",
      author: "Thomas Martin",
      role: "CEO, Favikon"
    },
    image: "/realisations/favikon.jpg",
    gallery: [
      "/realisations/favikon-1.jpg",
      "/realisations/favikon-2.jpg",
      "/realisations/favikon-3.jpg"
    ],
    tags: ["Site internet", "SaaS", "Design", "Performance"],
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    serviceType: "sites",
    color: "#8B5CF6",
    url: "https://favikon.com",
    featured: true
  },
  {
    id: 2,
    slug: "shipup",
    name: "Ship",
    nameAccent: "up",
    accentColor: "#3B82F6",
    client: "Shipup",
    industry: "Logistique / E-commerce",
    year: "2024",
    shortDescription: "Refonte complète pour un site plus clair, efficace et professionnel.",
    fullDescription: "Shipup révolutionne l'expérience post-achat pour les e-commerçants. Leur solution de suivi de colis et communication client nécessitait un site web qui explique clairement leur valeur ajoutée aux décideurs.",
    challenge: "Le site précédent était trop technique et ne parlait pas aux décideurs business. Les visiteurs ne comprenaient pas rapidement ce que Shipup pouvait leur apporter.",
    solution: "Refonte complète avec un focus sur les bénéfices business plutôt que les features techniques. Storytelling visuel, cas clients mis en avant, et parcours de conversion optimisé.",
    results: [
      "+60% de demandes de démo qualifiées",
      "Taux de rebond réduit de 35%",
      "Durée moyenne de session +2 minutes"
    ],
    image: "/realisations/shipup.jpg",
    gallery: [
      "/realisations/shipup-1.jpg",
      "/realisations/shipup-2.jpg"
    ],
    tags: ["Site internet", "Refonte", "UX", "B2B"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    serviceType: "sites",
    color: "#06B6D4",
    url: "https://shipup.co",
    featured: true
  },
  {
    id: 3,
    slug: "maison-bleue",
    name: "Maison",
    nameAccent: "Bleue",
    accentColor: "#3B82F6",
    client: "Maison Bleue",
    industry: "Formation / Conciergerie",
    year: "2023",
    shortDescription: "Refonte complète du site pour renforcer la confiance et faciliter la prise de décision.",
    fullDescription: "Maison Bleue propose des services de conciergerie et de formation premium. Leur ancien site ne transmettait pas le niveau de qualité et de confiance que leurs clients recherchent.",
    challenge: "Le taux de conversion était faible car le site ne rassurait pas suffisamment les visiteurs. Les services n'étaient pas clairement présentés et le parcours utilisateur était confus.",
    solution: "Nouveau design premium avec beaucoup de blanc, photos de qualité, et témoignages clients stratégiquement placés. Parcours simplifié avec des CTAs clairs à chaque étape.",
    results: [
      "x2 sur les ventes dès le premier mois",
      "+80% de formulaires de contact remplis",
      "Note de satisfaction client : 4.9/5"
    ],
    testimonial: {
      quote: "Le retour sur investissement a été immédiat. Nos clients nous disent que le site reflète parfaitement la qualité de nos services.",
      author: "Marie Dupont",
      role: "Fondatrice, Maison Bleue"
    },
    image: "/realisations/maisonbleue.jpg",
    gallery: [
      "/realisations/maisonbleue-1.jpg",
      "/realisations/maisonbleue-2.jpg"
    ],
    tags: ["Site internet", "Premium", "Design", "Conversion"],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    serviceType: "sites",
    color: "#F97316",
    featured: true
  },
  {
    id: 4,
    slug: "menuiserie-music",
    name: "Menuiserie",
    nameAccent: "Music",
    accentColor: "#F97316",
    client: "Menuiserie Music",
    industry: "Artisanat / Menuiserie",
    year: "2024",
    shortDescription: "Site vitrine pour un artisan menuisier local avec référencement SEO optimisé.",
    fullDescription: "Menuiserie Music est un artisan menuisier basé à Tours, spécialisé dans les créations sur-mesure. Il avait besoin d'un site professionnel pour être visible localement et rassurer ses prospects.",
    challenge: "Sans présence en ligne, l'artisan perdait des clients au profit de concurrents mieux référencés. Les prospects ne pouvaient pas voir ses réalisations avant de le contacter.",
    solution: "Site vitrine élégant mettant en valeur son savoir-faire avec une galerie photo de ses réalisations. SEO local optimisé pour apparaître dans les recherches 'menuisier Tours'.",
    results: [
      "1ère page Google sur 'menuisier Tours'",
      "+5 demandes de devis par semaine",
      "ROI atteint en 3 mois"
    ],
    image: "/realisations/menuiserie.jpg",
    gallery: [
      "/realisations/menuiserie-1.jpg",
      "/realisations/menuiserie-2.jpg"
    ],
    tags: ["Site vitrine", "Artisan", "SEO Local"],
    technologies: ["Next.js", "Tailwind CSS"],
    serviceType: "sites",
    color: "#D97706",
    featured: false
  },
  {
    id: 5,
    slug: "cabinet-avocat-martin",
    name: "Cabinet",
    nameAccent: "Martin",
    accentColor: "#1E40AF",
    client: "Cabinet Martin Avocats",
    industry: "Juridique",
    year: "2023",
    shortDescription: "Site professionnel pour un cabinet d'avocats avec prise de rendez-vous en ligne.",
    fullDescription: "Le Cabinet Martin Avocats souhaitait moderniser son image et faciliter la prise de rendez-vous par ses clients. Un site sobre et professionnel était essentiel pour inspirer confiance.",
    challenge: "L'ancien site était obsolète et ne permettait pas la prise de rendez-vous en ligne. Les clients devaient appeler pendant les heures de bureau, ce qui limitait les prises de contact.",
    solution: "Site moderne avec intégration Calendly pour la prise de rendez-vous 24/7. Design sobre et professionnel, présentation claire des domaines d'expertise.",
    results: [
      "+40% de prises de rendez-vous",
      "50% des RDV pris en dehors des heures de bureau",
      "Temps administratif réduit de 5h/semaine"
    ],
    image: "/realisations/avocat.jpg",
    gallery: [
      "/realisations/avocat-1.jpg",
      "/realisations/avocat-2.jpg"
    ],
    tags: ["Site vitrine", "Juridique", "Calendly"],
    technologies: ["Next.js", "Tailwind CSS", "Calendly API"],
    serviceType: "sites",
    color: "#1E40AF",
    featured: false
  },
  {
    id: 6,
    slug: "dashboard-logistique",
    name: "Logi",
    nameAccent: "Track",
    accentColor: "#10B981",
    client: "LogiTrack",
    industry: "Logistique",
    year: "2024",
    shortDescription: "Application web de suivi logistique en temps réel pour une PME du transport.",
    fullDescription: "LogiTrack avait besoin d'un outil sur-mesure pour suivre sa flotte de véhicules et optimiser ses tournées. Les solutions du marché étaient trop chères et pas adaptées à leurs besoins spécifiques.",
    challenge: "Excel ne suffisait plus pour gérer la complexité croissante des opérations. Les chauffeurs perdaient du temps à reporter manuellement leurs positions et statuts.",
    solution: "Application web React avec dashboard temps réel. Tracking GPS des véhicules, optimisation automatique des tournées, et alertes en cas de retard.",
    results: [
      "-25% de temps de trajet moyen",
      "0 livraison oubliée depuis le déploiement",
      "ROI atteint en 6 mois"
    ],
    testimonial: {
      quote: "On a enfin une vision claire de nos opérations. L'outil est devenu indispensable au quotidien.",
      author: "Pierre Durand",
      role: "Directeur, LogiTrack"
    },
    image: "/realisations/rh-app.jpg",
    gallery: [
      "/realisations/logitrack-1.jpg",
      "/realisations/logitrack-2.jpg"
    ],
    tags: ["Application web", "Dashboard", "Temps réel"],
    technologies: ["React", "Next.js", "PostgreSQL", "Socket.io"],
    serviceType: "apps",
    color: "#10B981",
    featured: false
  },
  {
    id: 7,
    slug: "automatisation-agence-immo",
    name: "Immo",
    nameAccent: "Auto",
    accentColor: "#8B5CF6",
    client: "Agence Immobilière du Centre",
    industry: "Immobilier",
    year: "2024",
    shortDescription: "Automatisation complète de la publication d'annonces sur 15 portails immobiliers.",
    fullDescription: "Cette agence immobilière passait des heures chaque semaine à publier manuellement ses annonces sur différents portails. Ils avaient besoin d'automatiser ce processus chronophage.",
    challenge: "Chaque nouvelle annonce devait être publiée sur 15 portails différents, avec des formats différents. 2 personnes y consacraient 15h/semaine.",
    solution: "Workflow Make.com connectant leur CRM aux 15 portails. Publication automatique avec adaptation des formats, photos optimisées, et suivi des statistiques.",
    results: [
      "15h/semaine économisées",
      "Publication en 5 min au lieu de 2h",
      "0 erreur de saisie"
    ],
    image: "/realisations/immo.jpg",
    gallery: [
      "/realisations/immo-1.jpg",
      "/realisations/immo-2.jpg"
    ],
    tags: ["Automatisation", "Immobilier", "Make"],
    technologies: ["Make.com", "APIs", "Webhooks"],
    serviceType: "automation",
    color: "#8B5CF6",
    featured: false
  },
  {
    id: 8,
    slug: "restaurant-gastronomique",
    name: "Le",
    nameAccent: "Gourmet",
    accentColor: "#DC2626",
    client: "Restaurant Le Gourmet",
    industry: "Restauration",
    year: "2023",
    shortDescription: "Site vitrine élégant avec réservation en ligne pour un restaurant gastronomique.",
    fullDescription: "Le Gourmet, restaurant étoilé de Tours, souhaitait un site à l'image de sa cuisine : raffiné, élégant et mémorable. La réservation en ligne était essentielle pour optimiser le taux de remplissage.",
    challenge: "Le site existant ne reflétait pas le standing du restaurant. La réservation par téléphone limitait les créneaux et générait des no-shows.",
    solution: "Site avec design immersif mettant en valeur la cuisine et l'ambiance. Système de réservation avec confirmation SMS et rappels automatiques pour réduire les no-shows.",
    results: [
      "-60% de no-shows",
      "Taux de remplissage passé de 75% à 92%",
      "+30% de réservations en ligne"
    ],
    image: "/realisations/restaurant.jpg",
    gallery: [
      "/realisations/restaurant-1.jpg",
      "/realisations/restaurant-2.jpg"
    ],
    tags: ["Site vitrine", "Restaurant", "Réservation"],
    technologies: ["Next.js", "Tailwind CSS", "API Réservation"],
    serviceType: "sites",
    color: "#DC2626",
    featured: false
  }
];

export const getRealisationBySlug = (slug: string): Realisation | undefined => {
  return realisations.find(r => r.slug === slug);
};

export const getFeaturedRealisations = (): Realisation[] => {
  return realisations.filter(r => r.featured);
};

export const getRealisationsByService = (serviceType: Realisation["serviceType"]): Realisation[] => {
  return realisations.filter(r => r.serviceType === serviceType);
};
