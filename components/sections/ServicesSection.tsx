'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Monitor, ShoppingCart, TrendingUp, Smartphone, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'sites-web',
    icon: Monitor,
    label: 'Sites Web',
    title: (color: string) => (
      <>
        Des sites web qui <span style={{ color }}>captent</span> et{' '}
        <span style={{ color }}>convertissent</span>
      </>
    ),
    description: (color: string) => (
      <>
        Sites vitrine et corporate <span style={{ color }}>sur mesure</span>. Design unique,{' '}
        <span style={{ color }}>performances optimales</span> avec Next.js et React. Chaque pixel
        est pensé pour <span style={{ color }}>votre audience</span>.
      </>
    ),
    cta: 'Découvrir nos créations',
    href: '/services/creation-sites-web',
    color: {
      primary: '#8b5cf6',
      secondary: '#a855f7',
      bg: 'from-violet-400 via-purple-500 to-violet-600',
      light: '#ede9fe',
    },
  },
  {
    id: 'e-commerce',
    icon: ShoppingCart,
    label: 'E-Commerce',
    title: (color: string) => (
      <>
        Boutiques en ligne <span style={{ color }}>haute performance</span>
      </>
    ),
    description: (color: string) => (
      <>
        Expérience d&apos;achat <span style={{ color }}>fluide</span> qui transforme les visiteurs
        en clients. <span style={{ color }}>Paiements sécurisés</span>, gestion simplifiée,
        analytics avancés pour <span style={{ color }}>maximiser vos ventes</span>.
      </>
    ),
    cta: 'Booster vos ventes',
    href: '/services/e-commerce',
    color: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      bg: 'from-blue-400 via-blue-500 to-blue-600',
      light: '#dbeafe',
    },
  },
  {
    id: 'seo',
    icon: TrendingUp,
    label: 'SEO & Référencement',
    title: (color: string) => (
      <>
        <span style={{ color }}>Dominez Google</span> sur vos mots-clés
      </>
    ),
    description: (color: string) => (
      <>
        Stratégies SEO complètes pour atteindre le <span style={{ color }}>Top 3</span>. Audit
        technique, <span style={{ color }}>optimisation on-page</span>, netlinking. Des résultats{' '}
        <span style={{ color }}>mesurables et durables</span>.
      </>
    ),
    cta: 'Grimper dans Google',
    href: '/services/seo-referencement',
    color: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      bg: 'from-cyan-400 via-cyan-500 to-cyan-600',
      light: '#cffafe',
    },
  },
  {
    id: 'apps',
    icon: Smartphone,
    label: 'Applications',
    title: (color: string) => (
      <>
        Solutions digitales <span style={{ color }}>sur mesure</span>
      </>
    ),
    description: (color: string) => (
      <>
        Applications web et mobile <span style={{ color }}>complexes</span>. SaaS, CRM, plateformes
        métier — architecture <span style={{ color }}>moderne, scalable</span> et évolutive pour
        accompagner <span style={{ color }}>votre croissance</span>.
      </>
    ),
    cta: 'Créer votre app',
    href: '/services/applications-web',
    color: {
      primary: '#10b981',
      secondary: '#059669',
      bg: 'from-emerald-400 via-emerald-500 to-emerald-600',
      light: '#d1fae5',
    },
  },
];

const fadeUpTransition = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -20, filter: 'blur(10px)' },
};

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const index = Math.min(Math.floor(progress * services.length), services.length - 1);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const activeService = services[activeIndex];
  const ActiveIcon = activeService.icon;

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: `${services.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: `radial-gradient(ellipse 80% 60% at 70% 50%, ${activeService.color.light} 0%, transparent 70%)`,
          }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 container mx-auto flex h-full items-center px-6 md:px-12 lg:px-24">
          <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left side - Text content */}
            <div className="max-w-2xl">
              <AnimatePresence mode="wait">
                {/* Service badge - Colored style */}
                <motion.div
                  key={`label-${activeIndex}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mb-8"
                >
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg"
                    style={{
                      backgroundColor: activeService.color.light,
                      color: activeService.color.primary,
                    }}
                  >
                    <ActiveIcon className="h-4 w-4" />
                    {activeService.label}
                  </span>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {/* Title */}
                <motion.h2
                  key={`title-${activeIndex}`}
                  {...fadeUpTransition}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-display text-glow mb-8 text-4xl leading-[1.05] font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl xl:text-7xl"
                >
                  {activeService.title(activeService.color.primary)}
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {/* Description */}
                <motion.p
                  key={`desc-${activeIndex}`}
                  {...fadeUpTransition}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mb-12 text-lg leading-relaxed text-gray-600 md:text-xl"
                >
                  {activeService.description(activeService.color.primary)}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {/* CTA Button */}
                <motion.div
                  key={`cta-${activeIndex}`}
                  {...fadeUpTransition}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={activeService.href}
                    className="group inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:border-white/50 hover:shadow-lg"
                    style={{
                      background: `linear-gradient(to bottom, ${activeService.color.primary}dd, ${activeService.color.primary}, ${activeService.color.primary}ee)`,
                      boxShadow: `0 10px 30px -10px ${activeService.color.primary}66`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 15px 40px -10px ${activeService.color.primary}88`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 10px 30px -10px ${activeService.color.primary}66`;
                    }}
                  >
                    {activeService.cta}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Progress indicators */}
              <div className="mt-16 flex items-center gap-4">
                {services.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      const container = containerRef.current;
                      if (container) {
                        const targetScroll =
                          container.offsetTop +
                          (index / services.length) * (container.offsetHeight - window.innerHeight);
                        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                      }
                    }}
                    className="group relative h-2 flex-1 overflow-hidden rounded-full bg-gray-200 transition-all duration-300 hover:bg-gray-300"
                    aria-label={`Aller à ${service.label}`}
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      initial={false}
                      animate={{
                        width: index <= activeIndex ? '100%' : '0%',
                        backgroundColor: service.color.primary,
                      }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Animated icon visual */}
            <div className="relative hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative aspect-square overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm"
                  style={{
                    boxShadow: `0 25px 70px -20px ${activeService.color.primary}40`,
                  }}
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${activeService.color.bg} opacity-10`}
                  />

                  {/* Decorative circles */}
                  <motion.div
                    className="absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-20"
                    style={{ backgroundColor: activeService.color.primary }}
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full opacity-15"
                    style={{ backgroundColor: activeService.color.secondary }}
                    animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  />

                  {/* Central icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="flex h-40 w-40 items-center justify-center rounded-3xl"
                      style={{ backgroundColor: activeService.color.light }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ActiveIcon
                        className="h-20 w-20"
                        style={{ color: activeService.color.primary }}
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>

                  {/* Floating small icons */}
                  <motion.div
                    className="absolute top-1/4 left-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg"
                    animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <ActiveIcon
                      className="h-6 w-6"
                      style={{ color: activeService.color.primary }}
                    />
                  </motion.div>
                  <motion.div
                    className="absolute right-8 bottom-1/4 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg"
                    animate={{ y: [0, 6, 0], x: [0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  >
                    <ActiveIcon
                      className="h-5 w-5"
                      style={{ color: activeService.color.secondary }}
                    />
                  </motion.div>

                  {/* Progress indicator */}
                  <div className="absolute right-6 bottom-6 rounded-full bg-white px-4 py-2 shadow-lg backdrop-blur-sm">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: activeService.color.primary }}
                    >
                      {String(activeIndex + 1).padStart(2, '0')} /{' '}
                      {String(services.length).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
