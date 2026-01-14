"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

// Interface pour les réalisations de l'API
interface Realisation {
  id: number;
  name: string;
  nameAccent?: string;
  accentColor?: string;
  slug: string;
  client: string;
  industry: string;
  year: string;
  image: string;
  serviceType: string;
  results: string[];
  url?: string;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const blurReveal = {
  hidden: {
    opacity: 0,
    x: -30,
    filter: "blur(10px)",
  },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

// Style de surlignage rose pour SEO
const highlightStyle = {
  backgroundImage: "linear-gradient(120deg, rgba(236, 72, 153, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0 88%",
  backgroundSize: "100% 40%",
  padding: "0 4px",
};

// Données FAQ SEO
const faqItems = [
  {
    id: 1,
    question: "Combien de temps pour voir les premiers résultats SEO ?",
    answer: (
      <>
        Le SEO est un investissement à moyen/long terme. Les premiers résultats apparaissent généralement entre{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>3 et 6 mois</span>{" "}
        après le début des optimisations. Cependant, certaines améliorations techniques peuvent avoir un impact visible dès les premières semaines.
      </>
    ),
  },
  {
    id: 2,
    question: "Garantissez-vous la première position Google ?",
    answer: (
      <>
        Non, et méfiez-vous de ceux qui le promettent ! Google utilise plus de{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>200 facteurs de classement</span>{" "}
        que personne ne maîtrise entièrement. Ce que nous garantissons : une méthodologie rigoureuse, des optimisations techniques solides et un suivi transparent de vos positions.
      </>
    ),
  },
  {
    id: 3,
    question: "Quelle est la différence entre SEO et SEA ?",
    answer: (
      <>
        Le SEO (référencement naturel) vise les{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>résultats organiques gratuits</span>{" "}
        de Google. Le SEA (Google Ads) concerne les annonces payantes. Le SEO est un investissement durable, le SEA génère du trafic immédiat mais s&apos;arrête dès que vous stoppez le budget.
      </>
    ),
  },
  {
    id: 4,
    question: "Faites-vous du netlinking ?",
    answer: (
      <>
        Oui, mais de manière{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>qualitative et éthique</span>. Nous privilégions l&apos;acquisition de liens naturels via du contenu de qualité, des relations presse digitales et des partenariats pertinents. Pas de spam ni d&apos;achat de liens en masse.
      </>
    ),
  },
];

// Étapes du processus SEO
const processSteps = [
  {
    number: "01",
    title: "Audit SEO Complet",
    description: (
      <>
        Analyse approfondie de votre site :{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>technique, contenu et popularité</span>. Identification des freins au référencement et opportunités de croissance.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Stratégie & Mots-clés",
    description: (
      <>
        Recherche des{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>mots-clés stratégiques</span> pour votre activité. Analyse de la concurrence et définition des priorités.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Optimisations On-Page",
    description: (
      <>
        Optimisation technique, balises meta, structure Hn,{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>maillage interne</span> et amélioration de l&apos;expérience utilisateur.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Suivi & Reporting",
    description: (
      <>
        Tableau de bord personnalisé avec suivi des{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>positions et du trafic</span>. Rapports mensuels et recommandations d&apos;amélioration continue.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

// Inclus dans l'offre SEO
const included = [
  { text: "Audit technique complet", icon: "🔍" },
  { text: "Recherche de mots-clés", icon: "🎯" },
  { text: "Optimisation des balises meta", icon: "🏷️" },
  { text: "Amélioration du maillage interne", icon: "🔗" },
  { text: "Rapport mensuel de positions", icon: "📊" },
  { text: "Recommandations de contenu", icon: "✍️" },
];

// Avis clients SEO
const avisClients = [
  {
    id: 1,
    name: "Laurent Dupont",
    company: "E-commerce Mode - Paris",
    avatar: "LD",
    text: "Notre trafic organique a augmenté de 180% en 6 mois. L'audit initial a révélé des problèmes techniques qu'on ignorait complètement.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marie Leroy",
    company: "Cabinet Comptable ML",
    avatar: "ML",
    text: "Nous sommes passés de la page 3 à la première page Google sur nos mots-clés principaux. Un travail remarquable !",
    rating: 5,
  },
  {
    id: 3,
    name: "Philippe Martin",
    company: "Agence Immobilière Tours",
    avatar: "PM",
    text: "Le suivi mensuel est très appréciable. On voit clairement l'évolution de nos positions et du trafic.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sophie Blanc",
    company: "Restaurant Gastronomique",
    avatar: "SB",
    text: "Enfin une agence SEO qui explique clairement ce qu'elle fait ! Les résultats sont au rendez-vous.",
    rating: 5,
  },
  {
    id: 5,
    name: "Thomas Girard",
    company: "Startup Tech Lyon",
    avatar: "TG",
    text: "Notre visibilité sur Google a explosé. KB-COM maîtrise parfaitement le SEO technique.",
    rating: 5,
  },
  {
    id: 6,
    name: "Claire Mercier",
    company: "Boutique Bio Bordeaux",
    avatar: "CM",
    text: "Investissement rentabilisé en quelques mois. Le trafic qualifié a doublé !",
    rating: 5,
  },
];

export default function AgenceSeo() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [realisations, setRealisations] = useState<Realisation[]>([]);

  // Charger les réalisations de type "seo"
  useEffect(() => {
    async function fetchRealisations() {
      try {
        const res = await fetch('/api/realisations?serviceType=seo');
        const data = await res.json();
        if (Array.isArray(data)) {
          setRealisations(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Erreur chargement réalisations:', error);
      }
    }
    fetchRealisations();
  }, []);

  // Ref pour détecter quand la section processus est visible
  const processLineRef = useRef<HTMLDivElement>(null);
  const isProcessInView = useInView(processLineRef, { once: true, margin: "-100px" });

  // Animation FAQ courbes
  const faqSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: faqProgress } = useScroll({
    target: faqSectionRef,
    offset: ["start end", "end start"]
  });
  const faqPathLength = useTransform(faqProgress, [0.1, 0.9], [0, 1]);

  // Parallax pour section investissement
  const pricingSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: pricingProgress } = useScroll({
    target: pricingSectionRef,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(pricingProgress, [0, 1], [0, -200]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-gray-50 pt-24 pb-16">
        {/* Auras de couleur rose/magenta */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-400/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-fuchsia-400/15 rounded-full blur-[80px]" />
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
        <div className="relative z-10 container mx-auto max-w-6xl text-center px-4">
          {/* Badge */}
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-pink-200 bg-pink-50/50 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-sm font-medium text-pink-600">
              Experts SEO en France • Basés à Tours
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-5xl mx-auto text-gray-900"
          >
            Consultant{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              SEO Technique
            </span>
            <br />
            <span className="font-playfair italic text-[0.95em] font-bold text-gray-900">
              Dominez Google, attirez des clients.
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Votre site est invisible sur Google ?{" "}
            <span className="text-gray-900 font-semibold" style={highlightStyle}>Audit SEO complet</span>,
            optimisation technique et stratégie de contenu pour{" "}
            <span className="text-gray-900 font-semibold" style={highlightStyle}>booster votre visibilité</span> et votre trafic organique.
          </motion.p>

          {/* Stats rapides */}
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="flex flex-wrap justify-center gap-8 mb-10"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">+200%</div>
              <div className="text-sm text-gray-600">Trafic moyen</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">Top 10</div>
              <div className="text-sm text-gray-600">Positions Google</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">+50</div>
              <div className="text-sm text-gray-600">Sites optimisés</div>
            </div>
          </motion.div>

          {/* CTA Bouton pill 3D */}
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #8b5cf6 100%)",
                boxShadow: `
                  0 1px 2px rgba(0,0,0,0.1),
                  0 4px 8px rgba(236,72,153,0.3),
                  0 8px 16px rgba(168,85,247,0.2),
                  inset 0 1px 1px rgba(255,255,255,0.4),
                  inset 0 -1px 1px rgba(0,0,0,0.1)
                `,
              }}
            >
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent opacity-100"
                style={{ height: "50%" }}
              />
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.8)_0%,transparent_50%)]" />
              <span className="relative font-semibold text-white drop-shadow-sm flex items-center gap-2">
                Demander un audit gratuit
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            {/* Bouton blanc/gris 3D pill */}
            <Link
              href="/realisations"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
                boxShadow: `
                  0 1px 2px rgba(0,0,0,0.05),
                  0 4px 8px rgba(0,0,0,0.1),
                  0 8px 16px rgba(0,0,0,0.05),
                  inset 0 1px 1px rgba(255,255,255,0.9),
                  inset 0 -1px 2px rgba(0,0,0,0.05)
                `,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 to-transparent opacity-100" style={{ height: "50%" }} />
              <span className="relative font-semibold text-gray-700">Voir nos résultats</span>
            </Link>
          </motion.div>

          {/* Badge Google 5/5 */}
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.75}
            className="mt-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg shadow-gray-200/50">
              <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-bold text-gray-900">5/5</span>
                <span className="text-sm text-gray-500">sur Google</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Problèmes - Cards glass-morphism */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-50/50 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-50/50 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              custom={0}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-pink-200 bg-pink-50/50 text-pink-600"
            >
              Problématiques SEO
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Pourquoi votre site est{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">invisible ?</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Problème 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              custom={0.1}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className="relative p-8 rounded-3xl border border-white/50 h-full"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(236,72,153,0.1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-purple-100/20 rounded-3xl pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/30">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Problèmes techniques</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Temps de chargement lent, erreurs 404, structure de liens cassée... Ces freins techniques empêchent Google d&apos;indexer correctement votre site.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Problème 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              custom={0.2}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className="relative p-8 rounded-3xl border border-white/50 h-full"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(168,85,247,0.1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-pink-100/20 rounded-3xl pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Contenu non optimisé</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Absence de mots-clés stratégiques, balises mal renseignées, contenu dupliqué... Votre site ne répond pas aux attentes de Google.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Problème 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              custom={0.3}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className="relative p-8 rounded-3xl border border-white/50 h-full"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(236,72,153,0.1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-purple-100/20 rounded-3xl pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/30">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Manque d&apos;autorité</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Peu de backlinks de qualité, faible notoriété en ligne... Google ne vous considère pas comme une source fiable dans votre domaine.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Résultats - FULL WIDTH PARALLAX DARK */}
      <section ref={pricingSectionRef} className="relative py-0 overflow-hidden">
        {/* Background avec parallax */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-pink-950 to-purple-950"
          style={{ y: bgY }}
        />

        {/* Grille animée en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
              y: useTransform(pricingProgress, [0, 1], [0, -100]),
            }}
          />
        </div>

        {/* Orbes lumineux avec parallax */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-[150px]"
          style={{ y: useTransform(pricingProgress, [0, 1], [-100, 100]) }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px]"
          style={{ y: useTransform(pricingProgress, [0, 1], [100, -100]) }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-500/20 rounded-full blur-[180px]"
          style={{ scale: useTransform(pricingProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]) }}
        />

        {/* Lignes décoratives animées */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.line
            x1="0%" y1="20%" x2="100%" y2="80%"
            stroke="url(#lineGradientPink1)"
            strokeWidth="1"
            style={{ pathLength: useTransform(pricingProgress, [0.2, 0.8], [0, 1]) }}
          />
          <motion.line
            x1="100%" y1="10%" x2="0%" y2="90%"
            stroke="url(#lineGradientPink2)"
            strokeWidth="1"
            style={{ pathLength: useTransform(pricingProgress, [0.3, 0.9], [0, 1]) }}
          />
          <defs>
            <linearGradient id="lineGradientPink1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(236,72,153,0)" />
              <stop offset="50%" stopColor="rgba(236,72,153,0.5)" />
              <stop offset="100%" stopColor="rgba(236,72,153,0)" />
            </linearGradient>
            <linearGradient id="lineGradientPink2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168,85,247,0)" />
              <stop offset="50%" stopColor="rgba(168,85,247,0.5)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Contenu principal */}
        <div className="relative z-10 py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4">
            {/* Header avec effet de reveal */}
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
                className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full border border-pink-400/30 bg-pink-500/10 backdrop-blur-sm text-pink-300"
              >
                📈 Résultats moyens constatés
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Croissance de trafic organique
              </motion.h2>

              {/* Chiffre avec effet spectaculaire */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
                className="relative inline-block"
              >
                <motion.span
                  className="text-8xl md:text-[10rem] lg:text-[12rem] font-bold bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent"
                  style={{ textShadow: "0 0 80px rgba(236,72,153,0.5)" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  +200%
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto"
              >
                En moyenne sur 6 mois d&apos;accompagnement SEO.{" "}
                <span className="text-white font-semibold">Résultats mesurables et durables.</span>
              </motion.p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #8b5cf6 100%)",
                  boxShadow: "0 0 40px rgba(236,72,153,0.5), 0 4px 20px rgba(168,85,247,0.3), inset 0 1px 1px rgba(255,255,255,0.3)",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-100" style={{ height: "50%" }} />
                <span className="relative text-lg font-semibold text-white drop-shadow-sm flex items-center gap-3">
                  Booster ma visibilité
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
                Audit gratuit • Sans engagement • Réponse sous 24h
              </p>
            </motion.div>
          </div>
        </div>

        {/* Effet de vague en bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Section Processus - Timeline animée */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-100/40 rounded-full blur-[80px]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              custom={0}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-pink-200 bg-pink-50/50 text-pink-600"
            >
              Notre méthode
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Notre processus{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                SEO.
              </span>
            </motion.h2>
          </motion.div>

          {/* Timeline avec numéros animés */}
          <div ref={processLineRef} className="relative">
            {/* Ligne horizontale avec numéros - Desktop */}
            <div className="hidden lg:block mb-12 relative">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 rounded-full" />
                <motion.div
                  className="absolute top-8 left-8 right-8 h-1 rounded-full origin-left bg-gray-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isProcessInView ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
                />

                {processSteps.map((step, index) => {
                  const numberColors = [
                    { border: "#ec4899", text: "#ec4899" },
                    { border: "#a855f7", text: "#a855f7" },
                    { border: "#8b5cf6", text: "#8b5cf6" },
                    { border: "#d946ef", text: "#d946ef" },
                  ];
                  const colors = numberColors[index];

                  return (
                    <div key={step.number} className="relative z-10 flex flex-col items-center">
                      <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold bg-white border-4"
                        initial={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
                        animate={{
                          borderColor: isProcessInView ? colors.border : "#e5e7eb",
                          color: isProcessInView ? colors.text : "#9ca3af"
                        }}
                        transition={{ duration: 0.6, delay: 0.1 + index * 0.15 }}
                      >
                        {step.number}
                      </motion.div>
                      <motion.span
                        className="mt-3 text-sm font-semibold text-center max-w-[120px]"
                        initial={{ color: "#9ca3af" }}
                        animate={{ color: isProcessInView ? "#1f2937" : "#9ca3af" }}
                        transition={{ duration: 0.5, delay: 0.15 + index * 0.15 }}
                      >
                        {step.title}
                      </motion.span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cartes de description */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => {
                const gradients = [
                  { from: "from-pink-500", to: "to-purple-600", shadow: "shadow-pink-500/20", aura: "from-pink-400/30 to-purple-500/20" },
                  { from: "from-purple-500", to: "to-fuchsia-600", shadow: "shadow-purple-500/20", aura: "from-purple-400/30 to-fuchsia-500/20" },
                  { from: "from-fuchsia-500", to: "to-pink-600", shadow: "shadow-fuchsia-500/20", aura: "from-fuchsia-400/30 to-pink-500/20" },
                  { from: "from-pink-500", to: "to-rose-600", shadow: "shadow-pink-500/20", aura: "from-pink-400/30 to-rose-500/20" },
                ];
                const gradient = gradients[index];

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isProcessInView ? 1 : 0,
                      y: isProcessInView ? 0 : 20,
                    }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="lg:hidden flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center text-white font-bold text-sm`}>
                        {step.number}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    </div>

                    <div className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all h-full overflow-hidden">
                      <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${gradient.aura} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`} />
                      <div className="relative z-10">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg ${gradient.shadow}`}>
                          {step.icon}
                        </div>
                        <h3 className="hidden lg:block text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section Investissement - FULL WIDTH PARALLAX */}
      <section ref={pricingSectionRef} className="relative py-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-pink-950 to-purple-950"
          style={{ y: bgY }}
        />

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-[150px]"
          style={{ y: useTransform(pricingProgress, [0, 1], [-100, 100]) }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px]"
          style={{ y: useTransform(pricingProgress, [0, 1], [100, -100]) }}
        />

        <div className="relative z-10 py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4">
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
                className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full border border-pink-400/30 bg-pink-500/10 backdrop-blur-sm text-pink-300"
              >
                Notre offre SEO
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Ce qui est inclus
              </motion.h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
            >
              {included.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl mb-2 block">{item.icon}</span>
                  <span className="text-xs text-gray-300 leading-tight block relative z-10">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #8b5cf6 100%)",
                  boxShadow: "0 0 40px rgba(236,72,153,0.5), 0 4px 20px rgba(168,85,247,0.3), inset 0 1px 1px rgba(255,255,255,0.3)",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-100" style={{ height: "50%" }} />
                <span className="relative text-lg font-semibold text-white drop-shadow-sm flex items-center gap-3">
                  Demander mon audit gratuit
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
                Audit gratuit • Sans engagement • Réponse sous 24h
              </p>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Section Témoignages - Carousel infini */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12 px-4"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-pink-200 bg-pink-50/50 text-pink-600">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Résultats SEO de nos{" "}
            <span className="bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              clients.
            </span>
          </h2>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 mt-4 rounded-full bg-white border border-gray-200 shadow-sm">
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
          </div>
        </motion.div>

        {/* Carousel container avec gradient fade */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
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
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{avis.text}&rdquo;</p>
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
              {[...avisClients.slice(3), ...avisClients, ...avisClients.slice(0, 3)].map((avis, index) => (
                <div
                  key={`row2-${avis.id}-${index}`}
                  className="flex-shrink-0 w-[350px] p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
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
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{avis.text}&rdquo;</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Réalisations SEO */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        {/* Formes décoratives */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: -30 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-pink-400/10 rounded-full blur-[100px]"
          />
          <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: 40 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute top-1/4 -right-32 w-[350px] h-[350px] bg-purple-400/10 rounded-full blur-[80px]"
          />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.div
              variants={blurReveal}
              custom={0}
              className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full border border-pink-200/50 bg-white/80 backdrop-blur-sm shadow-sm"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-pink-600">Résultats concrets</span>
            </motion.div>

            <motion.h2
              variants={blurReveal}
              custom={0.1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Des résultats SEO{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                mesurables
              </span>
            </motion.h2>
            <motion.p
              variants={blurReveal}
              custom={0.2}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Découvrez comment nous avons aidé ces entreprises à{" "}
              <span className="text-gray-900 font-medium" style={highlightStyle}>
                dominer les résultats Google
              </span>.
            </motion.p>
          </motion.div>

          {/* Grille de réalisations SEO avec glassmorphisme */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {realisations.map((realisation, index) => {
              const hasExternalUrl = !!realisation.url;
              const CardWrapper = hasExternalUrl ? 'a' : Link;
              const cardProps = hasExternalUrl
                ? { href: realisation.url, target: "_blank", rel: "noopener noreferrer" }
                : { href: `/realisations/${realisation.slug}` };

              return (
                <motion.div
                  key={realisation.id}
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                  className="group relative"
                >
                  {/* Glow effect au hover */}
                  <motion.div
                    className="absolute -inset-4 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.15))",
                      filter: "blur(40px)",
                    }}
                  />

                  {/* Card principale avec glassmorphisme */}
                  <CardWrapper {...cardProps}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative rounded-[1.5rem] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-pink-500/10"
                    >
                      {/* Header avec glassmorphisme */}
                      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-pink-50/80 to-purple-50/80 backdrop-blur-sm border-b border-white/30">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                          <span className="text-xs font-medium text-gray-600">SEO</span>
                        </div>
                        {realisation.results && realisation.results[0] && (
                          <span className="px-2 py-1 rounded-full bg-green-100/80 backdrop-blur-sm text-green-700 text-xs font-bold">
                            {realisation.results[0]}
                          </span>
                        )}
                      </div>

                      {/* Zone image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {realisation.image ? (
                          <img
                            src={realisation.image}
                            alt={`${realisation.name}${realisation.nameAccent ? ` ${realisation.nameAccent}` : ''}`}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
                            <span className="text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent opacity-30">
                              {realisation.name.charAt(0)}
                            </span>
                          </div>
                        )}

                        {/* Overlay avec CTA */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm bg-white/20 backdrop-blur-sm border border-white/30">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              {realisation.url ? 'Visiter le site' : 'Voir le projet'}
                            </span>
                          </div>
                        </div>

                        {/* Badge catégorie */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm shadow-sm border border-white/50 text-pink-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                            SEO
                          </span>
                        </div>
                      </div>

                      {/* Contenu carte avec glassmorphisme */}
                      <div className="p-6 bg-gradient-to-b from-transparent to-white/50">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
                              {realisation.name}
                              {realisation.nameAccent && (
                                <span style={{ color: realisation.accentColor || '#ec4899' }}> {realisation.nameAccent}</span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-500">{realisation.industry}</p>
                          </div>
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 text-xs text-gray-600">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {realisation.year}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CardWrapper>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link
              href="/realisations"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #8b5cf6 100%)",
                boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3), 0 10px 40px rgba(168, 85, 247, 0.2)",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent" style={{ height: "50%" }} />
              <span className="relative font-semibold text-white drop-shadow-sm flex items-center gap-2">
                Voir tous nos résultats SEO
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section SEO Local - Consultant SEO Tours */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-pink-100/40 to-purple-100/40 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              variants={blurReveal}
              custom={0}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-pink-200 bg-pink-50/50 text-pink-600"
            >
              Agence SEO locale
            </motion.span>

            <motion.h2
              variants={blurReveal}
              custom={0.1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Consultant SEO à{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Tours (37)
              </span>
            </motion.h2>

            <motion.p variants={blurReveal} custom={0.2} className="text-lg text-gray-600 leading-relaxed mb-8">
              Notre{" "}
              <span className="text-gray-900 font-semibold" style={highlightStyle}>
                agence SEO
              </span>{" "}
              est basée à Tours et accompagne les entreprises de toute la France dans leur{" "}
              <strong>stratégie de référencement naturel</strong>. Que vous soyez une TPE, PME ou grand compte,
              nous mettons notre expertise en{" "}
              <span className="text-gray-900 font-semibold" style={highlightStyle}>
                optimisation pour les moteurs de recherche
              </span>{" "}
              à votre service pour améliorer votre visibilité sur Google.
            </motion.p>

            <motion.p variants={blurReveal} custom={0.3} className="text-gray-600 leading-relaxed mb-8">
              En tant que{" "}
              <span className="text-gray-900 font-semibold" style={highlightStyle}>
                consultant SEO expérimenté
              </span>, nous réalisons des{" "}
              <strong>audits SEO complets</strong>, développons des stratégies de{" "}
              <strong>netlinking</strong>, optimisons vos contenus et suivons vos{" "}
              <strong>positions Google</strong>. Nous intervenons auprès de clients à{" "}
              <strong>Tours</strong>, <strong>Joué-lès-Tours</strong>, <strong>Saint-Cyr-sur-Loire</strong>,{" "}
              <strong>Blois</strong>, <strong>Orléans</strong>, <strong>Paris</strong> et partout en France.
              <br /><br />
              Besoin d&apos;un{" "}
              <span className="text-gray-900 font-semibold" style={highlightStyle}>
                expert SEO
              </span>{" "}
              pour booster votre trafic organique ? Contactez notre agence pour un{" "}
              <strong>audit SEO gratuit</strong> et découvrez comment nous pouvons vous aider à{" "}
              <span className="text-gray-900 font-semibold" style={highlightStyle}>
                atteindre la première page de Google
              </span>.
            </motion.p>

            <motion.div variants={blurReveal} custom={0.4} className="flex flex-wrap justify-center gap-2">
              {["Audit SEO", "Référencement naturel", "Netlinking", "SEO local", "SEO technique", "Rédaction SEO", "Suivi positions", "Google Analytics"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm text-gray-600 border border-white/60 hover:border-pink-300 hover:text-pink-600 transition-all cursor-default"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wrapper FAQ + Footer pour effet reveal */}
      <div className="relative">
        {/* Section FAQ - Style avec courbes animées */}
        <section ref={faqSectionRef} className="relative z-10 py-24 bg-gray-50 overflow-hidden">
          {/* Courbes décoratives animées au scroll */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Courbe gauche */}
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
                <linearGradient id="fadeLeftPink" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
                  <stop offset="10%" stopColor="#ec4899" stopOpacity="1" />
                  <stop offset="90%" stopColor="#ec4899" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M500 -100C500 -100 150 100 200 280C250 460 80 520 180 720C280 920 450 1000 650 1300"
                stroke="url(#fadeLeftGray)"
                strokeWidth="2"
                fill="none"
                opacity="0.15"
              />
              <motion.path
                d="M500 -100C500 -100 150 100 200 280C250 460 80 520 180 720C280 920 450 1000 650 1300"
                stroke="url(#fadeLeftPink)"
                strokeWidth="2"
                fill="none"
                style={{ pathLength: faqPathLength }}
                opacity="0.6"
              />
            </svg>

            {/* Courbe droite */}
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
                <linearGradient id="fadeRightPurple" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                  <stop offset="10%" stopColor="#a855f7" stopOpacity="1" />
                  <stop offset="90%" stopColor="#a855f7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M150 -50C150 -50 500 100 420 300C340 500 550 600 450 800C350 1000 150 1050 -50 1150"
                stroke="url(#fadeRightGray)"
                strokeWidth="2"
                fill="none"
                opacity="0.15"
              />
              <motion.path
                d="M150 -50C150 -50 500 100 420 300C340 500 550 600 450 800C350 1000 150 1050 -50 1150"
                stroke="url(#fadeRightPurple)"
                strokeWidth="2"
                fill="none"
                style={{ pathLength: faqPathLength }}
                opacity="0.6"
              />
            </svg>
          </div>

          <div className="container mx-auto max-w-4xl px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-pink-200 bg-pink-50/50 text-pink-600">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Questions sur le{" "}
                <span className="bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  SEO.
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Retrouvez les{" "}
                <motion.span
                  initial={{ backgroundSize: "0% 40%" }}
                  whileInView={{ backgroundSize: "100% 40%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-gray-900 font-semibold"
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0 85%",
                  }}
                >
                  réponses à vos questions
                </motion.span>{" "}
                sur le référencement naturel.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              className="max-w-3xl mx-auto"
            >
              {faqItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                    className="w-full py-6 flex items-center justify-between gap-4 text-left group"
                  >
                    <span className="text-lg font-medium text-gray-900 group-hover:text-pink-600 transition-colors">
                      {item.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-50 transition-colors">
                      <svg
                        className={`w-4 h-4 text-gray-500 group-hover:text-pink-600 transition-transform duration-300 ${
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
                        <p className="pb-6 text-gray-600 leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer sticky qui se révèle */}
        <footer className="sticky bottom-0 z-0">
          <div className="relative overflow-hidden bg-[#0c0c1d]">
            {/* Auras de couleur */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pink-600/20 rounded-full blur-[120px]" />
              <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[80px]" />
            </div>

            {/* Texte watermark */}
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
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400">
                  Prêt à dominer Google ?
                </span>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  Demandez votre{" "}
                  <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    audit SEO gratuit
                  </span>
                </h2>

                <p className="text-base text-gray-400 mb-5 max-w-xl mx-auto">
                  Découvrez les freins qui empêchent votre site de ranker et recevez un plan d&apos;action personnalisé.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #8b5cf6 100%)",
                      boxShadow: "0 4px 20px rgba(236,72,153,0.4), inset 0 1px 1px rgba(255,255,255,0.2)",
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" style={{ height: "50%" }} />
                    <span className="relative font-semibold text-white">Obtenir mon audit gratuit</span>
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
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-base">K</span>
                    </div>
                    <span className="text-lg font-bold text-white">KB-COM</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                    Agence web à Tours spécialisée en création de sites, SEO et automatisation.
                  </p>
                  <div className="flex gap-2">
                    <a href="https://www.linkedin.com/in/kevin-boutant/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all" aria-label="LinkedIn">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/agence.kbcom/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-pink-500 transition-all" aria-label="Instagram">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                  </div>
                  <a href="https://g.page/r/CQExample/review" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-white/5 border border-gray-800 hover:bg-white/10 rounded-lg transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
                    <span className="text-xs font-medium text-gray-300">5/5 sur Google</span>
                  </a>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Services</h4>
                  <ul className="space-y-2">
                    <li><Link href="/services/creation-site-internet" className="text-gray-400 hover:text-white transition-colors text-sm">Création de sites</Link></li>
                    <li><Link href="/services/agence-seo" className="text-gray-400 hover:text-white transition-colors text-sm">Référencement SEO</Link></li>
                    <li><Link href="/services/application-web" className="text-gray-400 hover:text-white transition-colors text-sm">Applications web</Link></li>
                    <li><Link href="/services/automatisation" className="text-gray-400 hover:text-white transition-colors text-sm">Automatisation</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Entreprise</h4>
                  <ul className="space-y-2">
                    <li><Link href="/a-propos" className="text-gray-400 hover:text-white transition-colors text-sm">À propos</Link></li>
                    <li><Link href="/realisations" className="text-gray-400 hover:text-white transition-colors text-sm">Réalisations</Link></li>
                    <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
                    <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
                  </ul>
                </div>

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

              <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3">
                <p className="text-gray-500 text-sm">© 2024 KB-COM. Tous droits réservés.</p>
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
