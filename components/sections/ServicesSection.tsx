'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Monitor, ShoppingCart, TrendingUp, Smartphone, ArrowRight } from 'lucide-react';

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
    color: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      bg: 'from-blue-500 via-blue-400 to-violet-500',
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
    color: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      bg: 'from-violet-500 via-purple-500 to-pink-500',
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
    color: {
      primary: '#06b6d4',
      secondary: '#3b82f6',
      bg: 'from-cyan-500 via-cyan-400 to-blue-500',
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
    color: {
      primary: '#10b981',
      secondary: '#06b6d4',
      bg: 'from-emerald-500 via-teal-500 to-cyan-500',
    },
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track scroll progress and update active service
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const index = Math.min(Math.floor(progress * services.length), services.length - 1);
    setActiveIndex(index);
  });

  const activeService = services[activeIndex];
  const Icon = activeService.icon;

  return (
    <section
      ref={containerRef}
      className="relative bg-gray-950"
      style={{ height: `${services.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background gradient that changes with service */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: `radial-gradient(ellipse at 70% 50%, ${activeService.color.primary}40 0%, transparent 50%)`,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        <div className="relative z-10 container mx-auto flex h-full items-center px-6 md:px-12 lg:px-20">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left side - Text content */}
            <div className="max-w-xl">
              {/* Service label */}
              <motion.div
                key={`label-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex items-center gap-3"
              >
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${activeService.color.primary}20` }}
                >
                  <Icon className="h-5 w-5" style={{ color: activeService.color.primary }} />
                </motion.div>
                <span
                  className="text-sm font-semibold tracking-wide"
                  style={{ color: activeService.color.primary }}
                >
                  {activeService.label}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6 text-4xl leading-[1.15] font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
              >
                {activeService.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-10 text-lg leading-relaxed text-gray-400"
              >
                {activeService.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                key={`cta-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  href={activeService.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:gap-4"
                  style={{
                    boxShadow: `0 0 40px ${activeService.color.primary}30`,
                  }}
                >
                  {activeService.cta}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Progress indicators */}
              <div className="mt-16 flex items-center gap-3">
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
                    className="group relative h-1 flex-1 overflow-hidden rounded-full bg-white/10 transition-all"
                    aria-label={`Aller à ${service.label}`}
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        backgroundColor:
                          index <= activeIndex ? services[index].color.primary : 'transparent',
                      }}
                      animate={{
                        width: index < activeIndex ? '100%' : index === activeIndex ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="relative hidden lg:block">
              <motion.div
                className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem]"
                animate={{
                  boxShadow: `0 25px 80px -20px ${activeService.color.primary}50`,
                }}
                transition={{ duration: 0.8 }}
              >
                {/* Gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${activeService.color.bg}`}
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Animated blob shapes */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: `radial-gradient(circle at 30% 70%, ${activeService.color.secondary}60 0%, transparent 50%)`,
                  }}
                  transition={{ duration: 1 }}
                />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: `radial-gradient(circle at 70% 30%, white 0%, transparent 30%)`,
                  }}
                  style={{ opacity: 0.2 }}
                />

                {/* Floating UI mockup */}
                <motion.div
                  key={`mockup-${activeIndex}`}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="absolute right-8 bottom-8 left-8 rounded-2xl border border-white/20 bg-gray-900/90 p-6 backdrop-blur-xl"
                >
                  {/* Mock UI elements */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-xl"
                      style={{ backgroundColor: activeService.color.primary }}
                    />
                    <div className="flex-1">
                      <div className="mb-1 h-3 w-24 rounded bg-white/80" />
                      <div className="h-2 w-16 rounded bg-white/40" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-white/20" />
                    <div className="h-2 w-4/5 rounded bg-white/20" />
                    <div className="h-2 w-3/5 rounded bg-white/20" />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div
                      className="h-8 w-24 rounded-full"
                      style={{ backgroundColor: activeService.color.primary }}
                    />
                    <div className="h-8 w-20 rounded-full border border-white/20" />
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  key={`badge-${activeIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute top-6 right-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
                >
                  <span className="text-sm font-medium text-white">
                    {String(activeIndex + 1).padStart(2, '0')} /{' '}
                    {String(services.length).padStart(2, '0')}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
