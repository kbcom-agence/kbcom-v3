'use client';

import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactInfo } from '@/lib/navigation';

export function FinalCTA() {
  return (
    <section className="gradient-hero relative overflow-hidden py-32">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="bg-accent-light/20 absolute bottom-20 left-20 h-80 w-80 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-4xl leading-tight font-black text-white md:text-6xl">
            Prêt à Lancer
            <br />
            <span className="italic">Votre Projet Web</span> ?
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-white/90 md:text-xl">
            Obtenez un devis gratuit en moins de 24 heures et commencez à transformer votre vision
            en réalité
          </p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="group text-primary mb-8 inline-flex items-center gap-2 rounded-2xl bg-white px-10 py-5 text-lg font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/30"
            >
              Demander un Devis Gratuit
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mb-8 h-px w-32 bg-white/30"
          />

          {/* Secondary CTA - Phone */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-white/90"
          >
            <p className="mb-4 text-sm font-medium">Ou appelez-nous directement :</p>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="group inline-flex items-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 text-xl font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
              aria-label={`Appeler ${contactInfo.phone}`}
            >
              <Phone className="h-6 w-6 transition-transform group-hover:rotate-12" />
              {contactInfo.phone}
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80"
          >
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Devis Gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Sans Engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Réponse en 24h</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
