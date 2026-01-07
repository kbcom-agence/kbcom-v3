# Project Brief: KB-COM - Refonte Site Agence Web avec Focus SEO

<!-- Powered by BMAD™ Core -->

**Date:** 2026-01-06
**Version:** 1.0
**Status:** Draft - En révision

---

## Executive Summary

KB-COM, agence web basée à Tours, entreprend la refonte complète de son site internet (kb-com.fr) avec pour objectif principal d'atteindre l'excellence en matière de référencement naturel (SEO). Le nouveau site vitrine démontrera l'expertise technique de l'agence tout en générant des leads qualifiés via un positionnement optimal sur les moteurs de recherche pour les requêtes locales et nationales liées aux services web.

**Valeur proposition clé :** Un site d'agence web qui pratique ce qu'il prêche - performances techniques exemplaires, SEO parfait, et expérience utilisateur irréprochable.

---

## Problem Statement

### État actuel et points de douleur

Le site actuel kb-com.fr présente plusieurs limitations :
- **Référencement insuffisant** : Positionnement sous-optimal sur les requêtes clés ("agence web Tours", "création site internet Tours", etc.)
- **Performances techniques** : Core Web Vitals potentiellement non optimaux
- **Architecture SEO** : Structure technique ne permettant pas d'exploiter pleinement le potentiel de référencement
- **Crédibilité** : Un site d'agence web doit être la vitrine exemplaire de son savoir-faire technique

### Impact du problème

- **Perte d'opportunités commerciales** : Les prospects cherchant une agence web à Tours trouvent d'abord les concurrents
- **Manque de crédibilité** : Difficulté à convaincre les clients potentiels de l'expertise technique si le propre site n'est pas exemplaire
- **Coût d'acquisition client élevé** : Dépendance accrue aux canaux payants (SEA, publicités) au lieu du trafic organique gratuit

### Pourquoi les solutions existantes ne suffisent pas

Les templates WordPress ou solutions classiques ne permettent pas :
- Un contrôle total de l'optimisation technique SEO
- Des performances Core Web Vitals optimales
- Une architecture moderne serverless/edge computing
- Un contenu entièrement indexable et optimisé

### Urgence

Le marché digital est en constante évolution. Chaque mois de retard représente :
- Des clients potentiels perdus au profit de concurrents mieux positionnés
- Une dette technique croissante
- Un écart grandissant avec les standards modernes du web

---

## Proposed Solution

### Concept central

Développer un site vitrine nouvelle génération avec **Next.js 15 (App Router)** qui servira de démonstrateur technique de l'excellence de KB-COM, tout en étant optimisé à 100% pour le référencement naturel.

### Approche technique : La Stack SEO Ultime 2026

**Framework choisi : Next.js 15 avec App Router**

Pourquoi c'est la solution la plus optimale pour le SEO :

#### 1. Rendu Serveur (SSR/SSG) - Google voit TOUT
- **Server-Side Rendering (SSR)** : Chaque page est pré-rendue côté serveur
- **Static Site Generation (SSG)** : Pages statiques ultra-rapides pour le contenu stable
- **Incremental Static Regeneration (ISR)** : Mise à jour du contenu sans rebuild complet
- **Résultat** : Google reçoit du HTML complet, parfaitement indexable, pas de problème de JavaScript

#### 2. React Server Components - Performance SEO maximale
- Zéro JavaScript envoyé au client pour le contenu statique
- Temps de chargement ultra-rapide
- Core Web Vitals optimaux (LCP, FID, CLS)

#### 3. Métadonnées optimisées natives
```typescript
export const metadata = {
  title: "Agence Web Tours | KB-COM - Création Sites & SEO",
  description: "Agence web à Tours spécialisée...",
  openGraph: {...},
  alternates: {
    canonical: "https://kb-com.fr"
  }
}
```

#### 4. Architecture SEO technique
- **Sitemap.xml automatique** : Génération dynamique
- **Robots.txt optimisé**
- **Schema.org / JSON-LD** : Rich snippets pour Google
- **Image optimization** : Next/Image avec lazy loading et formats modernes (WebP, AVIF)
- **Font optimization** : Chargement optimisé des polices

#### 5. Performance Edge Computing
- **Vercel Edge Network** : Déploiement sur +70 datacenters mondiaux
- **CDN automatique** : Contenu servi depuis le point le plus proche
- **Temps de réponse < 100ms**

### Différenciateurs clés

1. **Le site devient la preuve de l'expertise** : Démonstration concrète du savoir-faire technique
2. **SEO Multi-Niveaux** :
   - **SEO Local Tours** (priorité) : Dominer les requêtes locales
   - **SEO Géographique Élargi** : Cibler des zones à faible concurrence (stratégie Low-KD)
   - **SEO National** : Positionnement sur requêtes génériques
3. **Score Lighthouse 100/100** : Performance, accessibilité, SEO, best practices
4. **Architecture moderne** : Headless CMS (Sanity/Contentful) pour gestion de contenu découplée
5. **Stratégie Low-Hanging Fruit** : Pages optimisées pour mots-clés KD faible + trafic existant

---

## Target Users

### Primary User Segment: Décideurs PME/TPE Tours & Région

**Profil démographique :**
- Dirigeants de PME/TPE (5-50 employés)
- Localisation : Tours et Indre-et-Loire (37)
- Secteurs : Commerce, services, artisanat, professions libérales

**Comportements actuels :**
- Recherche "agence web Tours" sur Google
- Compare 3-5 agences avant de décider
- Consulte les sites sur mobile (60%+ du trafic)
- Vérifie les réalisations et témoignages clients

**Besoins spécifiques :**
- Proximité géographique pour les rendez-vous
- Compréhension des enjeux locaux
- Rapport qualité/prix transparent
- Accompagnement de A à Z

**Objectifs :**
- Obtenir plus de clients via leur site web
- Améliorer leur visibilité locale
- Moderniser leur image de marque

### Secondary User Segment: Startups & Entrepreneurs

**Profil :**
- Créateurs d'entreprise, porteurs de projets innovants
- 25-40 ans, tech-savvy
- Budget limité mais ambitions importantes

**Besoins :**
- Solutions évolutives (MVP → Scale)
- Technologies modernes et performantes
- Partenaire technique de confiance
- Expertise en développement sur mesure

### Tertiary User Segment: Grands Comptes & E-commerce

**Profil :**
- Entreprises établies cherchant expertise technique avancée
- Boutiques en ligne nécessitant performances et conversion

**Besoins :**
- Applications web complexes
- Intégrations systèmes
- Support et maintenance professionnels

---

## Goals & Success Metrics

### Business Objectives

- **Génération de leads qualifiés** : +150% de demandes de devis qualifiées en 6 mois
- **Positionnement SEO** : Top 3 sur "agence web Tours" et variantes en 4 mois
- **Taux de conversion** : 3-5% des visiteurs demandent un contact
- **Reconnaissance expertise** : Devenir la référence technique locale

### User Success Metrics

- **Temps de chargement** : < 1 seconde (LCP < 1.2s)
- **Taux de rebond** : < 40%
- **Pages par session** : > 3 pages
- **Satisfaction mobile** : Score mobile-friendly 100/100

### Key Performance Indicators (KPIs)

#### KPIs SEO (Critiques)

**Requêtes Locales Tours (Priorité 1 - Haute Compétition) :**
- **Position moyenne requêtes principales** : Top 3 sous 4 mois
  - "agence web Tours" → Position 1-3
  - "création site internet Tours" → Position 1-3
  - "développement web Tours" → Position 1-3
  - "agence digitale Tours" → Position 1-5

**Requêtes Géographiques Élargies (Priorité 2 - Stratégie Low-KD) :**
- **Ciblage zones faible concurrence** : Top 5 sous 2 mois, Top 3 sous 4 mois
  - Exemples : "site internet [quartier/arrondissement]", "création site web [ville proche]"
  - Critères sélection : KD < 30, Volume > 50/mois, Pertinence géographique
  - Objectif : 15-20 pages géo-optimisées au lancement
  - Trafic additionnel attendu : +500-1000 visites/mois à 6 mois

**KPIs Globaux :**
- **Trafic organique total** : +200% en 6 mois (baseline à établir)
- **Impressions Google Search Console** : +300% en 6 mois
- **Domain Authority (DA)** : Passer de X à 30+ en 12 mois
- **Backlinks qualité** : +50 backlinks de sites DA > 20 en 6 mois
- **Mots-clés positionnés Top 10** : +100 mots-clés en 6 mois (incluant stratégie Low-KD)

#### KPIs Techniques
- **Lighthouse Score** : 100/100 sur les 4 catégories (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals** :
  - LCP (Largest Contentful Paint) < 1.2s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1
- **Page Speed Insights** : Score > 95/100 mobile et desktop
- **Time to First Byte (TTFB)** : < 200ms

#### KPIs Business
- **Demandes de devis** : 20-30 demandes qualifiées/mois (vs baseline actuelle)
- **Taux de conversion** : 3-5% des visiteurs uniques
- **Valeur vie client (LTV)** : Amélioration via clients mieux qualifiés

#### KPIs Engagement
- **Temps sur site** : > 2 minutes en moyenne
- **Pages par session** : > 3 pages
- **Taux de rebond** : < 40%
- **Retour utilisateurs** : > 20% de visiteurs récurrents

---

## MVP Scope

### Core Features (Must Have)

#### 1. **Architecture SEO Technique Parfaite**
**Rationale :** Foundation critique pour tous les objectifs de référencement
- Next.js 15 App Router avec SSR/SSG
- Métadonnées dynamiques par page
- Sitemap.xml et robots.txt optimisés
- Schema.org markup (Organization, LocalBusiness, Service)
- Fil d'Ariane (Breadcrumb) structuré
- URLs sémantiques et hiérarchie logique
- Fichier manifest.json pour PWA

#### 2. **Pages Principales Optimisées SEO**
**Rationale :** Contenu nécessaire pour couvrir les intentions de recherche principales
- **Homepage** : Vue d'ensemble agence + CTA fort
- **Services** : Pages dédiées par prestation (Création sites, E-commerce, SEO, Apps sur mesure)
- **Réalisations/Portfolio** : Case studies détaillées avec résultats chiffrés
- **À propos** : Histoire, équipe, valeurs, localisation Tours
- **Contact** : Formulaire optimisé + informations locales (adresse, téléphone, horaires)
- **Blog/Actualités** : 10-15 articles SEO-optimisés au lancement (puis publication régulière)

#### 3. **SEO Local Optimal**
**Rationale :** Ciblage géographique Tours et région
- Google Business Profile intégré
- Markup LocalBusiness avec coordonnées
- Carte interactive (Google Maps)
- Avis clients structurés (Review schema)
- Citations NAP (Name, Address, Phone) cohérentes
- Pages de services géolocalisées si pertinent

#### 3bis. **Pages Géographiques Élargies - Stratégie Low-Hanging Fruit (Low-KD)**
**Rationale :** Générer du trafic qualifié rapidement via mots-clés faible concurrence + volume existant

**Concept :** Créer des pages optimisées ciblant des zones géographiques spécifiques (arrondissements, quartiers, villes) avec faible Keyword Difficulty mais trafic existant.

**Exemples de requêtes cibles :**
- "site internet 13ème" (Paris 13ème arrondissement)
- "création site web [ville proche Tours : Amboise, Chinon, Loches, etc.]"
- "agence web [quartier spécifique]"
- "développeur web [zone géographique]"

**Critères de sélection des mots-clés (via Semrush/Ahrefs) :**
- **KD (Keyword Difficulty) < 30** : Faible concurrence
- **Volume de recherche > 50/mois** : Trafic suffisant pour justifier la page
- **Intention commerciale** : Recherche de services web
- **Pertinence géographique** : Zones desservies ou potentiellement desservies

**Structure des pages géo-optimisées :**

1. **Template dynamique réutilisable** (Next.js generateStaticParams)
   ```typescript
   // app/agence-web/[location]/page.tsx
   export async function generateStaticParams() {
     return locations.map(loc => ({ location: loc.slug }))
   }
   ```

2. **Contenu unique par page** (CRITICAL - éviter duplicate content) :
   - **H1 personnalisé** : "Agence Web à [Localité] | KB-COM"
   - **Introduction contextualisée** : Mentionner spécificités de la zone
   - **Services adaptés** : Besoins particuliers de cette zone si applicable
   - **Coordonnées/Déplacement** : "Nous nous déplaçons à [Localité]"
   - **Témoignages locaux** : Si clients dans cette zone (optionnel)
   - **FAQ locale** : Questions spécifiques à la zone
   - **CTA adapté** : "Devis gratuit pour [Localité]"

3. **SEO On-Page optimisé** :
   - URL : `/agence-web-[localite]` ou `/[localite]/agence-web`
   - Title : "Agence Web [Localité] | Création Site Internet | KB-COM"
   - Meta description unique par localité
   - Schema.org LocalBusiness avec geo coordinates si pertinent
   - Breadcrumb : Accueil > Services > Agence Web > [Localité]
   - Map si applicable (rayon d'intervention)

4. **Maillage interne stratégique** :
   - Lien vers page Service principale
   - Liens vers autres pages géo proches
   - Lien vers Portfolio/Réalisations
   - Lien depuis Homepage via section "Zones desservies"

**Architecture technique :**
- **CMS-driven** : Liste des localités dans Sanity/Contentful
- **SSG (Static Site Generation)** : Pages pré-générées au build
- **ISR** : Re-génération incrémentale si ajout de nouvelles zones
- **Sitemap inclusion** : Toutes pages géo dans sitemap.xml

**Objectifs quantifiés MVP :**
- **15-20 pages géo-optimisées** au lancement
- **Mix zones** :
  - 5-7 arrondissements Paris (KD très faible)
  - 5-7 villes proches Tours (Orléans, Blois, Amboise, etc.)
  - 3-5 quartiers grandes villes (Lyon, Marseille si opportunité)
- **Priorisation Semrush** : Sélection data-driven des meilleures opportunités

**Éviter les pièges SEO :**
- ❌ **Pas de duplicate content** : Chaque page = contenu unique minimum 500 mots
- ❌ **Pas de keyword stuffing** : Utilisation naturelle de la localité
- ❌ **Pas de fausses promesses** : Être transparent sur zone de service réelle
- ✅ **Valeur ajoutée réelle** : Informations utiles pour visiteur de cette zone
- ✅ **Cohérence NAP** : Coordonnées KB-COM Tours cohérentes partout

**Mesure de succès :**
- Position Top 5 sous 2 mois pour 70% des pages géo
- Position Top 3 sous 4 mois pour 50% des pages géo
- Taux de conversion similaire ou supérieur aux pages principales (3-5%)
- Contribution à l'autorité de domaine globale

**Phase 2 - Expansion :**
- Ajout de 30-50 pages géo supplémentaires
- A/B testing des templates
- Enrichissement contenu local (actualités zone, partenaires locaux)

#### 4. **Performance Technique Ultime**
**Rationale :** Core Web Vitals = facteur de ranking Google
- Optimisation images (Next/Image, WebP/AVIF, lazy loading)
- Optimisation fonts (next/font, preload)
- Code splitting et tree shaking automatique
- Compression Brotli/Gzip
- Cache stratégies optimales
- Edge caching (Vercel/Cloudflare)
- Monitoring performance (Vercel Analytics ou équivalent)

#### 5. **Contenu SEO-Optimisé**
**Rationale :** Le contenu reste roi pour le référencement
- Recherche mots-clés complète (Tours + métier web)
- Architecture sémantique Hn optimisée
- Maillage interne stratégique
- Ratio texte/code optimal
- Alt texts descriptifs sur toutes images
- Contenus longs (1500-2500 mots) pour pages principales

#### 6. **Expérience Mobile Parfaite**
**Rationale :** Mobile-first indexing de Google
- Design responsive (Mobile-first)
- Touch targets > 48px
- Navigation mobile intuitive
- Formulaires adaptés mobile
- Chargement ultra-rapide mobile

#### 7. **Conversion Optimization (CRO)**
**Rationale :** Trafic SEO doit convertir en leads
- CTA clairs et visibles
- Formulaire de contact optimisé
- Click-to-call pour mobile
- Preuves sociales (témoignages, logos clients)
- Proposition de valeur claire

#### 8. **Tracking & Analytics**
**Rationale :** Mesure des KPIs définis
- Google Analytics 4
- Google Search Console
- Tracking conversions (formulaires, clics téléphone)
- Heatmaps (Hotjar ou Clarity)
- Dashboard de suivi SEO

### Out of Scope for MVP

Pour le lancement initial, ces éléments seront reportés en Phase 2 :
- Espace client sécurisé
- Système de réservation en ligne
- Multi-langue (anglais)
- Chatbot IA
- Configuration produits e-commerce complexe
- Intégration CRM avancée
- Module de devis automatique en ligne
- Témoignages vidéo (prévus mais pas critiques pour MVP)

### MVP Success Criteria

Le MVP sera considéré comme réussi si :
1. **SEO Technique** : Lighthouse SEO score = 100/100
2. **Performance** : Core Web Vitals tous en zone verte (< 1.2s LCP, < 100ms FID, < 0.1 CLS)
3. **Indexation** : 100% des pages importantes indexées dans Google sous 2 semaines
4. **Positionnement initial** : Entrée dans le Top 10 pour au moins 3 requêtes principales sous 1 mois
5. **Conversion** : Au moins 1 demande de devis qualifiée par 100 visiteurs uniques

---

## Post-MVP Vision

### Phase 2 Features (3-6 mois après MVP)

**Optimisation Continue SEO :**
- Publication blog régulière (2-4 articles/mois)
- Campagne netlinking (backlinks qualité)
- Expansion mots-clés longue traîne
- Optimisation taux de conversion (A/B testing)

**Fonctionnalités Avancées :**
- Espace client sécurisé (suivi projets)
- Générateur de devis interactif
- Intégration CRM (HubSpot ou Pipedrive)
- Chatbot avec IA (support premier niveau)
- Témoignages vidéo clients

**Contenu Étendu :**
- Guides et ressources téléchargeables (lead magnets)
- Webinaires et événements
- Études de cas détaillées interactives

### Long-term Vision (1-2 ans)

**Plateforme d'Expertise :**
- Hub de connaissances web (autorité thématique SEO)
- Outils gratuits pour attirer du trafic (calculateurs, audits SEO gratuits)
- Communauté et forum
- Formation et certifications

**Expansion Géographique SEO :**
- Ciblage région Centre-Val de Loire élargie
- Pages localisées pour villes secondaires (Orléans, Blois, etc.)
- Positionnement national sur expertises de niche

**Innovation Technique :**
- PWA complète (expérience app-like)
- Intégrations IA avancées (assistant virtuel, recommandations personnalisées)
- Dashboards clients en temps réel

### Expansion Opportunities

- **SaaS Tools** : Développer des outils SaaS pour clients (analytics, monitoring)
- **White Label** : Proposer la stack technique en white label à d'autres agences
- **Marketplace** : Place de marché pour services web complémentaires
- **API Publique** : Ouvrir certains services via API

---

## Technical Considerations

### Platform Requirements

**Target Platforms :**
- Web responsive (desktop, tablet, mobile)
- Progressive Web App (PWA) avec service workers
- Compatible tous navigateurs modernes (2 dernières versions)

**Browser/OS Support :**
- Chrome, Firefox, Safari, Edge (dernières versions)
- iOS Safari 14+
- Android Chrome 90+
- Graceful degradation pour anciens navigateurs

**Performance Requirements :**
- Lighthouse Performance Score : 95-100/100
- First Contentful Paint (FCP) : < 1.0s
- Largest Contentful Paint (LCP) : < 1.2s
- Time to Interactive (TTI) : < 2.0s
- Total Blocking Time (TBT) : < 200ms
- Cumulative Layout Shift (CLS) : < 0.1
- Uptime : 99.9%

### Technology Preferences

**Stack Technique Recommandée : Next.js SEO Ultimate Stack**

#### Frontend Framework
- **Next.js 15.x** (App Router)
  - React Server Components
  - Server-Side Rendering (SSR)
  - Static Site Generation (SSG)
  - Incremental Static Regeneration (ISR)
- **React 19.x**
- **TypeScript** (type safety)

#### Styling & UI
- **Tailwind CSS 4.x** (utility-first, optimisation automatique)
- **Shadcn/ui** (composants accessibles et performants)
- **Framer Motion** (animations fluides, optionnel)

#### Headless CMS (Gestion Contenu)
Options recommandées :
1. **Sanity.io** (Préféré)
   - Éditeur temps réel
   - Structure de données flexible
   - Excellent pour SEO (metadata management)
   - Webhooks pour ISR
2. **Contentful** (Alternative)
3. **Strapi** (Open-source, self-hosted)

#### Backend & API
- **Next.js API Routes** (serverless functions)
- **tRPC** ou **GraphQL** pour API typées
- **Prisma ORM** (si base de données relationnelle)

#### Database
- **PostgreSQL** (Supabase ou Railway)
  - Pour données structurées (contacts, analytics internes)
- **Redis** (Upstash)
  - Cache et sessions

#### Formulaires & Validation
- **React Hook Form** (performances)
- **Zod** (validation TypeScript)

#### SEO Tools
- **next-sitemap** (génération sitemap.xml)
- **Schema.org markup** (JSON-LD)
- **next-seo** (helpers métadonnées)

#### Analytics & Monitoring
- **Vercel Analytics** (Core Web Vitals)
- **Google Analytics 4** (via gtag ou analytics package)
- **Google Search Console** (indexation)
- **Sentry** (error tracking)
- **Hotjar** ou **Microsoft Clarity** (heatmaps, session recording)

#### Hosting & Infrastructure
- **Vercel** (Recommandé - Optimal pour Next.js)
  - Edge Network global
  - Déploiement automatique Git
  - Preview deployments
  - Analytics intégrés
  - Scaling automatique
- **Alternative** : Cloudflare Pages ou Netlify

#### Email & Communication
- **Resend** ou **SendGrid** (emails transactionnels)
- **Mailchimp** / **Brevo** (newsletter, optionnel Phase 2)

### Architecture Considerations

#### Repository Structure
```
/
├── app/                 # Next.js App Router
│   ├── (marketing)/     # Pages publiques
│   ├── api/             # API routes
│   └── layout.tsx       # Layout global
├── components/          # Composants React
│   ├── ui/              # Composants UI de base
│   └── sections/        # Sections de pages
├── lib/                 # Utilities
│   ├── seo/             # Helpers SEO
│   ├── analytics/       # Tracking
│   └── schemas/         # Schema.org definitions
├── public/              # Assets statiques
│   ├── images/
│   └── fonts/
├── content/             # Contenu Markdown (optionnel si pas de CMS)
└── tests/               # Tests (Vitest, Playwright)
```

#### Service Architecture
- **Monorepo** : Un seul dépôt pour simplicité initiale
- **Serverless Functions** : Next.js API Routes pour backend
- **Edge Computing** : Middleware Next.js pour redirections, A/B testing
- **CDN** : Vercel Edge Network automatique

#### Integration Requirements

**Intégrations Critiques :**
- Google Analytics 4 & Google Tag Manager
- Google Search Console (verification + API)
- Google Business Profile
- Formulaire → Email notifications
- CMS Headless (Sanity/Contentful)

**Intégrations Phase 2 :**
- CRM (HubSpot/Pipedrive)
- Paiement en ligne (Stripe) si offres SaaS/produits
- Chat support (Intercom/Crisp)
- Système de ticketing

#### Security & Compliance

**Sécurité :**
- HTTPS obligatoire (force SSL)
- Headers de sécurité (CSP, HSTS, X-Frame-Options)
- Protection CSRF sur formulaires
- Rate limiting sur API routes
- Validation inputs (sanitization XSS)
- Secrets management (variables d'environnement)

**RGPD Compliance :**
- Bandeau cookies conforme
- Politique de confidentialité
- Mentions légales
- Opt-in analytics (Axeptio ou Tarteaucitron)
- Formulaire RGPD-compliant (consentement explicite)

**Accessibilité (a11y) :**
- WCAG 2.1 niveau AA minimum
- Navigation clavier complète
- ARIA labels appropriés
- Contraste texte/fond optimal
- Textes alternatifs images
- Tests automatisés (axe-core)

---

## Constraints & Assumptions

### Constraints

**Budget :**
- Budget développement initial : À définir avec client
- Coûts récurrents estimés :
  - Hébergement Vercel : 20-100€/mois (Pro plan)
  - CMS Sanity : 0-99€/mois (selon usage)
  - Nom de domaine : ~15€/an
  - Monitoring/Analytics : 0-50€/mois
- Budget contenu/SEO : Ressources internes KB-COM

**Timeline :**
- Développement MVP : 2-4 mois (standard)
  - Phase conception/design : 2-3 semaines
  - Développement technique : 6-8 semaines
  - Contenu/SEO : 2-3 semaines (parallèle)
  - Tests et corrections : 1-2 semaines
  - Déploiement et monitoring : 1 semaine
- Résultats SEO visibles : 1-3 mois post-lancement (optimisation continue)

**Resources :**
- Équipe KB-COM interne (développeurs, designers, rédacteurs)
- Possible appui externe pour stratégie SEO avancée (consultants)
- Création de contenu : ressources internes principalement

**Technical :**
- Dépendance à l'écosystème Vercel/Next.js (vendor lock-in modéré)
- Migration future possible mais complexe
- Nécessite compétences React/Next.js dans l'équipe

### Key Assumptions

- L'équipe KB-COM a les compétences Next.js/React ou peut les acquérir rapidement
- Le contenu de qualité sera produit en interne (expertise métier)
- Les ressources (images, logos clients, témoignages) sont disponibles ou seront créées
- Aucune contrainte legacy technique majeure (nouveau site from scratch)
- Les clients acceptent de fournir témoignages et autorisations logos
- Le nom de domaine kb-com.fr est et reste contrôlé par KB-COM
- Les accès Google Business Profile et outils SEO sont disponibles
- Budget marketing (netlinking, contenu externe) sera alloué post-lancement si nécessaire

---

## Risks & Open Questions

### Key Risks

1. **Concurrence SEO intense :**
   - **Description :** Marché agence web Tours potentiellement saturé avec concurrents établis
   - **Impact :** Délai plus long pour atteindre Top 3, investissement SEO continu nécessaire
   - **Mitigation :** Stratégie contenu unique, netlinking agressif, niches spécifiques

2. **Évolution algorithmes Google :**
   - **Description :** Google change régulièrement ses algorithmes (Core Updates)
   - **Impact :** Risque de perte de positions si non-conformité
   - **Mitigation :** Suivre best practices officielles, diversifier sources trafic, monitoring continu

3. **Complexité technique Next.js :**
   - **Description :** Courbe d'apprentissage si équipe non familière
   - **Impact :** Délais développement, bugs potentiels
   - **Mitigation :** Formation équipe, documentation exhaustive, code reviews

4. **Dépendance Vercel :**
   - **Description :** Vendor lock-in modéré, coûts scaling imprévisibles
   - **Impact :** Coûts futurs, difficulté migration
   - **Mitigation :** Architecture portable, alternative Cloudflare/Netlify possible

5. **Génération contenu qualité :**
   - **Description :** Production régulière de contenu SEO optimisé chronophage
   - **Impact :** Perte de momentum SEO si rythme pas maintenu
   - **Mitigation :** Calendrier éditorial strict, outils IA en support (pas remplacement), externalisation ponctuelle

### Open Questions

- **Analyse concurrentielle détaillée :** Qui sont les 5 principaux concurrents sur "agence web Tours" ? Quelle est leur stratégie SEO ?
- **Audit SEO actuel kb-com.fr :** Quel est le baseline exact (positions, DA, backlinks, trafic) ?
- **Recherche opportunités Low-KD géographiques :** Quels sont les 15-20 mots-clés géo les plus rentables (KD < 30, Volume > 50) à cibler en priorité ? Validation via Semrush Keyword Magic Tool
- **Budget netlinking :** Quelle enveloppe pour acquisition backlinks qualité en Phase 2 ?
- **Contenu initial :** Combien d'articles blog au lancement ? Quels sujets prioritaires ?
- **Design/Branding :** Refonte identité visuelle ou conservation charte existante ?
- **Multilingue :** Besoin d'une version anglaise (Phase 2) pour clients internationaux ?
- **Intégration CRM existant :** KB-COM utilise-t-il déjà un CRM à connecter ?
- **Ressources photographiques :** Besoin de shooting photo professionnel ? Budget associé ?

### Areas Needing Further Research

1. **Audit SEO complet actuel :**
   - Analyse Semrush/Ahrefs du site existant
   - Identification des backlinks existants à préserver
   - Analyse des concurrents (gap analysis)

2. **Recherche mots-clés approfondie :**
   - Volume de recherche "agence web Tours" et variantes
   - Opportunités longue traîne
   - Intentions de recherche (informationnel vs transactionnel)

2bis. **Identification opportunités Low-KD géographiques (PRIORITAIRE) :**
   - **Outil** : Semrush Keyword Magic Tool ou Ahrefs Keywords Explorer
   - **Filtres à appliquer** :
     - KD (Keyword Difficulty) : 0-30
     - Volume : 50-1000/mois
     - Mots-clés incluant : "site internet [lieu]", "agence web [lieu]", "création site [lieu]"
   - **Zones à explorer** :
     - Arrondissements Paris (1er au 20ème) : ex "site internet 13ème", "agence web 15ème"
     - Villes Centre-Val de Loire : Orléans, Blois, Châteauroux, Bourges, Amboise, Chinon
     - Grandes villes France : quartiers Lyon, Marseille, Toulouse, etc.
   - **Livrables** :
     - Liste Excel avec 50-100 opportunités classées par ROI potentiel
     - Sélection finale des 15-20 meilleures opportunités pour MVP
     - Analyse concurrence (qui se positionne sur ces mots-clés ?)
     - Estimation trafic additionnel attendu

3. **Benchmark concurrence locale :**
   - Qui se positionne bien actuellement ?
   - Quelle est leur stratégie (contenu, technique, netlinking) ?
   - Combien de backlinks ont-ils ?

4. **Étude Core Web Vitals concurrents :**
   - Performances des sites concurrents
   - Opportunités de différenciation technique

5. **Tests utilisateurs :**
   - Interviews clients actuels KB-COM
   - Parcours utilisateur optimal (personas validation)
   - Éléments de réassurance efficaces

6. **Analyse juridique RGPD :**
   - Validation conformité totale (avocat si nécessaire)
   - Politique cookies optimale

---

## Appendices

### A. Research Summary

**Tendances SEO 2026 :**
- Core Web Vitals restent critiques pour ranking
- E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) de plus en plus important
- Contenu généré par IA détecté et potentiellement pénalisé → nécessité de contenu authentique
- Recherche vocale et featured snippets en croissance
- Local SEO crucial pour agences (Google Business Profile)

**Technologies modernes pour SEO :**
- Next.js 15 avec Server Components = optimal pour SEO technique
- Headless CMS = flexibilité contenu
- Edge computing = vitesse maximale

### B. Stakeholder Input

*À compléter après discussions internes KB-COM*

- Retours équipe commerciale sur objections clients fréquentes
- Insights équipe technique sur contraintes/opportunités
- Vision direction sur positionnement marché

### C. References

**Documentation technique :**
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Core Web Vitals](https://web.dev/vitals/)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)

**Outils SEO :**
- Google Search Console
- Google Analytics 4
- Semrush / Ahrefs (analyse concurrence)
- PageSpeed Insights
- Lighthouse CI

**Inspirations design/sites agences :**
- *Liste de sites d'agences web exemplaires à établir*

---

## Next Steps

### Immediate Actions

1. **Validation du Brief :** Review et approbation par stakeholders KB-COM
2. **Audit SEO baseline :** Analyse complète état actuel kb-com.fr (positions, DA, backlinks, trafic)
3. **Recherche mots-clés :** Identification exhaustive des opportunités SEO (Semrush/Ahrefs)
4. **Analyse concurrence :** Benchmark des 5 principaux concurrents Tours
5. **Collecte assets :** Rassembler logos clients, témoignages, photos, contenus existants
6. **Setup environnement :** Préparation repo GitHub, accès Vercel, choix CMS

### PM Handoff

Ce Project Brief fournit le contexte complet pour la refonte KB-COM avec objectif SEO parfait.

**Prochaine étape :** Création du PRD (Product Requirements Document) détaillé qui transformera cette vision en spécifications fonctionnelles précises, epics, et user stories actionnables.

Le PM doit maintenant :
- Décomposer chaque feature en exigences fonctionnelles détaillées
- Définir les critères d'acceptation précis
- Prioriser les fonctionnalités (MoSCoW)
- Créer les epics et stories du backlog
- Spécifier les exigences non-fonctionnelles (performance, sécurité, SEO)

---

**Document préparé avec BMAD™ Method**
*Prêt pour phase PRD avec agent PM*
