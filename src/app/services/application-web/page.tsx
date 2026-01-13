"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

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

// Style de surlignage vert pour App Web
const highlightStyle = {
  backgroundImage: "linear-gradient(120deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0 88%",
  backgroundSize: "100% 40%",
  padding: "0 4px",
};

// Données FAQ Application Web
const faqItems = [
  {
    id: 1,
    question: "Quelle est la différence entre un site web et une application web ?",
    answer: (
      <>
        Un site web est principalement{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>informatif et statique</span>,
        tandis qu&apos;une application web est{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>interactive et dynamique</span>.
        Elle permet aux utilisateurs de créer, modifier et gérer des données (ex: dashboard, CRM, outil SaaS).
      </>
    ),
  },
  {
    id: 2,
    question: "Combien coûte le développement d'une application web ?",
    answer: (
      <>
        Le prix dépend de la complexité du projet. Une application simple démarre autour de{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>5 000€</span>,
        tandis qu&apos;une plateforme SaaS complète peut atteindre{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>50 000€ ou plus</span>.
        Nous vous fournissons un devis détaillé après analyse de vos besoins.
      </>
    ),
  },
  {
    id: 3,
    question: "Quelles technologies utilisez-vous ?",
    answer: (
      <>
        Nous travaillons avec les{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>technologies modernes</span> :
        React, Next.js, Node.js, PostgreSQL, et des outils no-code/low-code quand c&apos;est pertinent.
        Nous choisissons la stack la plus adaptée à vos besoins et votre budget.
      </>
    ),
  },
  {
    id: 4,
    question: "Proposez-vous de la maintenance après la livraison ?",
    answer: (
      <>
        Oui, nous proposons des{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>contrats de maintenance</span>{" "}
        pour assurer la sécurité, les mises à jour et l&apos;évolution de votre application.
        Nous restons votre partenaire technique sur le long terme.
      </>
    ),
  },
];

// Étapes du processus
const processSteps = [
  {
    number: "01",
    title: "Cadrage & Specs",
    description: (
      <>
        Analyse de vos besoins,{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>définition des fonctionnalités</span>{" "}
        et rédaction du cahier des charges technique.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design UX/UI",
    description: (
      <>
        Création des maquettes et{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>prototypes interactifs</span>.
        Validation de l&apos;expérience utilisateur avant développement.
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
    title: "Développement",
    description: (
      <>
        Développement{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>agile par sprints</span>{" "}
        avec des démos régulières. Code propre, testé et documenté.
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
    title: "Déploiement",
    description: (
      <>
        Mise en production,{" "}
        <span className="text-gray-900 font-semibold" style={highlightStyle}>formation et support</span>.
        Votre application est opérationnelle et sécurisée.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
  },
];

// Inclus dans l'offre
const included = [
  { text: "Cahier des charges", icon: "📋" },
  { text: "Design UX/UI sur mesure", icon: "🎨" },
  { text: "Développement React/Next.js", icon: "⚛️" },
  { text: "Base de données sécurisée", icon: "🔒" },
  { text: "Hébergement optimisé", icon: "☁️" },
  { text: "Formation & documentation", icon: "📚" },
];

// Avis clients
const avisClients = [
  {
    id: 1,
    name: "Antoine Lefevre",
    company: "Startup FinTech - Paris",
    avatar: "AL",
    text: "KB-COM a développé notre dashboard client en 3 mois. L'interface est fluide et nos utilisateurs adorent. Un travail de pro !",
    rating: 5,
  },
  {
    id: 2,
    name: "Céline Moreau",
    company: "Agence RH - Lyon",
    avatar: "CM",
    text: "Notre outil de gestion interne nous fait gagner des heures chaque semaine. L'investissement a été rentabilisé en 6 mois.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marc Durand",
    company: "E-commerce B2B",
    avatar: "MD",
    text: "La plateforme de commandes qu'ils ont créée a révolutionné notre relation client. Interface intuitive et performante.",
    rating: 5,
  },
  {
    id: 4,
    name: "Julie Petit",
    company: "Cabinet Médical",
    avatar: "JP",
    text: "Notre système de prise de rendez-vous en ligne fonctionne parfaitement. Patients et équipe sont ravis !",
    rating: 5,
  },
  {
    id: 5,
    name: "François Roux",
    company: "Industrie - Nantes",
    avatar: "FR",
    text: "L'application de suivi de production nous donne une visibilité totale sur nos process. Excellent travail technique.",
    rating: 5,
  },
  {
    id: 6,
    name: "Nathalie Simon",
    company: "Association Sportive",
    avatar: "NS",
    text: "Gestion des adhérents, inscriptions, paiements... Tout est centralisé et simple à utiliser. Merci KB-COM !",
    rating: 5,
  },
];

export default function ApplicationWeb() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const processLineRef = useRef<HTMLDivElement>(null);
  const isProcessInView = useInView(processLineRef, { once: true, margin: "-100px" });

  const faqSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: faqProgress } = useScroll({
    target: faqSectionRef,
    offset: ["start end", "end start"]
  });
  const faqPathLength = useTransform(faqProgress, [0.1, 0.9], [0, 1]);

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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-400/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-400/15 rounded-full blur-[80px]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 container mx-auto max-w-6xl text-center px-4">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-emerald-200 bg-emerald-50/50 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-600">
              Développement sur mesure • Basés à Tours
            </span>
          </motion.div>

          <motion.h1
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-5xl mx-auto text-gray-900"
          >
            Développement{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Application Web
            </span>
            <br />
            <span className="font-playfair italic text-[0.95em] font-bold text-gray-900">
              Des outils métier qui transforment votre activité.
            </span>
          </motion.h1>

          <motion.p
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Dashboard, SaaS, CRM, plateforme de gestion...{" "}
            <span className="text-gray-900 font-semibold" style={highlightStyle}>Applications web sur mesure</span>{" "}
            pour digitaliser vos processus et{" "}
            <span className="text-gray-900 font-semibold" style={highlightStyle}>booster votre productivité</span>.
          </motion.p>

          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="flex flex-wrap justify-center gap-8 mb-10"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">+30</div>
              <div className="text-sm text-gray-600">Apps déployées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">99.9%</div>
              <div className="text-sm text-gray-600">Uptime garanti</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">React</div>
              <div className="text-sm text-gray-600">Stack moderne</div>
            </div>
          </motion.div>

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
                background: "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)",
                boxShadow: `
                  0 1px 2px rgba(0,0,0,0.1),
                  0 4px 8px rgba(16,185,129,0.3),
                  0 8px 16px rgba(20,184,166,0.2),
                  inset 0 1px 1px rgba(255,255,255,0.4),
                  inset 0 -1px 1px rgba(0,0,0,0.1)
                `,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent opacity-100" style={{ height: "50%" }} />
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.8)_0%,transparent_50%)]" />
              <span className="relative font-semibold text-white drop-shadow-sm flex items-center gap-2">
                Discuter de mon projet
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
              <span className="relative font-semibold text-gray-700">Voir nos réalisations</span>
            </Link>
          </motion.div>

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

      {/* Section Types d'applications */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/50 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-50/50 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
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
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-emerald-200 bg-emerald-50/50 text-emerald-600"
            >
              Types de projets
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Quel type d&apos;application{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">développer ?</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Dashboard & Analytics",
                desc: "Tableaux de bord personnalisés pour visualiser vos KPIs, suivre vos performances et prendre des décisions éclairées en temps réel.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              },
              {
                title: "SaaS & Plateformes",
                desc: "Applications cloud multi-utilisateurs avec gestion des abonnements, facturation automatique et espace client sécurisé.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              },
              {
                title: "Outils Métier & CRM",
                desc: "Applications de gestion sur mesure : suivi clients, gestion de projets, facturation, stocks... Adaptées à vos process.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                custom={0.1 + index * 0.1}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-emerald-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div
                  className="relative p-8 rounded-3xl border border-white/50 h-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 8px 32px rgba(16,185,129,0.1)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 via-transparent to-teal-100/20 rounded-3xl pointer-events-none" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/30">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {item.icon}
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Productivité - FULL WIDTH PARALLAX DARK */}
      <section ref={pricingSectionRef} className="relative py-0 overflow-hidden">
        {/* Background avec parallax */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950"
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
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/30 rounded-full blur-[150px]"
          style={{ y: useTransform(pricingProgress, [0, 1], [-100, 100]) }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/30 rounded-full blur-[120px]"
          style={{ y: useTransform(pricingProgress, [0, 1], [100, -100]) }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[180px]"
          style={{ scale: useTransform(pricingProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]) }}
        />

        {/* Lignes décoratives animées */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.line
            x1="0%" y1="20%" x2="100%" y2="80%"
            stroke="url(#lineGradientGreen1)"
            strokeWidth="1"
            style={{ pathLength: useTransform(pricingProgress, [0.2, 0.8], [0, 1]) }}
          />
          <motion.line
            x1="100%" y1="10%" x2="0%" y2="90%"
            stroke="url(#lineGradientGreen2)"
            strokeWidth="1"
            style={{ pathLength: useTransform(pricingProgress, [0.3, 0.9], [0, 1]) }}
          />
          <defs>
            <linearGradient id="lineGradientGreen1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16,185,129,0)" />
              <stop offset="50%" stopColor="rgba(16,185,129,0.5)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0)" />
            </linearGradient>
            <linearGradient id="lineGradientGreen2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(20,184,166,0)" />
              <stop offset="50%" stopColor="rgba(20,184,166,0.5)" />
              <stop offset="100%" stopColor="rgba(20,184,166,0)" />
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
                className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-sm text-emerald-300"
              >
                🚀 Impact moyen constaté
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Productivité multipliée par
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
                  className="text-8xl md:text-[10rem] lg:text-[12rem] font-bold bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent"
                  style={{ textShadow: "0 0 80px rgba(16,185,129,0.5)" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  x3
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto"
              >
                Avec des outils métier adaptés à vos processus.{" "}
                <span className="text-white font-semibold">ROI mesurable dès les premiers mois.</span>
              </motion.p>
            </motion.div>

            {/* Grille des inclusions */}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                href="/contact"
                className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)",
                  boxShadow: "0 0 40px rgba(16,185,129,0.5), 0 4px 20px rgba(20,184,166,0.3), inset 0 1px 1px rgba(255,255,255,0.3)",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-100" style={{ height: "50%" }} />
                <span className="relative text-lg font-semibold text-white drop-shadow-sm flex items-center gap-3">
                  Discuter de mon projet
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
                Consultation gratuite • Sans engagement • Réponse sous 24h
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

      {/* Section Processus */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} custom={0} className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-emerald-200 bg-emerald-50/50 text-emerald-600">
              Notre méthode
            </motion.span>
            <motion.h2 variants={fadeInUp} custom={0.1} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Du concept au{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">déploiement.</span>
            </motion.h2>
          </motion.div>

          <div ref={processLineRef} className="relative">
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
                  const colors = [
                    { border: "#10b981", text: "#10b981" },
                    { border: "#14b8a6", text: "#14b8a6" },
                    { border: "#06b6d4", text: "#06b6d4" },
                    { border: "#0891b2", text: "#0891b2" },
                  ][index];
                  return (
                    <div key={step.number} className="relative z-10 flex flex-col items-center">
                      <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold bg-white border-4"
                        initial={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
                        animate={{ borderColor: isProcessInView ? colors.border : "#e5e7eb", color: isProcessInView ? colors.text : "#9ca3af" }}
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => {
                const gradient = [
                  { from: "from-emerald-500", to: "to-teal-600", shadow: "shadow-emerald-500/20", aura: "from-emerald-400/30 to-teal-500/20" },
                  { from: "from-teal-500", to: "to-cyan-600", shadow: "shadow-teal-500/20", aura: "from-teal-400/30 to-cyan-500/20" },
                  { from: "from-cyan-500", to: "to-emerald-600", shadow: "shadow-cyan-500/20", aura: "from-cyan-400/30 to-emerald-500/20" },
                  { from: "from-emerald-500", to: "to-green-600", shadow: "shadow-emerald-500/20", aura: "from-emerald-400/30 to-green-500/20" },
                ][index];
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

      {/* Section Ce qui est inclus */}
      <section ref={pricingSectionRef} className="relative py-0 overflow-hidden">
        <motion.div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950" style={{ y: bgY }} />
        <div className="absolute inset-0 overflow-hidden">
          <motion.div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        </div>
        <motion.div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/30 rounded-full blur-[150px]" style={{ y: useTransform(pricingProgress, [0, 1], [-100, 100]) }} />
        <motion.div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/30 rounded-full blur-[120px]" style={{ y: useTransform(pricingProgress, [0, 1], [100, -100]) }} />

        <div className="relative z-10 py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
              <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-sm text-emerald-300">
                Notre offre
              </motion.span>
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Ce qui est inclus
              </motion.h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {included.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }} whileHover={{ scale: 1.05, y: -5 }} className="group relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl mb-2 block">{item.icon}</span>
                  <span className="text-xs text-gray-300 leading-tight block relative z-10">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }} className="text-center">
              <Link href="/contact" className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" style={{ background: "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)", boxShadow: "0 0 40px rgba(16,185,129,0.5), 0 4px 20px rgba(20,184,166,0.3), inset 0 1px 1px rgba(255,255,255,0.3)" }}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-100" style={{ height: "50%" }} />
                <span className="relative text-lg font-semibold text-white drop-shadow-sm flex items-center gap-3">
                  Demander un devis gratuit
                  <motion.svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
              </Link>
              <p className="text-sm text-gray-500 mt-4">Devis gratuit • Sans engagement • Réponse sous 24h</p>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-12 px-4">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-emerald-200 bg-emerald-50/50 text-emerald-600">Témoignages</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ils nous ont fait{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 bg-clip-text text-transparent">confiance.</span>
          </h2>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 mt-4 rounded-full bg-white border border-gray-200 shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
            <span className="text-sm font-semibold text-gray-700">5/5 sur Google</span>
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />

          <div className="mb-6 overflow-hidden">
            <motion.div animate={{ x: [0, -2000] }} transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" } }} className="flex gap-6">
              {[...avisClients, ...avisClients, ...avisClients].map((avis, index) => (
                <div key={`row1-${avis.id}-${index}`} className="flex-shrink-0 w-[350px] p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{avis.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{avis.name}</p>
                      <p className="text-xs text-gray-500">{avis.company}</p>
                    </div>
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{avis.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{avis.name}</p>
                      <p className="text-xs text-gray-500">{avis.company}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">{[...Array(avis.rating)].map((_, i) => (<svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{avis.text}&rdquo;</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Réalisations Applications */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div initial={{ y: 0 }} whileInView={{ y: -30 }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px]" />
          <motion.div initial={{ y: 0 }} whileInView={{ y: 40 }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className="absolute top-1/4 -right-32 w-[350px] h-[350px] bg-teal-400/10 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-20">
            <motion.div variants={blurReveal} custom={0} className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full border border-emerald-200/50 bg-white/80 backdrop-blur-sm shadow-sm">
              <motion.span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-sm font-medium text-emerald-600">Portfolio</span>
            </motion.div>
            <motion.h2 variants={blurReveal} custom={0.1} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Applications{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">livrées</span>
            </motion.h2>
            <motion.p variants={blurReveal} custom={0.2} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Des applications sur mesure qui{" "}
              <span className="text-gray-900 font-medium" style={highlightStyle}>transforment les métiers</span>.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { title: "Dashboard Logistique", metier: "Transport & Logistique", ville: "Paris", type: "SaaS", tech: "React + Node.js" },
              { title: "CRM Immobilier", metier: "Agence immobilière", ville: "Tours (37)", type: "Application métier", tech: "Next.js + PostgreSQL" },
              { title: "Plateforme E-learning", metier: "Formation professionnelle", ville: "Lyon", type: "Plateforme web", tech: "React + Firebase" },
            ].map((realisation, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: index * 0.15 }} className="group relative">
                <motion.div className="absolute -inset-4 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(20, 184, 166, 0.1))", filter: "blur(30px)" }} />
                <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="relative rounded-[1.5rem] overflow-hidden bg-white border border-gray-100 shadow-xl shadow-gray-200/50">
                  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                      <span className="text-xs font-medium text-gray-600">{realisation.type}</span>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">{realisation.tech}</span>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/30">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{realisation.title}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">{realisation.title}</h3>
                        <p className="text-sm text-gray-500">{realisation.metier}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {realisation.ville}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="text-center mt-16">
            <Link href="/realisations" className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" style={{ background: "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)", boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3), 0 10px 40px rgba(20, 184, 166, 0.2)" }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent" style={{ height: "50%" }} />
              <span className="relative font-semibold text-white drop-shadow-sm flex items-center gap-2">
                Voir toutes nos réalisations
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section SEO Local - Développement Application Web */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-4xl mx-auto text-center">
            <motion.span variants={blurReveal} custom={0} className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-emerald-200 bg-emerald-50/50 text-emerald-600">Agence de développement</motion.span>
            <motion.h2 variants={blurReveal} custom={0.1} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Développement d&apos;applications web{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">sur mesure</span>
            </motion.h2>
            <motion.p variants={blurReveal} custom={0.2} className="text-lg text-gray-600 leading-relaxed mb-8">
              Notre agence de{" "}
              <span className="text-gray-900 font-semibold" style={highlightStyle}>développement web</span>{" "}
              basée à Tours conçoit des <strong>applications web sur mesure</strong> pour les entreprises de toute la France.
              Que vous ayez besoin d&apos;un <strong>SaaS</strong>, d&apos;un <strong>dashboard métier</strong>, d&apos;une <strong>plateforme collaborative</strong>
              ou d&apos;un <strong>outil de gestion interne</strong>, nous transformons vos idées en solutions digitales performantes.
            </motion.p>
            <motion.p variants={blurReveal} custom={0.3} className="text-gray-600 leading-relaxed mb-8">
              En tant qu&apos;experts en{" "}
              <span className="text-gray-900 font-semibold" style={highlightStyle}>React, Next.js et Node.js</span>,
              nous développons des applications <strong>rapides</strong>, <strong>sécurisées</strong> et <strong>évolutives</strong>.
              Nous accompagnons nos clients de <strong>Tours</strong>, <strong>Paris</strong>, <strong>Lyon</strong>, <strong>Bordeaux</strong>
              {" "}et partout en France dans leur <strong>transformation digitale</strong>.
              <br /><br />
              Besoin d&apos;une{" "}
              <span className="text-gray-900 font-semibold" style={highlightStyle}>application web professionnelle</span>
              {" "}? Contactez notre équipe pour un{" "}
              <strong>devis gratuit</strong> et découvrez comment nous pouvons{" "}
              <span className="text-gray-900 font-semibold" style={highlightStyle}>digitaliser vos processus métier</span>.
            </motion.p>
            <motion.div variants={blurReveal} custom={0.4} className="flex flex-wrap justify-center gap-2">
              {["React.js", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "API REST", "SaaS"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full text-sm text-gray-600 border border-white/60 hover:border-emerald-300 hover:text-emerald-600 transition-all cursor-default" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)", backdropFilter: "blur(10px)", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>{tag}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wrapper FAQ + Footer */}
      <div className="relative">
        <section ref={faqSectionRef} className="relative z-10 py-24 bg-gray-50 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute -left-20 -top-40 w-[700px] h-[1200px]" viewBox="0 0 700 1200" fill="none">
              <defs>
                <linearGradient id="fadeLeftGrayApp" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#d1d5db" stopOpacity="0" /><stop offset="10%" stopColor="#d1d5db" stopOpacity="1" /><stop offset="90%" stopColor="#d1d5db" stopOpacity="1" /><stop offset="100%" stopColor="#d1d5db" stopOpacity="0" /></linearGradient>
                <linearGradient id="fadeLeftEmerald" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#10b981" stopOpacity="0" /><stop offset="10%" stopColor="#10b981" stopOpacity="1" /><stop offset="90%" stopColor="#10b981" stopOpacity="1" /><stop offset="100%" stopColor="#10b981" stopOpacity="0" /></linearGradient>
              </defs>
              <path d="M500 -100C500 -100 150 100 200 280C250 460 80 520 180 720C280 920 450 1000 650 1300" stroke="url(#fadeLeftGrayApp)" strokeWidth="2" fill="none" opacity="0.15" />
              <motion.path d="M500 -100C500 -100 150 100 200 280C250 460 80 520 180 720C280 920 450 1000 650 1300" stroke="url(#fadeLeftEmerald)" strokeWidth="2" fill="none" style={{ pathLength: faqPathLength }} opacity="0.6" />
            </svg>
            <svg className="absolute -right-20 top-20 w-[650px] h-[1100px]" viewBox="0 0 650 1100" fill="none">
              <defs>
                <linearGradient id="fadeRightGrayApp" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#d1d5db" stopOpacity="0" /><stop offset="10%" stopColor="#d1d5db" stopOpacity="1" /><stop offset="90%" stopColor="#d1d5db" stopOpacity="1" /><stop offset="100%" stopColor="#d1d5db" stopOpacity="0" /></linearGradient>
                <linearGradient id="fadeRightTeal" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#14b8a6" stopOpacity="0" /><stop offset="10%" stopColor="#14b8a6" stopOpacity="1" /><stop offset="90%" stopColor="#14b8a6" stopOpacity="1" /><stop offset="100%" stopColor="#14b8a6" stopOpacity="0" /></linearGradient>
              </defs>
              <path d="M150 -50C150 -50 500 100 420 300C340 500 550 600 450 800C350 1000 150 1050 -50 1150" stroke="url(#fadeRightGrayApp)" strokeWidth="2" fill="none" opacity="0.15" />
              <motion.path d="M150 -50C150 -50 500 100 420 300C340 500 550 600 450 800C350 1000 150 1050 -50 1150" stroke="url(#fadeRightTeal)" strokeWidth="2" fill="none" style={{ pathLength: faqPathLength }} opacity="0.6" />
            </svg>
          </div>

          <div className="container mx-auto max-w-4xl px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-emerald-200 bg-emerald-50/50 text-emerald-600">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Questions{" "}
                <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 bg-clip-text text-transparent">fréquentes.</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Retrouvez les{" "}
                <motion.span initial={{ backgroundSize: "0% 40%" }} whileInView={{ backgroundSize: "100% 40%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="text-gray-900 font-semibold" style={{ backgroundImage: "linear-gradient(90deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2))", backgroundRepeat: "no-repeat", backgroundPosition: "0 85%" }}>
                  réponses à vos questions
                </motion.span>{" "}
                sur le développement d&apos;applications web.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-3xl mx-auto">
              {faqItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                  <button onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)} className="w-full py-6 flex items-center justify-between gap-4 text-left group">
                    <span className="text-lg font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">{item.question}</span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-50 transition-colors">
                      <svg className={`w-4 h-4 text-gray-500 group-hover:text-emerald-600 transition-transform duration-300 ${openFaq === item.id ? "rotate-45" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
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

        <footer className="sticky bottom-0 z-0">
          <div className="relative overflow-hidden bg-[#0c0c1d]">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 rounded-full blur-[120px]" />
              <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-teal-600/15 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px]" />
            </div>
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none">
              <span className="text-[15vw] font-bold text-white/[0.03] tracking-tight leading-none translate-y-[20%]">KB-COM</span>
            </div>

            <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-8 md:pt-12 pb-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">Prêt à lancer votre projet ?</span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  Créons votre{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">application sur mesure</span>
                </h2>
                <p className="text-base text-gray-400 mb-5 max-w-xl mx-auto">Discutons de vos besoins et obtenez un devis personnalisé pour votre application web.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/contact" className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" style={{ background: "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)", boxShadow: "0 4px 20px rgba(16,185,129,0.4), inset 0 1px 1px rgba(255,255,255,0.2)" }}>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" style={{ height: "50%" }} />
                    <span className="relative font-semibold text-white">Demander un devis</span>
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
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"><span className="text-white font-bold text-base">K</span></div>
                    <span className="text-lg font-bold text-white">KB-COM</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">Agence web à Tours spécialisée en création de sites, SEO et automatisation.</p>
                  <div className="flex gap-2">
                    <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-gray-700 transition-all"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                    <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-gray-700 transition-all"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-gray-700 transition-all"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                  </div>
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
                    <li className="flex items-start gap-2"><svg className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg><span>Tours, France</span></li>
                    <li className="flex items-start gap-2"><svg className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg><span>contact@kb-com.fr</span></li>
                    <li className="flex items-start gap-2"><svg className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg><span>02 47 XX XX XX</span></li>
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
