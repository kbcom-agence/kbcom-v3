'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedGradient } from '@/components/ui/AnimatedGradient';

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden px-4 pt-32 pb-16 md:px-8 md:pt-40 md:pb-20 lg:px-12 lg:pt-44 lg:pb-24">
      {/* Animated gradient background */}
      <AnimatedGradient />

      {/* Radial gradient overlay */}
      <div className="bg-radial-primary pointer-events-none absolute inset-0" />

      {/* Decorative elements - Cercles et arcs subtils */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Arc de cercle top left */}
        <motion.div
          className="absolute -top-20 -left-20 h-64 w-64 rounded-full border border-gray-200/40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        <motion.div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full border border-gray-200/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        {/* Arc de cercle top right */}
        <motion.div
          className="absolute -top-16 -right-24 h-72 w-72 rounded-full border border-gray-200/40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />

        {/* Gradient orbs */}
        <motion.div
          className="bg-primary/5 absolute top-1/4 left-1/6 h-72 w-72 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="bg-accent/5 absolute right-1/6 bottom-1/4 h-96 w-96 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Petits cercles décoratifs */}
        <motion.div
          className="bg-primary/20 absolute top-1/3 left-1/4 h-3 w-3 rounded-full"
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="bg-accent/30 absolute top-1/4 right-1/3 h-2 w-2 rounded-full"
          animate={{ y: [0, 10, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="bg-primary/25 absolute bottom-1/3 left-1/3 h-4 w-4 rounded-full"
          animate={{ y: [0, -15, 0], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="bg-accent/35 absolute right-1/4 bottom-1/4 h-2.5 w-2.5 rounded-full"
          animate={{ y: [0, 12, 0], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

        {/* Arc de cercle bottom right */}
        <motion.div
          className="absolute -right-28 -bottom-24 h-80 w-80 rounded-full border border-gray-200/35"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Badge SaaS - Clients satisfaits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="mb-10 flex justify-center"
        >
          <div className="border-primary/20 bg-primary/5 shadow-primary/5 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 shadow-lg backdrop-blur-sm">
            <div className="flex -space-x-2">
              <div className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600 shadow-md"></div>
              <div className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-violet-600 shadow-md"></div>
              <div className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-md"></div>
            </div>
            <span className="text-sm font-semibold text-gray-700">+70 clients satisfaits</span>
          </div>
        </motion.div>

        {/* Main Heading - Enhanced typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-glow mb-10 text-center text-5xl leading-[1.05] font-extrabold tracking-tight text-gray-900 md:text-7xl lg:text-8xl"
        >
          <span className="block">Sites Web</span>
          <span className="mt-2 block">
            <span className="text-gradient-animated inline-flex items-center gap-3">
              <span className="relative inline-block h-14 w-14 md:h-20 md:w-20 lg:h-24 lg:w-24">
                <span className="bg-primary/20 shadow-primary/20 absolute inset-0 rounded-2xl shadow-lg"></span>
                <span className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl">
                  💎
                </span>
              </span>
              Performants
            </span>
          </span>
          <span className="mt-2 block">
            pour{' '}
            <span className="relative inline-block">
              <span className="text-highlight">Startups & PME</span>
            </span>
          </span>
        </motion.h1>

        {/* Subheading with location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-gray-900/5 px-6 py-3 backdrop-blur-sm">
            <span className="text-lg font-medium text-gray-600">Agence basée à</span>
            <span className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xl shadow-sm">
                🇫🇷
              </span>
              Tours, France
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-14 max-w-3xl text-center font-sans text-xl leading-relaxed text-gray-600 md:text-2xl"
        >
          Nous créons des sites web{' '}
          <span className="font-semibold text-gray-900">ultra-rapides</span> et{' '}
          <span className="font-semibold text-gray-900">référencés</span> qui transforment vos
          visiteurs en clients — aucun compromis, aucun délai.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-5"
        >
          <Button href="/contact" variant="gradient" className="btn-shine px-8 py-4 text-base">
            Démarrer un Projet
          </Button>
          <Button href="/portfolio" variant="dark" icon={false} className="px-8 py-4 text-base">
            Voir Nos Réalisations
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs">
              ✓
            </span>
            <span>Devis sous 24h</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs">
              ✓
            </span>
            <span>100% satisfaction</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs">
              ✓
            </span>
            <span>Support réactif</span>
          </div>
        </motion.div>

        {/* SEO Keywords - Hidden but present */}
        <div className="sr-only">
          Agence web Tours, création site internet Tours, développement web Next.js, React, SEO
          référencement naturel, site vitrine, e-commerce, application web sur mesure
        </div>
      </div>
    </section>
  );
}
