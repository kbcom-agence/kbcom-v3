"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { articles, categoryColors, type Article } from "@/data/articles";

// Animation variants
const blurReveal = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// Filtres
const filters = [
  { id: "all", label: "Tous", color: "#6B7280", gradient: "linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)" },
  { id: "web", label: "Développement", color: "#3B82F6", gradient: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)" },
  { id: "seo", label: "SEO", color: "#EC4899", gradient: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)" },
  { id: "automation", label: "Automatisation", color: "#F97316", gradient: "linear-gradient(135deg, #F97316 0%, #FBBF24 100%)" },
  { id: "business", label: "Business", color: "#10B981", gradient: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)" },
];

// Composant carte article
function ArticleCard({ article }: { article: Article }) {
  const categoryStyle = categoryColors[article.category];

  return (
    <motion.article variants={cardVariant} className="group">
      <Link href={`/blog/${article.slug}`}>
        <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundColor: categoryStyle.color }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/30 text-lg font-medium">Image article</span>
              </div>
            </div>
            {/* Overlay au hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Contenu */}
          <div className="p-6">
            {/* Category + Reading time */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ background: categoryStyle.gradient }}
              >
                {article.categoryLabel}
              </span>
              <span className="text-sm text-gray-400">{article.readingTime} min de lecture</span>
            </div>

            {/* Titre */}
            <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
              {article.title}
              {article.titleAccent && (
                <span style={{ color: categoryStyle.color }}>{article.titleAccent}</span>
              )}
            </h2>

            {/* Excerpt */}
            <p className="mt-3 text-gray-600 text-sm line-clamp-2">
              {article.excerpt}
            </p>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Article mis en avant
function FeaturedArticle({ article }: { article: Article }) {
  const categoryStyle = categoryColors[article.category];

  return (
    <motion.article
      variants={blurReveal}
      custom={0.2}
      className="group"
    >
      <Link href={`/blog/${article.slug}`}>
        <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ backgroundColor: categoryStyle.color }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/40 text-xl font-medium">Image article</span>
                </div>
              </div>
              {/* Badge Featured */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg">
                  Article vedette
                </span>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              {/* Category */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                  style={{ background: categoryStyle.gradient }}
                >
                  {article.categoryLabel}
                </span>
                <span className="text-sm text-gray-400">{article.readingTime} min</span>
              </div>

              {/* Titre */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {article.title}
                {article.titleAccent && (
                  <span style={{ color: categoryStyle.color }}>{article.titleAccent}</span>
                )}
              </h2>

              {/* Excerpt */}
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                {article.excerpt}
              </p>

              {/* Date + CTA */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white transition-all duration-300 group-hover:scale-105"
                  style={{ background: categoryStyle.gradient }}
                >
                  Lire l'article
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  // Filtrer les articles
  const filteredArticles = activeFilter === "all"
    ? articles
    : articles.filter(a => a.category === activeFilter);

  // Article vedette (premier featured)
  const featuredArticle = articles.find(a => a.featured);

  return (
    <div className="bg-[#0c0c1d]">
      {/* Wrapper pour l'effet sticky reveal */}
      <div className="relative">
        {/* Hero Section */}
        <section ref={heroRef} className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-gray-50 pt-32 pb-16">
          {/* Auras de couleur */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-pink-400/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-400/15 rounded-full blur-[80px]" />
          </div>

          {/* Grille décorative */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />

          <div className="container-kb relative z-10 text-center">
            {/* Badge */}
            <motion.div
              variants={blurReveal}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              custom={0}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Nouveaux articles chaque semaine</span>
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h1
              variants={blurReveal}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              custom={0.1}
              className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
            >
              Notre{" "}
              <span className="font-playfair italic bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                blog
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              custom={0.2}
              className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Conseils, guides et actualités sur le développement web, le SEO et l'automatisation pour développer votre activité en ligne.
            </motion.p>
          </div>
        </section>

        {/* Article vedette */}
        {featuredArticle && (
          <section className="relative z-10 py-12 bg-white">
            <div className="container-kb">
              <motion.div
                initial="hidden"
                animate={isHeroInView ? "visible" : "hidden"}
              >
                <FeaturedArticle article={featuredArticle} />
              </motion.div>
            </div>
          </section>
        )}

        {/* Filtres + Grille */}
        <section ref={gridRef} className="relative z-10 py-16 bg-white">
          <div className="container-kb">
            {/* Filtres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isGridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeFilter === filter.id
                      ? "text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{
                    background: activeFilter === filter.id ? filter.gradient : undefined,
                    boxShadow: activeFilter === filter.id ? `0 4px 14px ${filter.color}40` : undefined,
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>

            {/* Grille d'articles */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isGridInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles
                .filter(a => !a.featured || activeFilter !== "all")
                .map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
            </motion.div>

            {/* Message si aucun résultat */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500">Aucun article dans cette catégorie pour le moment.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* CTA + Footer */}
      <footer className="sticky bottom-0 z-0">
        <div className="relative overflow-hidden">
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
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-gray-700 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-gray-700 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
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
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Tours, France
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contact@kb-com.fr
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="relative z-10 px-6 md:px-12 lg:px-20 py-4 border-t border-gray-800/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
              <p>© 2024 KB-COM. Tous droits réservés.</p>
              <div className="flex gap-4">
                <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
                <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
