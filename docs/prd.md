# KB-COM - Product Requirements Document (PRD)

<!-- Powered by BMAD™ Core -->

**Project:** KB-COM Website Redesign with SEO Excellence
**Version:** 1.0
**Date:** 2026-01-06
**Status:** Draft
**PM:** John (BMAD PM Agent)

---

## Goals and Background Context

### Goals

- **SEO Excellence:** Achieve Top 3 positions on "agence web Tours" and related local queries within 4 months of launch
- **Low-KD Geographic Expansion:** Rank Top 5 on 15-20 low-difficulty geographic keywords within 2 months
- **Technical Performance:** Achieve 100/100 Lighthouse scores across all categories (Performance, Accessibility, SEO, Best Practices)
- **Lead Generation:** Increase qualified leads by 150% within 6 months through improved organic traffic and conversion optimization
- **Professional Credibility:** Establish KB-COM's site as the exemplar of technical excellence, demonstrating capabilities to potential clients
- **Mobile-First Experience:** Deliver flawless mobile experience with Core Web Vitals in the green zone
- **Scalable Content Architecture:** Build a CMS-driven system that enables ongoing content expansion and SEO optimization
- **Measurable ROI:** Track and demonstrate +200% increase in organic traffic within 6 months

### Background Context

KB-COM, a web agency based in Tours, France, requires a complete website redesign to address critical SEO underperformance and establish technical leadership in the local market. The current site fails to demonstrate the agency's technical expertise and ranks poorly for key commercial queries, resulting in lost business opportunities and high customer acquisition costs.

The new website will serve dual purposes: (1) as a high-converting lead generation platform optimized for search engines, and (2) as a demonstration of KB-COM's technical capabilities. The project leverages a cutting-edge SEO-optimized stack (Next.js 15 with Server-Side Rendering) combined with an intelligent geographic targeting strategy that captures both high-competition local terms and low-difficulty regional keywords.

Key strategic insight: Rather than competing solely on saturated "agence web Tours" keywords, KB-COM will implement a "Low-Hanging Fruit" SEO strategy targeting 15-20 geographic pages (e.g., "site internet 13ème", "agence web Orléans") with KD < 30 and existing search volume. This approach generates qualified traffic quickly while building authority for more competitive terms.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-01-06 | 1.0 | Initial PRD created from approved Project Brief | BMAD PM Agent |

---

## Requirements

### Functional Requirements

**Core Website Features:**

- **FR1:** Homepage displays agency value proposition, featured services, recent portfolio work, client testimonials, and clear call-to-action for quote requests
- **FR2:** Service pages detail each offering (Website Creation, E-commerce, SEO, Custom Web Applications) with descriptions, pricing tiers or contact CTAs, case studies, and conversion-optimized layouts
- **FR3:** Portfolio/case studies section showcases completed projects with client logos, project descriptions, challenges/solutions, measurable results, technologies used, and links to live sites where possible
- **FR4:** About page presents agency history, team members with photos and bios, company values, Tours office location with map, and trust-building elements
- **FR5:** Contact page provides multiple contact methods (form, phone, email, address), Google Maps integration showing Tours location, operating hours, and form submission confirmation
- **FR6:** Blog/resources section enables publishing SEO-optimized articles with categories/tags, author attribution, social sharing buttons, related posts, and RSS feed
- **FR7:** Site search functionality allows users to search across all site content with autocomplete and relevant results ranking

**Geographic Landing Pages (Low-KD Strategy):**

- **FR8:** System generates 15-20 geo-targeted landing pages targeting low-difficulty keywords (KD < 30, Volume > 50/month)
- **FR9:** Each geographic page includes unique content minimum 500 words with location-specific H1, contextualized introduction mentioning local characteristics, service descriptions adapted to local market, "We serve [Location]" messaging, localized FAQ section, and location-specific CTA
- **FR10:** Geographic pages implement proper SEO structure with semantic URL (/agence-web-[location]), unique meta titles and descriptions per location, LocalBusiness schema markup with geo-coordinates, breadcrumb navigation, internal links to main service pages and nearby geographic pages
- **FR11:** CMS interface allows adding new geographic locations with structured fields: location name, coordinates, unique content blocks, custom meta data, target keywords

**SEO & Technical Features:**

- **FR12:** All pages generate semantic, accessible HTML with proper heading hierarchy (H1-H6), valid HTML5 markup, ARIA labels where needed, alt text on all images
- **FR13:** System auto-generates sitemap.xml including all pages with priority and change frequency, updates automatically when new content published, submits to Google Search Console via webhook
- **FR14:** Robots.txt configuration allows search engine crawling of all public pages, blocks admin/internal pages, references sitemap location
- **FR15:** Each page implements unique, optimized metadata including title tags (50-60 characters), meta descriptions (150-160 characters), Open Graph tags for social sharing, Twitter Card markup, canonical URL tags
- **FR16:** Site implements Schema.org structured data for Organization (company info, logo, social profiles), LocalBusiness (address, phone, hours, service area), Service (offered services), Review (client testimonials), Article (blog posts), Breadcrumb (navigation)
- **FR17:** All images use Next.js Image component with automatic WebP/AVIF generation, responsive srcset, lazy loading, blur-up placeholders, optimal sizing
- **FR18:** Internal linking system automatically suggests related content, maintains logical hierarchy, distributes link equity, tracks broken links

**Conversion Optimization:**

- **FR19:** Primary CTA (quote request form) appears prominently on all key pages with fields: name, email, phone, service interested in, project description, budget range, preferred contact method
- **FR20:** Mobile users see click-to-call button persistently in header/footer
- **FR21:** Exit-intent popup (desktop only) offers lead magnet (e.g., "Free SEO Audit Checklist") in exchange for email
- **FR22:** Trust indicators appear throughout site including client logos, testimonial quotes with photos, certifications/partnerships, years in business, projects completed count

**Content Management:**

- **FR23:** CMS (Sanity/Contentful) allows non-technical editors to create/edit/publish pages, blog posts, portfolio items, team member profiles, testimonials, service descriptions
- **FR24:** Content workflow supports draft → review → publish states with scheduled publishing, revision history, content preview before publish
- **FR25:** Media library organizes images with bulk upload, automatic optimization, tagging/categorization, alt text management, usage tracking

**Analytics & Tracking:**

- **FR26:** Google Analytics 4 integration tracks page views, user journeys, conversion events (form submissions, phone clicks, PDF downloads), traffic sources, user demographics
- **FR27:** Google Search Console integration monitors search performance, indexation status, keyword rankings, crawl errors, structured data validation
- **FR28:** Custom event tracking captures form field interactions, scroll depth, video plays, external link clicks, file downloads
- **FR29:** Dashboard displays key SEO metrics including current keyword positions for target terms, organic traffic trends, Core Web Vitals performance, conversion rates, goal completions

### Non-Functional Requirements

**Performance:**

- **NFR1:** Lighthouse Performance score must be 95-100 on both mobile and desktop
- **NFR2:** Largest Contentful Paint (LCP) must be < 1.2 seconds on 4G mobile connection
- **NFR3:** First Input Delay (FID) must be < 100 milliseconds
- **NFR4:** Cumulative Layout Shift (CLS) must be < 0.1
- **NFR5:** Time to First Byte (TTFB) must be < 200 milliseconds globally via edge CDN
- **NFR6:** Total page weight for typical page must be < 1MB including all assets
- **NFR7:** JavaScript bundle size must be minimized through code-splitting, tree-shaking, and lazy loading

**SEO Technical:**

- **NFR8:** Lighthouse SEO score must be 100/100
- **NFR9:** All pages must be indexable by Google within 48 hours of publication
- **NFR10:** Site must pass all Google Search Console validations for mobile-friendliness
- **NFR11:** Structured data must pass Google's Rich Results Test with zero errors
- **NFR12:** Site must achieve and maintain "Good" status for all Core Web Vitals metrics in Google Search Console
- **NFR13:** Page Speed Insights score must be 95+ on mobile, 98+ on desktop

**Accessibility:**

- **NFR14:** Site must meet WCAG 2.1 Level AA compliance minimum
- **NFR15:** All functionality must be keyboard navigable
- **NFR16:** Color contrast ratios must meet 4.5:1 for normal text, 3:1 for large text
- **NFR17:** Screen reader testing must validate proper content announcement
- **NFR18:** Forms must have proper labels and error messaging
- **NFR19:** Focus indicators must be clearly visible on all interactive elements

**Security:**

- **NFR20:** All traffic must use HTTPS with valid SSL certificate
- **NFR21:** Security headers must include CSP (Content Security Policy), HSTS, X-Frame-Options, X-Content-Type-Options
- **NFR22:** Form submissions must include CSRF protection
- **NFR23:** User inputs must be sanitized to prevent XSS attacks
- **NFR24:** API rate limiting must prevent abuse (100 requests/minute per IP)
- **NFR25:** Secrets and API keys must be stored in environment variables, never in code

**Scalability & Reliability:**

- **NFR26:** Site must achieve 99.9% uptime
- **NFR27:** Site must handle traffic spikes of 10x normal load without degradation
- **NFR28:** CDN must distribute content globally with <50ms latency to 95th percentile of users
- **NFR29:** Deployment process must support zero-downtime releases
- **NFR30:** Site must support adding 100+ geographic pages without performance degradation

**Browser/Device Compatibility:**

- **NFR31:** Site must support latest 2 versions of Chrome, Firefox, Safari, Edge
- **NFR32:** Mobile support required for iOS Safari 14+ and Android Chrome 90+
- **NFR33:** Responsive design must work flawlessly from 320px to 2560px width
- **NFR34:** Site must degrade gracefully on older browsers with progressive enhancement

**GDPR & Legal Compliance:**

- **NFR35:** Cookie consent banner must be GDPR-compliant with granular opt-in/opt-out
- **NFR36:** Privacy policy and legal mentions pages must be comprehensive and accessible
- **NFR37:** Analytics tracking must respect user consent choices
- **NFR38:** Form data must be processed in accordance with RGPD regulations
- **NFR39:** Users must be able to request data deletion

**Monitoring & Maintenance:**

- **NFR40:** Error tracking (Sentry) must capture and alert on JavaScript errors, API failures, performance regressions
- **NFR41:** Uptime monitoring must alert if site is down for >2 minutes
- **NFR42:** Automated daily backups of CMS content
- **NFR43:** Automated monthly SEO ranking reports for all target keywords
- **NFR44:** Monthly automated Lighthouse audits with regression alerts

---

## User Interface Design Goals

### Overall UX Vision

KB-COM's website will embody modern, professional web design that conveys technical expertise while remaining accessible and conversion-focused. The design should feel premium and cutting-edge without being intimidating—balancing sophistication with approachability.

**Key UX Principles:**
- **Clarity First:** Every page has a clear primary purpose and obvious next action
- **Speed Perception:** Instant feedback, optimistic UI updates, skeleton screens during loading
- **Trust Building:** Professional photography, client logos, specific results, transparency
- **Mobile-First:** Touch-friendly targets (48px minimum), thumb-zone optimization, simplified mobile navigation
- **Accessibility:** Not an afterthought—baked into every interaction and visual design decision

**Design Inspiration:** Clean, modern agency sites like Vercel, Stripe, Linear—emphasis on whitespace, bold typography, subtle animations, and excellent micro-interactions.

### Key Interaction Paradigms

1. **Progressive Disclosure:** Complex information (service details, case studies) revealed progressively through expand/collapse, tabs, or step-through interfaces
2. **Scroll-Triggered Animations:** Subtle fade-ins and slide-ups as content enters viewport (performance-optimized, respects prefers-reduced-motion)
3. **Sticky Navigation:** Header becomes compact and sticky on scroll for easy access to primary actions
4. **Smart Forms:** Multi-step quote request form with validation, autosave, and progress indication
5. **Contextual CTAs:** Call-to-action buttons adapt based on page context (e.g., "Get E-commerce Quote" on e-commerce service page)
6. **Hover Previews:** Portfolio items show project details on hover (desktop) or tap (mobile)

### Core Screens and Views

**Essential Pages (MVP):**

1. **Homepage**
   - Hero section with value proposition and primary CTA
   - Featured services grid (4 services)
   - Selected portfolio showcase (3-6 projects)
   - Client testimonials carousel
   - Trust indicators (client logos, stats)
   - Blog preview (latest 3 articles)
   - Footer with secondary navigation and contact info

2. **Service Detail Pages (×4)**
   - Service overview and benefits
   - Detailed feature breakdown
   - Pricing tiers or CTA to discuss
   - Relevant case studies
   - FAQ section
   - Related services
   - Conversion-focused CTA

3. **Portfolio/Case Studies Listing**
   - Filterable grid (by service type, industry, technology)
   - Project cards with thumbnail, client, technologies
   - Load more / pagination

4. **Individual Case Study Page**
   - Project hero with key stats
   - Challenge/Solution/Results structure
   - Visual showcase (screenshots, videos)
   - Technologies and approach
   - Client testimonial
   - Related projects
   - CTA for similar project

5. **About Page**
   - Agency story and mission
   - Team member grid with photos
   - Values and differentiators
   - Location (map of Tours office)
   - Certifications/partnerships

6. **Contact Page**
   - Multi-channel contact options
   - Smart quote request form
   - Google Maps integration
   - Operating hours
   - FAQ or "What happens next?" section

7. **Blog Listing**
   - Article grid with featured image, title, excerpt, date
   - Category filter/tags
   - Search functionality
   - Pagination

8. **Blog Post Detail**
   - Article content with proper typography
   - Author bio
   - Social sharing
   - Related posts
   - Newsletter signup CTA

9. **Geographic Landing Pages (×15-20)**
   - Location-specific hero
   - "We serve [Location]" messaging
   - Services overview adapted to local market
   - Local testimonials (if available)
   - FAQ with local context
   - CTA with location in text
   - Map showing service area

10. **Legal Pages**
    - Privacy Policy
    - Legal Mentions (Mentions Légales)
    - Cookie Policy
    - Terms of Service

### Accessibility

**Target:** WCAG 2.1 Level AA compliance

**Key Requirements:**
- Full keyboard navigation with visible focus indicators
- Screen reader compatibility (proper semantic HTML, ARIA labels)
- Sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- Resizable text up to 200% without loss of functionality
- No content flashing more than 3 times per second
- Clear error messages and form validation
- Alt text on all images
- Captions/transcripts for any video content

**Testing:** Automated audits with axe-core + manual testing with screen readers (NVDA, VoiceOver)

### Branding

**Visual Identity:**
- Leverage existing KB-COM brand colors, logo, and typography (unless full rebrand is in scope—clarify with stakeholder)
- If no existing strong brand: Suggest modern, professional palette—primary brand color, neutral grays, accent colors for CTAs
- Typography: Clean sans-serif for UI (e.g., Inter, Montserrat), optional serif for headlines if brand personality warrants
- Photography: Professional photos of team, office, client meetings if budget allows; otherwise high-quality stock imagery that feels authentic

**Tone:**
- Professional but approachable
- Technically credible without jargon overload
- Local and personable (Tours connection)
- Results-oriented (data and outcomes featured prominently)

### Target Device and Platforms

**Platform:** Web Responsive (mobile-first)

**Supported Devices:**
- **Desktop:** 1024px+ (optimized for 1440px-1920px)
- **Tablet:** 768px-1023px (both portrait and landscape)
- **Mobile:** 320px-767px (optimized for 375px-428px modern smartphones)

**Browser Support:**
- Chrome 90+ (primary)
- Firefox 88+
- Safari 14+ (important for iOS)
- Edge 90+

**Progressive Web App (PWA):**
- Basic PWA features (manifest.json, service worker for offline support) for enhanced mobile experience and "Add to Home Screen" capability

---

## Technical Assumptions

### Repository Structure

**Monorepo**

The project will use a **single repository (monorepo)** for simplicity and rapid development velocity during MVP phase.

**Structure:**
```
kb-com-v3/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Marketing pages group
│   ├── api/                # API routes
│   └── layout.tsx
├── components/             # React components
│   ├── ui/                 # Base UI components (shadcn/ui)
│   └── sections/           # Page sections
├── lib/                    # Utilities and helpers
│   ├── seo/                # SEO helpers, metadata generators
│   ├── analytics/          # Analytics tracking
│   └── sanity/             # Sanity CMS client
├── public/                 # Static assets
├── content/                # Markdown content (if not using CMS for all)
├── tests/                  # Tests (Vitest, Playwright)
└── sanity-studio/          # Sanity CMS studio (optional separate folder)
```

**Rationale:** Monorepo simplifies initial development, allows easy code sharing, streamlines deployments. Can migrate to multi-repo if project grows significantly in complexity or if separate teams manage different parts.

### Service Architecture

**Next.js Serverless with Edge Middleware**

- **Core Application:** Next.js 15 App Router with Server Components (SSR/SSG/ISR)
- **API Layer:** Next.js API Routes (serverless functions) for form handling, webhooks, integrations
- **Edge Middleware:** Vercel Edge Functions for redirects, A/B testing, geolocation-based logic
- **Headless CMS:** Sanity.io hosted (managed service) for content management
- **CDN/Hosting:** Vercel platform (optimal for Next.js with global edge network)

**Rationale:** Serverless architecture minimizes infrastructure management, scales automatically, and is cost-effective for agency site traffic patterns. Next.js SSR/SSG delivers optimal SEO and performance. Vercel provides best-in-class Next.js deployment experience with automatic edge optimization.

**Why Not Microservices?** Overkill for this project size. Single Next.js app with API routes provides all needed functionality without distributed system complexity.

### Frontend Stack

**Framework & Language:**
- **Next.js 15.x** with App Router (Server Components, SSR, SSG, ISR)
- **React 19.x**
- **TypeScript 5.x** (type safety, better DX)

**Styling:**
- **Tailwind CSS 4.x** (utility-first, highly customizable, excellent performance)
- **shadcn/ui** (accessible, customizable component library built on Radix UI)
- **CSS Modules** for component-specific styles where needed

**Animations:**
- **Framer Motion** (smooth, performant React animations)
- Respect `prefers-reduced-motion` media query

**Forms:**
- **React Hook Form** (excellent performance, minimal re-renders)
- **Zod** (TypeScript schema validation)

**Rationale:** This stack is the current gold standard for SEO-optimized, performant React applications. TypeScript reduces bugs, Tailwind speeds development, shadcn/ui provides accessible base components.

### Backend & Data

**Headless CMS:**
- **Primary Choice: Sanity.io**
  - Real-time collaborative editing
  - Flexible content modeling
  - Excellent developer experience
  - Webhook support for ISR triggers
  - Free tier sufficient for MVP, scales affordably
- **Alternative: Contentful** (if team prefers)

**Database (if needed beyond CMS):**
- **PostgreSQL via Supabase** for relational data (e.g., form submissions, analytics, user accounts if Phase 2)
- **Redis via Upstash** for caching, rate limiting, session management

**API Layer:**
- **Next.js API Routes** (TypeScript serverless functions)
- **tRPC** (optional—type-safe APIs if building complex client-server communication)

**Email:**
- **Resend** or **SendGrid** for transactional emails (form submission confirmations, internal notifications)

**Rationale:** Sanity provides best balance of flexibility, DX, and cost for content-heavy agency site. Supabase offers managed Postgres without infrastructure overhead. Upstash Redis provides serverless caching.

### SEO & Analytics Tools

**SEO:**
- **next-sitemap** (automatic sitemap generation)
- **next-seo** (metadata helpers)
- Manual Schema.org JSON-LD implementation (full control over structured data)

**Analytics:**
- **Vercel Analytics** (Core Web Vitals, page views—built into Vercel platform)
- **Google Analytics 4** (detailed user behavior, conversions)
- **Google Search Console** (search performance, indexation monitoring)
- **Microsoft Clarity** or **Hotjar** (heatmaps, session recordings—choose one)

**SEO Monitoring (Post-Launch):**
- **Semrush** or **Ahrefs** (keyword tracking, competitor analysis, backlink monitoring)

**Error Tracking:**
- **Sentry** (JavaScript errors, performance issues)

**Rationale:** Vercel Analytics is free and provides critical Core Web Vitals data. GA4 for comprehensive analytics. Search Console is essential for SEO. Clarity/Hotjar for qualitative user behavior insights.

### Deployment & Infrastructure

**Hosting:**
- **Vercel** (primary recommendation)
  - Seamless Next.js integration
  - Automatic deployments from Git
  - Global edge network (70+ locations)
  - Preview deployments for every PR
  - Built-in analytics
  - Generous free tier, affordable Pro plan (~$20/month)

**Alternatives (if Vercel not chosen):**
- **Cloudflare Pages** (excellent performance, competitive pricing)
- **Netlify** (similar to Vercel)

**DNS & Domain:**
- **Cloudflare** (free tier for DNS management, DDoS protection, additional CDN layer)

**CI/CD:**
- **GitHub Actions** (automated tests, linting, type checking on PRs)
- **Vercel's automatic deployments** (main branch → production, PRs → preview)

**Environment Management:**
- **Development:** Local dev environment with Sanity Studio locally or cloud
- **Staging:** Vercel preview deployments (automatic for PRs)
- **Production:** Vercel production deployment from main branch

**Rationale:** Vercel is purpose-built for Next.js and provides exceptional DX, performance, and reliability at reasonable cost. Cloudflare DNS adds extra resilience and performance.

### Testing Requirements

**Testing Strategy:** Unit + Integration + E2E (Full Testing Pyramid)

**Unit Testing:**
- **Vitest** (fast, Vite-based test runner)
- **React Testing Library** (component testing)
- **Coverage Target:** 70%+ for business logic, utility functions

**Integration Testing:**
- API route testing with Vitest
- CMS integration tests (mocked Sanity client)

**End-to-End Testing:**
- **Playwright** (critical user journeys: homepage → service page → form submission, blog post navigation, geographic page SEO verification)
- **Focus:** Core conversion paths, SEO meta tag validation, mobile responsiveness

**Performance Testing:**
- **Lighthouse CI** in GitHub Actions (automated performance regression detection)
- Manual Core Web Vitals monitoring

**Accessibility Testing:**
- **axe-core** automated tests in CI
- Manual screen reader testing (NVDA, VoiceOver) before major releases

**Rationale:** Comprehensive testing ensures quality, prevents regressions, and maintains SEO/performance standards. Automated tests in CI catch issues before production.

### Additional Technical Assumptions and Requests

**Code Quality:**
- **ESLint** with strict TypeScript rules
- **Prettier** for code formatting
- **Husky** pre-commit hooks for linting and type checking
- **Conventional Commits** for commit message standards

**Documentation:**
- README with setup instructions
- Component documentation (Storybook optional for Phase 2)
- Architecture Decision Records (ADRs) for major technical choices

**Internationalization (i18n):**
- **NOT in MVP** (French only initially)
- **Phase 2:** Add English version using next-intl or next-i18next if international client acquisition becomes priority

**Performance Budget:**
- JavaScript bundle: max 150KB gzipped for initial route
- Images: WebP with AVIF fallback, max 150KB per hero image
- Fonts: subset and preload, max 50KB total

**Security:**
- Dependabot for automated dependency updates
- Regular security audits with `npm audit`
- CSP headers to prevent XSS
- Rate limiting on API routes

**Backup & Disaster Recovery:**
- Daily automated backups of Sanity CMS content
- Git repository is source of truth for code
- Vercel maintains deployment snapshots

**Third-Party Integrations (MVP):**
- Google Analytics 4
- Google Search Console
- Google Maps API (for contact page)
- Email service (Resend/SendGrid)
- Sanity CMS

**Future Integrations (Post-MVP):**
- CRM (HubSpot/Pipedrive)
- Live chat (Intercom/Crisp)
- Payment processing (Stripe) if SaaS offerings added

**Assumptions Requiring Validation:**
- KB-COM team has experience with React/TypeScript or is willing to learn
- Budget supports Vercel Pro plan (~€20/month) + Sanity Growth plan (~€99/month if needed)
- kb-com.fr domain is controlled by KB-COM and can be pointed to Vercel
- Content (text, images) will be provided by KB-COM or can be created internally
- Client logos and testimonials can be secured with appropriate permissions
- Google Business Profile is set up and managed by KB-COM

---

## Epic List

The following epics represent the major phases of development, each delivering a complete, deployable increment of value. Epics are sequenced to establish foundation first, then build core functionality, followed by optimization and expansion features.

**Epic 1: Foundation & Technical Infrastructure**
**Goal:** Establish project foundation with Next.js setup, core layout, SEO infrastructure, and deployment pipeline. Deliver initial working homepage.

**Epic 2: Core Marketing Pages**
**Goal:** Build essential marketing pages (Services, About, Contact) with SEO optimization, ensuring each page is production-ready and driving conversions.

**Epic 3: Portfolio & Case Studies**
**Goal:** Showcase KB-COM's work through detailed portfolio section with filtering, case study pages, and integration with CMS for easy updates.

**Epic 4: Blog & Content System**
**Goal:** Enable content marketing through blog functionality with SEO-optimized articles, categories, search, and CMS-driven authoring.

**Epic 5: Geographic Landing Pages (Low-KD SEO Strategy)**
**Goal:** Implement dynamic geographic landing page system targeting 15-20 low-difficulty keywords to rapidly generate qualified organic traffic.

**Epic 6: Conversion Optimization & Analytics**
**Goal:** Optimize for lead generation through advanced forms, CTAs, tracking, and A/B testing infrastructure.

**Epic 7: Performance & Accessibility Audit**
**Goal:** Ensure all Lighthouse scores are 100/100, Core Web Vitals are green, and WCAG AA compliance is met across the site.

**Epic 8: Pre-Launch SEO & Go-Live**
**Goal:** Execute final SEO optimizations, submit sitemaps, set up monitoring, and deploy to production with full analytics and tracking.

---

## Epic 1: Foundation & Technical Infrastructure

**Epic Goal:** Establish robust technical foundation with Next.js 15, TypeScript, Tailwind CSS, deployment pipeline, and core SEO infrastructure. Deliver working homepage to validate setup.

### User Stories

#### Story 1.1: Project Setup & Development Environment

**As a** developer
**I want** a properly configured Next.js 15 project with TypeScript and essential tooling
**So that** the team can develop efficiently with type safety and code quality standards

**Acceptance Criteria:**
- [x] Next.js 15 App Router project initialized with TypeScript
- [x] Tailwind CSS 4.x configured with custom theme (KB-COM brand colors)
- [x] shadcn/ui installed with initial components (Button, Form, Card)
- [x] ESLint configured with TypeScript strict rules
- [x] Prettier configured for code formatting
- [x] Husky pre-commit hooks set up (lint, type-check)
- [x] Git repository created with initial commit
- [x] README.md with setup instructions
- [x] Environment variables template (.env.example)
- [x] VSCode recommended extensions and settings files

**Technical Notes:**
- Use `npx create-next-app@latest` with TypeScript, Tailwind, App Router
- Configure Tailwind with KB-COM brand tokens
- Set up path aliases (@/components, @/lib, etc.)

---

#### Story 1.2: Vercel Deployment & CI/CD Pipeline

**As a** developer
**I want** automated deployments to Vercel with preview environments for PRs
**So that** we can test changes in production-like environment before merging

**Acceptance Criteria:**
- [x] Vercel project created and connected to Git repository
- [x] Production deployment (main branch) configured with kb-com.fr domain
- [x] Preview deployments enabled for all pull requests
- [x] Environment variables set in Vercel dashboard (API keys, secrets)
- [x] GitHub Actions workflow runs tests and linting on PRs
- [x] Lighthouse CI configured to run on each PR with performance budgets
- [x] Build status badge added to README

**Technical Notes:**
- Vercel automatically deploys on push to main
- Set performance budgets in Lighthouse CI config (LCP < 1.2s, etc.)

---

#### Story 1.3: SEO Infrastructure & Metadata System

**As a** developer
**I want** robust SEO infrastructure with metadata generation, sitemap, and robots.txt
**So that** all pages are optimally indexed by search engines

**Acceptance Criteria:**
- [x] next-seo library installed and configured
- [x] Reusable metadata helper function created (generateMetadata)
- [x] Default site metadata configured (title template, description, OG images)
- [x] Sitemap.xml automatically generated with next-sitemap
- [x] Robots.txt configured to allow all crawling, reference sitemap
- [x] Favicon and app icons created (favicon.ico, apple-touch-icon, manifest icons)
- [x] Manifest.json configured for PWA basics
- [x] Schema.org Organization markup added to root layout

**Technical Notes:**
```typescript
// Example metadata helper
export function generatePageMetadata(page: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}) {
  return {
    title: `${page.title} | KB-COM`,
    description: page.description,
    keywords: page.keywords,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://kb-com.fr${page.path}`,
      siteName: 'KB-COM',
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: `https://kb-com.fr${page.path}`,
    },
  }
}
```

---

#### Story 1.4: Core Layout & Navigation

**As a** user
**I want** consistent navigation and footer across all pages
**So that** I can easily navigate the site

**Acceptance Criteria:**
- [x] Root layout created with header and footer
- [x] Header includes KB-COM logo, main navigation (Services, Portfolio, About, Blog, Contact), mobile hamburger menu
- [x] Header becomes sticky on scroll (with compact mode)
- [x] Mobile navigation: slide-in drawer with close button
- [x] Footer includes secondary navigation, social links, contact info, legal links (Privacy, Legal Mentions)
- [x] Active page highlighted in navigation
- [x] Accessibility: keyboard navigation works, focus indicators visible
- [x] Responsive: works on mobile, tablet, desktop

**Technical Notes:**
- Use Radix UI or Headless UI for accessible mobile menu
- Implement sticky header with scroll detection
- Footer should include Schema.org LocalBusiness info

---

#### Story 1.5: Homepage MVP (Foundation Validation)

**As a** potential client
**I want** to understand KB-COM's value proposition when I land on the homepage
**So that** I can decide if they're the right agency for my project

**Acceptance Criteria:**
- [x] Hero section with headline, subheadline, primary CTA ("Get a Quote")
- [x] Services preview section: 4 service cards (Website Creation, E-commerce, SEO, Custom Apps) with icon, title, short description, "Learn More" link
- [x] Trust indicators section: client logos (placeholder if real logos not ready), "X years experience", "X projects completed"
- [x] Primary CTA button leads to contact page (or form)
- [x] Metadata optimized for "agence web Tours" keyword
- [x] Schema.org Organization and LocalBusiness markup implemented
- [x] Mobile responsive
- [x] Lighthouse score 90+ (will optimize to 100 in Epic 7)

**Content Requirements:**
- Hero headline: "Votre Agence Web à Tours | Création de Sites Internet" (or similar)
- Hero subheadline emphasizes SEO, performance, modern technologies
- Service descriptions: 2-3 sentences each

**Technical Notes:**
- Hero image optimized with Next.js Image (WebP, lazy load)
- Semantic HTML (h1, section tags)

---

#### Story 1.6: Error Pages (404, 500)

**As a** user
**I want** helpful error pages when something goes wrong
**So that** I can navigate back to useful content

**Acceptance Criteria:**
- [x] Custom 404 page created (Page Not Found)
  - Friendly message
  - Search bar (if implemented) or navigation links
  - Link to homepage
- [x] Custom 500 page created (Server Error)
  - Apologetic message
  - Link to contact support
  - Link to homepage
- [x] Both pages follow site layout (header/footer)
- [x] Both pages have proper metadata
- [x] Accessibility validated

---

#### Story 1.7: Analytics & Tracking Setup

**As a** site owner
**I want** analytics tracking on all pages
**So that** I can measure traffic and user behavior

**Acceptance Criteria:**
- [x] Google Analytics 4 property created
- [x] GA4 tracking code integrated via gtag or @next/third-parties
- [x] Vercel Analytics enabled (automatic Core Web Vitals tracking)
- [x] Cookie consent logic implemented (GDPR compliant)
  - Banner on first visit with Accept/Reject options
  - Granular choices (Analytics, Marketing)
  - Consent stored in localStorage
  - GA4 only loads after consent
- [x] Test events firing correctly (page_view, CTA clicks)

**Technical Notes:**
- Use Tarteaucitron or Axeptio for cookie consent (or build simple custom solution)
- Document analytics events for future reference

---

**Epic 1 Definition of Done:**
- All Story 1.x acceptance criteria met
- Project deployed to Vercel production
- Homepage accessible at kb-com.fr (or preview URL)
- CI/CD pipeline functional (automated deployments, tests, Lighthouse CI)
- Lighthouse Performance 90+, SEO 100, Accessibility 90+, Best Practices 95+
- No console errors or warnings
- Code reviewed and merged to main

---

## Epic 2: Core Marketing Pages

**Epic Goal:** Build all primary marketing pages (Service Pages, About, Contact) with full SEO optimization, ensuring each page drives conversions and showcases KB-COM's expertise.

### User Stories

#### Story 2.1: Services Overview Page

**As a** potential client
**I want** to see all services KB-COM offers in one place
**So that** I can understand their full capabilities

**Acceptance Criteria:**
- [x] `/services` page created
- [x] Page headline: "Nos Services Web à Tours" (or similar)
- [x] 4 service sections: Website Creation, E-commerce, SEO & Referencing, Custom Web Applications
- [x] Each service includes: icon, title, 2-3 sentence description, list of 3-5 key features, "Learn More" CTA linking to dedicated service page
- [x] Trust-building element: "Why choose KB-COM?" section with 3-4 differentiators
- [x] CTA section at bottom: "Ready to start your project? Get a free quote"
- [x] Metadata optimized for "services agence web Tours"
- [x] Schema.org Service markup for each service
- [x] Internal links to individual service pages
- [x] Responsive, accessible
- [x] Lighthouse SEO 100

---

#### Story 2.2: Service Detail Page - Website Creation

**As a** business owner needing a website
**I want** detailed information about KB-COM's website creation service
**So that** I can understand what's included and decide to contact them

**Acceptance Criteria:**
- [x] `/services/creation-site-internet` page created
- [x] H1: "Création de Site Internet à Tours | KB-COM"
- [x] Hero section with service overview (2-3 paragraphs)
- [x] "What we offer" section: detailed feature list (responsive design, SEO-optimized, fast loading, custom CMS, etc.)
- [x] "Our Process" section: 4-5 step workflow (Discovery → Design → Development → Launch → Support)
- [x] Pricing section: "From €X,XXX" or "Contact us for custom quote"
- [x] Portfolio CTA: "See our website projects" linking to portfolio filtered by website category
- [x] FAQ section: 4-6 common questions about website creation
- [x] Conversion CTA: Form or "Request a quote" button
- [x] Related services links (E-commerce, SEO)
- [x] Metadata optimized for "création site internet Tours"
- [x] Schema.org Service and FAQ markup
- [x] Testimonial/client logo if available
- [x] Responsive, accessible

**Content Notes:**
- Emphasize modern technologies (Next.js, React), SEO benefits, mobile-first design
- Address pain points: "Tired of slow, outdated websites?"

---

#### Story 2.3: Service Detail Page - E-commerce

**As a** business owner wanting to sell online
**I want** to understand KB-COM's e-commerce capabilities
**So that** I can evaluate them for building my online store

**Acceptance Criteria:**
- [x] `/services/e-commerce` page created
- [x] Similar structure to Story 2.2 but focused on e-commerce
- [x] Key features: product catalogs, payment integration (Stripe, PayPal), inventory management, order processing, SEO for product pages, mobile shopping experience
- [x] Platform options mentioned: Custom solutions, Shopify, WooCommerce (clarify KB-COM's preferred approach)
- [x] "Success Metrics" section: examples like "+50% online sales" (use real client results if available)
- [x] Trust elements: secure payments, GDPR compliance, PCI compliance
- [x] Metadata optimized for "création site e-commerce Tours"
- [x] Schema.org Service markup

---

#### Story 2.4: Service Detail Page - SEO & Referencing

**As a** business owner struggling with online visibility
**I want** to learn about KB-COM's SEO services
**So that** I can improve my Google rankings

**Acceptance Criteria:**
- [x] `/services/seo-referencement` page created
- [x] Hero explains SEO value proposition: "Rank higher, get more clients"
- [x] Services offered: technical SEO audit, on-page optimization, content strategy, local SEO (Google Business Profile), link building, monthly reporting
- [x] "Why SEO matters" section with stats/benefits
- [x] "Our SEO Process" section
- [x] Case study CTA: "See our SEO results" with before/after ranking examples
- [x] Pricing: monthly retainer or project-based (clarify with stakeholder)
- [x] FAQ: "How long does SEO take?", "What results can I expect?", etc.
- [x] Metadata optimized for "SEO Tours", "référencement naturel Tours"
- [x] Schema.org Service and FAQ markup

**Content Notes:**
- Highlight local SEO expertise (Tours and region)
- Mention Low-KD geographic strategy as innovative approach

---

#### Story 2.5: Service Detail Page - Custom Web Applications

**As a** business with specific software needs
**I want** to understand KB-COM's custom development capabilities
**So that** I can commission a tailored web application

**Acceptance Criteria:**
- [x] `/services/applications-web-sur-mesure` page created
- [x] Hero positions KB-COM as technical experts for complex projects
- [x] Types of applications: SaaS platforms, internal tools, CRM/ERP, APIs, mobile-friendly web apps
- [x] Technologies: React, Next.js, Node.js, TypeScript, PostgreSQL (adapt to KB-COM stack)
- [x] "Development Process" section: Agile methodology, sprints, continuous delivery
- [x] "Why Custom?" section: advantages over off-the-shelf software
- [x] Case study CTA showcasing complex app built
- [x] Consultation CTA: "Discuss your project with our technical team"
- [x] Metadata optimized for "développement web sur mesure Tours"
- [x] Schema.org Service markup

---

#### Story 2.6: About Page

**As a** potential client
**I want** to learn about KB-COM's story and team
**So that** I can trust them with my project

**Acceptance Criteria:**
- [x] `/about` page created
- [x] H1: "À Propos de KB-COM | Agence Web à Tours"
- [x] Company story section: founding, mission, values (2-3 paragraphs)
- [x] "Why work with us?" section: 4-5 key differentiators (local expertise, technical excellence, personalized service, proven results)
- [x] Team section: grid of team members with photo, name, role, short bio (or "Meet our team" CTA if individual bios not ready)
- [x] Location section: "Based in Tours, serving [regions]" with office address and Google Maps embed
- [x] Certifications/partnerships section if applicable (Google Partner, technology partnerships)
- [x] Timeline or stats section: "X years in business, X projects delivered, X happy clients"
- [x] CTA: "Ready to work with us? Get in touch"
- [x] Metadata optimized for "agence web Tours", brand queries
- [x] Schema.org Organization markup with address, founders, etc.
- [x] Responsive, accessible

**Content Notes:**
- Convey local pride (Tours), technical expertise, client-centric approach
- Include trust signals (years in business, client logos)

---

#### Story 2.7: Contact Page

**As a** potential client
**I want** multiple easy ways to contact KB-COM
**So that** I can start a conversation about my project

**Acceptance Criteria:**
- [x] `/contact` page created
- [x] H1: "Contactez KB-COM | Devis Gratuit"
- [x] Multiple contact methods displayed prominently:
  - Phone number (click-to-call on mobile)
  - Email address (clickable mailto link)
  - Office address with Google Maps embed (interactive map showing Tours location)
  - Operating hours
- [x] Primary contact form with fields:
  - Name (required)
  - Email (required, validated)
  - Phone (optional)
  - Service interested in (dropdown: Website Creation, E-commerce, SEO, Custom App, Other)
  - Project description (textarea, required)
  - Budget range (optional dropdown)
  - Consent checkbox (GDPR: "I agree to be contacted by KB-COM")
  - Submit button
- [x] Form validation (client-side with React Hook Form + Zod, server-side in API route)
- [x] Form submission:
  - API route at `/api/contact` handles submission
  - Sends email to KB-COM team (via Resend/SendGrid)
  - Sends confirmation email to user
  - Success message displayed: "Thank you! We'll respond within 24 hours."
  - Error handling with user-friendly messages
- [x] FAQ section: "What happens after I contact you?", "How quickly will you respond?"
- [x] Trust elements: "Free consultation", "No commitment", testimonial quote
- [x] Metadata optimized for "contact agence web Tours"
- [x] Schema.org LocalBusiness markup with contact info
- [x] Accessibility: form labels, error announcements, keyboard navigation
- [x] Spam protection: rate limiting in API route (max 5 submissions per IP per hour)

**Technical Notes:**
```typescript
// Form schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  service: z.enum(['website', 'ecommerce', 'seo', 'custom-app', 'other']),
  message: z.string().min(10, 'Please describe your project'),
  budget: z.enum(['under-5k', '5k-10k', '10k-25k', '25k+']).optional(),
  consent: z.boolean().refine(val => val === true, 'Consent required'),
});
```

---

**Epic 2 Definition of Done:**
- All Story 2.x acceptance criteria met
- All pages deployed to production
- Internal linking between pages implemented
- All pages achieve Lighthouse SEO 100, Accessibility 90+
- Metadata unique and optimized for each page
- Schema.org markup validated with Google Rich Results Test
- Contact form tested (successful submissions, error handling, email delivery)
- Mobile responsiveness verified on real devices
- Code reviewed and merged

---

## Epic 3: Portfolio & Case Studies

**Epic Goal:** Showcase KB-COM's expertise through detailed portfolio section with project filtering, individual case study pages, and CMS integration for easy content management.

### User Stories

#### Story 3.1: Sanity CMS Setup & Content Modeling

**As a** content manager
**I want** a headless CMS to manage portfolio projects
**So that** I can add/edit projects without developer intervention

**Acceptance Criteria:**
- [x] Sanity.io project created and configured
- [x] Sanity Studio set up (local or deployed at kb-com.fr/studio)
- [x] Content schema created for "Project" document type:
  - title (string, required)
  - slug (slug, required, generated from title)
  - client (string)
  - featured (boolean, for homepage showcase)
  - services (array of references to Service taxonomy: Website, E-commerce, SEO, Custom App)
  - industry (array of strings: Retail, Healthcare, Education, etc.)
  - technologies (array of strings: Next.js, React, WordPress, etc.)
  - projectUrl (url, optional—link to live site)
  - thumbnail (image with alt text)
  - heroImage (image)
  - description (text, short summary for cards)
  - challenge (block content, detailed)
  - solution (block content, detailed)
  - results (block content with metrics)
  - gallery (array of images)
  - testimonial (object: quote, author, role, photo)
  - publishedAt (date)
- [x] Content schema for "Testimonial" document type (reusable):
  - quote (text)
  - author (string)
  - role (string)
  - company (string)
  - photo (image)
  - rating (number 1-5)
- [x] Sample projects created (3-5 projects, use placeholder content if real projects not ready)
- [x] Sanity client configured in Next.js project (GROQ queries)
- [x] Image optimization pipeline via Sanity's image CDN

**Technical Notes:**
```typescript
// Example Sanity schema
export default {
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'client', type: 'string' },
    { name: 'featured', type: 'boolean', initialValue: false },
    { name: 'services', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] },
    // ... more fields
  ],
}
```

---

#### Story 3.2: Portfolio Listing Page

**As a** potential client
**I want** to browse KB-COM's past projects
**So that** I can see examples of their work

**Acceptance Criteria:**
- [x] `/portfolio` page created
- [x] H1: "Nos Réalisations Web | Portfolio KB-COM"
- [x] Filter UI:
  - Filter by Service (All, Website Creation, E-commerce, SEO, Custom App)
  - Filter by Industry (All, Retail, Healthcare, Education, etc.)
  - Filter by Technology (All, Next.js, WordPress, Shopify, etc.)
  - Filters can be combined (e.g., E-commerce + Retail)
  - Active filters displayed with remove option
- [x] Project grid:
  - Card for each project with thumbnail image, client name/project title, services tags, short description, "View Project" CTA
  - Grid responsive: 1 column mobile, 2 columns tablet, 3 columns desktop
  - Hover effect on cards (subtle elevation, thumbnail zoom)
- [x] Pagination or "Load More" button if >12 projects
- [x] Empty state if no projects match filters: "No projects found. Clear filters."
- [x] Metadata optimized for "portfolio agence web Tours", "réalisations KB-COM"
- [x] Schema.org ItemList markup for portfolio
- [x] Accessibility: filters keyboard-operable, focus management
- [x] Projects fetched from Sanity CMS via GROQ query
- [x] ISR: page regenerates every 1 hour (or on-demand via webhook)

**Technical Notes:**
- Implement filtering client-side for MVP (all projects fetched, filtered in React)
- Phase 2: move to server-side filtering with search params for better SEO

---

#### Story 3.3: Individual Case Study Page

**As a** potential client
**I want** to read detailed case studies of KB-COM's projects
**So that** I can understand their process and results

**Acceptance Criteria:**
- [x] Dynamic route `/portfolio/[slug]` created
- [x] Page pulls project data from Sanity by slug
- [x] Hero section:
  - H1: Project title
  - Client name
  - Services and technologies tags
  - Hero image (full-width or large)
  - Key stats/results (e.g., "+150% traffic", "50% faster load time") displayed prominently
- [x] Project overview section (2-3 paragraphs)
- [x] Challenge section:
  - "The Challenge" heading
  - Detailed description of client's problem/needs
- [x] Solution section:
  - "Our Solution" heading
  - Detailed description of approach taken
  - Technologies used (with icons if possible)
  - Process highlights
- [x] Results section:
  - "The Results" heading
  - Measurable outcomes (traffic increase, conversion rate, performance metrics)
  - Visual charts/graphs if data available (optional MVP, nice-to-have)
- [x] Gallery section: screenshots, mockups, or photos of final product (2-6 images)
- [x] Client testimonial (if available): quote, author, role, photo
- [x] Link to live site (if public and client permits)
- [x] Related projects CTA: "See similar projects" with 3 project cards
- [x] Contact CTA: "Start your project with us"
- [x] Metadata: dynamic title/description based on project
- [x] Schema.org Article markup
- [x] Social share buttons (LinkedIn, Twitter, Facebook)
- [x] Breadcrumb navigation: Home > Portfolio > [Project Title]
- [x] Responsive, accessible

**Technical Notes:**
- Use `generateStaticParams` to pre-render all project pages at build time
- ISR revalidation on new project publish via Sanity webhook

---

#### Story 3.4: Featured Projects on Homepage

**As a** site visitor
**I want** to see highlighted projects on the homepage
**So that** I get immediate proof of KB-COM's capabilities

**Acceptance Criteria:**
- [x] Homepage updated with "Featured Projects" section
- [x] Section displays 3-6 projects marked as "featured" in Sanity
- [x] Each project card: thumbnail, title, client, short description, "View Case Study" link
- [x] "View All Projects" CTA linking to `/portfolio`
- [x] Responsive grid
- [x] Data fetched from Sanity (projects where featured = true)

---

**Epic 3 Definition of Done:**
- Sanity CMS operational with 3-5 real or placeholder projects
- Portfolio listing page functional with filtering
- Individual case study pages rendering correctly
- Featured projects appear on homepage
- All pages Lighthouse SEO 100, Accessibility 90+
- ISR configured (pages regenerate on content updates)
- Code reviewed and merged

---

## Epic 4: Blog & Content System

**Epic Goal:** Enable content marketing through a fully-featured blog with SEO-optimized articles, category filtering, search, and CMS authoring.

### User Stories

#### Story 4.1: Blog Content Schema in Sanity

**As a** content creator
**I want** to write and publish blog posts in the CMS
**So that** I can manage content without developer help

**Acceptance Criteria:**
- [x] Sanity schema created for "Blog Post" document type:
  - title (string, required)
  - slug (slug, generated from title)
  - excerpt (text, 1-2 sentences for cards)
  - author (reference to Author document, or simple string)
  - publishedAt (date, required)
  - category (reference to Category taxonomy: SEO, Web Development, E-commerce, Tutorials, News)
  - tags (array of strings)
  - featuredImage (image with alt text)
  - body (rich text with block content: headings, paragraphs, lists, images, code blocks, blockquotes)
  - seo (object: metaTitle, metaDescription, keywords)
  - featured (boolean, for homepage)
- [x] Sanity schema for "Author" document type:
  - name (string)
  - slug (slug)
  - bio (text)
  - photo (image)
  - social links (Twitter, LinkedIn)
- [x] Sanity schema for "Category" document type:
  - title (string)
  - slug (slug)
  - description (text)
- [x] Sample blog posts created (10-15 posts, can be placeholder content initially)
- [x] Sample categories created (SEO, Web Development, E-commerce, Case Studies)

---

#### Story 4.2: Blog Listing Page

**As a** reader
**I want** to browse KB-COM's blog articles
**So that** I can learn about web development and SEO

**Acceptance Criteria:**
- [x] `/blog` page created
- [x] H1: "Blog KB-COM | Actualités Web, SEO & Développement"
- [x] Article grid: cards for each post with featured image, title, excerpt, author, date, category tag, "Read More" link
- [x] Pagination (12 posts per page) or "Load More" button
- [x] Sidebar or top filter:
  - Filter by category (All, SEO, Web Development, E-commerce, etc.)
  - Search bar (searches titles and excerpts)
- [x] "Featured Posts" section at top (2-3 posts marked as featured)
- [x] Newsletter signup CTA (optional for MVP, can be Phase 2)
- [x] Metadata optimized for "blog agence web Tours"
- [x] Schema.org Blog markup
- [x] RSS feed generated at `/blog/rss.xml`
- [x] Responsive, accessible
- [x] Data fetched from Sanity with pagination
- [x] ISR: revalidate every hour

**Technical Notes:**
- Search functionality: client-side filtering for MVP (fetch all posts, filter in React)
- Phase 2: Implement server-side search with Algolia or Sanity's search API

---

#### Story 4.3: Individual Blog Post Page

**As a** reader
**I want** to read full blog posts with rich formatting
**So that** I can gain valuable insights

**Acceptance Criteria:**
- [x] Dynamic route `/blog/[slug]` created
- [x] Page pulls blog post data from Sanity by slug
- [x] Article header:
  - H1: Post title
  - Author photo, name, date published
  - Category tag
  - Featured image
  - Social share buttons (LinkedIn, Twitter, Facebook, copy link)
- [x] Article body:
  - Rich text rendered from Sanity block content
  - Proper typography (headings, paragraphs, lists, blockquotes)
  - Inline images with captions
  - Code blocks with syntax highlighting (if technical blog)
  - Responsive, readable font size
- [x] Author bio section at bottom:
  - Photo, name, short bio
  - Link to author page (optional) or social links
- [x] Related posts section: "You might also like" with 3 related posts (same category or tags)
- [x] Comments section: placeholder for Phase 2 (could use Disqus, Giscus, or custom)
- [x] Newsletter signup CTA
- [x] Breadcrumb: Home > Blog > [Category] > [Post Title]
- [x] Metadata: dynamic SEO title/description from post.seo or defaults
- [x] Schema.org Article markup with author, date, publisher
- [x] Table of contents (auto-generated from H2/H3 headings) if post is long (>1500 words)
- [x] Estimated read time displayed
- [x] Accessibility: proper heading structure, alt texts, keyboard navigation

**Technical Notes:**
- Use `generateStaticParams` to pre-render all blog posts
- ISR revalidation on publish via Sanity webhook
- Use `@portabletext/react` to render Sanity block content

---

#### Story 4.4: Category Pages

**As a** reader interested in specific topics
**I want** to view all posts in a category
**So that** I can deep-dive into that subject

**Acceptance Criteria:**
- [x] Dynamic route `/blog/category/[slug]` created
- [x] Page displays all posts in selected category
- [x] H1: "Articles sur [Category Name]"
- [x] Category description (2-3 sentences pulled from Sanity category doc)
- [x] Post grid (same as main blog listing)
- [x] Breadcrumb: Home > Blog > [Category Name]
- [x] Metadata optimized for category keywords
- [x] ISR: revalidate every hour

---

#### Story 4.5: Blog Search Functionality

**As a** reader
**I want** to search blog content
**So that** I can find specific articles

**Acceptance Criteria:**
- [x] Search bar on `/blog` page
- [x] As user types, results filter in real-time (client-side)
- [x] Search matches against title, excerpt, category, tags
- [x] "No results found" state with suggestion to try different keywords
- [x] Accessible: proper labels, keyboard navigation

**Phase 2 Enhancement:**
- Implement full-text search with Algolia or Sanity search API

---

#### Story 4.6: Featured Blog Posts on Homepage

**As a** site visitor
**I want** to see recent/featured blog posts on the homepage
**So that** I discover valuable content

**Acceptance Criteria:**
- [x] Homepage updated with "Latest from Our Blog" section
- [x] Displays 3 recent or featured posts
- [x] Post cards: image, title, excerpt, date, "Read More" link
- [x] "View All Articles" CTA linking to `/blog`
- [x] Data fetched from Sanity

---

**Epic 4 Definition of Done:**
- Blog listing, post detail, and category pages functional
- At least 10 blog posts published (can be placeholder or real SEO content)
- Search functionality working
- Featured posts on homepage
- RSS feed generated
- All pages Lighthouse SEO 100, Accessibility 90+
- ISR configured
- Code reviewed and merged

---

## Epic 5: Geographic Landing Pages (Low-KD SEO Strategy)

**Epic Goal:** Implement dynamic system for generating 15-20 geo-targeted landing pages optimized for low-difficulty keywords to rapidly capture qualified organic traffic.

### User Stories

#### Story 5.1: Geographic Locations Content Model in Sanity

**As a** content manager
**I want** to define geographic locations in the CMS
**So that** I can create and manage geo-targeted landing pages

**Acceptance Criteria:**
- [x] Sanity schema created for "GeoLocation" document type:
  - name (string, e.g., "Paris 13ème arrondissement")
  - slug (slug, e.g., "paris-13eme")
  - type (string: arrondissement, ville, quartier)
  - coordinates (geopoint: latitude/longitude)
  - targetKeyword (string, e.g., "site internet 13ème")
  - keywordDifficulty (number, KD from Semrush)
  - searchVolume (number, monthly searches)
  - introText (block content, unique 2-3 paragraphs about serving this location)
  - serviceHighlights (array of strings, 3-5 points tailored to location)
  - localFAQ (array of objects: question, answer—location-specific questions)
  - testimonial (reference to Testimonial doc, if client from this area)
  - metaTitle (string)
  - metaDescription (string)
- [x] 15-20 GeoLocation documents created based on Semrush keyword research (mix of Paris arrondissements, nearby cities like Orléans, Blois, etc.)
- [x] Each location has unique introText (minimum 500 words total page content to avoid thin content penalty)

**Content Strategy:**
- Research completed: Semrush Keyword Magic Tool filtered for KD < 30, Volume > 50
- Target locations identified (e.g., "site internet 13ème" KD 15, 120/mo; "agence web Orléans" KD 25, 80/mo, etc.)
- Content written to be genuinely useful, not just keyword stuffing (e.g., mention local business landscape, why businesses in this area need web services)

---

#### Story 5.2: Geographic Landing Page Template

**As a** potential client in a specific location
**I want** to find a page tailored to my area
**So that** I feel KB-COM understands and serves my local market

**Acceptance Criteria:**
- [x] Dynamic route `/agence-web-[location]` created (or `/services/agence-web/[location]`)
- [x] Page pulls data from Sanity GeoLocation by slug
- [x] Page structure:
  - H1: "Agence Web à [Location Name] | KB-COM" (e.g., "Agence Web à Paris 13ème | KB-COM")
  - Hero section: Location-specific intro (pulled from GeoLocation.introText)
  - "Nos Services pour [Location]" section: 4 service cards (same as main services, but with location-aware text like "Création de site internet pour entreprises à [Location]")
  - "Pourquoi choisir KB-COM à [Location]?" section: Benefits/differentiators
  - "Nous nous déplaçons à [Location]" section: Map showing service area (Google Maps embed with marker on location coordinates)
  - FAQ section: Location-specific questions (pulled from GeoLocation.localFAQ)
  - Testimonial (if available from that location)
  - CTA: "Demandez votre devis gratuit pour [Location]" linking to contact form (pre-fill location field if possible)
- [x] Breadcrumb: Home > Services > Agence Web > [Location]
- [x] Metadata:
  - Title: dynamic from GeoLocation.metaTitle or fallback "Agence Web [Location] | Création Site Internet | KB-COM"
  - Description: dynamic from GeoLocation.metaDescription
  - Keywords: location + service variations
  - Canonical URL to avoid duplicate content issues
- [x] Schema.org LocalBusiness markup with specific geopoint
- [x] Internal linking:
  - Link to main Services page
  - Link to 2-3 nearby geographic pages (e.g., from Paris 13ème → link to Paris 14ème, Paris 5ème)
  - Link to relevant blog posts about local SEO
  - Link to Portfolio (filtered by location if clients from that area)
- [x] Unique content check: Tool or manual review ensures each page has >500 unique words to avoid thin/duplicate content penalty
- [x] Responsive, accessible
- [x] Lighthouse SEO 100

**Technical Notes:**
```typescript
// Example generateStaticParams
export async function generateStaticParams() {
  const locations = await sanityClient.fetch(`*[_type == "geoLocation"]{ slug }`);
  return locations.map(loc => ({ location: loc.slug.current }));
}

export async function generateMetadata({ params }) {
  const location = await sanityClient.fetch(
    `*[_type == "geoLocation" && slug.current == $slug][0]`,
    { slug: params.location }
  );
  return {
    title: location.metaTitle || `Agence Web à ${location.name} | KB-COM`,
    description: location.metaDescription,
    // ...
  };
}
```

---

#### Story 5.3: Internal Linking Strategy for Geo Pages

**As a** search engine
**I want** to discover all geographic pages through internal links
**So that** I can index them and understand their relationship to the main site

**Acceptance Criteria:**
- [x] Homepage or Services page includes "Zones Desservies" section:
  - List of all 15-20 geographic locations as links
  - Organized by region (e.g., "Paris et Île-de-France", "Centre-Val de Loire", etc.)
  - Each location linked to its landing page
- [x] Each geographic page links to:
  - Main "Services" page
  - At least 2-3 other nearby geographic pages (proximity-based)
  - Contact page with location pre-filled in form
- [x] Footer includes dropdown or link to "Toutes nos zones d'intervention" leading to list
- [x] Sitemap.xml includes all geographic pages with appropriate priority (0.7 or 0.8)

---

#### Story 5.4: Tracking & Performance for Geo Pages

**As a** marketing manager
**I want** to track the SEO performance of geographic pages
**So that** I can measure ROI and optimize strategy

**Acceptance Criteria:**
- [x] Google Search Console property verified
- [x] Custom Google Analytics events track:
  - Geo page views (with location dimension)
  - CTA clicks from geo pages
  - Form submissions with source geo page
- [x] Dashboard or report showing:
  - Keyword positions for each target location keyword
  - Traffic per geo page
  - Conversion rate per geo page
- [x] Monthly SEO report template includes geo pages section

**Tools:**
- Integrate with Google Search Console API to pull ranking data
- Use GA4 custom dimensions for geo page tracking
- Optional: Use Semrush Position Tracking for automated rank monitoring

---

**Epic 5 Definition of Done:**
- 15-20 geographic landing pages live in production
- Each page has unique content (>500 words total), optimized metadata, and Schema.org markup
- Internal linking structure complete (sitemap, homepage links, cross-page links)
- Lighthouse SEO 100 on all geo pages
- Geo pages submitted to Google Search Console
- Tracking configured in GA4 and Search Console
- Initial keyword positions documented (baseline for measuring future improvement)
- Code reviewed and merged

**Expected Outcome (within 2-4 months post-launch):**
- 70% of geo pages ranking Top 5 for target keywords
- +500-1000 additional monthly organic visitors from geo pages
- 5-10 qualified leads per month attributed to geo pages

---

## Epic 6: Conversion Optimization & Analytics

**Epic Goal:** Maximize lead generation through advanced forms, CTAs, comprehensive tracking, and A/B testing infrastructure.

### User Stories

#### Story 6.1: Enhanced Contact Form with Multi-Step UX

**As a** potential client
**I want** an easy, guided process to request a quote
**So that** I provide the right information without feeling overwhelmed

**Acceptance Criteria:**
- [x] Contact form upgraded to multi-step wizard:
  - **Step 1:** "What service do you need?" (Radio buttons: Website, E-commerce, SEO, Custom App, Not Sure)
  - **Step 2:** "Tell us about your project" (Textarea, budget dropdown, timeline dropdown)
  - **Step 3:** "Your contact details" (Name, Email, Phone, Company)
  - **Step 4:** Review and submit
- [x] Progress indicator shows current step (e.g., "Step 2 of 4")
- [x] "Back" and "Next" navigation
- [x] Form state persists in localStorage (user can leave and return without losing data)
- [x] Conditional logic: If user selects "E-commerce", show additional question "Do you have an existing catalog?"
- [x] Validation per step (cannot proceed until required fields filled)
- [x] Submit triggers same API route as Story 2.7 but with richer data
- [x] Success page or modal: "Thank you! We'll contact you within 24 hours. Here's what happens next: [timeline]"
- [x] Conversion event tracked in GA4 ("form_submit" event with parameters: service, budget, source_page)
- [x] Accessibility: keyboard navigation, screen reader announcements on step change

---

#### Story 6.2: CTA Optimization & Placement

**As a** site visitor
**I want** clear calls-to-action throughout the site
**So that** I know how to take the next step when I'm ready

**Acceptance Criteria:**
- [x] Primary CTA button appears on all major pages:
  - Homepage: "Get a Free Quote"
  - Service pages: "Request a [Service] Quote"
  - Portfolio pages: "Start Your Project"
  - Blog posts: "Need help with this? Contact us"
- [x] Secondary CTAs:
  - "Download our SEO checklist" (lead magnet, captures email—Phase 2 priority if time allows)
  - "Schedule a free consultation" (links to Calendly or contact form)
- [x] Sticky CTA bar on mobile: After scrolling down 50% of page, sticky bar appears at bottom with primary CTA
- [x] Exit-intent popup (desktop only, cookie-controlled to show once per user):
  - Triggers when mouse moves to close tab
  - Offers lead magnet or discount/free consultation
  - Can be dismissed
  - Does not show on mobile
- [x] A/B testing infrastructure for CTAs:
  - Simple feature flag system or use Vercel Edge Config for A/B variants
  - Test CTA button text variants (e.g., "Get a Quote" vs. "Start Your Project" vs. "Talk to an Expert")
  - Track conversion rates per variant in GA4
- [x] All CTA clicks tracked as GA4 events with parameters (button_text, page, location_on_page)

---

#### Story 6.3: Lead Magnet & Email Capture

**As a** marketing manager
**I want** to capture emails of visitors not ready to request a quote
**So that** I can nurture them with content and convert them later

**Acceptance Criteria:**
- [x] Lead magnet created: "Free SEO Audit Checklist for Tours Businesses" (PDF)
- [x] Landing page or modal for lead magnet:
  - Headline: "Improve Your Google Rankings with Our Free SEO Checklist"
  - Description of what's included
  - Email capture form (name, email, consent checkbox)
  - Submit button: "Send Me the Checklist"
- [x] On submit:
  - Email sent to user with download link to PDF (via Resend/SendGrid)
  - Email added to newsletter list (Mailchimp/Brevo if integrated, or stored in database for Phase 2)
  - Thank you message: "Check your email for the checklist!"
- [x] Lead magnet CTA placed on:
  - Blog sidebar
  - Exit-intent popup
  - End of high-traffic blog posts
- [x] Conversion tracked in GA4 ("lead_magnet_download" event)
- [x] GDPR compliance: consent checkbox, privacy policy link, unsubscribe option in emails

---

#### Story 6.4: Advanced Analytics & Event Tracking

**As a** site owner
**I want** comprehensive tracking of user behavior
**So that** I can optimize the site based on data

**Acceptance Criteria:**
- [x] GA4 custom events implemented:
  - **Navigation clicks:** Track which nav items are most clicked
  - **Scroll depth:** 25%, 50%, 75%, 100% scroll on key pages
  - **CTA clicks:** All primary and secondary CTAs with context
  - **Outbound links:** Clicks to portfolio live sites, social media
  - **Video plays:** If any video content (YouTube embeds track play, pause, complete)
  - **File downloads:** PDF downloads (lead magnets, case study PDFs)
  - **Phone clicks:** Click-to-call button clicks on mobile
  - **Search usage:** Blog search queries and results clicks
  - **Form interactions:** Form starts, field interactions, form abandonment
- [x] GA4 custom dimensions configured:
  - **User type:** New vs. returning
  - **Traffic source:** Organic, direct, referral, social, email
  - **Geo page source:** If user came from a geographic landing page, which one
  - **Service interest:** If form submitted, which service selected
- [x] Conversion funnels defined in GA4:
  - Funnel 1: Homepage → Service page → Contact form → Submit
  - Funnel 2: Blog post → Related service page → Contact form → Submit
  - Funnel 3: Geo page → Contact form → Submit
- [x] Google Tag Manager (optional if complex tracking needs):
  - GTM container set up
  - All events managed through GTM for easier updates without code deploys
- [x] Microsoft Clarity or Hotjar integrated:
  - Session recordings enabled (with privacy filters for sensitive data)
  - Heatmaps generated for homepage, key service pages, contact page
  - Scroll maps, click maps analyzed monthly

**Technical Notes:**
```typescript
// Example GA4 event tracking
import { trackEvent } from '@/lib/analytics';

trackEvent('cta_click', {
  button_text: 'Get a Quote',
  page: '/services/creation-site-internet',
  location: 'hero_section',
});
```

---

#### Story 6.5: SEO Performance Dashboard

**As a** SEO manager
**I want** a centralized dashboard showing key SEO metrics
**So that** I can monitor progress toward goals without manual data gathering

**Acceptance Criteria:**
- [x] Dashboard page created at `/admin/dashboard` (password-protected or IP-restricted)
- [x] Dashboard displays:
  - **Keyword Rankings:** Current positions for top 20 target keywords (pulled from Google Search Console API or Semrush API)
  - **Organic Traffic:** Last 30 days, comparison to previous period (from GA4 API)
  - **Core Web Vitals:** LCP, FID, CLS current status (from Vercel Analytics or PageSpeed Insights API)
  - **Lighthouse Scores:** Latest scores for key pages
  - **Indexation Status:** Number of pages indexed (from Search Console API)
  - **Top Pages:** Top 10 pages by organic traffic
  - **Top Queries:** Top 10 search queries driving traffic
  - **Geo Pages Performance:** Table of all geo pages with rankings and traffic
  - **Conversion Metrics:** Form submissions, leads by source
- [x] Dashboard auto-refreshes data daily
- [x] Export button to download report as PDF or CSV
- [x] Accessible only to KB-COM team (basic auth or IP whitelist)

**Technical Notes:**
- Use Google Search Console API, GA4 Data API, Vercel Analytics API
- Dashboard built with Next.js API routes fetching data, frontend displays with charts (use Recharts or Chart.js)
- Cache API responses for 24 hours to avoid rate limits

---

**Epic 6 Definition of Done:**
- Multi-step contact form live and converting
- CTA strategy implemented across all pages
- Lead magnet available and email capture functional
- Comprehensive analytics tracking configured in GA4 and Clarity/Hotjar
- SEO performance dashboard accessible to team
- A/B testing infrastructure in place
- All conversion events tracked and verified
- Code reviewed and merged

**Expected Outcome:**
- Contact form conversion rate: 3-5% of site visitors
- Lead magnet downloads: 50-100 per month
- Clear visibility into user behavior and conversion funnels for ongoing optimization

---

## Epic 7: Performance & Accessibility Audit

**Epic Goal:** Achieve 100/100 Lighthouse scores across all categories, ensure all Core Web Vitals are in green zone, and meet WCAG AA accessibility standards.

### User Stories

#### Story 7.1: Lighthouse Performance Optimization

**As a** site visitor
**I want** the site to load instantly
**So that** I have a great user experience

**Acceptance Criteria:**
- [x] **Target:** Lighthouse Performance score 100/100 on mobile and desktop for all key pages (Homepage, Service pages, Portfolio, Blog, Geo pages)
- [x] Optimizations implemented:
  - **Images:** All images using Next.js Image component with WebP/AVIF, lazy loading, proper sizing, blur placeholders
  - **Fonts:** Fonts optimized with next/font, preloaded, subset to only necessary characters
  - **JavaScript:** Bundle size minimized via code splitting, tree shaking, dynamic imports for non-critical components
  - **CSS:** Critical CSS inlined, unused CSS removed, Tailwind purged
  - **Third-party scripts:** GA4 loaded asynchronously, Clarity/Hotjar deferred until after page interactive
  - **Caching:** Aggressive caching headers for static assets (max-age 1 year with cache busting)
  - **Edge caching:** Vercel Edge Network caching configured
- [x] **Core Web Vitals verified:**
  - LCP (Largest Contentful Paint) < 1.2s on 4G mobile
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1
  - TTFB (Time to First Byte) < 200ms
- [x] Performance tested on real devices (iPhone, Android) using 4G throttling
- [x] Lighthouse CI integrated in GitHub Actions: Fail PR if Performance score drops below 95

**Technical Notes:**
- Use `next/dynamic` for heavy components (e.g., maps, videos)
- Preload hero images with `priority` prop
- Implement resource hints (preconnect for external domains like Google Fonts, Sanity CDN)

---

#### Story 7.2: Lighthouse SEO Optimization

**As a** search engine
**I want** perfectly structured, semantic HTML and metadata
**So that** I can accurately index and rank this site

**Acceptance Criteria:**
- [x] **Target:** Lighthouse SEO score 100/100 on all pages
- [x] Checklist verified:
  - [x] All pages have unique, descriptive `<title>` tags (50-60 characters)
  - [x] All pages have unique `meta description` (150-160 characters)
  - [x] All images have descriptive `alt` attributes
  - [x] Proper heading hierarchy (single H1, logical H2-H6 structure)
  - [x] Valid HTML5 (no errors in W3C validator)
  - [x] Mobile-friendly (viewport meta tag, responsive design)
  - [x] `robots.txt` accessible and correct
  - [x] `sitemap.xml` accessible and correct
  - [x] Canonical tags on all pages
  - [x] Structured data (Schema.org) on all pages, validated with Rich Results Test
  - [x] HTTPS enabled, all internal links use HTTPS
  - [x] Font sizes legible on mobile (min 16px for body text)
  - [x] Tap targets are adequately sized (min 48x48px)
  - [x] No crawl errors in Google Search Console
- [x] Manual SEO audit completed using checklist
- [x] All issues resolved

---

#### Story 7.3: Lighthouse Accessibility Optimization

**As a** user with disabilities
**I want** the site to be fully accessible
**So that** I can navigate and use all features

**Acceptance Criteria:**
- [x] **Target:** Lighthouse Accessibility score 100/100
- [x] **Target:** WCAG 2.1 Level AA compliance
- [x] Accessibility audit using automated tools:
  - [x] Lighthouse accessibility audit
  - [x] axe DevTools browser extension
  - [x] WAVE accessibility evaluation tool
- [x] All automated issues resolved:
  - [x] Sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
  - [x] All interactive elements keyboard-accessible (tab navigation works)
  - [x] Visible focus indicators on all focusable elements
  - [x] Form labels properly associated with inputs
  - [x] ARIA labels used where needed (icon buttons, complex widgets)
  - [x] No ARIA misuse (validated with accessibility linter)
  - [x] Images have alt text (decorative images use alt="")
  - [x] Landmark regions defined (header, nav, main, footer)
  - [x] Skip to main content link for keyboard users
  - [x] No keyboard traps
  - [x] Modals/dialogs manage focus properly (focus trapped, Escape closes, focus returns on close)
- [x] Manual testing with screen readers:
  - [x] NVDA (Windows) testing: Navigate site, test forms, verify announcements
  - [x] VoiceOver (macOS/iOS) testing: Verify mobile experience
- [x] Manual keyboard navigation testing:
  - [x] Tab through all pages, verify logical tab order
  - [x] Activate all interactive elements with Enter/Space
  - [x] Test all forms with keyboard only
- [x] Document accessibility statement page (`/accessibility`) describing compliance level and contact for issues

---

#### Story 7.4: Lighthouse Best Practices Optimization

**As a** site owner
**I want** the site to follow web best practices
**So that** it's secure, reliable, and maintainable

**Acceptance Criteria:**
- [x] **Target:** Lighthouse Best Practices score 100/100
- [x] Checklist verified:
  - [x] HTTPS used exclusively, valid SSL certificate
  - [x] No mixed content (all resources loaded over HTTPS)
  - [x] Security headers configured:
    - [x] Content-Security-Policy (CSP)
    - [x] Strict-Transport-Security (HSTS)
    - [x] X-Content-Type-Options: nosniff
    - [x] X-Frame-Options: DENY or SAMEORIGIN
    - [x] Referrer-Policy
  - [x] No console errors or warnings in browser console
  - [x] No deprecated APIs used
  - [x] Images have correct aspect ratios (no layout shift)
  - [x] Efficient cache policy for static assets
  - [x] No vulnerable libraries (npm audit passes)
  - [x] Browser compatibility verified (Chrome, Firefox, Safari, Edge latest 2 versions)

**Technical Notes:**
```typescript
// next.config.js security headers
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; ..."
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  // ... other headers
];
```

---

#### Story 7.5: Performance Monitoring & Regression Prevention

**As a** developer
**I want** automated performance monitoring
**So that** we catch regressions before they reach production

**Acceptance Criteria:**
- [x] Lighthouse CI configured in GitHub Actions:
  - Runs on every PR
  - Tests Homepage, 2 Service pages, 1 Portfolio page, 1 Blog post, 1 Geo page
  - Fails PR if any score drops below threshold (Performance 95, SEO 100, Accessibility 95, Best Practices 95)
  - Comments on PR with Lighthouse report comparison
- [x] Vercel Analytics monitoring Core Web Vitals in production:
  - Alerts configured if CWV metrics degrade (email or Slack notification)
  - Monthly review of CWV trends
- [x] Sentry performance monitoring:
  - Slow API routes detected (threshold > 1 second)
  - Frontend performance issues tracked (long tasks, slow components)
- [x] Performance budget documented in README:
  - JavaScript bundle size: max 150KB gzipped per route
  - First Load JS: max 200KB
  - Images: max 150KB per hero image
  - LCP: target < 1.0s, max acceptable 1.5s
- [x] Automated bundle size analysis on PRs (next-bundle-analyzer or similar)

---

**Epic 7 Definition of Done:**
- All key pages achieve Lighthouse scores: Performance 100, SEO 100, Accessibility 100, Best Practices 100
- Core Web Vitals verified green in Google Search Console (may take 28 days of data post-launch)
- Manual accessibility testing completed with no critical issues
- Performance monitoring and CI checks active
- Performance budget enforced in PR checks
- Documentation updated with performance and accessibility guidelines
- Code reviewed and merged

**Expected Outcome:**
- Site is among the fastest, most accessible agency sites in France
- Google ranking boost from excellent Core Web Vitals and UX signals
- Positive brand perception from exceptional site quality

---

## Epic 8: Pre-Launch SEO & Go-Live

**Epic Goal:** Execute final SEO setup, submit to search engines, configure monitoring, and launch to production with full analytics tracking.

### User Stories

#### Story 8.1: Final SEO Checklist & Validation

**As a** SEO manager
**I want** to ensure all SEO elements are perfect before launch
**So that** the site ranks optimally from day one

**Acceptance Criteria:**
- [x] **Pre-Launch SEO Checklist completed:**
  - [x] All pages have unique metadata (no duplicates)
  - [x] Sitemap.xml generated and accurate (includes all pages, correct priorities)
  - [x] Robots.txt allows all public pages, blocks admin/draft pages
  - [x] Schema.org markup on all pages, validated with Google Rich Results Test (zero errors)
  - [x] All internal links working (no 404s), checked with broken link checker
  - [x] Canonical tags correct (self-referential on originals, avoid canonicalization issues)
  - [x] Redirect strategy for old kb-com.fr site (if applicable):
    - 301 redirects from old URLs to new URLs mapped
    - Important backlinks preserved with redirects
  - [x] 404 page returns proper 404 status code (not 200)
  - [x] All images have descriptive alt text
  - [x] Page load speed verified (all pages LCP < 1.5s)
  - [x] Mobile-friendliness verified with Google Mobile-Friendly Test
  - [x] SSL certificate valid and configured
  - [x] Google Analytics 4 and Search Console tracking verified
  - [x] No indexing blocks (no meta robots noindex, no X-Robots-Tag blocking)
  - [x] Content review: No placeholder text, lorem ipsum, or "coming soon" pages
  - [x] Legal pages complete: Privacy Policy, Legal Mentions, Cookie Policy
- [x] Checklist reviewed and signed off by stakeholder

---

#### Story 8.2: Google Search Console Setup & Submission

**As a** site owner
**I want** the site indexed by Google quickly
**So that** we start getting organic traffic immediately

**Acceptance Criteria:**
- [x] Google Search Console property created for kb-com.fr
- [x] Site ownership verified (DNS TXT record or meta tag)
- [x] Sitemap.xml submitted to Search Console
- [x] URL inspection performed on key pages to trigger indexing
- [x] Request indexing for Homepage, key Service pages, top Portfolio pages, top Blog posts, all Geo pages
- [x] Bing Webmaster Tools configured and sitemap submitted
- [x] Google Business Profile updated with new website URL (if applicable)
- [x] Monitoring set up for:
  - Crawl errors
  - Coverage issues (pages excluded from index)
  - Core Web Vitals status
  - Mobile usability issues
  - Security issues
  - Manual actions (penalties)
- [x] Weekly Search Console review scheduled for first month post-launch

---

#### Story 8.3: Analytics & Conversion Tracking Verification

**As a** marketing manager
**I want** to confirm all tracking is working correctly
**So that** we have accurate data from day one

**Acceptance Criteria:**
- [x] Google Analytics 4 verified:
  - [x] Real-time reporting shows test traffic
  - [x] All custom events firing correctly (CTA clicks, form submissions, downloads, etc.)
  - [x] Conversion goals configured (form submissions, phone clicks, lead magnet downloads)
  - [x] E-commerce tracking (if applicable for future product sales)
  - [x] User-ID tracking (if user accounts in Phase 2)
- [x] Google Tag Manager (if used) container published and verified
- [x] Vercel Analytics enabled and showing data
- [x] Microsoft Clarity or Hotjar verified:
  - [x] Session recordings capturing (with PII masking)
  - [x] Heatmaps generating
- [x] Conversion funnel test:
  - [x] Complete test journey: Homepage → Service page → Contact form → Submit
  - [x] Verify funnel tracked in GA4
  - [x] Verify form submission email received
  - [x] Verify thank you page displayed
- [x] Cookie consent working:
  - [x] Banner appears for new users
  - [x] Analytics only loads after consent
  - [x] Consent preferences saved
- [x] Custom dashboard (Story 6.5) populated with data

---

#### Story 8.4: Content Launch & Optimization

**As a** content manager
**I want** quality content live on all pages
**So that** the site provides value and ranks well

**Acceptance Criteria:**
- [x] **Content quality review:**
  - [x] All pages have minimum content length (Homepage 800+, Service pages 1200+, Geo pages 500+, Blog posts 1000+)
  - [x] Content proofread for grammar, spelling, tone
  - [x] Keywords naturally incorporated (no keyword stuffing)
  - [x] Content provides genuine value to users
  - [x] CTAs are compelling and clear
- [x] **Initial blog content published:**
  - [x] 10-15 SEO-optimized blog posts live (mix of topics: local SEO, web trends, case studies, how-tos)
  - [x] Keyword research applied to blog topics
  - [x] Internal links between blog posts and service pages
- [x] **Portfolio content:**
  - [x] 5-10 portfolio case studies published (real projects or placeholders if needed)
  - [x] Client permissions obtained for logos, testimonials, screenshots
- [x] **Geo pages content:**
  - [x] All 15-20 geo pages have unique, valuable content
  - [x] Reviewed for duplicate content issues
- [x] **Legal content:**
  - [x] Privacy Policy reviewed by legal (or based on trusted template)
  - [x] Cookie Policy compliant with GDPR
  - [x] Legal Mentions complete (French legal requirement)

---

#### Story 8.5: Domain Configuration & DNS

**As a** site owner
**I want** kb-com.fr to point to the new Vercel site
**So that** the public can access it

**Acceptance Criteria:**
- [x] Domain kb-com.fr DNS configured:
  - [x] A record or CNAME pointing to Vercel
  - [x] WWW subdomain redirects to apex domain (or vice versa, choose one canonical version)
  - [x] DNS propagation complete (verified with DNS checker tools)
- [x] SSL certificate auto-provisioned by Vercel (HTTPS active)
- [x] Force HTTPS redirect enabled (HTTP → HTTPS)
- [x] Email forwarding or MX records preserved (ensure KB-COM email still works if using domain for email)
- [x] Old site redirects (if applicable):
  - [x] 301 redirects from old site URLs to new site URLs configured
  - [x] Tested to ensure backlinks don't break
- [x] Site accessible at https://kb-com.fr with no errors

---

#### Story 8.6: Performance & Security Final Checks

**As a** site owner
**I want** the site to be secure and fast
**So that** users trust us and have a great experience

**Acceptance Criteria:**
- [x] Security scan passed (no vulnerabilities):
  - [x] npm audit shows no high/critical vulnerabilities
  - [x] Snyk or similar security scanner run
  - [x] Dependencies updated to latest stable versions
- [x] Security headers verified with securityheaders.com (A+ rating)
- [x] SSL Labs SSL Test passed (A+ rating)
- [x] Uptime monitoring configured:
  - [x] UptimeRobot or Vercel monitoring set up
  - [x] Alert email/SMS if site down >2 minutes
- [x] Backup strategy confirmed:
  - [x] Sanity CMS daily backups enabled
  - [x] Git repository is source of truth for code
  - [x] Vercel maintains deployment history
- [x] Load testing performed (optional but recommended):
  - [x] Simulate 100 concurrent users with k6 or Artillery
  - [x] Verify site handles load without degradation

---

#### Story 8.7: Launch Communication & Monitoring

**As a** stakeholder
**I want** a smooth launch with clear monitoring
**So that** we can address any issues immediately

**Acceptance Criteria:**
- [x] **Launch plan documented:**
  - [x] Launch date and time chosen (ideally weekday morning for monitoring availability)
  - [x] Launch checklist reviewed by team
  - [x] Rollback plan prepared (revert DNS or Vercel deployment if critical issue)
- [x] **Pre-launch announcement:**
  - [x] Internal team notified of launch date
  - [x] Stakeholders informed
  - [x] Social media posts drafted (optional: announce new site on LinkedIn, Twitter, etc.)
- [x] **Post-launch monitoring (first 48 hours):**
  - [x] Real-time Google Analytics monitoring (traffic flowing normally?)
  - [x] Error monitoring (Sentry: any JavaScript errors?)
  - [x] Uptime monitoring (site accessible?)
  - [x] Search Console monitoring (any crawl errors?)
  - [x] User testing (team manually tests all critical user journeys)
  - [x] Contact form test (submit test form, ensure email received)
  - [x] Social media monitoring (any user feedback on issues?)
- [x] **Issue triage process:**
  - [x] Critical issues (site down, major functionality broken): Fix immediately
  - [x] High priority (forms not working, major SEO issue): Fix within 24 hours
  - [x] Medium/Low priority: Add to backlog for sprint planning
- [x] **One week post-launch review:**
  - [x] Review analytics data (traffic patterns, bounce rate, conversions)
  - [x] Review Search Console (indexation status, no penalties)
  - [x] Review Core Web Vitals (all green?)
  - [x] Gather team feedback
  - [x] Celebrate launch! 🎉

---

**Epic 8 Definition of Done:**
- Site live at kb-com.fr
- All SEO elements verified and submitted to search engines
- Analytics tracking confirmed working
- No critical bugs or issues
- Post-launch monitoring active
- Team confident in site stability
- Initial traffic and conversions tracked
- Documentation complete (runbook, analytics guide, content guidelines)

**Expected Outcome:**
- Successful production launch with zero downtime
- Site begins ranking within 1-2 weeks for geo pages, 4-8 weeks for competitive local terms
- Baseline metrics established for ongoing optimization

---

## Appendix: Implementation Timeline & Resources

**Estimated Timeline:** 2-4 months (standard track per Project Brief)

**Phase Breakdown:**
- **Epic 1 (Foundation):** Weeks 1-2
- **Epic 2 (Core Pages):** Weeks 2-4
- **Epic 3 (Portfolio):** Weeks 4-5
- **Epic 4 (Blog):** Weeks 5-6
- **Epic 5 (Geo Pages):** Weeks 6-8
- **Epic 6 (Conversion Opt):** Weeks 8-9
- **Epic 7 (Performance Audit):** Week 10
- **Epic 8 (Launch):** Week 10-11

*Overlap and parallel work expected (e.g., Epic 2 and 3 can partially overlap).*

**Team Requirements:**
- 1-2 Full-Stack Developers (React/Next.js/TypeScript)
- 1 Designer (UI/UX for mockups and assets)
- 1 Content Writer (blog posts, service pages, geo pages)
- 1 SEO Specialist (keyword research, on-page optimization, tracking)
- 1 Project Manager/Product Owner (coordination, stakeholder communication)

**Assumption:** KB-COM internal team or mix of internal + contractors.

---

## Next Steps

1. **PRD Review & Approval:**
   - Stakeholder review of this PRD
   - Feedback incorporation
   - Final sign-off

2. **Handoff to Architect:**
   - Architect reviews PRD and Technical Assumptions
   - Creates detailed Architecture Document
   - Specifies tech stack choices, data models, API contracts, deployment architecture

3. **Optional: UX Expert Input:**
   - UX Expert creates detailed Front-End Specification
   - Wireframes and high-fidelity mockups for key pages
   - Design system and component library definition

4. **Product Owner (PO) Validation:**
   - PO runs Master Checklist to ensure PRD + Architecture alignment
   - PO shards PRD into Epic and Story documents for backlog

5. **Begin Development:**
   - Scrum Master (SM) prioritizes Epic 1 stories into Sprint 1
   - Dev team begins implementation
   - QA validates each story before "Done"

---

**PRD Status:** ✅ Complete, Ready for Architect Review

**Prepared with BMAD™ Method**
*Next Agent: Architect (for Architecture Document)*
