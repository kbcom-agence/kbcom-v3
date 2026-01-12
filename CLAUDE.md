# KB-COM - Projet Next.js

## Stack Technique
- **Framework:** Next.js 15.5.9 avec Turbopack
- **UI:** React 19, Tailwind CSS 3.4, Framer Motion
- **Typo:** Geist font
- **Type:** TypeScript

## Structure du Projet
```
src/app/
  page.tsx        # Homepage
  layout.tsx      # Layout global
```

---

# STRATEGIE SEO (V1.0)

## Objectif Global
Devenir l'autorite locale n1 a Tours ("Agence Web Tours") tout en captant du trafic national sur les expertises techniques (Automatisation, App Web).
**Identite:** Une agence nationale, experte et proche, basee en Touraine.

## Ciblage Mots-Cles (Keywords Mapping)

### 1. Page d'Accueil (`/`)
- **Mot-cle Principal:** "Agence Web Tours"
- **Secondaires:** "Creation site internet Tours", "Agence digitale 37", "Developpeur web Tours"
- **Intention:** Locale / Transactionnelle
- **Regle Contenu:** Mettre en avant l'equipe locale, l'adresse, la carte, et les avis clients de Tours

### 2. Pages Services (`/services/*`)
Ces pages doivent ranker partout en France sur l'expertise.
- **Structure URL:** `/services/[slug]`
- **Cible:** PME France entiere
- **Strategie:** Contenu "Pilier" (Long form). Mentionner "Base a Tours, operant partout en France"

| Page Service | Mot-cle Principal | Mots-cles Semantiques (LSI) |
| :--- | :--- | :--- |
| **Creation Site** | "Creation site internet sur mesure" | Next.js, Performance, WordPress, Vitrine, E-commerce |
| **SEO** | "Consultant SEO Technique" | Audit, Google, Ranking, Visibilite, Trafic organique |
| **App Web** | "Developpement application web" | SaaS, Dashboard, React, Outils metier |
| **Automatisation** | "Automatisation processus entreprise" | Make, n8n, IA, Gain de temps, Productivite |

### 3. Pages Locales (Extension Future - `/agences/*` ou `/villes/*`)
- **Objectif:** Ranker sur d'autres villes
- **Structure:** Landing pages specifiques (ex: "Creation site internet Orleans")
- **Regle:** Ne pas dupliquer le contenu des services

## Regles de Contenu (On-Page)

### Densite et Longueur
- **Homepage:** > 1200 mots (couvrir tous les services brievement)
- **Pages Services:** > 1500 mots (contenu expert, "Ultimate Guide")
- **Articles Blog:** > 800 mots (repondre a une question precise)

### Structure Hn (Strict)
- **H1:** Unique. Doit contenir le Mot-cle Principal + un benefice client
- **H2:** Les grandes thematiques (Silos)
- **H3:** Les details. Pas de saut de niveau (pas de H2 -> H4)

## Specifications Techniques (Next.js)

### Metadata & OpenGraph
Chaque page doit exporter:
```tsx
export const metadata: Metadata = {
  title: 'Mot Cle Principal | KB-COM Agence Web',
  description: 'Hook de 155 caracteres max incluant le mot cle + appel a l action.',
  alternates: { canonical: 'https://kb-com.fr/...' }
}
```

---

## Structure Homepage Actuelle

### Section 1: Hero
- H1: "Votre agence web a Tours pour des sites exceptionnels"
- Badge clients (+50 satisfaits)
- Description services
- Avis Google 5/5
- CTAs: Devis + Realisations
- Carousel realisations
- Carousel logos clients

### Section 2: (A definir)

### Section 3: (A definir)
