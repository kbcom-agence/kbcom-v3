'use client';

import Link from 'next/link';
import { Monitor, ShoppingCart, TrendingUp, Settings, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Monitor,
    title: 'Création de Sites Web',
    description:
      'Sites vitrine modernes et responsives, optimisés pour le référencement naturel. Next.js, React, performances garanties.',
    href: '/services/creation-sites-web',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description:
      'Boutiques en ligne performantes avec gestion de catalogue, paiements sécurisés, et expérience utilisateur optimale.',
    href: '/services/e-commerce',
  },
  {
    icon: TrendingUp,
    title: 'SEO & Référencement',
    description:
      'Stratégies SEO complètes pour atteindre le Top 3 Google sur vos mots-clés cibles. Audits, optimisation, suivi mensuel.',
    href: '/services/seo-referencement',
  },
  {
    icon: Settings,
    title: 'Applications Web Sur Mesure',
    description:
      'Solutions web complexes et sur-mesure : SaaS, CRM, plateformes internes. Technologies modernes et évolutives.',
    href: '/services/applications-web',
  },
];

export function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="bg-primary/5 absolute top-20 right-20 h-72 w-72 rounded-full blur-3xl" />
        <div className="bg-accent/5 absolute bottom-20 left-20 h-72 w-72 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
            Nos Services <span className="text-primary italic">Web</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Des solutions web complètes pour propulser votre business en ligne
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group hover:border-primary/30 relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                {/* Gradient overlay on hover */}
                <div className="from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="from-primary/10 to-accent/10 mb-6 inline-flex rounded-2xl bg-gradient-to-br p-4 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-primary h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-xl font-bold text-gray-900">{service.title}</h3>

                {/* Description */}
                <p className="mb-6 leading-relaxed text-gray-600">{service.description}</p>

                {/* Link */}
                <Link
                  href={service.href}
                  className="text-primary inline-flex items-center gap-2 font-semibold transition-all duration-300 group-hover:gap-3"
                >
                  En savoir plus
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
