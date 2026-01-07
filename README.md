# KB-COM Website - Next.js 15

> Agence Web à Tours - Création de sites internet performants et référencés

## 📋 Description

Site web moderne de KB-COM développé avec Next.js 15, TypeScript et Tailwind CSS. Ce projet met en œuvre une stratégie SEO avancée visant le top 3 sur "agence web Tours" et démontre l'excellence technique de l'agence.

## 🎯 Objectifs du Projet

- **SEO Excellence** : Atteindre le Top 3 sur "agence web Tours" en 4 mois
- **Performance** : Score Lighthouse 100/100 sur tous les critères
- **Lead Generation** : Augmentation de 150% des leads qualifiés en 6 mois
- **Mobile-First** : Expérience mobile parfaite avec Core Web Vitals au vert

## 🚀 Tech Stack

| Technologie      | Version | Usage                           |
| ---------------- | ------- | ------------------------------- |
| **Next.js**      | 15.1.x  | Framework React avec App Router |
| **React**        | 19.0.x  | Library UI                      |
| **TypeScript**   | 5.6.x   | Type Safety                     |
| **Tailwind CSS** | 4.0.x   | Styling                         |
| **shadcn/ui**    | Latest  | Composants UI accessibles       |
| **Radix UI**     | Latest  | Primitives UI headless          |
| **ESLint**       | 9.x     | Linting                         |
| **Prettier**     | Latest  | Formatage de code               |
| **Husky**        | Latest  | Pre-commit hooks                |

## 📦 Prérequis

- **Node.js** : 20.x ou supérieur
- **npm** : 10.x ou supérieur
- **Git** : Latest version

## 🛠️ Installation

### 1. Cloner le repository

```bash
git clone <repository-url>
cd kbcom-v3
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Remplir les valeurs dans `.env.local` avec vos propres clés API.

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📜 Scripts Disponibles

| Commande               | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Lance le serveur de développement  |
| `npm run build`        | Build pour la production           |
| `npm run start`        | Lance le serveur de production     |
| `npm run lint`         | Exécute ESLint                     |
| `npm run format`       | Formate le code avec Prettier      |
| `npm run format:check` | Vérifie le formatage sans modifier |
| `npm run type-check`   | Vérifie les types TypeScript       |

## 📁 Structure du Projet

```
kbcom-v3/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout racine
│   ├── page.tsx            # Homepage
│   └── globals.css         # Styles globaux
├── components/
│   └── ui/                 # Composants shadcn/ui
├── lib/
│   └── utils.ts            # Utilitaires (cn helper)
├── public/
│   └── assets/
│       └── logo/           # Logos KB-COM
├── docs/                   # Documentation projet
│   ├── prd.md              # Product Requirements
│   ├── architecture.md     # Architecture technique
│   ├── front-end-spec.md   # Spécifications UI/UX
│   └── stories/            # User Stories BMAD
├── .bmad-core/             # Configuration BMAD
└── .github/
    └── workflows/          # CI/CD (à venir)
```

## 🎨 Design System

### Couleurs Principales

- **Primary** : #3a67ff (Bleu moderne)
- **Primary Light** : #6b8aff
- **Primary Dark** : #2a4fd9

### Typographie

- **Police** : Inter (Google Fonts)
- **Système d'espacement** : Grille 8px

### Composants

Utilisation de **shadcn/ui** pour des composants accessibles et personnalisables :

- Button
- Card
- Form
- Label

## 🔧 Configuration

### ESLint

Configuration stricte TypeScript avec :

- Règles Next.js
- @typescript-eslint/recommended
- Prettier integration

### Pre-commit Hooks (Husky)

Chaque commit déclenche automatiquement :

1. Lint-staged (ESLint + Prettier sur fichiers modifiés)
2. Type-check TypeScript

## 🧪 Tests

_(À implémenter - Story 1.2+)_

- **Unit** : Vitest + React Testing Library
- **E2E** : Playwright
- **Performance** : Lighthouse CI

## 📊 Standards de Code

- **Commits** : Conventional Commits
- **Branches** : GitFlow
- **Code Review** : Obligatoire avant merge

## 🚀 Déploiement

_(À configurer - Story 1.2)_

- **Platform** : Vercel
- **Production** : Déploiement automatique depuis `main`
- **Preview** : Déploiement automatique pour chaque PR

## 📝 Méthodologie

Ce projet utilise **BMAD™ (Best Method for Agile Development)** :

- Stories détaillées dans `docs/stories/`
- Epics définis dans le PRD
- Workflow Scrum avec agents spécialisés

## 👥 Contributing

1. Créer une feature branch depuis `main`
2. Faire vos modifications
3. S'assurer que les tests passent
4. Créer une Pull Request

## 📄 License

Propriétaire - KB-COM © 2026

## 🔗 Liens Utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [BMAD Method](https://github.com/anthropics/bmad-method)

---

**Généré avec BMAD™ Core - Story 1.1**
