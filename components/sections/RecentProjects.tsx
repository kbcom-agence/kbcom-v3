'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Star, Monitor, TrendingUp, Smartphone, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// Couleurs par catégorie de service
const serviceColors = {
  web: {
    primary: '#8b5cf6',
    light: '#ede9fe',
    bg: 'from-violet-400 via-purple-500 to-violet-600',
  },
  ecommerce: {
    primary: '#3b82f6',
    light: '#dbeafe',
    bg: 'from-blue-400 via-blue-500 to-blue-600',
  },
  seo: {
    primary: '#06b6d4',
    light: '#cffafe',
    bg: 'from-cyan-400 via-cyan-500 to-cyan-600',
  },
  app: {
    primary: '#10b981',
    light: '#d1fae5',
    bg: 'from-emerald-400 via-emerald-500 to-emerald-600',
  },
};

const serviceIcons = {
  web: Monitor,
  ecommerce: ShoppingCart,
  seo: TrendingUp,
  app: Smartphone,
};

const projects = [
  {
    id: 1,
    title: 'Maison Music',
    description:
      'Site vitrine moderne pour un studio de musique professionnel. Design immersif avec animations fluides et expérience utilisateur optimisée pour mettre en valeur les artistes.',
    client: 'Studio Maison Music',
    category: 'web' as const,
    categoryLabel: 'Site Web',
    rating: 5,
    image: '/images/projects/maison-music.jpg',
    href: '/portfolio/maison-music',
  },
  {
    id: 2,
    title: 'TechFlow Solutions',
    description:
      'Plateforme SaaS complète avec dashboard analytics, gestion utilisateurs et intégrations API tierces. Architecture moderne et scalable.',
    client: 'TechFlow SAS',
    category: 'app' as const,
    categoryLabel: 'Application Web',
    rating: 5,
    image: '/images/projects/techflow.jpg',
    href: '/portfolio/techflow',
  },
  {
    id: 3,
    title: 'Boutique Élégance',
    description:
      "E-commerce haute gamme avec expérience d'achat premium, paiements sécurisés et gestion de stock automatisée pour une marque de luxe parisienne.",
    client: 'Élégance Paris',
    category: 'ecommerce' as const,
    categoryLabel: 'E-Commerce',
    rating: 5,
    image: '/images/projects/elegance.jpg',
    href: '/portfolio/elegance',
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = serviceColors[project.category];
  const Icon = serviceIcons[project.category];

  // Calcul du décalage vertical pour l'empilement
  const topOffset = 120 + index * 40;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="sticky mb-12"
      style={{
        top: `${topOffset}px`,
        zIndex: index + 1,
      }}
    >
      <div
        className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
        style={{
          boxShadow: `0 25px 60px -15px ${colors.primary}20`,
        }}
      >
        <div className="grid gap-0 lg:grid-cols-2">
          {/* Image side */}
          <div
            className={`relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[420px] ${
              index % 2 === 1 ? 'lg:order-2' : ''
            }`}
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.primary}15 100%)`,
              }}
            />

            {/* Decorative shapes */}
            <div
              className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
              style={{ backgroundColor: colors.primary }}
            />
            <div
              className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-20 blur-2xl"
              style={{ backgroundColor: colors.primary }}
            />

            {/* Laptop mockup */}
            <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
              <div className="relative w-full max-w-md transform transition-transform duration-500 hover:scale-[1.02]">
                {/* Laptop frame */}
                <div className="rounded-t-xl bg-gray-800 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="mx-auto flex-1">
                      <div className="mx-auto h-4 w-32 rounded bg-gray-700" />
                    </div>
                  </div>
                </div>
                {/* Screen content */}
                <div
                  className="aspect-[16/10] rounded-b-lg"
                  style={{
                    background: `linear-gradient(180deg, white 0%, ${colors.light} 100%)`,
                  }}
                >
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${colors.primary}15` }}
                    >
                      <Icon className="h-8 w-8" style={{ color: colors.primary }} />
                    </div>
                    <div className="text-xl font-bold text-gray-900">{project.title}</div>
                    <div className="text-sm text-gray-500">Aperçu du projet</div>
                  </div>
                </div>
                {/* Laptop base */}
                <div className="mx-auto h-4 w-1/3 rounded-b-xl bg-gray-700" />
                <div className="mx-auto h-1 w-1/2 rounded-b bg-gray-600" />
              </div>
            </div>

            {/* View button */}
            <Link
              href={project.href}
              className="absolute top-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-800"
              style={{
                boxShadow: `0 10px 30px -10px ${colors.primary}50`,
              }}
            >
              <span className="text-sm font-medium">Voir</span>
            </Link>
          </div>

          {/* Content side */}
          <div
            className={`flex flex-col justify-between p-8 lg:p-12 ${
              index % 2 === 1 ? 'lg:order-1' : ''
            }`}
          >
            <div>
              {/* Category badge */}
              <div className="mb-6">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                  style={{
                    backgroundColor: colors.light,
                    color: colors.primary,
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {project.categoryLabel}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display mb-5 text-3xl font-semibold tracking-tight text-gray-900 lg:text-4xl">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mb-8 text-base leading-relaxed text-gray-600 lg:text-lg">
                {project.description}
              </p>
            </div>

            {/* Meta info */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Client</span>
                <span className="text-sm font-semibold text-gray-900">{project.client}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Services</span>
                <span className="text-sm font-semibold" style={{ color: colors.primary }}>
                  {project.categoryLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Satisfaction</span>
                <div className="flex items-center gap-1.5">
                  {[...Array(project.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-gray-900">
                    {project.rating}/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function RecentProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative bg-[#fafafa] py-24 md:py-32">
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <ExternalLink className="h-4 w-4" />
              Projets Récents
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display mb-4 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl"
          >
            Nos dernières <span className="text-primary">réalisations</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-gray-600"
          >
            Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs digitaux.
          </motion.p>
        </div>

        {/* Stacking cards */}
        <div className="relative pb-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <Link
            href="/portfolio"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            Voir tous nos projets
            <ExternalLink className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
