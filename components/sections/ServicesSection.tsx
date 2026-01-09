'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: 'sites-web',
    number: '01',
    title: 'Sites Web',
    subtitle: 'Sur Mesure',
    description:
      'Sites vitrine et corporate qui captivent. Next.js, performances optimales, design unique pour chaque projet.',
    features: ['Next.js / React', 'SEO optimisé', 'Design sur mesure'],
    href: '/services/creation-sites-web',
    color: 'from-blue-500 to-indigo-600',
    size: 'large',
  },
  {
    id: 'e-commerce',
    number: '02',
    title: 'E-Commerce',
    subtitle: 'Haute Performance',
    description:
      "Boutiques en ligne qui convertissent. Expérience d'achat fluide, paiements sécurisés, gestion simplifiée.",
    features: ['Shopify / Custom', 'Stripe / PayPal', 'Analytics avancés'],
    href: '/services/e-commerce',
    color: 'from-violet-500 to-purple-600',
    size: 'medium',
  },
  {
    id: 'seo',
    number: '03',
    title: 'SEO',
    subtitle: 'Référencement',
    description:
      'Stratégies SEO pour dominer Google. Audit technique, contenu optimisé, résultats mesurables.',
    features: ['Audit complet', 'Top 3 Google', 'Suivi mensuel'],
    href: '/services/seo-referencement',
    color: 'from-cyan-500 to-blue-600',
    size: 'medium',
  },
  {
    id: 'apps',
    number: '04',
    title: 'Applications',
    subtitle: 'Web & Mobile',
    description:
      'Solutions digitales complexes. SaaS, CRM, plateformes métier — architecture moderne et évolutive.',
    features: ['SaaS / CRM', 'API robustes', 'Scalable'],
    href: '/services/applications-web',
    color: 'from-emerald-500 to-teal-600',
    size: 'large',
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const isLarge = service.size === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0, 1] }}
      className={`group relative ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <Link href={service.href} className="block h-full">
        <div
          className={`relative h-full overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 backdrop-blur-xl transition-all duration-500 hover:border-white/40 hover:bg-white/80 ${
            isLarge ? 'p-10 md:p-14' : 'p-8 md:p-10'
          }`}
          style={{
            boxShadow:
              '0 4px 24px -1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
          }}
        >
          {/* Gradient orb background */}
          <div
            className={`absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br ${service.color} opacity-20 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-40`}
          />

          {/* Number */}
          <div className="relative mb-6 flex items-start justify-between">
            <span
              className={`bg-gradient-to-br ${service.color} bg-clip-text text-sm font-bold tracking-widest text-transparent`}
            >
              {service.number}
            </span>
            <motion.div
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${service.color} text-white opacity-0 transition-all duration-300 group-hover:opacity-100`}
              whileHover={{ scale: 1.1, rotate: 45 }}
            >
              <ArrowUpRight className="h-5 w-5" />
            </motion.div>
          </div>

          {/* Title */}
          <div className="relative mb-4">
            <h3
              className={`font-black tracking-tight text-gray-900 ${
                isLarge ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
              }`}
            >
              {service.title}
            </h3>
            <span
              className={`bg-gradient-to-r ${service.color} bg-clip-text font-light text-transparent italic ${
                isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
              }`}
            >
              {service.subtitle}
            </span>
          </div>

          {/* Description */}
          <p
            className={`relative mb-8 leading-relaxed text-gray-600 ${
              isLarge ? 'max-w-md text-lg' : 'text-base'
            }`}
          >
            {service.description}
          </p>

          {/* Features */}
          <div className="relative flex flex-wrap gap-2">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-gray-700 transition-colors group-hover:border-gray-300"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Bottom gradient line */}
          <div
            className={`absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-32"
    >
      {/* Animated background elements */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600">
              Nos Expertises
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-5xl leading-[1.1] font-black tracking-tight text-gray-900 md:text-7xl"
          >
            Services{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Web
              </span>
              <motion.span
                className="absolute right-0 -bottom-2 left-0 h-3 bg-gradient-to-r from-blue-200 via-violet-200 to-purple-200 opacity-60"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-xl leading-relaxed text-gray-600"
          >
            Des solutions digitales pensées pour la performance et l&apos;impact. Chaque projet est
            une opportunité de créer quelque chose d&apos;exceptionnel.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 text-lg font-semibold text-gray-900 transition-colors hover:text-blue-600"
          >
            Découvrir tous nos services
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
