'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative flex flex-col justify-center bg-white px-4 pt-8 pb-4 md:px-8 md:pt-12 md:pb-6 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center justify-center gap-3"
        >
          <div className="flex -space-x-2">
            <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-300"></div>
            <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-400"></div>
            <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-500"></div>
          </div>
          <span className="text-sm font-medium text-gray-600">Trusted by 40+ clients</span>
        </motion.div>

        {/* Main Heading - Style minimaliste avec emojis */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 text-center font-['Cal_Sans',Inter,sans-serif] text-5xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-7xl lg:text-8xl"
        >
          Sites Web{' '}
          <span className="inline-flex items-center gap-3">
            <span className="relative inline-block h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
              <span className="bg-primary absolute inset-0 rounded-2xl"></span>
              <span className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl">
                💎
              </span>
            </span>
            <span className="text-primary">Performants</span>
          </span>
          <br />
          pour{' '}
          <span className="inline-flex items-center gap-3">
            <span className="relative inline-block h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
              <span className="bg-primary/20 absolute inset-0 rounded-2xl"></span>
              <span className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl">
                🚀
              </span>
            </span>
            Startups & PME
          </span>
          <br />
          basée à{' '}
          <span className="inline-flex items-center gap-3">
            Tours,
            <span className="relative inline-block h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
              <span className="bg-primary/10 absolute inset-0 rounded-2xl"></span>
              <span className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl">
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
