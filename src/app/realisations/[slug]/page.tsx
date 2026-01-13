"use client";

import { useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { realisations, getRealisationBySlug } from "@/data/realisations";

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

export default function RealisationDetailPage({ params }: { params: { slug: string } }) {
  const realisation = getRealisationBySlug(params.slug);

  if (!realisation) {
    notFound();
  }

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" });

  // Parallax pour le hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  // Trouver les projets suivant/précédent
  const currentIndex = realisations.findIndex(r => r.slug === params.slug);
  const prevProject = currentIndex > 0 ? realisations[currentIndex - 1] : null;
  const nextProject = currentIndex < realisations.length - 1 ? realisations[currentIndex + 1] : null;

  return (
    <main className="bg-[#0c0c1d]">
      {/* Wrapper pour l'effet sticky reveal */}
      <div className="relative">
        {/* Hero Section */}
        <section ref={heroRef} className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white">
        {/* Background avec couleur du projet */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${realisation.color}15 0%, transparent 50%)`,
            y: heroY,
          }}
        />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: realisation.color }}
        />

        <div className="container-kb relative">
          <motion.div
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
          >
            {/* Breadcrumb */}
            <motion.nav variants={fadeInUp} custom={0} className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-900 transition-colors">Accueil</Link></li>
                <li>/</li>
                <li><Link href="/realisations" className="hover:text-gray-900 transition-colors">Réalisations</Link></li>
                <li>/</li>
                <li className="text-gray-900 font-medium">{realisation.client}</li>
              </ol>
            </motion.nav>

            {/* Badge */}
            <motion.div variants={fadeInUp} custom={0.05}>
              <span
                className="inline-flex px-4 py-1.5 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: realisation.color }}
              >
                {realisation.tags[0]}
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h1
              variants={fadeInUp}
              custom={0.1}
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
            >
              {realisation.name}
              {realisation.nameAccent && (
                <span style={{ color: realisation.accentColor }}>{realisation.nameAccent}</span>
              )}
            </motion.h1>

            {/* Description courte */}
            <motion.p
              variants={fadeInUp}
              custom={0.15}
              className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl"
            >
              {realisation.shortDescription}
            </motion.p>

            {/* Métas */}
            <motion.div
              variants={fadeInUp}
              custom={0.2}
              className="mt-10 flex flex-wrap gap-8"
            >
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Client</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{realisation.client}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Secteur</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{realisation.industry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Année</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{realisation.year}</p>
              </div>
              {realisation.url && (
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Site</p>
                  <a
                    href={realisation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-lg font-medium hover:underline flex items-center gap-1"
                    style={{ color: realisation.color }}
                  >
                    Visiter
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Image principale */}
      <section className="relative z-10 -mt-10 pb-20 bg-white">
        <div className="container-kb">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Placeholder image */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{ backgroundColor: realisation.color }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/50 text-xl font-medium">Image du projet</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal avec Sidebar Sticky */}
      <section ref={contentRef} className="relative z-10 py-20 bg-white">
        <div className="container-kb">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Colonne principale - Scrollable */}
            <div className="lg:col-span-2 space-y-16">
              {/* Contexte */}
              <motion.div
                initial="hidden"
                animate={isContentInView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={fadeInUp}
                  custom={0}
                  className="text-2xl md:text-3xl font-bold text-gray-900"
                >
                  Le projet
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  custom={0.1}
                  className="mt-4 text-lg text-gray-600 leading-relaxed"
                >
                  {realisation.fullDescription}
                </motion.p>
              </motion.div>

              {/* Défi */}
              <motion.div
                initial="hidden"
                animate={isContentInView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={fadeInUp}
                  custom={0.15}
                  className="text-2xl md:text-3xl font-bold text-gray-900"
                >
                  Le défi
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  custom={0.2}
                  className="mt-4 text-lg text-gray-600 leading-relaxed"
                >
                  {realisation.challenge}
                </motion.p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial="hidden"
                animate={isContentInView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={fadeInUp}
                  custom={0.25}
                  className="text-2xl md:text-3xl font-bold text-gray-900"
                >
                  Notre solution
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  custom={0.3}
                  className="mt-4 text-lg text-gray-600 leading-relaxed"
                >
                  {realisation.solution}
                </motion.p>
              </motion.div>

              {/* Témoignage */}
              {realisation.testimonial && (
                <motion.div
                  initial="hidden"
                  animate={isContentInView ? "visible" : "hidden"}
                >
                  <motion.div
                    variants={fadeInUp}
                    custom={0.35}
                    className="p-8 rounded-3xl bg-gray-50 border border-gray-100"
                  >
                    <svg className="w-12 h-12 text-gray-200 mb-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="text-xl md:text-2xl text-gray-700 italic leading-relaxed">
                      &ldquo;{realisation.testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="mt-6 flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: realisation.color }}
                      >
                        {realisation.testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{realisation.testimonial.author}</p>
                        <p className="text-sm text-gray-500">{realisation.testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Sticky */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32 space-y-6">
                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="p-6 rounded-2xl bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {realisation.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="p-6 rounded-2xl bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {realisation.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium text-white"
                        style={{ backgroundColor: realisation.color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation projets */}
      <section className="relative z-10 py-12 border-t border-gray-100 bg-white">
        <div className="container-kb">
          <div className="flex items-center justify-between">
            {/* Projet précédent */}
            {prevProject ? (
              <Link
                href={`/realisations/${prevProject.slug}`}
                className="group flex items-center gap-4 p-4 -m-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Projet précédent</p>
                  <p className="font-semibold text-gray-900">
                    {prevProject.name}
                    {prevProject.nameAccent && (
                      <span style={{ color: prevProject.accentColor }}>{prevProject.nameAccent}</span>
                    )}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* Retour liste */}
            <Link
              href="/realisations"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Tous les projets
            </Link>

            {/* Projet suivant */}
            {nextProject ? (
              <Link
                href={`/realisations/${nextProject.slug}`}
                className="group flex items-center gap-4 p-4 -m-4 rounded-xl hover:bg-gray-50 transition-colors text-right"
              >
                <div>
                  <p className="text-sm text-gray-500">Projet suivant</p>
                  <p className="font-semibold text-gray-900">
                    {nextProject.name}
                    {nextProject.nameAccent && (
                      <span style={{ color: nextProject.accentColor }}>{nextProject.nameAccent}</span>
                    )}
                  </p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
      </div>

      {/* CTA + Footer - Style Homepage avec effet sticky reveal */}
      <footer className="sticky bottom-0 z-0">
        <div className="relative overflow-hidden">
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
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-gray-700 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-gray-700 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-semibold mb-3">Services</h4>
                <ul className="space-y-2">
                  <li><Link href="/services/creation-site-internet" className="text-gray-400 hover:text-white transition-colors text-sm">Création de sites</Link></li>
                  <li><Link href="/services/agence-seo" className="text-gray-400 hover:text-white transition-colors text-sm">Référencement SEO</Link></li>
                  <li><Link href="/services/application-web" className="text-gray-400 hover:text-white transition-colors text-sm">Applications web</Link></li>
                  <li><Link href="/services/automatisation" className="text-gray-400 hover:text-white transition-colors text-sm">Automatisation</Link></li>
                </ul>
              </div>

              {/* Entreprise */}
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
    </main>
  );
}
