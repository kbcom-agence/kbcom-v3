'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Monitor, ShoppingCart, TrendingUp, Smartphone, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    id: 'sites-web',
    icon: Monitor,
    label: 'Sites Web',
    title: 'Des sites web qui captent et convertissent',
    description: (color: string) => (
      <>
        Sites vitrine et corporate <span style={{ color }}>sur mesure</span>. Design unique,{' '}
        <span style={{ color }}>performances optimales</span> avec Next.js et React. Chaque pixel
        est pensé pour <span style={{ color }}>votre audience</span>.
      </>
    ),
    cta: 'Découvrir nos créations',
    href: '/services/creation-sites-web',
    image: '/images/services/web-design.svg',
    color: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      bg: 'from-blue-400 via-blue-500 to-violet-500',
      light: '#dbeafe',
    },
  },
  {
    id: 'e-commerce',
    icon: ShoppingCart,
    label: 'E-Commerce',
    title: 'Boutiques en ligne haute performance',
    description: (color: string) => (
      <>
        Expérience d&apos;achat <span style={{ color }}>fluide</span> qui transforme les visiteurs
        en clients. <span style={{ color }}>Paiements sécurisés</span>, gestion simplifiée,
        analytics avancés pour <span style={{ color }}>maximiser vos ventes</span>.
      </>
    ),
    cta: 'Booster vos ventes',
    href: '/services/e-commerce',
    image: '/images/services/ecommerce.svg',
    color: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      bg: 'from-violet-400 via-purple-500 to-pink-500',
      light: '#ede9fe',
    },
  },
  {
    id: 'seo',
    icon: TrendingUp,
    label: 'SEO & Référencement',
    title: 'Dominez Google sur vos mots-clés',
    description: (color: string) => (
      <>
        Stratégies SEO complètes pour atteindre le <span style={{ color }}>Top 3</span>. Audit
        technique, <span style={{ color }}>optimisation on-page</span>, netlinking. Des résultats{' '}
        <span style={{ color }}>mesurables et durables</span>.
      </>
    ),
    cta: 'Grimper dans Google',
    href: '/services/seo-referencement',
    image: '/images/services/seo.svg',
    color: {
      primary: '#06b6d4',
      secondary: '#3b82f6',
      bg: 'from-cyan-400 via-cyan-500 to-blue-500',
      light: '#cffafe',
    },
  },
  {
    id: 'apps',
    icon: Smartphone,
    label: 'Applications',
    title: 'Solutions digitales sur mesure',
    description: (color: string) => (
      <>
        Applications web et mobile <span style={{ color }}>complexes</span>. SaaS, CRM, plateformes
        métier — architecture <span style={{ color }}>moderne, scalable</span> et évolutive pour
        accompagner <span style={{ color }}>votre croissance</span>.
      </>
    ),
    cta: 'Créer votre app',
    href: '/services/applications-web',
    image: '/images/services/app-dev.svg',
    color: {
      primary: '#10b981',
      secondary: '#06b6d4',
      bg: 'from-emerald-400 via-teal-500 to-cyan-500',
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
  const Icon = activeService.icon;

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

        <div className="relative z-10 container mx-auto flex h-full items-center px-6 md:px-12 lg:px-20">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left side - Text content */}
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                {/* Service label */}
                <motion.div
                  key={`label-${activeIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mb-6 flex items-center gap-3"
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: activeService.color.light }}
                    layoutId="service-icon-bg"
                  >
                    <Icon className="h-6 w-6" style={{ color: activeService.color.primary }} />
                  </motion.div>
                  <span
                    className="text-sm font-semibold tracking-wider uppercase"
                    style={{ color: activeService.color.primary }}
                  >
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
                  className="mb-6 text-4xl leading-[1.1] font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
                >
                  {activeService.title}
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {/* Description */}
                <motion.p
                  key={`desc-${activeIndex}`}
                  {...fadeUpTransition}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mb-10 text-lg leading-relaxed text-gray-600"
                >
                  {activeService.description(activeService.color.primary)}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {/* CTA Button - Hero style with service colors */}
                <motion.div
                  key={`cta-${activeIndex}`}
                  {...fadeUpTransition}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={activeService.href}
                    className="group inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    style={{
                      background: `linear-gradient(to bottom, ${activeService.color.primary}, ${activeService.color.secondary})`,
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      boxShadow: `0 10px 30px -10px ${activeService.color.primary}60`,
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

            {/* Right side - Animated Visual */}
            <div className="relative hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-2xl"
                  style={{
                    boxShadow: `0 25px 70px -20px ${activeService.color.primary}40`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Subtle gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${activeService.color.bg} opacity-5`}
                  />

                  {/* Animated decorative circles */}
                  <motion.div
                    className="absolute -top-20 -left-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
                    style={{ backgroundColor: activeService.color.primary }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
                    style={{ backgroundColor: activeService.color.secondary }}
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Image container with animation */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center p-16"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={activeService.image}
                        alt={activeService.label}
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </motion.div>

                  {/* Minimal progress indicator */}
                  <div className="absolute right-6 bottom-6 rounded-full bg-white px-4 py-2 shadow-lg">
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
