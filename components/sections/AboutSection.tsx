'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, MapPin, Calendar, Users, Code2, Sparkles, Zap, Target } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { value: '70+', label: 'Clients accompagnés', icon: Users },
  { value: '2019', label: 'Année de création', icon: Calendar },
  { value: 'Tours', label: 'Centre-Val de Loire', icon: MapPin },
];

const values = [
  {
    icon: Code2,
    title: 'Excellence Technique',
    description: 'Next.js, React, et les technologies les plus avancées.',
    color: '#3a67ff',
  },
  {
    icon: Target,
    title: 'Orienté Résultats',
    description: 'Chaque ligne de code vise à convertir vos visiteurs.',
    color: '#8b5cf6',
  },
  {
    icon: Zap,
    title: 'Rapidité',
    description: 'Des délais respectés, zéro compromis sur la qualité.',
    color: '#06b6d4',
  },
  {
    icon: Sparkles,
    title: 'Design Unique',
    description: 'Des interfaces qui captent et engagent votre audience.',
    color: '#10b981',
  },
];

export function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 md:py-32"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-violet-100/40 blur-3xl" />

        {/* Decorative circles */}
        <motion.div
          className="absolute top-20 right-[10%] h-64 w-64 rounded-full border border-gray-200/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.div
          className="absolute bottom-32 left-[5%] h-48 w-48 rounded-full border border-gray-200/40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header section */}
        <div className="mb-16 grid gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-16">
          {/* Left - Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="bg-primary/10 text-primary inline-block rounded-full px-4 py-1.5 text-sm font-semibold">
                À propos
              </span>
            </div>

            <h2 className="font-display text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              L&apos;agence qui{' '}
              <span className="relative inline-block">
                <span className="text-primary">transforme</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <motion.path
                    d="M1 5C40 2 160 2 199 5"
                    stroke="#3a67ff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </svg>
              </span>{' '}
              vos ambitions
            </h2>
          </motion.div>

          {/* Right - Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col justify-end"
          >
            <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
              Basée à <span className="font-semibold text-gray-900">Tours</span>, KB-COM est une
              agence web nouvelle génération. Nous combinons expertise technique et créativité pour
              des sites qui <span className="font-semibold text-gray-900">performent</span>.
            </p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-16 flex flex-wrap justify-center gap-8 rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-sm backdrop-blur-sm md:gap-16 lg:mb-20"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Icon className="text-primary/60 h-5 w-5" />
                  <span className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
                    {stat.value}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Values grid */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:mb-20 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-lg"
              >
                {/* Icon */}
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${value.color}12` }}
                >
                  <Icon className="h-6 w-6" style={{ color: value.color }} />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-bold text-gray-900">{value.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>

                {/* Bottom accent */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: value.color }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            De la startup ambitieuse à la PME établie, nous accompagnons les entreprises qui visent
            l&apos;excellence sur le web.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-xl"
          >
            Discutons de votre projet
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
