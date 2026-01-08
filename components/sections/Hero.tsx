'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="gradient-hero relative min-h-screen overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="bg-accent-light/20 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
              Agence Web Basée à Tours
            </motion.div>

            {/* Main title with font variations */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="mb-8 text-5xl leading-[1.1] font-black tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Votre Site Web
              <br />
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent italic">
                Performant
              </span>{' '}
              & <span className="font-bold">Référencé</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl"
            >
              Nous créons des sites web modernes et ultra-rapides qui propulsent votre business au
              top de Google. Experts Next.js, React et SEO basés à Tours.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              {/* Primary CTA */}
              <Link
                href="/contact"
                className="group text-primary inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/20"
              >
                Demander un Devis Gratuit
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 rounded-2xl border-2 border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10"
              >
                Voir Nos Réalisations
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/70"
            >
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">5+ Années d&apos;Expérience</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">50+ Projets Réalisés</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Réponse en 24h</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}
