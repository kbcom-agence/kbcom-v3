'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Monitor, ShoppingCart, TrendingUp, Smartphone, ArrowRight } from 'lucide-react';
import { useRive } from '@rive-app/react-canvas';

const services = [
  {
    id: 'sites-web',
    icon: Monitor,
    label: 'Sites Web',
    title: 'Des sites web qui captent et convertissent',
    description:
      'Sites vitrine et corporate sur mesure. Design unique, performances optimales avec Next.js et React. Chaque pixel est pensé pour votre audience.',
    cta: 'Découvrir nos créations',
    href: '/services/creation-sites-web',
    riveFile: '/animations/website-animation.riv',
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
    description:
      "Expérience d'achat fluide qui transforme les visiteurs en clients. Paiements sécurisés, gestion simplifiée, analytics avancés pour maximiser vos ventes.",
    cta: 'Booster vos ventes',
    href: '/services/e-commerce',
    riveFile: '/animations/ecommerce-animation.riv',
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
    description:
      'Stratégies SEO complètes pour atteindre le Top 3. Audit technique, optimisation on-page, netlinking. Des résultats mesurables et durables.',
    cta: 'Grimper dans Google',
    href: '/services/seo-referencement',
    riveFile: '/animations/seo-animation.riv',
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
    description:
      'Applications web et mobile complexes. SaaS, CRM, plateformes métier — architecture moderne, scalable et évolutive pour accompagner votre croissance.',
    cta: 'Créer votre app',
    href: '/services/applications-web',
    riveFile: '/animations/app-animation.riv',
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

function RiveAnimation({
  src,
  color,
}: {
  src: string;
  color: { primary: string; secondary: string };
}) {
  const { RiveComponent, rive } = useRive({
    src,
    autoplay: true,
    stateMachines: 'State Machine 1',
  });

  return (
    <div className="relative h-full w-full">
      {/* Fallback: elegant icon display while Rive loads or if file is missing */}
      {!rive && (
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="h-32 w-32 rounded-3xl opacity-10"
            style={{ backgroundColor: color.primary }}
          />
        </div>
      )}
      {/* Rive canvas - hidden until loaded */}
      <div className={`h-full w-full ${!rive ? 'hidden' : ''}`}>
        <RiveComponent />
      </div>
    </div>
  );
}

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
                  {activeService.description}
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
                    className="group inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold text-white transition-all duration-500 hover:gap-4 hover:shadow-2xl"
                    style={{
                      backgroundColor: activeService.color.primary,
                      boxShadow: `0 10px 40px -10px ${activeService.color.primary}80`,
                    }}
                  >
                    {activeService.cta}
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
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

            {/* Right side - Visual */}
            <div className="relative hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative aspect-square overflow-hidden rounded-3xl"
                  style={{
                    boxShadow: `0 20px 60px -15px ${activeService.color.primary}30`,
                  }}
                >
                  {/* Clean gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${activeService.color.bg} opacity-10`}
                  />

                  {/* Rive animation container */}
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <RiveAnimation src={activeService.riveFile} color={activeService.color} />
                  </div>

                  {/* Minimal badge */}
                  <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between">
                    <div className="rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-md">
                      <span className="text-xs font-medium text-gray-600">
                        {String(activeIndex + 1).padStart(2, '0')} /{' '}
                        {String(services.length).padStart(2, '0')}
                      </span>
                    </div>
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
