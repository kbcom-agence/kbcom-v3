export interface Article {
  id: number;
  slug: string;
  title: string;
  titleAccent?: string;
  excerpt: string;
  content: string;
  category: "seo" | "web" | "automation" | "business";
  categoryLabel: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readingTime: number;
  image: string;
  tags: string[];
  featured: boolean;
}

export const articles: Article[] = [
  {
    id: 1,
    slug: "pourquoi-next-js-est-ideal-pour-votre-site-web",
    title: "Pourquoi Next.js est idéal pour votre",
    titleAccent: " site web",
    excerpt: "Découvrez les avantages de Next.js pour créer des sites web performants, optimisés pour le SEO et offrant une expérience utilisateur exceptionnelle.",
    content: `
## Introduction

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

Si vous cherchez à créer un site web moderne, performant et bien référencé, Next.js est probablement le meilleur choix. Chez KB-COM, nous utilisons Next.js pour la majorité de nos projets clients, garantissant ainsi des résultats optimaux.
    `,
    category: "web",
    categoryLabel: "Développement Web",
    author: {
      name: "Kevin B.",
      role: "Fondateur KB-COM",
    },
    publishedAt: "2024-01-15",
    readingTime: 5,
    image: "/blog/nextjs.jpg",
    tags: ["Next.js", "React", "Performance", "SEO"],
    featured: true,
  },
  {
    id: 2,
    slug: "guide-complet-seo-local-2024",
    title: "Guide complet du SEO local en",
    titleAccent: " 2024",
    excerpt: "Apprenez à optimiser votre présence locale sur Google et attirer plus de clients dans votre zone géographique.",
    content: `
## Qu'est-ce que le SEO local ?

Le SEO local est l'ensemble des techniques d'optimisation visant à améliorer la visibilité de votre entreprise dans les résultats de recherche géolocalisés. Quand un utilisateur recherche "agence web Tours" ou "restaurant près de moi", Google affiche des résultats adaptés à sa localisation.

## Pourquoi le SEO local est crucial

### Les chiffres parlent d'eux-mêmes

- **46%** des recherches Google ont une intention locale
- **88%** des recherches locales sur mobile aboutissent à un appel ou une visite dans les 24h
- **76%** des personnes qui effectuent une recherche locale visitent un commerce le jour même

## Les piliers du SEO local

### 1. Google Business Profile (ex-Google My Business)

Votre fiche Google Business Profile est la pierre angulaire de votre SEO local :

- Remplissez toutes les informations (NAP : Nom, Adresse, Téléphone)
- Ajoutez des photos de qualité régulièrement
- Collectez et répondez aux avis clients
- Publiez des posts régulièrement

### 2. Citations et annuaires

Assurez-vous que vos informations sont cohérentes sur :

- Les annuaires locaux (Pages Jaunes, Yelp, etc.)
- Les annuaires sectoriels
- Les chambres de commerce locales

### 3. Contenu localisé

Créez du contenu qui cible votre zone géographique :

- Pages de services par ville
- Articles de blog sur des événements locaux
- Études de cas de clients locaux

### 4. Avis clients

Les avis sont un facteur de ranking majeur :

- Encouragez vos clients satisfaits à laisser un avis
- Répondez à tous les avis, positifs comme négatifs
- Visez une note supérieure à 4.5 étoiles

## Erreurs courantes à éviter

1. **Informations incohérentes** entre différentes plateformes
2. **Négliger les avis** négatifs sans y répondre
3. **Oublier l'optimisation mobile** de votre site
4. **Ne pas utiliser de mots-clés locaux** dans votre contenu

## Conclusion

Le SEO local est un levier puissant pour attirer des clients qualifiés. En suivant ces bonnes pratiques, vous pouvez significativement améliorer votre visibilité locale et développer votre activité.
    `,
    category: "seo",
    categoryLabel: "SEO",
    author: {
      name: "Kevin B.",
      role: "Fondateur KB-COM",
    },
    publishedAt: "2024-01-10",
    readingTime: 7,
    image: "/blog/seo-local.jpg",
    tags: ["SEO", "Local", "Google Business", "Marketing"],
    featured: true,
  },
  {
    id: 3,
    slug: "automatiser-processus-entreprise-make",
    title: "Automatiser vos processus avec",
    titleAccent: " Make",
    excerpt: "Découvrez comment Make (anciennement Integromat) peut transformer votre productivité en automatisant vos tâches répétitives.",
    content: `
## Introduction à Make

Make (anciennement Integromat) est une plateforme d'automatisation no-code qui permet de connecter vos applications et d'automatiser vos workflows. C'est un outil puissant pour gagner du temps et réduire les erreurs humaines.

## Pourquoi automatiser ?

### Le coût des tâches manuelles

- Un employé passe en moyenne **2h par jour** sur des tâches répétitives
- Les erreurs de saisie coûtent aux entreprises **des milliers d'euros** par an
- Le temps passé sur des tâches administratives pourrait être investi dans des activités à valeur ajoutée

## Cas d'usage courants

### 1. Gestion des leads

Automatisez le parcours de vos prospects :

- Nouveau formulaire rempli → Création dans votre CRM
- Envoi automatique d'un email de bienvenue
- Notification Slack à l'équipe commerciale
- Ajout à une séquence de nurturing

### 2. Facturation et comptabilité

- Facture payée → Mise à jour du statut client
- Relances automatiques pour les impayés
- Synchronisation avec votre logiciel comptable
- Génération de rapports mensuels

### 3. Marketing et réseaux sociaux

- Publication automatique sur plusieurs plateformes
- Collecte et agrégation des mentions de marque
- Rapports de performance automatisés
- Gestion des campagnes email

### 4. Support client

- Création automatique de tickets depuis les emails
- Assignation intelligente aux agents
- Réponses automatiques pour les questions fréquentes
- Suivi de satisfaction post-résolution

## Comment démarrer avec Make

### Étape 1 : Identifier les tâches à automatiser

Listez vos tâches quotidiennes et identifiez celles qui sont :
- Répétitives
- Chronophages
- Sujettes aux erreurs

### Étape 2 : Créer votre premier scénario

1. Connectez vos applications (Gmail, Slack, CRM, etc.)
2. Définissez le déclencheur (trigger)
3. Ajoutez les actions à effectuer
4. Testez et affinez

### Étape 3 : Monitorer et optimiser

- Surveillez les exécutions
- Corrigez les erreurs
- Optimisez les workflows

## ROI de l'automatisation

Une automatisation bien conçue peut :
- **Économiser 10-20h par semaine** par employé
- **Réduire les erreurs de 90%**
- **Améliorer la satisfaction client** grâce à des réponses plus rapides

## Conclusion

L'automatisation n'est plus un luxe mais une nécessité pour rester compétitif. Make rend cette transformation accessible à toutes les entreprises, sans besoin de compétences techniques.
    `,
    category: "automation",
    categoryLabel: "Automatisation",
    author: {
      name: "Kevin B.",
      role: "Fondateur KB-COM",
    },
    publishedAt: "2024-01-05",
    readingTime: 6,
    image: "/blog/make-automation.jpg",
    tags: ["Automatisation", "Make", "Productivité", "No-code"],
    featured: false,
  },
  {
    id: 4,
    slug: "core-web-vitals-guide-optimisation",
    title: "Core Web Vitals : Guide d'",
    titleAccent: "optimisation",
    excerpt: "Comprenez et optimisez les Core Web Vitals pour améliorer votre SEO et l'expérience utilisateur de votre site.",
    content: `
## Que sont les Core Web Vitals ?

Les Core Web Vitals sont un ensemble de métriques définies par Google pour mesurer l'expérience utilisateur d'un site web. Depuis 2021, ils font partie des critères de ranking de Google.

## Les 3 métriques essentielles

### 1. LCP (Largest Contentful Paint)

**Définition** : Temps de chargement du plus grand élément visible dans la fenêtre.

**Objectif** : < 2.5 secondes

**Comment l'optimiser** :
- Optimiser les images (format WebP, lazy loading)
- Utiliser un CDN
- Minimiser le CSS critique
- Précharger les ressources importantes

### 2. FID (First Input Delay)

**Définition** : Délai entre la première interaction utilisateur et la réponse du navigateur.

**Objectif** : < 100 millisecondes

**Comment l'optimiser** :
- Réduire le JavaScript bloquant
- Diviser les tâches longues
- Utiliser un web worker pour les calculs lourds
- Optimiser les scripts tiers

### 3. CLS (Cumulative Layout Shift)

**Définition** : Mesure de la stabilité visuelle de la page.

**Objectif** : < 0.1

**Comment l'optimiser** :
- Définir les dimensions des images et vidéos
- Réserver l'espace pour les publicités
- Éviter d'injecter du contenu au-dessus du contenu existant
- Utiliser des polices avec font-display: swap

## Outils de mesure

### Google PageSpeed Insights

L'outil officiel de Google pour analyser les performances :
- Données de terrain (utilisateurs réels)
- Données de laboratoire (simulations)
- Recommandations d'optimisation

### Google Search Console

Dans le rapport "Expérience sur la page" :
- Vue d'ensemble de vos URLs
- Problèmes détectés
- Évolution dans le temps

### Web Vitals Extension

Extension Chrome pour mesurer en temps réel :
- Métriques sur chaque page visitée
- Idéal pour le développement

## Impact sur le SEO

Google utilise les Core Web Vitals comme facteur de ranking :
- Les sites avec de bonnes métriques sont favorisés
- L'expérience page devient un critère de départage
- Mobile-first : les métriques mobiles sont prioritaires

## Plan d'action

1. **Auditer** votre site avec PageSpeed Insights
2. **Prioriser** les problèmes par impact
3. **Corriger** les issues une par une
4. **Monitorer** l'évolution des métriques
5. **Itérer** jusqu'à atteindre les objectifs

## Conclusion

Les Core Web Vitals sont incontournables pour un bon référencement en 2024. En les optimisant, vous améliorez à la fois votre SEO et l'expérience de vos utilisateurs.
    `,
    category: "seo",
    categoryLabel: "SEO",
    author: {
      name: "Kevin B.",
      role: "Fondateur KB-COM",
    },
    publishedAt: "2023-12-28",
    readingTime: 8,
    image: "/blog/core-web-vitals.jpg",
    tags: ["SEO", "Performance", "Core Web Vitals", "Google"],
    featured: false,
  },
  {
    id: 5,
    slug: "choisir-entre-site-vitrine-et-e-commerce",
    title: "Site vitrine ou e-commerce :",
    titleAccent: " comment choisir ?",
    excerpt: "Analysez vos besoins pour déterminer si un site vitrine ou une boutique en ligne est le meilleur choix pour votre entreprise.",
    content: `
## Introduction

Quand on lance son activité en ligne, une question fondamentale se pose : faut-il opter pour un site vitrine ou une boutique e-commerce ? Ce choix dépend de nombreux facteurs que nous allons analyser.

## Site vitrine : présenter votre activité

### Qu'est-ce qu'un site vitrine ?

Un site vitrine est un site web dont l'objectif principal est de présenter votre entreprise, vos services et vos réalisations. Il ne permet pas de vendre directement en ligne.

### Avantages

- **Coût réduit** : Développement et maintenance moins onéreux
- **Simplicité** : Plus facile à gérer au quotidien
- **Focus** : Met en valeur votre expertise et vos services
- **Rapidité** : Mise en ligne plus rapide

### Idéal pour

- Les prestataires de services (consultants, agences, artisans)
- Les entreprises B2B
- Les professions libérales
- Les activités nécessitant un contact direct

## E-commerce : vendre en ligne

### Qu'est-ce qu'un site e-commerce ?

Un site e-commerce permet à vos clients d'acheter vos produits directement en ligne, avec gestion du panier, paiement sécurisé et suivi de commande.

### Avantages

- **Vente 24/7** : Votre boutique ne ferme jamais
- **Scalabilité** : Possibilité de toucher un large public
- **Automatisation** : Processus de vente automatisé
- **Data** : Données précieuses sur vos clients

### Idéal pour

- Les commerces de détail
- Les marques avec des produits physiques
- Les créateurs et artisans avec une production régulière
- Les entreprises visant une clientèle nationale/internationale

## Les critères de choix

### 1. Votre modèle économique

- Vendez-vous des produits ou des services ?
- Vos prestations nécessitent-elles un devis personnalisé ?
- Pouvez-vous standardiser votre offre ?

### 2. Votre budget

| Type | Budget initial | Maintenance annuelle |
|------|---------------|---------------------|
| Site vitrine | 2 000 - 8 000€ | 500 - 1 500€ |
| E-commerce | 5 000 - 30 000€ | 2 000 - 10 000€ |

### 3. Vos ressources

Un e-commerce demande plus de gestion :
- Mise à jour des stocks
- Gestion des commandes
- Service client
- Logistique

### 4. Votre stratégie de croissance

- Où voyez-vous votre entreprise dans 5 ans ?
- Souhaitez-vous développer la vente en ligne ?
- Avez-vous les ressources pour gérer la croissance ?

## Solution hybride

Certaines entreprises optent pour une approche hybride :
- Site vitrine avec formulaire de demande de devis
- Ajout d'une boutique pour quelques produits phares
- Évolution progressive vers le e-commerce

## Notre recommandation

Commencez par définir clairement vos objectifs :

1. **Si votre priorité est la visibilité** → Site vitrine
2. **Si vous avez des produits standardisés** → E-commerce
3. **Si vous hésitez** → Commencez par un site vitrine évolutif

## Conclusion

Il n'y a pas de mauvais choix, seulement celui qui correspond le mieux à votre situation actuelle et vos ambitions futures. N'hésitez pas à nous contacter pour un conseil personnalisé.
    `,
    category: "business",
    categoryLabel: "Business",
    author: {
      name: "Kevin B.",
      role: "Fondateur KB-COM",
    },
    publishedAt: "2023-12-20",
    readingTime: 6,
    image: "/blog/vitrine-vs-ecommerce.jpg",
    tags: ["E-commerce", "Site vitrine", "Stratégie", "Business"],
    featured: false,
  },
  {
    id: 6,
    slug: "tendances-web-design-2024",
    title: "Les tendances web design à suivre en",
    titleAccent: " 2024",
    excerpt: "Découvrez les tendances design qui marqueront le web cette année et comment les appliquer à votre site.",
    content: `
## Introduction

Le web design évolue constamment. En 2024, plusieurs tendances se démarquent et redéfinissent la façon dont nous concevons les sites web. Voici les tendances majeures à connaître.

## 1. Le minimalisme augmenté

### Le concept

Le minimalisme reste d'actualité mais évolue vers une version plus sophistiquée :
- Espaces blancs généreux
- Typographies expressives
- Micro-interactions subtiles
- Animations fluides

### Comment l'appliquer

- Réduisez le nombre d'éléments par page
- Utilisez une palette de couleurs restreinte
- Laissez respirer votre contenu
- Ajoutez des animations de survol élégantes

## 2. Le glassmorphisme mature

### Le concept

L'effet verre dépoli continue d'évoluer :
- Transparences subtiles
- Flous d'arrière-plan
- Bordures lumineuses
- Superposition de calques

### Bonnes pratiques

- Utilisez-le avec parcimonie
- Assurez un contraste suffisant pour la lisibilité
- Combinez avec des ombres douces
- Testez sur différents arrière-plans

## 3. Les gradients dynamiques

### Le concept

Les dégradés reviennent en force :
- Gradients multicolores
- Animations de couleurs
- Effets aurora/northern lights
- Mesh gradients

### Applications

- Arrière-plans de sections
- Boutons et CTA
- Illustrations abstraites
- Effets de survol

## 4. La typographie hero

### Le concept

La typographie devient l'élément central du design :
- Polices display XXL
- Mix de styles (serif + sans-serif)
- Texte comme élément graphique
- Animations typographiques

### Conseils

- Choisissez des polices avec du caractère
- Jouez sur les contrastes de taille
- Utilisez le texte comme texture
- Animez les entrées de texte

## 5. Le dark mode premium

### Le concept

Le mode sombre devient plus raffiné :
- Noirs profonds mais pas purs (#0a0a0a vs #000000)
- Accents de couleurs vives
- Textures subtiles
- Effets de lumière

### Implémentation

- Proposez un switch light/dark
- Adaptez vos images au mode sombre
- Utilisez des ombres colorées
- Créez des effets de lueur

## 6. Les interactions immersives

### Le concept

L'expérience utilisateur devient plus engageante :
- Scroll-triggered animations
- Curseurs personnalisés
- Effets de parallaxe subtils
- Transitions de page fluides

### Points d'attention

- Performance avant tout
- Accessibilité préservée
- Option de réduction des animations
- Mobile-first

## 7. L'illustration 3D

### Le concept

Les éléments 3D s'intègrent naturellement :
- Illustrations 3D stylisées
- Animations 3D légères
- Icônes en volume
- Produits en 3D interactive

### Outils recommandés

- Spline pour le 3D web
- Blender pour les rendus
- Three.js pour l'interactivité
- Rive pour les animations

## Comment adopter ces tendances

### 1. Soyez sélectif

N'adoptez pas toutes les tendances à la fois. Choisissez celles qui correspondent à votre marque.

### 2. Pensez utilisateur

Une tendance ne vaut rien si elle dégrade l'expérience utilisateur.

### 3. Restez cohérent

Votre identité visuelle doit rester reconnaissable malgré les évolutions.

### 4. Testez

A/B testez les changements majeurs pour mesurer leur impact.

## Conclusion

Les tendances 2024 privilégient l'élégance, la subtilité et l'expérience utilisateur. L'objectif n'est pas de suivre aveuglément ces tendances, mais de s'en inspirer pour créer des expériences uniques et mémorables.
    `,
    category: "web",
    categoryLabel: "Développement Web",
    author: {
      name: "Kevin B.",
      role: "Fondateur KB-COM",
    },
    publishedAt: "2023-12-15",
    readingTime: 7,
    image: "/blog/web-design-2024.jpg",
    tags: ["Web Design", "Tendances", "UI/UX", "2024"],
    featured: true,
  },
];

// Helpers
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((article) => article.featured);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((article) => article.category === category);
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];

  return articles
    .filter((article) => article.slug !== currentSlug && article.category === current.category)
    .slice(0, limit);
}

// Category colors
export const categoryColors: Record<string, { color: string; gradient: string }> = {
  seo: { color: "#EC4899", gradient: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)" },
  web: { color: "#3B82F6", gradient: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)" },
  automation: { color: "#F97316", gradient: "linear-gradient(135deg, #F97316 0%, #FBBF24 100%)" },
  business: { color: "#10B981", gradient: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)" },
};
