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


// Style de surlignage réutilisable
const highlightStyle = {
  backgroundImage: "linear-gradient(120deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0 88%",
  backgroundSize: "100% 40%",
  padding: "0 4px",
};

// Données FAQ avec surlignage
const faqItems = [
  {
    id: 1,
    question: "Combien de temps prend la création d'un site internet ?",
    answer: (
      <>
        En moyenne, comptez{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>15 jours ouvrés</span>{" "}
        entre notre premier échange et la mise en ligne de votre site. Ce délai peut varier selon la complexité du projet et votre réactivité pour les retours et validations. Nous vous accompagnons à chaque étape pour garantir un résultat optimal.
      </>
    ),
  },
  {
    id: 2,
    question: "Le site m'appartient-il à 100% ?",
    answer: (
      <>
        Oui, absolument ! Une fois le projet livré et le paiement effectué, vous êtes{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>propriétaire à 100%</span>{" "}
        de votre site internet, du code source et de tous les contenus. Aucun engagement, aucune surprise.
      </>
    ),
  },
  {
    id: 3,
    question: "Proposez-vous des sites internet pas chers ?",
    answer: (
      <>
        Oui ! Grâce à notre expertise technique, nous proposons un tarif de lancement à partir de{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>690€ HT</span>{" "}
        sans sacrifier la qualité. Nos sites sont développés sur mesure avec des technologies modernes (Next.js) qui garantissent performance et pérennité.
      </>
    ),
  },
  {
    id: 4,
    question: "Puis-je modifier le site moi-même après la livraison ?",
    answer: (
      <>
        Absolument ! Nous développons des interfaces d&apos;administration intuitives qui vous permettent de modifier vos contenus en{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>toute autonomie</span>. Une formation est incluse dans chaque projet. Et si besoin, nous restons disponibles pour vous accompagner.
      </>
    ),
  },
];

// Étapes du processus
const processSteps = [
  {
    number: "01",
    title: "Échange & Découverte",
    description: (
      <>
        On se rencontre (téléphone, visio ou café !) pour comprendre{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>votre activité</span>, vos besoins et vos objectifs.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design & Maquette",
    description: (
      <>
        On crée une{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>maquette visuelle</span> de votre futur site. Vous validez le design avant de passer à la suite.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Développement & Intégration",
    description: (
      <>
        On développe votre site avec{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>Next.js</span> pour des performances optimales et un référencement au top.
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
    title: "Mise en ligne & Formation",
    description: (
      <>
        Votre site est en ligne ! On vous forme à son utilisation pour que vous soyez{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>100% autonome</span>.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

// Inclus dans l'offre
const included = [
  { text: "Design responsive (mobile, tablette, PC)", icon: "📱" },
  { text: "Hébergement première année offert", icon: "🌐" },
  { text: "Nom de domaine inclus", icon: "🔗" },
  { text: "Optimisation technique SEO", icon: "🔍" },
  { text: "Certificat SSL (HTTPS)", icon: "🔒" },
  { text: "Formation à la prise en main", icon: "🎓" },
];

// Avis clients
const avisClients = [
  {
    id: 1,
    name: "Sophie Martin",
    company: "Boutique Élégance - Tours",
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
    company: "Restaurant Le Gourmet - Tours",
    avatar: "ML",
    text: "KB-COM a parfaitement compris nos besoins. Le site reflète exactement l'ambiance de notre établissement.",
    rating: 5,
  },
  {
    id: 4,
    name: "Thomas Petit",
    company: "Artisan Menuisier 37",
    avatar: "TP",
    text: "Enfin un site à mon image ! Les clients me trouvent facilement sur Google maintenant.",
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
    company: "Plomberie Moreau - Joué-lès-Tours",
    avatar: "FM",
    text: "Mon site me rapporte au moins 5 nouveaux clients par mois. Investissement largement rentabilisé !",
    rating: 5,
  },
];

export default function CreationSiteInternet() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [realisations, setRealisations] = useState<Realisation[]>([]);

  // Charger les réalisations de type "sites"
  useEffect(() => {
    async function fetchRealisations() {
      try {
        const res = await fetch('/api/realisations?serviceType=sites');
        const data = await res.json();
        if (Array.isArray(data)) {
          setRealisations(data.slice(0, 3)); // Limiter à 3
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

  // Parallax pour la section 690€
  const pricingSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: pricingProgress } = useScroll({
    target: pricingSectionRef,
    offset: ["start end", "end start"]
  });
  const pricingY = useTransform(pricingProgress, [0, 1], [100, -100]);
  const pricingScale = useTransform(pricingProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const pricingRotate = useTransform(pricingProgress, [0, 1], [-5, 5]);
  const bgY = useTransform(pricingProgress, [0, 1], [0, -200]);

  // Animation FAQ courbes
  const faqSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: faqProgress } = useScroll({
    target: faqSectionRef,
    offset: ["start end", "end start"]
  });
  const faqPathLength = useTransform(faqProgress, [0.1, 0.9], [0, 1]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-gray-50 pt-24 pb-16">
        {/* Auras de couleur - BLEU */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-400/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/15 rounded-full blur-[80px]" />
        </div>

        {/* Grille décorative */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Contenu Hero */}
        <div className="relative z-10 container-kb text-center px-4">
          {/* Badge */}
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-blue-200 bg-blue-50/50 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-600">
              Artisans & TPE en France • Basés à Tours
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
            Création de{" "}
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Site Internet
            </span>{" "}
            sur Mesure
            <br />
            <span className="font-playfair italic text-[0.95em] font-bold text-gray-900">
              Votre vitrine pro clé en main.
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
            Ne laissez plus vos concurrents prendre votre place sur Google.
            <br className="hidden sm:block" />
            Sites{" "}
            <span
              className="text-gray-900 font-semibold"
              style={{
                backgroundImage: "linear-gradient(120deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 88%",
                backgroundSize: "100% 40%",
                padding: "0 4px",
              }}
            >ultra-rapides</span>,
            design{" "}
            <span
              className="text-gray-900 font-semibold"
              style={{
                backgroundImage: "linear-gradient(120deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 88%",
                backgroundSize: "100% 40%",
                padding: "0 4px",
              }}
            >sur-mesure</span>, à
            partir de{" "}
            <span className="font-bold text-blue-600 text-2xl">690€</span>.
          </motion.p>

          {/* CTAs Boutons pill 3D */}
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Bouton bleu dégradé */}
            <Link
              href="/devis"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                boxShadow: `
                  0 1px 2px rgba(0,0,0,0.1),
                  0 4px 8px rgba(59,130,246,0.3),
                  0 8px 16px rgba(99,102,241,0.2),
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
                Lancer mon projet
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
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
              <span className="relative font-semibold text-gray-700">Voir nos réalisations</span>
            </Link>
          </motion.div>

          {/* Badge Google 5/5 pour rassurer */}
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.6}
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

      {/* Section Problème */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        {/* Background effects - BLEU */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container-kb px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.span
              variants={fadeInUp}
              custom={0}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-blue-200 bg-blue-50/50 text-blue-600"
            >
              Le constat
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Pourquoi votre entreprise doit être{" "}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                visible sur le web
              </span>{" "}
              aujourd&apos;hui ?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={0.2}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              3 raisons pour lesquelles un site internet n&apos;est plus une
              option, mais une nécessité.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Point 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              custom={0.1}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className="relative p-8 rounded-3xl border border-white/50 h-full"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(59,130,246,0.1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-indigo-100/20 rounded-3xl pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Manque de visibilité</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vos clients cherchent un artisan sur{" "}
                    <span
                      className="text-gray-900 font-semibold"
                      style={{
                        backgroundImage: "linear-gradient(120deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "0 88%",
                        backgroundSize: "100% 40%",
                        padding: "0 4px",
                      }}
                    >Google</span>, pas
                    dans l&apos;annuaire. Sans site, vous êtes invisible face à la concurrence.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Point 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              custom={0.2}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-indigo-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className="relative p-8 rounded-3xl border border-white/50 h-full"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(99,102,241,0.1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-transparent to-blue-100/20 rounded-3xl pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/30">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Image de marque</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Un site professionnel{" "}
                    <span
                      className="text-gray-900 font-semibold"
                      style={{
                        backgroundImage: "linear-gradient(120deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "0 88%",
                        backgroundSize: "100% 40%",
                        padding: "0 4px",
                      }}
                    >rassure vos clients</span>{" "}
                    et justifie vos tarifs. C&apos;est votre vitrine disponible 24h/24.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Point 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              custom={0.3}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className="relative p-8 rounded-3xl border border-white/50 h-full"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(59,130,246,0.1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-indigo-100/20 rounded-3xl pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Automatisation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Un site bien conçu{" "}
                    <span
                      className="text-gray-900 font-semibold"
                      style={{
                        backgroundImage: "linear-gradient(120deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "0 88%",
                        backgroundSize: "100% 40%",
                        padding: "0 4px",
                      }}
                    >répond aux questions à votre place</span>{" "}
                    : horaires, tarifs, devis... Gagnez du temps au quotidien.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Solution & Technologie */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        {/* Background effects - BLEU */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -translate-x-1/2" />
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[80px] translate-x-1/2" />
        </div>

        {/* Grille décorative */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container-kb px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Badge */}
              <motion.span
                variants={fadeInUp}
                custom={0}
                className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-blue-200 bg-blue-50/50 text-blue-600"
              >
                Notre différence
              </motion.span>

              <motion.h2
                variants={fadeInUp}
                custom={0.1}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              >
                La{" "}
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  performance technique
                </span>{" "}
                au service de votre business
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                custom={0.2}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                Nous n&apos;utilisons pas de modèles lourds ou de constructeurs
                de pages généralistes. Nous développons votre site avec{" "}
                <span
                  className="text-gray-900 font-semibold"
                  style={{
                    backgroundImage: "linear-gradient(120deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0 88%",
                    backgroundSize: "100% 40%",
                    padding: "0 4px",
                  }}
                >Next.js</span>, la
                technologie utilisée par Netflix, Uber et les plus grandes
                startups tech.
              </motion.p>

              <motion.div variants={fadeInUp} custom={0.3} className="space-y-4">
                {/* Avantage 1 */}
                <div
                  className="group flex items-start gap-4 p-4 rounded-2xl border border-white/50 hover:scale-[1.02] transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.1)",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ultra-rapide (&lt; 1 seconde)</h4>
                    <p className="text-sm text-gray-600">Un site rapide = meilleur classement Google + visiteurs qui restent</p>
                  </div>
                </div>

                {/* Avantage 2 */}
                <div
                  className="group flex items-start gap-4 p-4 rounded-2xl border border-white/50 hover:scale-[1.02] transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 20px rgba(99,102,241,0.1)",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Optimisé pour Google (SEO)</h4>
                    <p className="text-sm text-gray-600">Structure technique pensée pour le référencement naturel</p>
                  </div>
                </div>

                {/* Avantage 3 */}
                <div
                  className="group flex items-start gap-4 p-4 rounded-2xl border border-white/50 hover:scale-[1.02] transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.1)",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">100% responsive</h4>
                    <p className="text-sm text-gray-600">Parfait sur mobile, tablette et ordinateur</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              custom={0.3}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-[40px] blur-3xl" />

              <div
                className="relative p-6 rounded-3xl border border-white/60 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15), 0 8px 24px rgba(59,130,246,0.15)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" style={{ height: "40%" }} />

                {/* Browser mockup */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 h-8 rounded-lg bg-gray-100/80 flex items-center px-3">
                    <span className="text-xs text-gray-500">votre-site.fr</span>
                  </div>
                </div>

                {/* Performance score */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-gray-600">Score Google PageSpeed</span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">Excellent</span>
                  </div>
                  <div className="flex items-center justify-center gap-8">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                        <circle cx="64" cy="64" r="56" fill="none" stroke="url(#gradientBlue)" strokeWidth="12" strokeDasharray="352" strokeDashoffset="35" strokeLinecap="round" />
                        <defs>
                          <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#6366f1" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-blue-600">98</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm text-gray-700">Performance: 98</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-indigo-500" />
                        <span className="text-sm text-gray-700">Accessibilité: 100</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-600" />
                        <span className="text-sm text-gray-700">SEO: 100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Investissement - FULL WIDTH PARALLAX */}
      <section ref={pricingSectionRef} className="relative py-0 overflow-hidden">
        {/* Background avec parallax */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950"
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
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-[150px]"
          style={{ y: useTransform(pricingProgress, [0, 1], [-100, 100]) }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px]"
          style={{ y: useTransform(pricingProgress, [0, 1], [100, -100]) }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/20 rounded-full blur-[180px]"
          style={{ scale: useTransform(pricingProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]) }}
        />

        {/* Lignes décoratives animées */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.line
            x1="0%" y1="20%" x2="100%" y2="80%"
            stroke="url(#lineGradient1)"
            strokeWidth="1"
            style={{ pathLength: useTransform(pricingProgress, [0.2, 0.8], [0, 1]) }}
          />
          <motion.line
            x1="100%" y1="10%" x2="0%" y2="90%"
            stroke="url(#lineGradient2)"
            strokeWidth="1"
            style={{ pathLength: useTransform(pricingProgress, [0.3, 0.9], [0, 1]) }}
          />
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.5)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139,92,246,0)" />
              <stop offset="50%" stopColor="rgba(139,92,246,0.5)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Contenu principal */}
        <div className="relative z-10 py-24 md:py-32">
          <div className="container-kb px-4">
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
                className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-300"
              >
                ✨ Offre de lancement
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Votre site pro à partir de
              </motion.h2>

              {/* Prix avec effet spectaculaire */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
                className="relative inline-block"
              >
                <motion.span
                  className="text-8xl md:text-[10rem] lg:text-[12rem] font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 0 80px rgba(59,130,246,0.5)",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  690€
                </motion.span>
                <span className="absolute -right-8 top-4 text-2xl text-gray-400 font-medium">HT</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto"
              >
                Un investissement accessible pour une{" "}
                <span className="text-white font-semibold">présence digitale professionnelle</span>
              </motion.p>
            </motion.div>

            {/* Grille des inclusions avec animations décalées */}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl mb-2 block">{item.icon}</span>
                  <span className="text-xs text-gray-300 leading-tight block relative z-10">{item.text}</span>
                </motion.div>
              ))}
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
                href="/devis"
                className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                  boxShadow: "0 0 40px rgba(59,130,246,0.5), 0 4px 20px rgba(99,102,241,0.3), inset 0 1px 1px rgba(255,255,255,0.3)",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-100" style={{ height: "50%" }} />
                <span className="relative text-lg font-semibold text-white drop-shadow-sm flex items-center gap-3">
                  Lancer mon projet maintenant
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

      {/* Section Processus - Animée avec ligne de progression */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[80px]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container-kb px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              custom={0}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-blue-200 bg-blue-50/50 text-blue-600"
            >
              Notre méthode
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Votre site en ligne en{" "}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                4 étapes simples
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={0.2}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Un processus clair et transparent pour vous accompagner de A à Z.
            </motion.p>
          </motion.div>

          {/* Timeline avec numéros animés */}
          <div ref={processLineRef} className="relative">
            {/* Ligne horizontale avec numéros - Desktop */}
            <div className="hidden lg:block mb-12 relative">
              {/* Conteneur des cercles */}
              <div className="flex items-center justify-between relative">
                {/* Ligne de fond grise - positionnée au centre des cercles */}
                <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 rounded-full" />

                {/* Ligne de progression gris subtil animée */}
                <motion.div
                  className="absolute top-8 left-8 right-8 h-1 rounded-full origin-left bg-gray-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isProcessInView ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
                />

                {/* Numéros avec couleurs différentes */}
                {processSteps.map((step, index) => {
                  // Couleurs pour chaque numéro
                  const numberColors = [
                    { border: "#3b82f6", text: "#3b82f6" }, // Bleu
                    { border: "#10b981", text: "#10b981" }, // Emerald
                    { border: "#f59e0b", text: "#f59e0b" }, // Amber
                    { border: "#8b5cf6", text: "#8b5cf6" }, // Violet
                  ];
                  const colors = numberColors[index];

                  return (
                    <div
                      key={step.number}
                      className="relative z-10 flex flex-col items-center"
                    >
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

            {/* Cartes de description - en dessous */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => {
                // Dégradés différents pour chaque étape
                const gradients = [
                  { from: "from-blue-500", to: "to-indigo-600", bg: "bg-blue-500", shadow: "shadow-blue-500/20", aura: "from-blue-400/30 to-indigo-500/20" },
                  { from: "from-emerald-500", to: "to-teal-600", bg: "bg-emerald-500", shadow: "shadow-emerald-500/20", aura: "from-emerald-400/30 to-teal-500/20" },
                  { from: "from-amber-500", to: "to-orange-600", bg: "bg-amber-500", shadow: "shadow-amber-500/20", aura: "from-amber-400/30 to-orange-500/20" },
                  { from: "from-violet-500", to: "to-purple-600", bg: "bg-violet-500", shadow: "shadow-violet-500/20", aura: "from-violet-400/30 to-purple-500/20" },
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
                    {/* Numéro mobile uniquement */}
                    <div className="lg:hidden flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center text-white font-bold text-sm`}>
                        {step.number}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    </div>

                    <div className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all h-full overflow-hidden">
                      {/* Aura demi-cercle en haut à droite */}
                      <div
                        className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${gradient.aura} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`}
                      />

                      <div className="relative z-10">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg ${gradient.shadow}`}>
                          {step.icon}
                        </div>

                        {/* Titre desktop caché car déjà au-dessus */}
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

      {/* Section Réalisations - Design travaillé avec Framer Motion */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        {/* Formes décoratives en arrière-plan avec parallax - Style homepage */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cercle bleu flou - haut gauche */}
          <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: -30 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px]"
          />
          {/* Cercle indigo - droite */}
          <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: 40 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute top-1/4 -right-32 w-[350px] h-[350px] bg-indigo-400/10 rounded-full blur-[80px]"
          />
          {/* Cercle violet - bas gauche */}
          <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: -20 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-violet-400/10 rounded-full blur-[80px]"
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
          {/* Forme géométrique - triangle (lignes) */}
          <motion.div
            initial={{ rotate: 0, y: 0, opacity: 0.2 }}
            whileInView={{ rotate: 8, y: -15, opacity: 0.3 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute top-1/3 left-16 w-24 h-24"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth="3"
              />
            </svg>
          </motion.div>

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
            className="absolute bottom-40 left-16 w-2 h-2 bg-violet-400/40 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0.3, y: 0 }}
            whileInView={{ opacity: 0.6, y: 15 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute top-32 right-40 w-2.5 h-2.5 bg-blue-400/40 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0.3, y: 0 }}
            whileInView={{ opacity: 0.5, y: -20 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute bottom-60 right-32 w-2 h-2 bg-indigo-400/40 rounded-full"
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
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 0.15 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            className="absolute top-20 right-1/3 w-[1px] h-24 bg-gradient-to-b from-transparent via-violet-400 to-transparent origin-top"
          />
        </div>

        <div className="container-kb px-4 relative z-10">
          {/* Header avec badge animé */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.div
              variants={fadeInUp}
              custom={0}
              className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full border border-blue-200/50 bg-white/80 backdrop-blur-sm shadow-sm"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-blue-600">Portfolio</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Ils ont digitalisé leur activité avec{" "}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                KB-COM
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={0.2}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Des sites web qui transforment les visiteurs en clients.
              <br className="hidden sm:block" />
              <span className="text-gray-900 font-medium" style={highlightStyle}>Artisans, TPE, PME</span> : ils nous ont fait confiance.
            </motion.p>
          </motion.div>

          {/* Grille de réalisations avec glassmorphisme */}
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
                      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.15))",
                      filter: "blur(40px)",
                    }}
                  />

                  {/* Card principale avec glassmorphisme */}
                  <CardWrapper {...cardProps}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative rounded-[1.5rem] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-blue-500/10"
                    >
                      {/* Browser mockup header avec glassmorphisme */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-white/50 backdrop-blur-sm border-b border-white/30">
                        <div className="flex gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-red-400/80" />
                          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                          <span className="w-3 h-3 rounded-full bg-green-400/80" />
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200/50 text-xs text-gray-500">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="truncate">{realisation.url ? realisation.url.replace(/^https?:\/\//, '') : `${realisation.slug}.kb-com.fr`}</span>
                          </div>
                        </div>
                      </div>

                      {/* Image/Preview area */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {realisation.image ? (
                          <img
                            src={realisation.image}
                            alt={`${realisation.name}${realisation.nameAccent ? ` ${realisation.nameAccent}` : ''}`}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <>
                            <motion.div
                              className="absolute inset-0"
                              style={{
                                background: `linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(255,255,255,0.9) 50%, rgba(99, 102, 241, 0.08) 100%)`,
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.span
                                className="text-8xl font-black"
                                style={{
                                  background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  opacity: 0.15,
                                }}
                              >
                                {realisation.name.charAt(0)}
                              </motion.span>
                            </div>
                          </>
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
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm shadow-sm border border-white/50 text-blue-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            Site Web
                          </span>
                        </div>
                      </div>

                      {/* Contenu carte avec glassmorphisme */}
                      <div className="p-6 bg-gradient-to-b from-transparent to-white/50">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                              {realisation.name}
                              {realisation.nameAccent && (
                                <span style={{ color: realisation.accentColor || '#3b82f6' }}> {realisation.nameAccent}</span>
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

          {/* CTA principal */}
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
                background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3), 0 10px 40px rgba(99, 102, 241, 0.2)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent" style={{ height: "50%" }} />
              <span className="relative font-semibold text-white drop-shadow-sm flex items-center gap-2">
                Explorer tous nos projets
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12 px-4"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-blue-200 bg-blue-50/50 text-blue-600">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ce que nos clients disent de{" "}
            <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Nous.
            </span>
          </h2>
          {/* Badge Google 5/5 */}
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
              {[...avisClients.slice(3), ...avisClients, ...avisClients.slice(0, 3)].map((avis, index) => (
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

      {/* Section SEO Local */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[100px]" />
        </div>

        <div className="container-kb px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              variants={fadeInUp}
              custom={0}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-blue-200 bg-blue-50/50 text-blue-600"
            >
              Agence locale
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Création de site web en{" "}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Indre-et-Loire (37)
              </span>
            </motion.h2>

            <motion.p variants={fadeInUp} custom={0.2} className="text-lg text-gray-600 leading-relaxed mb-8">
              Basée à{" "}
              <span
                className="text-gray-900 font-semibold"
                style={{
                  backgroundImage: "linear-gradient(120deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 88%",
                  backgroundSize: "100% 40%",
                  padding: "0 4px",
                }}
              >Tours</span>, notre agence web accompagne les professionnels de{" "}
              <strong>Joué-lès-Tours</strong>, <strong>Saint-Cyr-sur-Loire</strong>, <strong>Saint-Avertin</strong>,{" "}
              <strong>Chambray-lès-Tours</strong>, <strong>Fondettes</strong>, <strong>La Riche</strong> et <strong>Amboise</strong>.{" "}
              <span
                className="text-gray-900 font-semibold"
                style={{
                  backgroundImage: "linear-gradient(120deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 88%",
                  backgroundSize: "100% 40%",
                  padding: "0 4px",
                }}
              >Proximité et réactivité</span> sont nos maîtres-mots pour vos projets digitaux en Touraine.
            </motion.p>

            <motion.p variants={fadeInUp} custom={0.3} className="text-gray-600 leading-relaxed mb-8">
              Que vous soyez artisan, commerçant, profession libérale ou TPE, nous créons votre{" "}
              <span
                className="text-gray-900 font-semibold"
                style={{
                  backgroundImage: "linear-gradient(120deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 88%",
                  backgroundSize: "100% 40%",
                  padding: "0 4px",
                }}
              >site internet sur mesure</span>{" "}
              pour développer votre visibilité locale. Un projet de création de site internet à Tours ou dans le département 37 ?
              Contactez-nous pour un{" "}
              <span
                className="text-gray-900 font-semibold"
                style={{
                  backgroundImage: "linear-gradient(120deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 88%",
                  backgroundSize: "100% 40%",
                  padding: "0 4px",
                }}
              >devis gratuit et personnalisé</span>.
            </motion.p>

            <motion.div variants={fadeInUp} custom={0.4} className="flex flex-wrap justify-center gap-2">
              {["Tours", "Joué-lès-Tours", "Saint-Cyr-sur-Loire", "Saint-Avertin", "Chambray-lès-Tours", "Fondettes", "La Riche", "Amboise"].map((ville) => (
                <span
                  key={ville}
                  className="px-4 py-2 rounded-full text-sm text-gray-600 border border-white/60 hover:border-blue-300 hover:text-blue-600 transition-all cursor-default"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  {ville}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wrapper FAQ + Footer pour effet reveal - comme la homepage */}
      <div className="relative">
        {/* Section FAQ - Style homepage avec courbes animées */}
        <section ref={faqSectionRef} className="relative z-10 py-24 bg-gray-50 overflow-hidden">
          {/* Courbes décoratives animées au scroll - style homepage */}
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
                <linearGradient id="fadeLeftBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="10%" stopColor="#3b82f6" stopOpacity="1" />
                  <stop offset="90%" stopColor="#3b82f6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
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
                stroke="url(#fadeLeftBlue)"
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
                <linearGradient id="fadeRightBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                  <stop offset="10%" stopColor="#6366f1" stopOpacity="1" />
                  <stop offset="90%" stopColor="#6366f1" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
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
                stroke="url(#fadeRightBlue)"
                strokeWidth="2"
                fill="none"
                style={{ pathLength: faqPathLength }}
                opacity="0.6"
              />
            </svg>
          </div>

          <div className="container-kb px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-blue-200 bg-blue-50/50 text-blue-600">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Questions{" "}
                <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Fréquentes.
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
                    backgroundImage: "linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2))",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0 85%",
                  }}
                >
                  réponses à vos questions
                </motion.span>{" "}
                avant de lancer votre projet.
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
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />
              <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
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
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                  Lancez votre projet
                </span>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  Prêt à donner vie à votre{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    projet digital ?
                  </span>
                </h2>

                <p className="text-base text-gray-400 mb-5 max-w-xl mx-auto">
                  Discutons de vos objectifs et créons ensemble une solution sur mesure.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/devis"
                    className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                      boxShadow: "0 4px 20px rgba(59,130,246,0.4), inset 0 1px 1px rgba(255,255,255,0.2)",
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" style={{ height: "50%" }} />
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
