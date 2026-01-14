"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import HomepageSchemas from "@/components/seo/HomepageSchemas";


// Animation variants pour le blur reveal
const blurReveal = {
  hidden: {
    opacity: 0,
    x: -30,
    filter: "blur(10px)"
  },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number]
    }
  })
};

// Données des réalisations pour le carousel hero
const realisationsCarousel = [
  {
    id: 1,
    title: "E-commerce Mode",
    category: "Site e-commerce",
    image: "/realisations/ecommerce.jpg",
  },
  {
    id: 2,
    title: "Cabinet Avocat",
    category: "Site vitrine",
    image: "/realisations/avocat.jpg",
  },
  {
    id: 3,
    title: "App Gestion RH",
    category: "Application web",
    image: "/realisations/rh-app.jpg",
  },
  {
    id: 4,
    title: "Restaurant Gastronomique",
    category: "Site vitrine",
    image: "/realisations/restaurant.jpg",
  },
  {
    id: 5,
    title: "Plateforme SaaS",
    category: "Application web",
    image: "/realisations/saas.jpg",
  },
];

// Interface pour les réalisations de l'API
interface HomeRealisation {
  id: number;
  name: string;
  nameAccent?: string;
  accentColor: string;
  shortDescription: string;
  image: string;
  tags: string[];
  results: string[];
  serviceType: string;
  color: string;
  slug: string;
  showOnHome: boolean;
  industry: string;
}

// Styles et labels par type de service
const serviceTypeStyles: Record<string, { label: string; color: string; bgClass: string; textClass: string }> = {
  sites: { label: "Site Web", color: "#3b82f6", bgClass: "bg-blue-100", textClass: "text-blue-700" },
  seo: { label: "SEO", color: "#ec4899", bgClass: "bg-pink-100", textClass: "text-pink-700" },
  apps: { label: "Application", color: "#10b981", bgClass: "bg-emerald-100", textClass: "text-emerald-700" },
  automation: { label: "Automatisation", color: "#f59e0b", bgClass: "bg-orange-100", textClass: "text-orange-700" },
};

// Données des clients
const clients = [
  { name: "Client 1", logo: "/logos/client1.svg" },
  { name: "Client 2", logo: "/logos/client2.svg" },
  { name: "Client 3", logo: "/logos/client3.svg" },
  { name: "Client 4", logo: "/logos/client4.svg" },
  { name: "Client 5", logo: "/logos/client5.svg" },
  { name: "Client 6", logo: "/logos/client6.svg" },
  { name: "Client 7", logo: "/logos/client7.svg" },
  { name: "Client 8", logo: "/logos/client8.svg" },
];

// Données des avis clients
const avisClients = [
  {
    id: 1,
    name: "Sophie Martin",
    company: "Boutique Élégance",
    avatar: "SM",
    text: "Une équipe réactive et professionnelle. Notre site e-commerce a vu ses ventes augmenter de 40% en 3 mois !",
    rating: 5,
  },
  {
    id: 2,
    name: "Pierre Dubois",
    company: "Cabinet Dubois Avocats",
    avatar: "PD",
    text: "Excellent travail sur notre site vitrine. Le design est moderne et le référencement efficace.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marie Laurent",
    company: "Restaurant Le Gourmet",
    avatar: "ML",
    text: "KB-COM a parfaitement compris nos besoins. Le site reflète exactement l'ambiance de notre établissement.",
    rating: 5,
  },
  {
    id: 4,
    name: "Thomas Petit",
    company: "StartUp Tech",
    avatar: "TP",
    text: "L'application web développée a révolutionné notre gestion interne. Un gain de temps considérable !",
    rating: 5,
  },
  {
    id: 5,
    name: "Claire Bernard",
    company: "Agence Immobilière CB",
    avatar: "CB",
    text: "Très satisfaite du travail réalisé. L'équipe est à l'écoute et les délais sont respectés.",
    rating: 5,
  },
  {
    id: 6,
    name: "François Moreau",
    company: "Moreau Consulting",
    avatar: "FM",
    text: "L'automatisation mise en place nous fait gagner plusieurs heures par semaine. Investissement rentabilisé !",
    rating: 5,
  },
  {
    id: 7,
    name: "Julie Roux",
    company: "Institut Beauté Zen",
    avatar: "JR",
    text: "Un site magnifique qui attire de nouveaux clients chaque semaine. Je recommande vivement !",
    rating: 5,
  },
  {
    id: 8,
    name: "Antoine Leroy",
    company: "Leroy & Associés",
    avatar: "AL",
    text: "Professionnalisme et créativité au rendez-vous. Notre visibilité en ligne a été transformée.",
    rating: 5,
  },
];

// Données FAQ
const faqItems = [
  {
    id: 1,
    question: "Combien coûte la création d'un site internet ?",
    answer: "Le prix varie selon la complexité du projet. Un site vitrine démarre à partir de 1 500€, un site e-commerce à partir de 3 000€, et une application web sur mesure à partir de 5 000€. Nous établissons toujours un devis détaillé et gratuit après analyse de vos besoins.",
  },
  {
    id: 2,
    question: "Quels sont les délais de réalisation ?",
    answer: "En moyenne, comptez 2 à 4 semaines pour un site vitrine, 4 à 8 semaines pour un e-commerce, et 2 à 4 mois pour une application web complexe. Ces délais peuvent varier selon votre réactivité pour les retours et validations.",
  },
  {
    id: 3,
    question: "Proposez-vous la maintenance et l'hébergement ?",
    answer: "Oui, nous proposons des forfaits de maintenance incluant les mises à jour de sécurité, les sauvegardes régulières, et un support technique réactif. Pour l'hébergement, nous travaillons avec des serveurs haute performance pour garantir la rapidité de votre site.",
  },
  {
    id: 4,
    question: "Mon site sera-t-il bien référencé sur Google ?",
    answer: "Tous nos sites sont développés avec les meilleures pratiques SEO : structure optimisée, temps de chargement rapide, balises meta, responsive design. Nous proposons également des prestations de référencement avancé pour améliorer votre positionnement.",
  },
  {
    id: 5,
    question: "Travaillez-vous uniquement sur Tours ?",
    answer: "Non, bien que basés à Tours, nous accompagnons des clients partout en France. Grâce aux outils de visioconférence et de collaboration en ligne, la distance n'est plus un obstacle. Nous avons des clients à Paris, Lyon, Bordeaux et dans toute la France.",
  },
  {
    id: 6,
    question: "Puis-je modifier mon site moi-même après la livraison ?",
    answer: "Absolument ! Nous développons des sites avec des interfaces d'administration intuitives. Nous vous formons à la prise en main et restons disponibles pour répondre à vos questions. Vous êtes autonome pour les modifications courantes.",
  },
];

// Données des services
const services = [
  {
    id: "sites",
    title: "Création de sites web",
    color: "#3B82F6", // Bleu
    gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
    shadowColor: "rgba(59,130,246,0.3)",
    description: "Sites vitrines, e-commerce et landing pages sur mesure. Développés avec Next.js pour des performances optimales et un référencement naturel au top.",
  },
  {
    id: "seo",
    title: "Référencement SEO",
    color: "#EC4899", // Rose/Magenta
    gradient: "linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #a855f7 100%)",
    shadowColor: "rgba(236,72,153,0.3)",
    description: "Audit technique, optimisation on-page et stratégie de contenu. Nous positionnons votre site en première page de Google pour attirer des clients qualifiés.",
  },
  {
    id: "apps",
    title: "Applications web",
    color: "#10B981", // Vert
    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 50%, #06b6d4 100%)",
    shadowColor: "rgba(16,185,129,0.3)",
    description: "Dashboards, outils métier et plateformes SaaS. Des applications sur mesure pour digitaliser et automatiser vos processus internes.",
  },
  {
    id: "automation",
    title: "Automatisation & IA",
    color: "#F97316", // Orange
    gradient: "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)",
    shadowColor: "rgba(249,115,22,0.3)",
    description: "Workflows automatisés avec Make, n8n et intégrations IA. Gagnez du temps en automatisant les tâches répétitives de votre entreprise.",
  },
];

export default function Home() {
  const realisationsRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const [openService, setOpenService] = useState<string | null>("sites");
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [activeExpertise, setActiveExpertise] = useState<number>(0); // Tab "Agence Tours" par défaut
  const [homeRealisations, setHomeRealisations] = useState<HomeRealisation[]>([]);
  const [allRealisations, setAllRealisations] = useState<HomeRealisation[]>([]);

  // Ref et scroll pour l'animation timeline FAQ
  const faqSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: faqScrollProgress } = useScroll({
    target: faqSectionRef,
    offset: ["start end", "end start"]
  });
  const faqPathLengthLeft = useTransform(faqScrollProgress, [0, 0.8], [0, 1]);
  const faqPathLengthRight = useTransform(faqScrollProgress, [0.1, 0.9], [0, 1]); // Plus lent, décalé

  // Animation auto-scroll pour les réalisations
  useEffect(() => {
    const container = realisationsRef.current;
    if (!container) return;

    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  // Animation auto-scroll pour les clients (sens inverse)
  useEffect(() => {
    const container = clientsRef.current;
    if (!container) return;

    let scrollPos = container.scrollWidth / 2;
    const speed = 0.3;

    const animate = () => {
      scrollPos -= speed;
      if (scrollPos <= 0) {
        scrollPos = container.scrollWidth / 2;
      }
      container.scrollLeft = scrollPos;
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  // Charger les réalisations
  useEffect(() => {
    async function fetchRealisations() {
      try {
        // Charger toutes les réalisations (pour le carousel)
        const resAll = await fetch('/api/realisations');
        const dataAll = await resAll.json();
        if (Array.isArray(dataAll)) {
          setAllRealisations(dataAll);
          // Filtrer celles à afficher dans la section home
          setHomeRealisations(dataAll.filter((r: HomeRealisation) => r.showOnHome));
        }
      } catch (error) {
        console.error('Erreur chargement réalisations:', error);
      }
    }
    fetchRealisations();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Schema.org JSON-LD pour SEO */}
      <HomepageSchemas />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-50 pt-24">
        {/* Auras de couleur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Aura principale bleue */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[120px]" />
          {/* Aura secondaire */}
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-400/15 rounded-full blur-[100px]" />
          {/* Aura accent */}
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-400/15 rounded-full blur-[80px]" />
        </div>

        {/* Grille décorative */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Contenu Hero */}
        <div className="relative z-10 container-kb text-center px-4">
          {/* Badge avec avatars clients */}
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm"
          >
            {/* Avatar stack - 3 logos clients */}
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">A</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">B</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">C</span>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              +50 clients satisfaits
            </span>
          </motion.div>

          {/* H1 - SEO optimisé avec mot clé en serif */}
          <motion.h1
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto text-gray-900"
          >
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Agence Web
            </span>{" "}
            à Tours
            <br />
            Création de sites{" "}
            <span className="relative font-playfair italic text-[1.15em] font-bold text-gray-900">
              <span
                className="absolute left-0 right-0 bottom-[0.1em] h-[0.35em] bg-gradient-to-r from-blue-400/40 via-indigo-400/40 to-purple-400/40 -z-10 rounded-sm"
                style={{ transform: 'skewX(-6deg)' }}
              />
              Performants.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Votre partenaire digital en Indre-et-Loire pour la création de sites internet sur mesure,
            le référencement SEO, les applications web et l&apos;automatisation de vos processus.
          </motion.p>
          <motion.p
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.35}
            className="text-base text-gray-500 max-w-xl mx-auto mb-6"
          >
            Nous accompagnons les PME et TPE de Tours et de toute la France
            dans leur transformation digitale avec des solutions performantes et durables.
          </motion.p>

          {/* Avis Google - Cliquable */}
          <motion.a
            href="https://www.google.com/search?q=KB-COM+Tours+avis"
            target="_blank"
            rel="noopener noreferrer"
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="flex items-center justify-center gap-3 mb-10 hover:opacity-80 transition-opacity cursor-pointer"
          >
            {/* Logo Google */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {/* 5 étoiles */}
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">5/5 sur Google</span>
          </motion.a>

          {/* Boutons style pill 3D */}
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            {/* Bouton bleu dégradé - style pill 3D */}
            <Link
              href="/devis"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
                boxShadow: `
                  0 1px 2px rgba(0,0,0,0.1),
                  0 4px 8px rgba(59,130,246,0.3),
                  0 8px 16px rgba(99,102,241,0.2),
                  inset 0 1px 1px rgba(255,255,255,0.4),
                  inset 0 -1px 1px rgba(0,0,0,0.1)
                `
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent opacity-100" style={{ height: '50%' }} />
              {/* Particles/sparkle effect */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.8)_0%,transparent_50%)]" />
              <span className="relative font-semibold text-white drop-shadow-sm">Demander un devis</span>
            </Link>

            {/* Bouton gris/noir - style pill 3D neumorphique */}
            <Link
              href="/realisations"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
                boxShadow: `
                  0 1px 2px rgba(0,0,0,0.05),
                  0 4px 8px rgba(0,0,0,0.1),
                  0 8px 16px rgba(0,0,0,0.05),
                  inset 0 1px 1px rgba(255,255,255,0.9),
                  inset 0 -1px 2px rgba(0,0,0,0.05)
                `
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 to-transparent opacity-100" style={{ height: '50%' }} />
              <span className="relative font-semibold text-gray-700">Nos réalisations</span>
            </Link>
          </motion.div>

          {/* Carousel des réalisations */}
          <div className="relative max-w-4xl mx-auto mb-12">
            {/* Glassmorphisme container */}
            <div className="relative p-2 rounded-3xl bg-white/30 backdrop-blur-lg border border-white/50 shadow-2xl shadow-blue-500/10 overflow-hidden">
              {/* Gradient overlay gauche */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
              {/* Gradient overlay droite */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

              {/* Carousel */}
              <div
                ref={realisationsRef}
                className="flex gap-4 overflow-hidden"
                style={{ scrollBehavior: "auto" }}
              >
                {allRealisations.length > 0 ? (
                  [...allRealisations, ...allRealisations].map((item, index) => (
                    <Link
                      href={`/realisations/${item.slug}`}
                      key={`${item.id}-${index}`}
                      className="flex-shrink-0 w-64 group cursor-pointer"
                    >
                      <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="absolute inset-0"
                            style={{ backgroundColor: serviceTypeStyles[item.serviceType]?.color || '#6366f1', opacity: 0.2 }}
                          />
                        )}
                        {/* Overlay permanent avec infos */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold mb-2 backdrop-blur-sm"
                            style={{
                              backgroundColor: `${serviceTypeStyles[item.serviceType]?.color || '#6366f1'}20`,
                              color: serviceTypeStyles[item.serviceType]?.color || '#93c5fd',
                              border: `1px solid ${serviceTypeStyles[item.serviceType]?.color || '#6366f1'}40`
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: serviceTypeStyles[item.serviceType]?.color || '#6366f1' }}
                            />
                            {serviceTypeStyles[item.serviceType]?.label || item.industry}
                          </span>
                          <p className="text-white font-semibold text-sm">{item.name}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  // Placeholder pendant le chargement
                  [...Array(6)].map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-64">
                      <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel des logos clients - Full width */}
        <div className="relative w-full mt-auto pb-12">
          <p className="text-center text-sm text-gray-500 mb-6 font-medium tracking-wide uppercase">
            Ils nous font confiance
          </p>

          <div className="relative">
            {/* Gradient overlay gauche - très large et fondu */}
            <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent z-10 pointer-events-none" />
            {/* Gradient overlay droite - très large et fondu */}
            <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent z-10 pointer-events-none" />

            {/* Carousel clients */}
            <div
              ref={clientsRef}
              className="flex gap-12 overflow-hidden"
              style={{ scrollBehavior: "auto" }}
            >
              {/* Double les items pour le scroll infini */}
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center h-12 w-32 opacity-40 hover:opacity-70 transition-opacity grayscale hover:grayscale-0"
                >
                  {/* Placeholder logo */}
                  <div className="px-4 py-2 rounded-lg bg-gray-200/50 backdrop-blur-sm">
                    <span className="text-sm font-semibold text-gray-400">
                      {client.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Formes décoratives en arrière-plan avec parallax */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cercle bleu flou - haut gauche */}
          <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: -30 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px]"
          />
          {/* Cercle violet - droite */}
          <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: 40 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute top-1/4 -right-32 w-[350px] h-[350px] bg-indigo-400/10 rounded-full blur-[80px]"
          />
          {/* Cercle cyan - bas gauche */}
          <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: -20 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-cyan-400/10 rounded-full blur-[80px]"
          />
          {/* Forme géométrique - anneau */}
          <motion.div
            initial={{ rotate: 0, y: 0 }}
            whileInView={{ rotate: 15, y: -20 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute top-20 right-1/4 w-32 h-32 border-[3px] border-blue-200/30 rounded-full"
          />
          {/* Forme géométrique - carré */}
          <motion.div
            initial={{ rotate: 0, y: 0 }}
            whileInView={{ rotate: -10, y: 30 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute bottom-32 right-20 w-20 h-20 border-[3px] border-indigo-200/30 rounded-2xl"
          />
          {/* Points décoratifs */}
          <motion.div
            initial={{ opacity: 0.3, y: 0 }}
            whileInView={{ opacity: 0.5, y: -15 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute top-40 left-20 w-3 h-3 bg-blue-400/40 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0.3, y: 0 }}
            whileInView={{ opacity: 0.5, y: 20 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute top-60 left-32 w-2 h-2 bg-indigo-400/40 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0.3, y: 0 }}
            whileInView={{ opacity: 0.5, y: -10 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute bottom-40 left-16 w-2 h-2 bg-cyan-400/40 rounded-full"
          />
          {/* Lignes décoratives */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.2 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="absolute top-1/3 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent origin-left"
          />
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.2 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="absolute bottom-1/3 right-0 w-40 h-[1px] bg-gradient-to-l from-transparent via-indigo-400 to-transparent origin-right"
          />
        </div>

        <div className="container-kb px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center mb-16"
          >
            <span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-blue-200 bg-blue-50/50 text-blue-600"
            >
              Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Création Web, SEO & <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Applications.</span>
            </h2>
            <p className="text-lg text-gray-600">
              Des{" "}
              <motion.span
                initial={{ backgroundSize: "0% 40%" }}
                whileInView={{ backgroundSize: "100% 40%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative"
                style={{
                  backgroundImage: "linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2))",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 85%",
                }}
              >
                solutions digitales
              </motion.span>{" "}
              complètes pour développer votre{" "}
              <motion.span
                initial={{ backgroundSize: "0% 40%" }}
                whileInView={{ backgroundSize: "100% 40%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative"
                style={{
                  backgroundImage: "linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2))",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 85%",
                }}
              >
                activité en ligne
              </motion.span>.
            </p>
          </motion.div>

          {/* Liste des services - Accordion avec animation staggered */}
          <div className="max-w-4xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => setOpenService(openService === service.id ? null : service.id)}
                  className="w-full py-6 flex items-center justify-between gap-4 text-left group"
                >
                  <div className="flex items-center gap-4">
                    {/* Dot de couleur avec glow */}
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 transition-shadow duration-300"
                      style={{
                        backgroundColor: service.color,
                        boxShadow: openService === service.id ? `0 0 12px ${service.color}60` : 'none'
                      }}
                    />
                    {/* Titre */}
                    <span className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {service.title}
                    </span>
                  </div>
                  {/* Bouton +/- */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: openService === service.id ? `${service.color}15` : '#f3f4f6',
                    }}
                  >
                    <svg
                      className={`w-5 h-5 transition-all duration-300 ${
                        openService === service.id ? "rotate-45" : ""
                      }`}
                      style={{ color: openService === service.id ? service.color : '#6b7280' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                {/* Contenu expandable */}
                <AnimatePresence>
                  {openService === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-7">
                        <p className="text-gray-600 leading-relaxed mb-5">
                          {service.description}
                        </p>
                        <Link
                          href={`/services/${service.id}`}
                          className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            background: service.gradient,
                            boxShadow: `
                              0 1px 2px rgba(0,0,0,0.1),
                              0 4px 8px ${service.shadowColor},
                              0 8px 16px ${service.shadowColor.replace('0.3', '0.2')},
                              inset 0 1px 1px rgba(255,255,255,0.4),
                              inset 0 -1px 1px rgba(0,0,0,0.1)
                            `
                          }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent opacity-100" style={{ height: '50%' }} />
                          <span className="relative font-semibold text-white drop-shadow-sm text-sm">En savoir plus</span>
                          <svg className="relative w-4 h-4 ml-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Expertise - Style Dark avec Parallax */}
      <section className="relative py-0" style={{ overflowX: 'clip', overflowY: 'visible' }}>
        {/* Background sombre avec dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950" />

        {/* Grille animée en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Orbes lumineux */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/15 rounded-full blur-[180px]"
        />

        {/* Lignes décoratives */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <motion.line
            x1="0%" y1="20%" x2="100%" y2="80%"
            stroke="url(#expertiseLineGradient1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.line
            x1="100%" y1="10%" x2="0%" y2="90%"
            stroke="url(#expertiseLineGradient2)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.7 }}
          />
          <defs>
            <linearGradient id="expertiseLineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.4)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
            <linearGradient id="expertiseLineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139,92,246,0)" />
              <stop offset="50%" stopColor="rgba(139,92,246,0.4)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Contenu principal */}
        <div className="relative z-10 py-24 md:py-32">
          <div className="container-kb px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-300"
              >
                Notre Expertise
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Pourquoi choisir notre
              </motion.h2>

              {/* Texte gradient animé */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative inline-block"
              >
                <motion.span
                  className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto]"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  Agence Web à Tours ?
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl text-gray-300 mt-8 max-w-2xl mx-auto"
              >
                Une équipe locale, des{" "}
                <span className="text-white font-semibold">compétences nationales</span>
              </motion.p>
            </motion.div>

          </div>

          {/* Tabs des expertises */}
          <div className="container-kb px-4 mb-12">
            {/* Boutons des tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8"
            >
              {[
                { id: 0, icon: "📍", label: "Agence Tours" },
                { id: 1, icon: "⚡", label: "Sites Web" },
                { id: 2, icon: "🔍", label: "SEO" },
                { id: 3, icon: "🤝", label: "Support" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveExpertise(tab.id)}
                  className={`relative px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-300 ${
                    activeExpertise === tab.id
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeExpertise === tab.id && (
                    <motion.div
                      layoutId="activeExpertiseTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30 rounded-full border border-white/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Contenu des tabs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-3xl mx-auto"
            >
              <AnimatePresence mode="wait">
                {activeExpertise === 0 && (
                  <motion.div
                    key="tab-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <div className="text-center mb-4">
                      <span className="text-4xl">📍</span>
                    </div>
                    <h3 className="text-xl md:text-2xl text-white font-bold mb-4 text-center">Agence Digitale Basée à Tours</h3>
                    <p className="text-gray-300 leading-relaxed text-center">
                      Implantée au coeur de la <span className="text-white font-medium">Touraine</span>, rue de Clocheville à Tours, notre agence web accompagne les entreprises locales et nationales dans leur transformation digitale.
                      En tant que <span className="text-white font-medium">développeur web à Tours</span>, nous comprenons les enjeux spécifiques des PME et TPE de la région <span className="text-white font-medium">Centre-Val de Loire</span>.
                      Notre proximité géographique permet des échanges réguliers en présentiel et un suivi personnalisé.
                    </p>
                  </motion.div>
                )}
                {activeExpertise === 1 && (
                  <motion.div
                    key="tab-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <div className="text-center mb-4">
                      <span className="text-4xl">⚡</span>
                    </div>
                    <h3 className="text-xl md:text-2xl text-white font-bold mb-4 text-center">Création de Sites Internet Sur Mesure</h3>
                    <p className="text-gray-300 leading-relaxed text-center">
                      Chaque projet de <span className="text-white font-medium">création de site internet</span> est unique. Site vitrine, e-commerce ou application web, nous développons des solutions personnalisées avec <span className="text-white font-medium">Next.js et React</span>.
                      Nos sites garantissent des performances optimales, un temps de chargement rapide et une expérience utilisateur fluide.
                      Le <span className="text-white font-medium">responsive design</span> et l&apos;optimisation SEO sont intégrés dès la conception.
                    </p>
                  </motion.div>
                )}
                {activeExpertise === 2 && (
                  <motion.div
                    key="tab-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <div className="text-center mb-4">
                      <span className="text-4xl">🔍</span>
                    </div>
                    <h3 className="text-xl md:text-2xl text-white font-bold mb-4 text-center">Référencement Naturel et Visibilité Google</h3>
                    <p className="text-gray-300 leading-relaxed text-center">
                      Être visible sur <span className="text-white font-medium">Google</span> est essentiel pour attirer de nouveaux clients. Notre expertise en <span className="text-white font-medium">référencement naturel (SEO)</span> vous permet de vous positionner sur les requêtes stratégiques.
                      Nous réalisons des audits techniques complets et mettons en place une stratégie de mots-clés adaptée, que vous cibliez Tours, l&apos;<span className="text-white font-medium">Indre-et-Loire (37)</span> ou toute la France.
                    </p>
                  </motion.div>
                )}
                {activeExpertise === 3 && (
                  <motion.div
                    key="tab-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <div className="text-center mb-4">
                      <span className="text-4xl">🤝</span>
                    </div>
                    <h3 className="text-xl md:text-2xl text-white font-bold mb-4 text-center">Accompagnement et Support Réactif</h3>
                    <p className="text-gray-300 leading-relaxed text-center">
                      Au-delà de la création de votre <span className="text-white font-medium">site web professionnel</span>, nous assurons un accompagnement complet : formation, maintenance technique, mises à jour de sécurité et évolutions fonctionnelles.
                      Notre équipe reste disponible pour faire évoluer votre projet. Nous proposons des forfaits de <span className="text-white font-medium">maintenance</span> adaptés aux entreprises du 37 et de toute la France.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contenu SEO caché pour l'indexation */}
            <div className="sr-only">
              <h3>Agence Digitale Basée à Tours</h3>
              <p>Implantée au coeur de la Touraine, rue de Clocheville à Tours, notre agence web accompagne les entreprises locales et nationales dans leur transformation digitale. En tant que développeur web à Tours, nous comprenons les enjeux spécifiques des PME et TPE de la région Centre-Val de Loire. Notre proximité géographique permet des échanges réguliers en présentiel et un suivi personnalisé.</p>
              <h3>Création de Sites Internet Sur Mesure</h3>
              <p>Chaque projet de création de site internet est unique. Site vitrine, e-commerce ou application web, nous développons des solutions personnalisées avec Next.js et React. Nos sites garantissent des performances optimales, un temps de chargement rapide et une expérience utilisateur fluide. Le responsive design et l&apos;optimisation SEO sont intégrés dès la conception.</p>
              <h3>Référencement Naturel et Visibilité Google</h3>
              <p>Être visible sur Google est essentiel pour attirer de nouveaux clients. Notre expertise en référencement naturel (SEO) vous permet de vous positionner sur les requêtes stratégiques. Nous réalisons des audits techniques complets et mettons en place une stratégie de mots-clés adaptée, que vous cibliez Tours, l&apos;Indre-et-Loire (37) ou toute la France.</p>
              <h3>Accompagnement et Support Réactif</h3>
              <p>Au-delà de la création de votre site web professionnel, nous assurons un accompagnement complet : formation, maintenance technique, mises à jour de sécurité et évolutions fonctionnelles. Notre équipe reste disponible pour faire évoluer votre projet. Nous proposons des forfaits de maintenance adaptés aux entreprises du 37 et de toute la France.</p>
            </div>
          </div>

          {/* Texte SEO et CTA - retour dans le container */}
          <div className="container-kb px-4">
            {/* Texte SEO supplémentaire - plus compact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-gray-300 text-sm leading-relaxed">
                Que vous soyez une <span className="text-white font-medium">startup</span>, une <span className="text-white font-medium">PME</span> ou une entreprise établie,
                <span className="text-white font-medium"> KB-COM</span> est votre partenaire pour tous vos projets web dans le <span className="text-white font-medium">département 37</span> et au-delà.
                Notre <span className="text-white font-medium">agence digitale à Tours</span> combine expertise technique, créativité et connaissance du tissu économique local.
                De la <span className="text-white font-medium">création de site vitrine</span> à l&apos;<span className="text-white font-medium">application web</span>, en passant par le <span className="text-white font-medium">référencement SEO</span>, nous propulsons votre activité en ligne.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-center mt-12"
            >
              <Link
                href="/devis"
                className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                  boxShadow: "0 0 40px rgba(59,130,246,0.4), 0 4px 20px rgba(99,102,241,0.3), inset 0 1px 1px rgba(255,255,255,0.3)",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-100" style={{ height: "50%" }} />
                <span className="relative text-lg font-semibold text-white drop-shadow-sm flex items-center gap-3">
                  Discutons de votre projet
                  <motion.svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Devis gratuit • Sans engagement • Réponse sous 24h
              </p>
            </motion.div>
          </div>
        </div>

        {/* Effet de vague en bas pour transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Section Réalisations - Sticky Stack */}
      <section className="relative bg-gray-50" style={{ overflowX: 'clip' }}>
        {/* Effets de lumière en arrière-plan */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          className="absolute top-[10%] left-0 w-[350px] h-[500px] bg-gradient-to-r from-violet-400/30 to-transparent rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: false, amount: 0.1 }}
          className="absolute top-[10%] right-0 w-[350px] h-[500px] bg-gradient-to-l from-blue-400/30 to-transparent rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="absolute top-[40%] left-0 w-[300px] h-[450px] bg-gradient-to-r from-cyan-400/25 to-transparent rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="absolute top-[40%] right-0 w-[300px] h-[450px] bg-gradient-to-l from-orange-400/25 to-transparent rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          className="absolute top-[70%] left-0 w-[320px] h-[400px] bg-gradient-to-r from-pink-400/25 to-transparent rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
          className="absolute top-[70%] right-0 w-[320px] h-[400px] bg-gradient-to-l from-indigo-400/25 to-transparent rounded-full blur-[100px] pointer-events-none"
        />

        {/* Header fixe */}
        <div className="container-kb px-4 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center"
          >
            <span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-blue-200 bg-blue-50/50 text-blue-600"
            >
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sites Web Réalisés à <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Tours.</span>
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez les projets qui ont{" "}
              <motion.span
                initial={{ backgroundSize: "0% 40%" }}
                whileInView={{ backgroundSize: "100% 40%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                style={{
                  backgroundImage: "linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2))",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 85%",
                }}
              >
                transformé nos clients
              </motion.span>.
            </p>
          </motion.div>
        </div>

        {/* Cards sticky stack */}
        <div className="container-kb px-4 pb-24">
          <div className="max-w-5xl mx-auto">
            {homeRealisations.map((realisation, index) => {
              const isImageLeft = index % 2 === 0;
              const topOffset = 100 + index * 20; // Décalage progressif pour l'empilement
              const serviceStyle = serviceTypeStyles[realisation.serviceType] || serviceTypeStyles.sites;

              return (
                <motion.div
                  key={realisation.id}
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                  className="sticky mb-8 last:mb-0"
                  style={{ top: `${topOffset}px`, zIndex: index + 1 }}
                >
                  {/* Card container */}
                  <Link
                    href={`/realisations/${realisation.slug}`}
                    className="block relative rounded-3xl bg-white border border-gray-100 overflow-hidden shadow-xl shadow-gray-300/30 hover:shadow-2xl transition-shadow duration-300"
                  >
                    {/* Aura colorée - couleur basée sur le type de service */}
                    <div
                      className={`
                        absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-30 pointer-events-none
                        ${isImageLeft ? "-top-32 -right-32" : "-top-32 -left-32"}
                      `}
                      style={{ backgroundColor: serviceStyle.color }}
                    />

                    {/* Contenu */}
                    <div className={`relative flex flex-col md:flex-row items-stretch ${!isImageLeft ? "md:flex-row-reverse" : ""}`}>
                      {/* Image */}
                      <div className="relative md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[380px] overflow-hidden">
                        {realisation.image ? (
                          <img
                            src={realisation.image}
                            alt={`${realisation.name} - ${realisation.shortDescription}`}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                            {/* Placeholder gradient stylisé */}
                            <div
                              className="absolute inset-0 opacity-40"
                              style={{
                                background: `linear-gradient(135deg, ${serviceStyle.color}30 0%, transparent 60%)`
                              }}
                            />
                            {/* Motif décoratif */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div
                                className="text-7xl font-bold opacity-[0.08]"
                                style={{ color: serviceStyle.color }}
                              >
                                {realisation.name}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Texte */}
                      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        {/* Badge type de service */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full w-fit mb-4 ${serviceStyle.bgClass} ${serviceStyle.textClass}`}>
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: serviceStyle.color }}
                          />
                          {serviceStyle.label}
                        </span>

                        {/* Logo / Nom */}
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                          {realisation.name}
                          <span style={{ color: realisation.accentColor }}>
                            {realisation.nameAccent}
                          </span>
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                          {realisation.shortDescription}
                        </p>

                        {/* Tags inline */}
                        {realisation.tags && realisation.tags.length > 0 && (
                          <div className="flex flex-wrap gap-4 mb-6">
                            {realisation.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-sm text-gray-500"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Résultat si présent */}
                        {realisation.results && realisation.results.length > 0 && (
                          <div className="mb-6">
                            <p className="text-lg font-semibold text-gray-900">
                              {realisation.results[0]}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center mt-16 relative z-10"
          >
            <Link
              href="/realisations"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
                boxShadow: `
                  0 1px 2px rgba(0,0,0,0.1),
                  0 4px 8px rgba(59,130,246,0.3),
                  0 8px 16px rgba(99,102,241,0.2),
                  inset 0 1px 1px rgba(255,255,255,0.4),
                  inset 0 -1px 1px rgba(0,0,0,0.1)
                `
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent opacity-100" style={{ height: '50%' }} />
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.8)_0%,transparent_50%)]" />
              <span className="relative font-semibold text-white drop-shadow-sm">Nos réalisations</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section À propos */}
      <section className="relative bg-white">
        {/* Header centré */}
        <div className="container-kb px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-blue-200 bg-blue-50/50 text-blue-600"
            >
              À propos
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Une équipe passionnée à votre{" "}
              <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Service.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed mb-8"
            >
              Basés à Tours, nous accompagnons les entreprises dans leur{" "}
              <motion.span
                initial={{ backgroundSize: "0% 100%" }}
                whileInView={{ backgroundSize: "100% 100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-900 font-semibold"
                style={{
                  backgroundImage: "linear-gradient(120deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 88%",
                  padding: "0 4px",
                }}
              >
                transformation digitale
              </motion.span>{" "}
              depuis plus de 5 ans. Notre approche : créer des{" "}
              <motion.span
                initial={{ backgroundSize: "0% 100%" }}
                whileInView={{ backgroundSize: "100% 100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-gray-900 font-semibold"
                style={{
                  backgroundImage: "linear-gradient(120deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 88%",
                  padding: "0 4px",
                }}
              >
                solutions sur mesure
              </motion.span>{" "}
              qui génèrent des résultats concrets.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-500 leading-relaxed mb-16 max-w-3xl mx-auto"
            >
              De la création de site vitrine à l&apos;application web complexe, en passant par le référencement SEO et l&apos;automatisation,
              nous maîtrisons l&apos;ensemble des compétences nécessaires pour propulser votre activité en ligne.
              Situés rue de Clocheville à Tours, nous travaillons en étroite collaboration avec nos clients de l&apos;Indre-et-Loire et de toute la France.
            </motion.p>

            {/* Stats animées en ligne avec effets glassmorphism */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative text-center group cursor-default"
              >
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-blue-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl px-10 py-8 shadow-xl shadow-blue-500/10 border border-white/50"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-cyan-100/30 pointer-events-none" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" style={{ height: '50%' }} />
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
                    className="relative text-5xl md:text-6xl font-bold bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent"
                  >
                    +50
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="relative text-sm text-gray-600 mt-2 font-medium"
                  >
                    Clients satisfaits
                  </motion.p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative text-center group cursor-default"
              >
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-indigo-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl px-10 py-8 shadow-xl shadow-indigo-500/10 border border-white/50"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 via-transparent to-purple-100/30 pointer-events-none" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" style={{ height: '50%' }} />
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.65, type: "spring", stiffness: 200 }}
                    className="relative text-5xl md:text-6xl font-bold bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
                  >
                    5 ans
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.85 }}
                    className="relative text-sm text-gray-600 mt-2 font-medium"
                  >
                    D&apos;expérience
                  </motion.p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative text-center group cursor-default"
              >
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-violet-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl px-10 py-8 shadow-xl shadow-violet-500/10 border border-white/50"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 via-transparent to-pink-100/30 pointer-events-none" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" style={{ height: '50%' }} />
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
                    className="relative text-5xl md:text-6xl font-bold bg-gradient-to-br from-violet-600 via-violet-500 to-pink-500 bg-clip-text text-transparent"
                  >
                    100%
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="relative text-sm text-gray-600 mt-2 font-medium"
                  >
                    Sur mesure
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Vidéo full width avec parallax */}
        <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
          {/* Overlay gradient top */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          {/* Overlay gradient bottom */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

          {/* Vidéo avec effet parallax */}
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <motion.div
              style={{ y: 0 }}
              whileInView={{ y: -50 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-[-50px] md:inset-[-100px]"
            >
              <iframe
                src="https://www.youtube.com/embed/wNseBcjqhAw?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=wNseBcjqhAw&modestbranding=1&iv_load_policy=3&disablekb=1"
                title="Présentation KB-COM"
                className="w-full h-full object-cover"
                style={{ transform: 'scale(1.2)' }}
                allow="autoplay; encrypted-media"
                allowFullScreen
                frameBorder="0"
              />
            </motion.div>
          </motion.div>

          {/* Overlay coloré animé */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-indigo-600/10 z-[5] pointer-events-none"
          />

        </div>
      </section>

      {/* Section Avis Clients */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12 px-4"
        >
          <span
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-blue-200 bg-blue-50/50 text-blue-600"
          >
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Avis Clients Agence Web <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Tours.</span>
          </h2>
          {/* Badge Google 5/5 - Cliquable */}
          <a
            href="https://www.google.com/search?q=KB-COM+Tours+avis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-4 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">5/5 sur Google</span>
          </a>
        </motion.div>

        {/* Carousel container avec gradient fade */}
        <div className="relative">
          {/* Gradient gauche */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />
          {/* Gradient droite */}
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />

          {/* Première ligne - droite à gauche */}
          <div className="mb-6 overflow-hidden">
            <motion.div
              animate={{ x: [0, -2000] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              className="flex gap-6"
            >
              {[...avisClients, ...avisClients, ...avisClients].map((avis, index) => (
                <div
                  key={`row1-${avis.id}-${index}`}
                  className="flex-shrink-0 w-[350px] p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{avis.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{avis.name}</p>
                      <p className="text-xs text-gray-500">{avis.company}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(avis.rating)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{avis.text}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Deuxième ligne - gauche à droite */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [-2000, 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 45,
                  ease: "linear",
                },
              }}
              className="flex gap-6"
            >
              {[...avisClients.slice(4), ...avisClients, ...avisClients.slice(0, 4)].map((avis, index) => (
                <div
                  key={`row2-${avis.id}-${index}`}
                  className="flex-shrink-0 w-[350px] p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{avis.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{avis.name}</p>
                      <p className="text-xs text-gray-500">{avis.company}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(avis.rating)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{avis.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wrapper FAQ + Footer pour effet reveal */}
      <div className="relative">
        {/* Section FAQ - passe par-dessus le footer */}
        <section ref={faqSectionRef} className="relative z-10 py-24 bg-gray-50 overflow-hidden">
        {/* Formes décoratives élégantes - Timeline animée au scroll */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Forme courbe gauche - part du haut gauche, traverse vers le centre-bas */}
          <svg
            className="absolute -left-20 -top-40 w-[700px] h-[1200px]"
            viewBox="0 0 700 1200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="fadeLeftGray" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d1d5db" stopOpacity="0" />
                <stop offset="10%" stopColor="#d1d5db" stopOpacity="1" />
                <stop offset="90%" stopColor="#d1d5db" stopOpacity="1" />
                <stop offset="100%" stopColor="#d1d5db" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="fadeLeftBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="10%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="90%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Ligne grise de fond - traverse vers la droite */}
            <path
              d="M500 -100C500 -100 150 100 200 280C250 460 80 520 180 720C280 920 450 1000 650 1300"
              stroke="url(#fadeLeftGray)"
              strokeWidth="2"
              fill="none"
              opacity="0.15"
            />
            {/* Ligne bleue animée par dessus */}
            <motion.path
              d="M500 -100C500 -100 150 100 200 280C250 460 80 520 180 720C280 920 450 1000 650 1300"
              stroke="url(#fadeLeftBlue)"
              strokeWidth="2"
              fill="none"
              style={{ pathLength: faqPathLengthLeft }}
              opacity="0.6"
            />
            {/* Seconde ligne grise */}
            <path
              d="M550 -50C550 -50 200 150 280 350C360 550 120 600 220 800C320 1000 500 1100 700 1350"
              stroke="url(#fadeLeftGray)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.1"
            />
            {/* Seconde ligne bleue animée */}
            <motion.path
              d="M550 -50C550 -50 200 150 280 350C360 550 120 600 220 800C320 1000 500 1100 700 1350"
              stroke="url(#fadeLeftBlue)"
              strokeWidth="1.5"
              fill="none"
              style={{ pathLength: faqPathLengthLeft }}
              opacity="0.4"
            />
          </svg>

          {/* Forme courbe droite - part du haut droit, traverse vers le centre-bas */}
          <svg
            className="absolute -right-20 top-20 w-[650px] h-[1100px]"
            viewBox="0 0 650 1100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="fadeRightGray" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d1d5db" stopOpacity="0" />
                <stop offset="10%" stopColor="#d1d5db" stopOpacity="1" />
                <stop offset="90%" stopColor="#d1d5db" stopOpacity="1" />
                <stop offset="100%" stopColor="#d1d5db" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="fadeRightBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="10%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="90%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Ligne grise de fond - traverse vers la gauche */}
            <path
              d="M150 -80C150 -80 500 80 420 260C340 440 550 550 450 750C350 950 100 1050 -50 1200"
              stroke="url(#fadeRightGray)"
              strokeWidth="2"
              fill="none"
              opacity="0.15"
            />
            {/* Ligne bleue animée par dessus */}
            <motion.path
              d="M150 -80C150 -80 500 80 420 260C340 440 550 550 450 750C350 950 100 1050 -50 1200"
              stroke="url(#fadeRightBlue)"
              strokeWidth="2"
              fill="none"
              style={{ pathLength: faqPathLengthRight }}
              opacity="0.6"
            />
            {/* Seconde ligne grise */}
            <path
              d="M100 -30C100 -30 480 120 380 300C280 480 520 580 400 780C280 980 50 1080 -100 1250"
              stroke="url(#fadeRightGray)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.1"
            />
            {/* Seconde ligne bleue animée */}
            <motion.path
              d="M100 -30C100 -30 480 120 380 300C280 480 520 580 400 780C280 980 50 1080 -100 1250"
              stroke="url(#fadeRightBlue)"
              strokeWidth="1.5"
              fill="none"
              style={{ pathLength: faqPathLengthRight }}
              opacity="0.4"
            />
          </svg>
        </div>

        <div className="container-kb px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center mb-12"
          >
            <span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-blue-200 bg-blue-50/50 text-blue-600"
            >
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              FAQ Création Site <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Internet.</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Retrouvez les{" "}
              <motion.span
                initial={{ backgroundSize: "0% 40%" }}
                whileInView={{ backgroundSize: "100% 40%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                style={{
                  backgroundImage: "linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2))",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 85%",
                }}
              >
                réponses aux questions
              </motion.span>{" "}
              les plus posées par nos clients.
            </p>
          </motion.div>

          {/* Accordion FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="max-w-3xl mx-auto"
          >
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                  className="w-full py-6 flex items-center justify-between gap-4 text-left group"
                >
                  <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                    <svg
                      className={`w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-transform duration-300 ${
                        openFaq === item.id ? "rotate-45" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {openFaq === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
        </section>

        {/* CTA + Footer - sticky qui se révèle */}
        <footer className="sticky bottom-0 z-0">
          <div className="relative overflow-hidden bg-[#0c0c1d]">
          {/* Auras de couleur */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Aura bleue principale - haut */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />
            {/* Aura violette - droite */}
            <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px]" />
            {/* Aura cyan - gauche */}
            <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
          </div>

          {/* Texte watermark en arrière-plan */}
          <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none">
            <span className="text-[15vw] font-bold text-white/[0.03] tracking-tight leading-none translate-y-[20%]">
              KB-COM
            </span>
          </div>

          {/* Section CTA */}
          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-8 md:pt-12 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              {/* Badge */}
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                Lancez votre projet
              </span>

              {/* Titre */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                Prêt à donner vie à votre{" "}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  projet digital ?
                </span>
              </h2>

              {/* Description */}
              <p className="text-base text-gray-400 mb-5 max-w-xl mx-auto">
                Discutons de vos objectifs et créons ensemble une solution sur mesure.
              </p>

              {/* Boutons CTA */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/devis"
                  className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
                    boxShadow: '0 4px 20px rgba(59,130,246,0.4), inset 0 1px 1px rgba(255,255,255,0.2)'
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" style={{ height: '50%' }} />
                  <span className="relative font-semibold text-white">Demander un devis</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-700 bg-white/5 backdrop-blur-sm text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-gray-600"
                >
                  Nous contacter
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Séparateur */}
          <div className="relative z-10 mx-6 md:mx-12 lg:mx-20">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          </div>

          {/* Footer */}
          <div className="relative z-10 px-6 md:px-12 lg:px-20 py-6 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
              {/* Logo et description */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white font-bold text-base">K</span>
                  </div>
                  <span className="text-lg font-bold text-white">KB-COM</span>
                </div>
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                  Agence web à Tours spécialisée en création de sites, SEO et automatisation.
                </p>
                {/* Réseaux sociaux */}
                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/in/kevin-boutant/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all" aria-label="LinkedIn">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/agence.kbcom/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-pink-500 transition-all" aria-label="Instagram">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                </div>
                {/* Badge Google Avis */}
                <a
                  href="https://g.page/r/CQExample/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-white/5 border border-gray-800 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-300">5/5 sur Google</span>
                </a>
              </div>

              {/* Liens Services */}
              <div>
                <h4 className="text-white font-semibold mb-3">Services</h4>
                <ul className="space-y-2">
                  <li><Link href="/services/creation-site-internet" className="text-gray-400 hover:text-white transition-colors text-sm">Création de sites</Link></li>
                  <li><Link href="/services/agence-seo" className="text-gray-400 hover:text-white transition-colors text-sm">Référencement SEO</Link></li>
                  <li><Link href="/services/application-web" className="text-gray-400 hover:text-white transition-colors text-sm">Applications web</Link></li>
                  <li><Link href="/services/automatisation" className="text-gray-400 hover:text-white transition-colors text-sm">Automatisation</Link></li>
                </ul>
              </div>

              {/* Liens Entreprise */}
              <div>
                <h4 className="text-white font-semibold mb-3">Entreprise</h4>
                <ul className="space-y-2">
                  <li><Link href="/a-propos" className="text-gray-400 hover:text-white transition-colors text-sm">À propos</Link></li>
                  <li><Link href="/realisations" className="text-gray-400 hover:text-white transition-colors text-sm">Réalisations</Link></li>
                  <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-semibold mb-3">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>Rue de Clocheville, 37000 Tours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href="mailto:contact@kb-com.fr" className="hover:text-white transition-colors">contact@kb-com.fr</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <a href="tel:+33640631953" className="hover:text-white transition-colors">06 40 63 19 53</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-gray-500 text-sm">
                © 2024 KB-COM. Tous droits réservés.
              </p>
              <div className="flex gap-6">
                <Link href="/mentions-legales" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Mentions légales</Link>
                <Link href="/politique-confidentialite" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Confidentialité</Link>
              </div>
            </div>
          </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
