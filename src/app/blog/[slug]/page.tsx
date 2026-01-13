"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { articles, getArticleBySlug, categoryColors } from "@/data/articles";

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

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!article) {
    notFound();
  }

  // Autres articles (exclure l'actuel)
  const otherArticles = articles.filter(a => a.slug !== params.slug).slice(0, 4);
  const categoryStyle = categoryColors[article.category];

  const articleRef = useRef<HTMLElement>(null);

  // Progress bar
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Update progress percentage
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(Math.round(v * 100));
    setIsVisible(v > 0.05 && v < 0.95);
  });

  return (
    <article ref={articleRef} className="bg-[#0c0c1d]">
      {/* Progress Bar - Fixed at bottom */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 h-1 origin-left"
        style={{
          scaleX,
          background: categoryStyle.gradient,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Progress indicator */}
      <div
        className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: categoryStyle.gradient }}>
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-900">{progress}%</span>
          <span className="text-xs text-gray-500 ml-1">lu</span>
        </div>
      </div>

      {/* Wrapper pour l'effet sticky reveal */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-white">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${categoryStyle.color}10 0%, transparent 50%)`,
            }}
          />
          <div
            className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: categoryStyle.color }}
          />

          <div className="container-kb relative">
            <motion.div
              initial="hidden"
              animate="visible"
            >
              {/* Breadcrumb */}
              <motion.nav variants={fadeInUp} custom={0} className="mb-8">
                <ol className="flex items-center gap-2 text-sm text-gray-500">
                  <li><Link href="/" className="hover:text-gray-900 transition-colors">Accueil</Link></li>
                  <li>/</li>
                  <li><Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link></li>
                  <li>/</li>
                  <li className="text-gray-900 font-medium truncate max-w-[200px]">{article.title}</li>
                </ol>
              </motion.nav>

              {/* Category + Meta */}
              <motion.div variants={fadeInUp} custom={0.05} className="flex flex-wrap items-center gap-4 mb-6">
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                  style={{ background: categoryStyle.gradient }}
                >
                  {article.categoryLabel}
                </span>
                <span className="text-gray-500 text-sm">{article.readingTime} min de lecture</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 text-sm">
                  {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </motion.div>

              {/* Titre */}
              <motion.h1
                variants={fadeInUp}
                custom={0.1}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl"
              >
                {article.title}
                {article.titleAccent && (
                  <span style={{ color: categoryStyle.color }}>{article.titleAccent}</span>
                )}
              </motion.h1>

              {/* Excerpt */}
              <motion.p
                variants={fadeInUp}
                custom={0.15}
                className="mt-6 text-xl text-gray-600 max-w-3xl"
              >
                {article.excerpt}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Image principale */}
        <section className="relative z-10 -mt-8 pb-16 bg-white">
          <div className="container-kb">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ backgroundColor: categoryStyle.color }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/50 text-xl font-medium">Image de l'article</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contenu de l'article */}
        <section className="relative z-10 py-16 bg-white">
          <div className="container-kb">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="prose prose-lg prose-gray max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-ul:my-6 prose-li:text-gray-600
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100
                "
                dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>').replace(/## /g, '<h2>').replace(/### /g, '<h3>').replace(/<br\/><h/g, '</p><h').replace(/<br\/><br\/>/g, '</p><p>') }}
              />
            </div>
          </div>
        </section>

        {/* Carousel autres articles */}
        <section className="relative z-10 py-16 bg-gray-50">
          <div className="container-kb">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Autres <span className="font-playfair italic">articles</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherArticles.map((otherArticle) => {
                const otherStyle = categoryColors[otherArticle.category];
                return (
                  <Link
                    key={otherArticle.id}
                    href={`/blog/${otherArticle.slug}`}
                    className="group"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{ backgroundColor: otherStyle.color }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Contenu */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                            style={{ background: otherStyle.gradient }}
                          >
                            {otherArticle.categoryLabel}
                          </span>
                          <span className="text-xs text-gray-400">{otherArticle.readingTime} min</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm group-hover:text-gray-700 transition-colors">
                          {otherArticle.title}{otherArticle.titleAccent}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Lien vers tous les articles */}
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Voir tous les articles
              </Link>
            </div>
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
    </article>
  );
}
