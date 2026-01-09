'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedGradient } from '@/components/ui/AnimatedGradient';

export function Hero() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden px-4 pt-24 pb-4 md:px-8 md:pt-28 md:pb-6 lg:px-12">
      {/* Animated gradient background */}
      <AnimatedGradient />

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Badge SaaS - Clients satisfaits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="mb-6 flex justify-center"
        >
          <div className="border-primary/20 bg-primary/5 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
            <div className="flex -space-x-2">
              <div className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-violet-600"></div>
              <div className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-cyan-400 to-cyan-600"></div>
            </div>
            <span className="text-sm font-semibold text-gray-700">+70 clients satisfaits</span>
          </div>
        </motion.div>

        {/* Main Heading - Taille réduite */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 text-center font-['Cal_Sans',Inter,sans-serif] text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl"
        >
          Sites Web{' '}
          <span className="inline-flex items-center gap-2">
            <span className="relative inline-block h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20">
              <span className="bg-primary absolute inset-0 rounded-2xl"></span>
              <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl lg:text-5xl">
                💎
              </span>
            </span>
            <span className="text-primary">Performants</span>
          </span>
          <br />
          pour{' '}
          <span className="inline-flex items-center gap-2">
            <span className="relative inline-block h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20">
              <span className="bg-primary/20 absolute inset-0 rounded-2xl"></span>
              <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl lg:text-5xl">
                🚀
              </span>
            </span>
            Startups & PME
          </span>
          <br />
          basée à{' '}
          <span className="inline-flex items-center gap-2">
            Tours,
            <span className="relative inline-block h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20">
              <span className="bg-primary/10 absolute inset-0 rounded-2xl"></span>
              <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl lg:text-5xl">
                🇫🇷
              </span>
            </span>
            France
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-12 max-w-2xl text-center font-sans text-lg leading-relaxed text-gray-600 md:text-xl"
        >
          Nous créons des sites web ultra-rapides et référencés qui transforment vos visiteurs en
          clients —aucun compromis, aucun délai.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-0 flex flex-wrap justify-center gap-4"
        >
          <Button href="/contact" variant="gradient">
            Démarrer un Projet
          </Button>
          <Button href="/portfolio" variant="dark" icon={false}>
            Voir Nos Réalisations
          </Button>
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
