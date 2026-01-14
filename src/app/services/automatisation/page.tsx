"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

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
    transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const blurReveal = {
  hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

// Style de surlignage orange
const highlightStyle = {
  backgroundImage: "linear-gradient(120deg, rgba(249, 115, 22, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0 88%",
  backgroundSize: "100% 40%",
  padding: "0 4px",
};

// Données FAQ
const faqItems = [
  {
    id: 1,
    question: "Qu'est-ce que l'automatisation des processus ?",
    answer: (
      <>
        L&apos;automatisation consiste à faire exécuter des{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>tâches répétitives par des robots logiciels</span>{" "}
        (Make, n8n, Zapier...). Par exemple : envoyer un email de bienvenue automatique, synchroniser vos données entre outils, générer des rapports...
      </>
    ),
  },
  {
    id: 2,
    question: "Combien de temps puis-je gagner avec l'automatisation ?",
    answer: (
      <>
        En moyenne, nos clients gagnent{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>5 à 15 heures par semaine</span>{" "}
        selon la complexité de leurs processus. Certains ont même économisé l&apos;équivalent d&apos;un temps plein !
      </>
    ),
  },
  {
    id: 3,
    question: "Quels outils utilisez-vous ?",
    answer: (
      <>
        Principalement{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>Make (ex-Integromat) et n8n</span>{" "}
        pour leur puissance et flexibilité. Nous intégrons aussi Zapier, les APIs directes et des scripts personnalisés. L&apos;IA (ChatGPT, Claude) peut aussi être intégrée.
      </>
    ),
  },
  {
    id: 4,
    question: "Est-ce que je peux modifier les automatisations moi-même ?",
    answer: (
      <>
        Oui ! Nous vous{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>formons à l&apos;utilisation</span>{" "}
        des outils et vous remettrons une documentation complète. Les modifications simples sont à votre portée.
      </>
    ),
  },
];

// Étapes du processus
const processSteps = [
  {
    number: "01",
    title: "Audit des Processus",
    description: "Cartographie de vos processus actuels et identification des tâches automatisables.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
  },
  {
    number: "02",
    title: "Design des Workflows",
    description: "Conception des scénarios d'automatisation et choix des outils adaptés.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
  },
  {
    number: "03",
    title: "Développement & Tests",
    description: "Création des automatisations, tests rigoureux et gestion des cas d'erreur.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  {
    number: "04",
    title: "Déploiement & Formation",
    description: "Mise en production, formation de vos équipes et documentation complète.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  },
];

// Cas d'usage
const useCases = [
  { title: "Prospection Commerciale", description: "Enrichissement de leads, séquences d'emails automatiques, synchronisation CRM.", icon: "🎯", savings: "10h/semaine" },
  { title: "Facturation & Comptabilité", description: "Génération automatique de factures, relances impayés, export comptable.", icon: "💰", savings: "8h/semaine" },
  { title: "Onboarding Clients", description: "Emails de bienvenue, création de comptes, envoi de documents.", icon: "👋", savings: "5h/semaine" },
  { title: "Reporting & Analytics", description: "Collecte automatique des données, génération de tableaux de bord.", icon: "📊", savings: "6h/semaine" },
  { title: "Gestion RH", description: "Demandes de congés, notes de frais, signatures électroniques.", icon: "👥", savings: "7h/semaine" },
  { title: "Support Client", description: "Tri automatique des tickets, réponses IA aux questions fréquentes.", icon: "🎧", savings: "12h/semaine" },
];

// Outils
const tools = [
  { name: "Make", logo: "⚡", description: "Automatisation visuelle puissante" },
  { name: "n8n", logo: "🔄", description: "Workflows open-source flexibles" },
  { name: "Zapier", logo: "⚙️", description: "Intégrations simples et rapides" },
  { name: "ChatGPT / Claude", logo: "🤖", description: "IA générative intégrée" },
  { name: "Airtable", logo: "📊", description: "Base de données no-code" },
  { name: "Notion", logo: "📝", description: "Espace de travail connecté" },
];

// Inclus
const included = [
  { text: "Audit des processus existants", icon: "🔍" },
  { text: "Design des workflows", icon: "📐" },
  { text: "Développement des automatisations", icon: "⚙️" },
  { text: "Tests et gestion des erreurs", icon: "✅" },
  { text: "Documentation complète", icon: "📖" },
  { text: "Formation de vos équipes", icon: "🎓" },
];

// Avis clients
const avisClients = [
  { id: 1, name: "Caroline Durand", company: "Directrice - Agence Immo Plus", avatar: "CD", text: "On a automatisé tout le parcours client : de la prise de contact à la signature. 15h économisées par semaine !", rating: 5 },
  { id: 2, name: "Marc Lefèvre", company: "CEO - StartUp Tech", avatar: "ML", text: "L'intégration de ChatGPT dans notre support a divisé par 3 le temps de traitement des tickets. Bluffant.", rating: 5 },
  { id: 3, name: "Isabelle Martin", company: "DAF - Groupe Distribution", avatar: "IM", text: "La facturation automatique nous fait gagner 2 jours par mois. Plus d'erreurs, plus d'oublis.", rating: 5 },
  { id: 4, name: "Thomas Bernard", company: "Fondateur - E-commerce Mode", avatar: "TB", text: "Synchronisation stock, emails post-achat, relances paniers... Tout est automatisé.", rating: 5 },
  { id: 5, name: "Sophie Legrand", company: "RH Manager - Cabinet Conseil", avatar: "SL", text: "Les demandes de congés, notes de frais, onboarding... tout passe en automatique.", rating: 5 },
  { id: 6, name: "Nicolas Petit", company: "COO - Agence Marketing", avatar: "NP", text: "Nos rapports clients se génèrent seuls chaque lundi. On a libéré 1 journée complète.", rating: 5 },
];

export default function Automatisation() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [realisations, setRealisations] = useState<Realisation[]>([]);

  // Charger les réalisations de type "automation"
  useEffect(() => {
    async function fetchRealisations() {
      try {
        const res = await fetch('/api/realisations?serviceType=automation');
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

  // Refs et scroll pour animations
  const processLineRef = useRef<HTMLDivElement>(null);
  const isProcessInView = useInView(processLineRef, { once: true, margin: "-100px" });

  const pricingSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: pricingProgress } = useScroll({
    target: pricingSectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(pricingProgress, [0, 1], [0, -200]);

  const faqSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: faqProgress } = useScroll({
    target: faqSectionRef,
    offset: ["start end", "end start"],
  });
  const faqPathLength = useTransform(faqProgress, [0.1, 0.9], [0, 1]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-gray-50 pt-24 pb-16">
        {/* Auras de couleur orange */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-400/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-400/15 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-orange-500/15 rounded-full blur-[80px]"
          />
        </div>

        {/* Grille décorative */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

        {/* Contenu Hero */}
        <div className="relative z-10 container mx-auto max-w-6xl text-center px-4">
          {/* Badge */}
          <motion.div variants={blurReveal} initial="hidden" animate="visible" custom={0} className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border border-orange-200/60 bg-white/60 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Make, n8n & IA • Basés à Tours</span>
          </motion.div>

          {/* H1 */}
          <motion.h1 variants={blurReveal} initial="hidden" animate="visible" custom={0.15} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto text-gray-900">
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent">Automatisation</span>{" "}
            de vos processus
            <br />
            <span className="font-playfair italic text-[0.95em] font-bold text-gray-900">Gagnez des heures chaque semaine.</span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p variants={blurReveal} initial="hidden" animate="visible" custom={0.3} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Libérez-vous des <span className="text-gray-900 font-semibold" style={highlightStyle}>tâches répétitives</span>.
            Automatisez vos processus avec Make, n8n et l&apos;IA pour <span className="text-gray-900 font-semibold" style={highlightStyle}>booster votre productivité</span>.
          </motion.p>

          {/* CTAs avec style 3D pill */}
          <motion.div variants={blurReveal} initial="hidden" animate="visible" custom={0.45} className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Bouton orange dégradé */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #f59e0b 100%)",
                boxShadow: `0 1px 2px rgba(0,0,0,0.1), 0 4px 8px rgba(249,115,22,0.3), 0 8px 16px rgba(245,158,11,0.2), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.1)`,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent opacity-100" style={{ height: "50%" }} />
              <span className="relative font-semibold text-white drop-shadow-sm flex items-center gap-2">
                Automatiser mes processus
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </Link>

            {/* Bouton blanc/gris 3D pill */}
            <Link
              href="/realisations"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
                boxShadow: `0 1px 2px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -1px 2px rgba(0,0,0,0.05)`,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 to-transparent opacity-100" style={{ height: "50%" }} />
              <span className="relative font-semibold text-gray-700">Voir des exemples</span>
            </Link>
          </motion.div>

          {/* Badge Google 5/5 */}
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

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-orange-300 flex justify-center pt-2">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* Section Cas d'usage avec glass cards */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 to-transparent pointer-events-none" />

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span variants={fadeInUp} custom={0} className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-orange-200 bg-orange-50/50 text-orange-600">Cas d&apos;usage</motion.span>
            <motion.h2 variants={fadeInUp} custom={0.1} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Ce que vous pouvez{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">automatiser.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} custom={0.2} className="text-lg text-gray-600 max-w-2xl mx-auto">Des processus concrets, des gains de temps mesurables</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div
                  className="relative p-6 rounded-2xl border border-white/50 transition-all duration-300 h-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 20px rgba(249,115,22,0.08), inset 0 1px 1px rgba(255,255,255,0.8)",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200/50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {useCase.icon}
                    </div>
                    <span className="px-3 py-1.5 text-sm font-bold bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full border border-orange-200/50">
                      {useCase.savings}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{useCase.description}</p>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 to-amber-500/0 group-hover:from-orange-500/5 group-hover:to-amber-500/5 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Gain de temps - FULL WIDTH PARALLAX DARK (comme 690€) */}
      <section ref={pricingSectionRef} className="relative py-0 overflow-hidden">
        {/* Background avec parallax */}
        <motion.div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-orange-950 to-amber-950" style={{ y: bgY }} />

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
        <motion.div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/30 rounded-full blur-[150px]" style={{ y: useTransform(pricingProgress, [0, 1], [-100, 100]) }} />
        <motion.div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/30 rounded-full blur-[120px]" style={{ y: useTransform(pricingProgress, [0, 1], [100, -100]) }} />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/20 rounded-full blur-[180px]" style={{ scale: useTransform(pricingProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]) }} />

        {/* Lignes décoratives animées */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.line x1="0%" y1="20%" x2="100%" y2="80%" stroke="url(#lineGradientOrange1)" strokeWidth="1" style={{ pathLength: useTransform(pricingProgress, [0.2, 0.8], [0, 1]) }} />
          <motion.line x1="100%" y1="10%" x2="0%" y2="90%" stroke="url(#lineGradientOrange2)" strokeWidth="1" style={{ pathLength: useTransform(pricingProgress, [0.3, 0.9], [0, 1]) }} />
          <defs>
            <linearGradient id="lineGradientOrange1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(249,115,22,0)" />
              <stop offset="50%" stopColor="rgba(249,115,22,0.5)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0)" />
            </linearGradient>
            <linearGradient id="lineGradientOrange2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(245,158,11,0)" />
              <stop offset="50%" stopColor="rgba(245,158,11,0.5)" />
              <stop offset="100%" stopColor="rgba(245,158,11,0)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Contenu principal */}
        <div className="relative z-10 py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
              <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full border border-orange-400/30 bg-orange-500/10 backdrop-blur-sm text-orange-300">
                ⚡ Gain de temps moyen
              </motion.span>

              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Nos clients gagnent en moyenne
              </motion.h2>

              {/* Gros chiffre avec effet spectaculaire */}
              <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }} className="relative inline-block">
                <motion.span
                  className="text-8xl md:text-[10rem] lg:text-[12rem] font-bold bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent"
                  style={{ textShadow: "0 0 80px rgba(249,115,22,0.5)" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  +10h
                </motion.span>
                <span className="absolute -right-16 top-4 text-2xl text-gray-400 font-medium">/semaine</span>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7 }} className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
                Des heures libérées pour vous concentrer sur{" "}
                <span className="text-white font-semibold">ce qui compte vraiment</span>
              </motion.p>
            </motion.div>

            {/* Grille des inclusions glassmorphism */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl mb-2 block">{item.icon}</span>
                  <span className="text-xs text-gray-300 leading-tight block relative z-10">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }} className="text-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #f59e0b 100%)",
                  boxShadow: "0 0 40px rgba(249,115,22,0.5), 0 4px 20px rgba(245,158,11,0.3), inset 0 1px 1px rgba(255,255,255,0.3)",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-100" style={{ height: "50%" }} />
                <span className="relative text-lg font-semibold text-white drop-shadow-sm flex items-center gap-3">
                  Demander un audit gratuit
                  <motion.svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
              </Link>
              <p className="text-sm text-gray-500 mt-4">Audit gratuit • Sans engagement • Réponse sous 24h</p>
            </motion.div>
          </div>
        </div>

        {/* Effet de vague en bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Section Processus */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span variants={fadeInUp} custom={0} className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-orange-200 bg-orange-50/50 text-orange-600">Notre méthode</motion.span>
            <motion.h2 variants={fadeInUp} custom={0.1} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Votre automatisation en{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">4 étapes simples</span>
            </motion.h2>
            <motion.p variants={fadeInUp} custom={0.2} className="text-lg text-gray-600 max-w-2xl mx-auto">Un processus clair et transparent pour vous accompagner de A à Z.</motion.p>
          </motion.div>

          {/* Timeline avec numéros animés */}
          <div ref={processLineRef} className="relative">
            {/* Ligne horizontale Desktop */}
            <div className="hidden lg:block mb-12 relative">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 rounded-full" />
                <motion.div className="absolute top-8 left-8 right-8 h-1 rounded-full origin-left bg-gradient-to-r from-orange-400 to-amber-500" initial={{ scaleX: 0 }} animate={{ scaleX: isProcessInView ? 1 : 0 }} transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }} />
                {processSteps.map((step, index) => {
                  const colors = [
                    { border: "#f97316", text: "#f97316" },
                    { border: "#f97316", text: "#f97316" },
                    { border: "#f97316", text: "#f97316" },
                    { border: "#f97316", text: "#f97316" },
                  ];
                  const color = colors[index];
                  return (
                    <div key={step.number} className="relative z-10 flex flex-col items-center">
                      <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold bg-white border-4"
                        initial={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
                        animate={{ borderColor: isProcessInView ? color.border : "#e5e7eb", color: isProcessInView ? color.text : "#9ca3af" }}
                        transition={{ duration: 0.6, delay: 0.1 + index * 0.15 }}
                      >
                        {step.number}
                      </motion.div>
                      <motion.span className="mt-3 text-sm font-semibold text-center max-w-[120px]" initial={{ color: "#9ca3af" }} animate={{ color: isProcessInView ? "#1f2937" : "#9ca3af" }} transition={{ duration: 0.5, delay: 0.15 + index * 0.15 }}>
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
                  { from: "from-orange-500", to: "to-amber-600", shadow: "shadow-orange-500/20", aura: "from-orange-400/30 to-amber-500/20" },
                  { from: "from-orange-500", to: "to-amber-600", shadow: "shadow-orange-500/20", aura: "from-orange-400/30 to-amber-500/20" },
                  { from: "from-orange-500", to: "to-amber-600", shadow: "shadow-orange-500/20", aura: "from-orange-400/30 to-amber-500/20" },
                  { from: "from-orange-500", to: "to-amber-600", shadow: "shadow-orange-500/20", aura: "from-orange-400/30 to-amber-500/20" },
                ];
                const gradient = gradients[index];
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isProcessInView ? 1 : 0, y: isProcessInView ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="lg:hidden flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center text-white font-bold text-sm`}>{step.number}</div>
                      <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <div
                      className="relative p-6 rounded-2xl border border-white/50 transition-all h-full overflow-hidden"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)", backdropFilter: "blur(10px)", boxShadow: "0 4px 20px rgba(249,115,22,0.08)" }}
                    >
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

      {/* Section Outils */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.span variants={fadeInUp} custom={0} className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-orange-200 bg-orange-50/50 text-orange-600">Notre stack</motion.span>
            <motion.h2 variants={fadeInUp} custom={0.1} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Outils que nous{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">utilisons.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="flex items-center gap-4 p-5 rounded-xl transition-all group"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 2px 10px rgba(249,115,22,0.05), inset 0 1px 1px rgba(255,255,255,0.8)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform border border-orange-200/30">
                  {tool.logo}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{tool.name}</div>
                  <div className="text-sm text-gray-500">{tool.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Réalisations */}
      <section className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div initial={{ y: 0 }} whileInView={{ y: -30 }} transition={{ duration: 1.5 }} viewport={{ once: false, amount: 0.3 }} className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-orange-400/10 rounded-full blur-[100px]" />
          <motion.div initial={{ y: 0 }} whileInView={{ y: 40 }} transition={{ duration: 1.5 }} viewport={{ once: false, amount: 0.3 }} className="absolute top-1/4 -right-32 w-[350px] h-[350px] bg-amber-400/10 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-20">
            <motion.div variants={blurReveal} custom={0} className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full border border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-sm">
              <motion.span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-sm font-medium text-orange-600">Cas clients</span>
            </motion.div>
            <motion.h2 variants={blurReveal} custom={0.1} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Automatisations{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">réalisées</span>
            </motion.h2>
            <motion.p variants={blurReveal} custom={0.2} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Des workflows qui{" "}
              <span className="text-gray-900 font-medium" style={highlightStyle}>libèrent du temps</span> et éliminent les erreurs.
            </motion.p>
          </motion.div>

          {/* Grille de réalisations avec glassmorphisme */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {realisations.length > 0 ? realisations.map((realisation, index) => {
              const hasExternalUrl = !!realisation.url;
              const CardWrapper = hasExternalUrl ? 'a' : Link;
              const cardProps = hasExternalUrl
                ? { href: realisation.url, target: "_blank", rel: "noopener noreferrer" }
                : { href: `/realisations/${realisation.slug}` };

              return (
                <motion.div key={realisation.id} initial={{ opacity: 0, y: 50, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: index * 0.15 }} className="group relative">
                  {/* Glow effect au hover */}
                  <motion.div className="absolute -inset-4 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ background: "linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(245, 158, 11, 0.15))", filter: "blur(40px)" }} />

                  {/* Card principale avec glassmorphisme */}
                  <CardWrapper {...cardProps}>
                    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="relative rounded-[1.5rem] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-orange-500/10">
                      {/* Header avec glassmorphisme */}
                      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-50/80 to-amber-50/80 backdrop-blur-sm border-b border-white/30">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                          <span className="text-xs font-medium text-gray-600">Automatisation</span>
                        </div>
                        {realisation.results && realisation.results[0] && (
                          <span className="px-2 py-1 rounded-full bg-green-100/80 backdrop-blur-sm text-green-700 text-xs font-bold">{realisation.results[0]}</span>
                        )}
                      </div>

                      {/* Zone image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
                        {realisation.image ? (
                          <img src={realisation.image} alt={`${realisation.name}${realisation.nameAccent ? ` ${realisation.nameAccent}` : ''}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30">
                              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <span className="text-sm text-gray-500">{realisation.client}</span>
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
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm shadow-sm border border-white/50 text-orange-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            Automatisation
                          </span>
                        </div>
                      </div>

                      {/* Contenu carte avec glassmorphisme */}
                      <div className="p-6 bg-gradient-to-b from-transparent to-white/50">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                              {realisation.name}
                              {realisation.nameAccent && (
                                <span style={{ color: realisation.accentColor || '#f97316' }}> {realisation.nameAccent}</span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-500">{realisation.industry}</p>
                          </div>
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 text-xs text-gray-600">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {realisation.year}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CardWrapper>
                </motion.div>
              );
            }) : (
              // Placeholder si pas de réalisations avec glassmorphisme
              [...Array(3)].map((_, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 50, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: index * 0.15 }} className="group relative">
                  <motion.div className="absolute -inset-4 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ background: "linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(245, 158, 11, 0.15))", filter: "blur(40px)" }} />
                  <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="relative rounded-[1.5rem] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-orange-500/10">
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-50/80 to-amber-50/80 backdrop-blur-sm border-b border-white/30">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                        <span className="text-xs font-medium text-gray-600">Automatisation</span>
                      </div>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30">
                          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <span className="text-sm text-gray-500">Bientôt disponible</span>
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-b from-transparent to-white/50">
                      <div className="h-6 bg-gray-200/80 rounded w-3/4 mb-2 animate-pulse" />
                      <div className="h-4 bg-gray-100/80 rounded w-1/2 animate-pulse" />
                    </div>
                  </motion.div>
                </motion.div>
              ))
            )}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="text-center mt-16">
            <Link href="/realisations" className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #f59e0b 100%)", boxShadow: "0 4px 15px rgba(249, 115, 22, 0.3), 0 10px 40px rgba(245, 158, 11, 0.2)" }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent" style={{ height: "50%" }} />
              <span className="relative font-semibold text-white drop-shadow-sm flex items-center gap-2">
                Voir tous nos cas clients
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="relative py-24 bg-white overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-12 px-4">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-orange-200 bg-orange-50/50 text-orange-600">Témoignages</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ils ont automatisé leur{" "}
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 bg-clip-text text-transparent">quotidien.</span>
          </h2>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 mt-4 rounded-full bg-white border border-gray-200 shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
            <span className="text-sm font-semibold text-gray-700">5/5 sur Google</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="mb-6 overflow-hidden">
            <motion.div animate={{ x: [0, -2000] }} transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" } }} className="flex gap-6">
              {[...avisClients, ...avisClients, ...avisClients].map((avis, index) => (
                <div key={`row1-${avis.id}-${index}`} className="flex-shrink-0 w-[350px] p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center"><span className="text-xs font-bold text-white">{avis.avatar}</span></div>
                    <div><p className="font-semibold text-gray-900 text-sm">{avis.name}</p><p className="text-xs text-gray-500">{avis.company}</p></div>
                    <div className="ml-auto flex gap-0.5">{[...Array(avis.rating)].map((_, i) => (<svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{avis.text}&rdquo;</p>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div animate={{ x: [-2000, 0] }} transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 45, ease: "linear" } }} className="flex gap-6">
              {[...avisClients.slice(3), ...avisClients, ...avisClients.slice(0, 3)].map((avis, index) => (
                <div key={`row2-${avis.id}-${index}`} className="flex-shrink-0 w-[350px] p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center"><span className="text-xs font-bold text-white">{avis.avatar}</span></div>
                    <div><p className="font-semibold text-gray-900 text-sm">{avis.name}</p><p className="text-xs text-gray-500">{avis.company}</p></div>
                    <div className="ml-auto flex gap-0.5">{[...Array(avis.rating)].map((_, i) => (<svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{avis.text}&rdquo;</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section SEO Local */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-orange-100/40 to-amber-100/40 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-4xl mx-auto text-center">
            <motion.span variants={blurReveal} custom={0} className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-orange-200 bg-orange-50/50 text-orange-600">Expert automatisation</motion.span>
            <motion.h2 variants={blurReveal} custom={0.1} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Automatisation des processus{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">entreprise</span>
            </motion.h2>
            <motion.p variants={blurReveal} custom={0.2} className="text-lg text-gray-600 leading-relaxed mb-8">
              Notre agence basée à Tours est spécialisée dans l&apos;
              <span className="text-gray-900 font-semibold" style={highlightStyle}>automatisation des processus</span>{" "}
              avec <strong>Make (Integromat)</strong>, <strong>n8n</strong> et l&apos;<strong>intelligence artificielle</strong>.
              Nous aidons les entreprises de toute la France à <strong>gagner du temps</strong>, <strong>réduire les erreurs</strong>
              {" "}et <strong>augmenter leur productivité</strong> grâce à des workflows automatisés sur mesure.
            </motion.p>
            <motion.p variants={blurReveal} custom={0.3} className="text-gray-600 leading-relaxed mb-8">
              En tant qu&apos;experts en{" "}
              <span className="text-gray-900 font-semibold" style={highlightStyle}>automatisation no-code et low-code</span>,
              nous créons des scénarios pour automatiser votre <strong>prospection commerciale</strong>,
              {" "}votre <strong>facturation</strong>, votre <strong>support client</strong>, vos <strong>reportings</strong>
              {" "}et bien plus. Nous intervenons auprès d&apos;entreprises à <strong>Tours</strong>, <strong>Paris</strong>,
              {" "}<strong>Lyon</strong>, <strong>Nantes</strong> et partout en France.
            </motion.p>
            <motion.div variants={blurReveal} custom={0.4} className="flex flex-wrap justify-center gap-2">
              {["Make (Integromat)", "n8n", "Zapier", "ChatGPT API", "Workflow automation", "No-code", "API integration", "Business process"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full text-sm text-gray-600 border border-white/60 hover:border-orange-300 hover:text-orange-600 transition-all cursor-default" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)", backdropFilter: "blur(10px)", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>{tag}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wrapper FAQ + Footer */}
      <div className="relative">
        {/* Section FAQ */}
        <section ref={faqSectionRef} className="relative z-10 py-24 bg-gray-50 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute -left-20 -top-40 w-[700px] h-[1200px]" viewBox="0 0 700 1200" fill="none">
              <defs>
                <linearGradient id="fadeLeftGrayAuto" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#d1d5db" stopOpacity="0" /><stop offset="10%" stopColor="#d1d5db" stopOpacity="1" /><stop offset="90%" stopColor="#d1d5db" stopOpacity="1" /><stop offset="100%" stopColor="#d1d5db" stopOpacity="0" /></linearGradient>
                <linearGradient id="fadeLeftOrange" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#f97316" stopOpacity="0" /><stop offset="10%" stopColor="#f97316" stopOpacity="1" /><stop offset="90%" stopColor="#f97316" stopOpacity="1" /><stop offset="100%" stopColor="#f97316" stopOpacity="0" /></linearGradient>
              </defs>
              <path d="M500 -100C500 -100 150 100 200 280C250 460 80 520 180 720C280 920 450 1000 650 1300" stroke="url(#fadeLeftGrayAuto)" strokeWidth="2" fill="none" opacity="0.15" />
              <motion.path d="M500 -100C500 -100 150 100 200 280C250 460 80 520 180 720C280 920 450 1000 650 1300" stroke="url(#fadeLeftOrange)" strokeWidth="2" fill="none" style={{ pathLength: faqPathLength }} opacity="0.6" />
            </svg>
            <svg className="absolute -right-20 top-20 w-[650px] h-[1100px]" viewBox="0 0 650 1100" fill="none">
              <defs>
                <linearGradient id="fadeRightGrayAuto" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#d1d5db" stopOpacity="0" /><stop offset="10%" stopColor="#d1d5db" stopOpacity="1" /><stop offset="90%" stopColor="#d1d5db" stopOpacity="1" /><stop offset="100%" stopColor="#d1d5db" stopOpacity="0" /></linearGradient>
                <linearGradient id="fadeRightAmber" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#f59e0b" stopOpacity="0" /><stop offset="10%" stopColor="#f59e0b" stopOpacity="1" /><stop offset="90%" stopColor="#f59e0b" stopOpacity="1" /><stop offset="100%" stopColor="#f59e0b" stopOpacity="0" /></linearGradient>
              </defs>
              <path d="M150 -50C150 -50 500 100 420 300C340 500 550 600 450 800C350 1000 150 1050 -50 1150" stroke="url(#fadeRightGrayAuto)" strokeWidth="2" fill="none" opacity="0.15" />
              <motion.path d="M150 -50C150 -50 500 100 420 300C340 500 550 600 450 800C350 1000 150 1050 -50 1150" stroke="url(#fadeRightAmber)" strokeWidth="2" fill="none" style={{ pathLength: faqPathLength }} opacity="0.6" />
            </svg>
          </div>

          <div className="container mx-auto max-w-4xl px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-orange-200 bg-orange-50/50 text-orange-600">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Questions sur{" "}
                <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 bg-clip-text text-transparent">l&apos;automatisation.</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Retrouvez les{" "}
                <motion.span initial={{ backgroundSize: "0% 40%" }} whileInView={{ backgroundSize: "100% 40%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="text-gray-900 font-semibold" style={{ backgroundImage: "linear-gradient(90deg, rgba(249, 115, 22, 0.2), rgba(245, 158, 11, 0.2))", backgroundRepeat: "no-repeat", backgroundPosition: "0 85%" }}>
                  réponses à vos questions
                </motion.span>{" "}
                sur l&apos;automatisation des processus.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-3xl mx-auto">
              {faqItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                  <button onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)} className="w-full py-6 flex items-center justify-between gap-4 text-left group">
                    <span className="text-lg font-medium text-gray-900 group-hover:text-orange-600 transition-colors">{item.question}</span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-50 transition-colors">
                      <svg className={`w-4 h-4 text-gray-500 group-hover:text-orange-600 transition-transform duration-300 ${openFaq === item.id ? "rotate-45" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === item.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                        <p className="pb-6 text-gray-600 leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer sticky */}
        <footer className="sticky bottom-0 z-0">
          <div className="relative overflow-hidden bg-[#0c0c1d]">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/20 rounded-full blur-[120px]" />
              <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-amber-600/15 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px]" />
            </div>
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none">
              <span className="text-[15vw] font-bold text-white/[0.03] tracking-tight leading-none translate-y-[20%]">KB-COM</span>
            </div>

            <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-8 md:pt-12 pb-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400">Prêt à gagner du temps ?</span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  Automatisons vos{" "}
                  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">processus ensemble</span>
                </h2>
                <p className="text-base text-gray-400 mb-5 max-w-xl mx-auto">Décrivez-nous vos tâches répétitives et recevez une proposition d&apos;automatisation personnalisée.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/contact" className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #f59e0b 100%)", boxShadow: "0 4px 20px rgba(249,115,22,0.4), inset 0 1px 1px rgba(255,255,255,0.2)" }}>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" style={{ height: "50%" }} />
                    <span className="relative font-semibold text-white">Demander un audit gratuit</span>
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-700 bg-white/5 backdrop-blur-sm text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-gray-600">Nous contacter</Link>
                </div>
              </motion.div>
            </div>

            <div className="relative z-10 mx-6 md:mx-12 lg:mx-20"><div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" /></div>

            <div className="relative z-10 px-6 md:px-12 lg:px-20 py-6 md:py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center"><span className="text-white font-bold text-base">K</span></div>
                    <span className="text-lg font-bold text-white">KB-COM</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">Agence web à Tours spécialisée en création de sites, SEO et automatisation.</p>
                  <div className="flex gap-2">
                    <a href="https://www.linkedin.com/in/kevin-boutant/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all" aria-label="LinkedIn"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    <a href="https://www.instagram.com/agence.kbcom/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-pink-500 transition-all" aria-label="Instagram"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
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
                    <li className="flex items-start gap-2"><svg className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg><span>Rue de Clocheville, 37000 Tours</span></li>
                    <li className="flex items-start gap-2"><svg className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg><a href="mailto:contact@kb-com.fr" className="hover:text-white transition-colors">contact@kb-com.fr</a></li>
                    <li className="flex items-start gap-2"><svg className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg><a href="tel:+33640631953" className="hover:text-white transition-colors">06 40 63 19 53</a></li>
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
