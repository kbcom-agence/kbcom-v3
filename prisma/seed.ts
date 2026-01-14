import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

// Données des articles existants
const articlesData = [
  {
    slug: "pourquoi-next-js-est-ideal-pour-votre-site-web",
    title: "Pourquoi Next.js est idéal pour votre",
    titleAccent: " site web",
    excerpt: "Découvrez les avantages de Next.js pour créer des sites web performants, optimisés pour le SEO et offrant une expérience utilisateur exceptionnelle.",
    content: `## Introduction

Next.js s'est imposé comme l'un des frameworks les plus populaires pour le développement web moderne. Mais qu'est-ce qui le rend si spécial pour les entreprises qui cherchent à créer un site web performant ?

## Les avantages clés de Next.js

### 1. Performance optimale

Next.js offre des performances exceptionnelles grâce à plusieurs fonctionnalités intégrées :

- **Rendu côté serveur (SSR)** : Les pages sont pré-rendues sur le serveur, ce qui améliore significativement le temps de chargement initial.
- **Génération statique (SSG)** : Pour les pages qui ne changent pas souvent, Next.js peut générer des fichiers HTML statiques ultra-rapides.
- **Optimisation automatique des images** : Le composant Image de Next.js optimise automatiquement vos images pour différentes tailles d'écran.

### 2. SEO-friendly par défaut

Contrairement aux applications React classiques, Next.js permet aux moteurs de recherche d'indexer facilement votre contenu :

- Les meta tags sont facilement configurables
- Le contenu est visible dès le premier chargement
- Les Core Web Vitals sont naturellement optimisés

### 3. Expérience développeur exceptionnelle

Next.js simplifie le développement avec :

- Un système de routing basé sur les fichiers
- Le hot reloading instantané
- TypeScript intégré
- API Routes pour créer des endpoints backend

## Cas d'usage idéaux

Next.js est particulièrement adapté pour :

- **Sites vitrines** nécessitant un excellent référencement
- **E-commerce** avec des milliers de pages produits
- **Blogs et sites de contenu** avec beaucoup de pages
- **Applications web** complexes nécessitant des performances élevées

## Conclusion

Si vous cherchez à créer un site web moderne, performant et bien référencé, Next.js est probablement le meilleur choix. Chez KB-COM, nous utilisons Next.js pour la majorité de nos projets clients, garantissant ainsi des résultats optimaux.`,
    category: "web",
    categoryLabel: "Développement Web",
    authorName: "Kevin B.",
    authorRole: "Fondateur KB-COM",
    publishedAt: new Date("2024-01-15"),
    readingTime: 5,
    image: "/blog/nextjs.jpg",
    tags: ["Next.js", "React", "Performance", "SEO"],
    featured: true,
  },
  {
    slug: "guide-complet-seo-local-2024",
    title: "Guide complet du SEO local en",
    titleAccent: " 2024",
    excerpt: "Apprenez à optimiser votre présence locale sur Google et attirer plus de clients dans votre zone géographique.",
    content: `## Qu'est-ce que le SEO local ?

Le SEO local est l'ensemble des techniques d'optimisation visant à améliorer la visibilité de votre entreprise dans les résultats de recherche géolocalisés.

## Pourquoi le SEO local est crucial

### Les chiffres parlent d'eux-mêmes

- **46%** des recherches Google ont une intention locale
- **88%** des recherches locales sur mobile aboutissent à un appel ou une visite dans les 24h
- **76%** des personnes qui effectuent une recherche locale visitent un commerce le jour même

## Les piliers du SEO local

### 1. Google Business Profile

Votre fiche Google Business Profile est la pierre angulaire de votre SEO local.

### 2. Citations et annuaires

Assurez-vous que vos informations sont cohérentes sur tous les annuaires.

### 3. Contenu localisé

Créez du contenu qui cible votre zone géographique.

### 4. Avis clients

Les avis sont un facteur de ranking majeur.

## Conclusion

Le SEO local est un levier puissant pour attirer des clients qualifiés.`,
    category: "seo",
    categoryLabel: "SEO",
    authorName: "Kevin B.",
    authorRole: "Fondateur KB-COM",
    publishedAt: new Date("2024-01-10"),
    readingTime: 7,
    image: "/blog/seo-local.jpg",
    tags: ["SEO", "Local", "Google Business", "Marketing"],
    featured: true,
  },
  {
    slug: "automatiser-processus-entreprise-make",
    title: "Automatiser vos processus avec",
    titleAccent: " Make",
    excerpt: "Découvrez comment Make (anciennement Integromat) peut transformer votre productivité en automatisant vos tâches répétitives.",
    content: `## Introduction à Make

Make (anciennement Integromat) est une plateforme d'automatisation no-code qui permet de connecter vos applications et d'automatiser vos workflows.

## Pourquoi automatiser ?

Un employé passe en moyenne 2h par jour sur des tâches répétitives.

## Cas d'usage courants

### 1. Gestion des leads
### 2. Facturation et comptabilité
### 3. Marketing et réseaux sociaux
### 4. Support client

## Conclusion

L'automatisation n'est plus un luxe mais une nécessité pour rester compétitif.`,
    category: "automation",
    categoryLabel: "Automatisation",
    authorName: "Kevin B.",
    authorRole: "Fondateur KB-COM",
    publishedAt: new Date("2024-01-05"),
    readingTime: 6,
    image: "/blog/make-automation.jpg",
    tags: ["Automatisation", "Make", "Productivité", "No-code"],
    featured: false,
  },
  {
    slug: "core-web-vitals-guide-optimisation",
    title: "Core Web Vitals : Guide d'",
    titleAccent: "optimisation",
    excerpt: "Comprenez et optimisez les Core Web Vitals pour améliorer votre SEO et l'expérience utilisateur de votre site.",
    content: `## Que sont les Core Web Vitals ?

Les Core Web Vitals sont un ensemble de métriques définies par Google pour mesurer l'expérience utilisateur d'un site web.

## Les 3 métriques essentielles

### 1. LCP (Largest Contentful Paint)
### 2. FID (First Input Delay)
### 3. CLS (Cumulative Layout Shift)

## Conclusion

Les Core Web Vitals sont incontournables pour un bon référencement.`,
    category: "seo",
    categoryLabel: "SEO",
    authorName: "Kevin B.",
    authorRole: "Fondateur KB-COM",
    publishedAt: new Date("2023-12-28"),
    readingTime: 8,
    image: "/blog/core-web-vitals.jpg",
    tags: ["SEO", "Performance", "Core Web Vitals", "Google"],
    featured: false,
  },
  {
    slug: "choisir-entre-site-vitrine-et-e-commerce",
    title: "Site vitrine ou e-commerce :",
    titleAccent: " comment choisir ?",
    excerpt: "Analysez vos besoins pour déterminer si un site vitrine ou une boutique en ligne est le meilleur choix pour votre entreprise.",
    content: `## Introduction

Quand on lance son activité en ligne, une question fondamentale se pose : faut-il opter pour un site vitrine ou une boutique e-commerce ?

## Site vitrine : présenter votre activité

Un site vitrine est un site web dont l'objectif principal est de présenter votre entreprise.

## E-commerce : vendre en ligne

Un site e-commerce permet à vos clients d'acheter vos produits directement en ligne.

## Conclusion

Il n'y a pas de mauvais choix, seulement celui qui correspond le mieux à votre situation.`,
    category: "business",
    categoryLabel: "Business",
    authorName: "Kevin B.",
    authorRole: "Fondateur KB-COM",
    publishedAt: new Date("2023-12-20"),
    readingTime: 6,
    image: "/blog/vitrine-vs-ecommerce.jpg",
    tags: ["E-commerce", "Site vitrine", "Stratégie", "Business"],
    featured: false,
  },
  {
    slug: "tendances-web-design-2024",
    title: "Les tendances web design à suivre en",
    titleAccent: " 2024",
    excerpt: "Découvrez les tendances design qui marqueront le web cette année et comment les appliquer à votre site.",
    content: `## Introduction

Le web design évolue constamment. En 2024, plusieurs tendances se démarquent.

## 1. Le minimalisme augmenté
## 2. Le glassmorphisme mature
## 3. Les gradients dynamiques
## 4. La typographie hero
## 5. Le dark mode premium
## 6. Les interactions immersives
## 7. L'illustration 3D

## Conclusion

Les tendances 2024 privilégient l'élégance, la subtilité et l'expérience utilisateur.`,
    category: "web",
    categoryLabel: "Développement Web",
    authorName: "Kevin B.",
    authorRole: "Fondateur KB-COM",
    publishedAt: new Date("2023-12-15"),
    readingTime: 7,
    image: "/blog/web-design-2024.jpg",
    tags: ["Web Design", "Tendances", "UI/UX", "2024"],
    featured: true,
  },
]

// Données des réalisations existantes
const realisationsData = [
  {
    slug: "favikon",
    name: "Favikon",
    accentColor: "#EC4899",
    client: "Favikon",
    industry: "SaaS / Influence Marketing",
    year: "2024",
    shortDescription: "Refonte du site pour une image SaaS premium digne d'une startup post-levée.",
    fullDescription: "Favikon est une plateforme SaaS leader dans l'analyse d'influenceurs. Après leur levée de fonds, ils avaient besoin d'un site web à la hauteur de leur ambition : moderne, performant et qui inspire confiance aux grands comptes.",
    challenge: "Le site existant ne reflétait pas le positionnement premium de Favikon. L'UX était confuse, les temps de chargement lents, et le design daté ne correspondait plus à l'image d'une startup en pleine croissance.",
    solution: "Nous avons conçu un nouveau site en Next.js avec un design épuré et moderne. Animations subtiles, gradients élégants, et une architecture optimisée pour la conversion. Le tout avec un score Lighthouse de 98/100.",
    results: ["+45% de taux de conversion", "Temps de chargement divisé par 3", "Score Lighthouse passé de 62 à 98", "+30% de temps passé sur le site"],
    testimonialQuote: "KB-COM a parfaitement compris notre vision. Le nouveau site reflète enfin qui nous sommes : une startup tech ambitieuse.",
    testimonialAuthor: "Thomas Martin",
    testimonialRole: "CEO, Favikon",
    image: "/realisations/favikon.jpg",
    gallery: ["/realisations/favikon-1.jpg", "/realisations/favikon-2.jpg", "/realisations/favikon-3.jpg"],
    tags: ["Site internet", "SaaS", "Design", "Performance"],
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    serviceType: "sites",
    color: "#8B5CF6",
    url: "https://favikon.com",
    featured: true
  },
  {
    slug: "shipup",
    name: "Shipup",
    nameAccent: "up",
    accentColor: "#3B82F6",
    client: "Shipup",
    industry: "Logistique / E-commerce",
    year: "2024",
    shortDescription: "Refonte complète pour un site plus clair, efficace et professionnel.",
    fullDescription: "Shipup révolutionne l'expérience post-achat pour les e-commerçants. Leur solution de suivi de colis et communication client nécessitait un site web qui explique clairement leur valeur ajoutée aux décideurs.",
    challenge: "Le site précédent était trop technique et ne parlait pas aux décideurs business. Les visiteurs ne comprenaient pas rapidement ce que Shipup pouvait leur apporter.",
    solution: "Refonte complète avec un focus sur les bénéfices business plutôt que les features techniques. Storytelling visuel, cas clients mis en avant, et parcours de conversion optimisé.",
    results: ["+60% de demandes de démo qualifiées", "Taux de rebond réduit de 35%", "Durée moyenne de session +2 minutes"],
    image: "/realisations/shipup.jpg",
    gallery: ["/realisations/shipup-1.jpg", "/realisations/shipup-2.jpg"],
    tags: ["Site internet", "Refonte", "UX", "B2B"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    serviceType: "sites",
    color: "#06B6D4",
    url: "https://shipup.co",
    featured: true
  },
  {
    slug: "maison-bleue",
    name: "Maison Bleue",
    nameAccent: "Bleue",
    accentColor: "#3B82F6",
    client: "Maison Bleue",
    industry: "Formation / Conciergerie",
    year: "2023",
    shortDescription: "Refonte complète du site pour renforcer la confiance et faciliter la prise de décision.",
    fullDescription: "Maison Bleue propose des services de conciergerie et de formation premium. Leur ancien site ne transmettait pas le niveau de qualité et de confiance que leurs clients recherchent.",
    challenge: "Le taux de conversion était faible car le site ne rassurait pas suffisamment les visiteurs. Les services n'étaient pas clairement présentés et le parcours utilisateur était confus.",
    solution: "Nouveau design premium avec beaucoup de blanc, photos de qualité, et témoignages clients stratégiquement placés. Parcours simplifié avec des CTAs clairs à chaque étape.",
    results: ["x2 sur les ventes dès le premier mois", "+80% de formulaires de contact remplis", "Note de satisfaction client : 4.9/5"],
    testimonialQuote: "Le retour sur investissement a été immédiat. Nos clients nous disent que le site reflète parfaitement la qualité de nos services.",
    testimonialAuthor: "Marie Dupont",
    testimonialRole: "Fondatrice, Maison Bleue",
    image: "/realisations/maisonbleue.jpg",
    gallery: ["/realisations/maisonbleue-1.jpg", "/realisations/maisonbleue-2.jpg"],
    tags: ["Site internet", "Premium", "Design", "Conversion"],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    serviceType: "sites",
    color: "#F97316",
    featured: true
  },
  {
    slug: "menuiserie-music",
    name: "Menuiserie Music",
    nameAccent: "Music",
    accentColor: "#F97316",
    client: "Menuiserie Music",
    industry: "Artisanat / Menuiserie",
    year: "2024",
    shortDescription: "Site vitrine pour un artisan menuisier local avec référencement SEO optimisé.",
    fullDescription: "Menuiserie Music est un artisan menuisier basé à Tours, spécialisé dans les créations sur-mesure. Il avait besoin d'un site professionnel pour être visible localement et rassurer ses prospects.",
    challenge: "Sans présence en ligne, l'artisan perdait des clients au profit de concurrents mieux référencés. Les prospects ne pouvaient pas voir ses réalisations avant de le contacter.",
    solution: "Site vitrine élégant mettant en valeur son savoir-faire avec une galerie photo de ses réalisations. SEO local optimisé pour apparaître dans les recherches 'menuisier Tours'.",
    results: ["1ère page Google sur 'menuisier Tours'", "+5 demandes de devis par semaine", "ROI atteint en 3 mois"],
    image: "/realisations/menuiserie.jpg",
    gallery: ["/realisations/menuiserie-1.jpg", "/realisations/menuiserie-2.jpg"],
    tags: ["Site vitrine", "Artisan", "SEO Local"],
    technologies: ["Next.js", "Tailwind CSS"],
    serviceType: "sites",
    color: "#D97706",
    featured: false
  },
  {
    slug: "cabinet-avocat-martin",
    name: "Cabinet Martin",
    nameAccent: "Martin",
    accentColor: "#1E40AF",
    client: "Cabinet Martin Avocats",
    industry: "Juridique",
    year: "2023",
    shortDescription: "Site professionnel pour un cabinet d'avocats avec prise de rendez-vous en ligne.",
    fullDescription: "Le Cabinet Martin Avocats souhaitait moderniser son image et faciliter la prise de rendez-vous par ses clients. Un site sobre et professionnel était essentiel pour inspirer confiance.",
    challenge: "L'ancien site était obsolète et ne permettait pas la prise de rendez-vous en ligne. Les clients devaient appeler pendant les heures de bureau, ce qui limitait les prises de contact.",
    solution: "Site moderne avec intégration Calendly pour la prise de rendez-vous 24/7. Design sobre et professionnel, présentation claire des domaines d'expertise.",
    results: ["+40% de prises de rendez-vous", "50% des RDV pris en dehors des heures de bureau", "Temps administratif réduit de 5h/semaine"],
    image: "/realisations/avocat.jpg",
    gallery: ["/realisations/avocat-1.jpg", "/realisations/avocat-2.jpg"],
    tags: ["Site vitrine", "Juridique", "Calendly"],
    technologies: ["Next.js", "Tailwind CSS", "Calendly API"],
    serviceType: "sites",
    color: "#1E40AF",
    featured: false
  },
  {
    slug: "dashboard-logistique",
    name: "LogiTrack",
    nameAccent: "Track",
    accentColor: "#10B981",
    client: "LogiTrack",
    industry: "Logistique",
    year: "2024",
    shortDescription: "Application web de suivi logistique en temps réel pour une PME du transport.",
    fullDescription: "LogiTrack avait besoin d'un outil sur-mesure pour suivre sa flotte de véhicules et optimiser ses tournées. Les solutions du marché étaient trop chères et pas adaptées à leurs besoins spécifiques.",
    challenge: "Excel ne suffisait plus pour gérer la complexité croissante des opérations. Les chauffeurs perdaient du temps à reporter manuellement leurs positions et statuts.",
    solution: "Application web React avec dashboard temps réel. Tracking GPS des véhicules, optimisation automatique des tournées, et alertes en cas de retard.",
    results: ["-25% de temps de trajet moyen", "0 livraison oubliée depuis le déploiement", "ROI atteint en 6 mois"],
    testimonialQuote: "On a enfin une vision claire de nos opérations. L'outil est devenu indispensable au quotidien.",
    testimonialAuthor: "Pierre Durand",
    testimonialRole: "Directeur, LogiTrack",
    image: "/realisations/rh-app.jpg",
    gallery: ["/realisations/logitrack-1.jpg", "/realisations/logitrack-2.jpg"],
    tags: ["Application web", "Dashboard", "Temps réel"],
    technologies: ["React", "Next.js", "PostgreSQL", "Socket.io"],
    serviceType: "apps",
    color: "#10B981",
    featured: false
  },
  {
    slug: "automatisation-agence-immo",
    name: "ImmoAuto",
    nameAccent: "Auto",
    accentColor: "#8B5CF6",
    client: "Agence Immobilière du Centre",
    industry: "Immobilier",
    year: "2024",
    shortDescription: "Automatisation complète de la publication d'annonces sur 15 portails immobiliers.",
    fullDescription: "Cette agence immobilière passait des heures chaque semaine à publier manuellement ses annonces sur différents portails. Ils avaient besoin d'automatiser ce processus chronophage.",
    challenge: "Chaque nouvelle annonce devait être publiée sur 15 portails différents, avec des formats différents. 2 personnes y consacraient 15h/semaine.",
    solution: "Workflow Make.com connectant leur CRM aux 15 portails. Publication automatique avec adaptation des formats, photos optimisées, et suivi des statistiques.",
    results: ["15h/semaine économisées", "Publication en 5 min au lieu de 2h", "0 erreur de saisie"],
    image: "/realisations/immo.jpg",
    gallery: ["/realisations/immo-1.jpg", "/realisations/immo-2.jpg"],
    tags: ["Automatisation", "Immobilier", "Make"],
    technologies: ["Make.com", "APIs", "Webhooks"],
    serviceType: "automation",
    color: "#8B5CF6",
    featured: false
  },
  {
    slug: "restaurant-gastronomique",
    name: "Le Gourmet",
    nameAccent: "Gourmet",
    accentColor: "#DC2626",
    client: "Restaurant Le Gourmet",
    industry: "Restauration",
    year: "2023",
    shortDescription: "Site vitrine élégant avec réservation en ligne pour un restaurant gastronomique.",
    fullDescription: "Le Gourmet, restaurant étoilé de Tours, souhaitait un site à l'image de sa cuisine : raffiné, élégant et mémorable. La réservation en ligne était essentielle pour optimiser le taux de remplissage.",
    challenge: "Le site existant ne reflétait pas le standing du restaurant. La réservation par téléphone limitait les créneaux et générait des no-shows.",
    solution: "Site avec design immersif mettant en valeur la cuisine et l'ambiance. Système de réservation avec confirmation SMS et rappels automatiques pour réduire les no-shows.",
    results: ["-60% de no-shows", "Taux de remplissage passé de 75% à 92%", "+30% de réservations en ligne"],
    image: "/realisations/restaurant.jpg",
    gallery: ["/realisations/restaurant-1.jpg", "/realisations/restaurant-2.jpg"],
    tags: ["Site vitrine", "Restaurant", "Réservation"],
    technologies: ["Next.js", "Tailwind CSS", "API Réservation"],
    serviceType: "sites",
    color: "#DC2626",
    featured: false
  }
]

async function main() {
  console.log('🌱 Début du seed...')

  // Créer l'utilisateur admin
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@kb-com.fr'
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!'

  const hashedPassword = await hash(adminPassword, 12)

  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
        role: 'admin'
      }
    })
    console.log(`✅ Utilisateur admin créé: ${adminEmail}`)
  } else {
    console.log(`ℹ️ Utilisateur admin existe déjà: ${adminEmail}`)
  }

  // Migrer les articles
  console.log('📝 Migration des articles...')
  for (const article of articlesData) {
    const existing = await prisma.article.findUnique({
      where: { slug: article.slug }
    })

    if (!existing) {
      await prisma.article.create({ data: article })
      console.log(`  ✅ Article créé: ${article.slug}`)
    } else {
      console.log(`  ℹ️ Article existe déjà: ${article.slug}`)
    }
  }

  // Migrer les réalisations
  console.log('🎯 Migration des réalisations...')
  for (const realisation of realisationsData) {
    const existing = await prisma.realisation.findUnique({
      where: { slug: realisation.slug }
    })

    if (!existing) {
      await prisma.realisation.create({ data: realisation })
      console.log(`  ✅ Réalisation créée: ${realisation.slug}`)
    } else {
      console.log(`  ℹ️ Réalisation existe déjà: ${realisation.slug}`)
    }
  }

  console.log('✨ Seed terminé!')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
