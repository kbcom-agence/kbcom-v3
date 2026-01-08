'use client';

import { Zap, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: Zap,
    title: 'Expertise Technique',
    description:
      'Maîtrise des technologies modernes (Next.js, React, TypeScript) pour des sites ultra-performants et évolutifs.',
  },
  {
    icon: Award,
    title: 'SEO Garanti',
    description:
      'Objectif Top 3 Google sur vos mots-clés cibles. Stratégie SEO intégrée dès la conception du projet.',
  },
  {
    icon: Users,
    title: 'Accompagnement Local',
    description:
      'Basés à Tours, nous sommes disponibles pour des rendez-vous en personne et un suivi personnalisé de votre projet.',
  },
];

export function WhyKBCOM() {
  return (
    <section className="gradient-mesh relative overflow-hidden py-32">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
            Pourquoi Choisir{' '}
            <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
              KB-COM
            </span>{' '}
            ?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Une expertise reconnue au service de votre réussite digitale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="group hover:border-primary/20 relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="from-primary/0 via-accent/0 to-primary/0 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-500"
                  whileHover={{ opacity: 0.05 }}
                />

                {/* Icon with gradient background */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                  className="from-primary to-accent mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg"
                >
                  <Icon className="h-10 w-10 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="mb-4 text-2xl font-bold text-gray-900">{benefit.title}</h3>

                {/* Description */}
                <p className="leading-relaxed text-gray-600">{benefit.description}</p>

                {/* Check icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.15 + 0.4 }}
                  className="mt-6"
                >
                  <svg
                    className="text-success mx-auto h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
