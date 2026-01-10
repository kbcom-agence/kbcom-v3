'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Users, Zap, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const badges = [
  { label: 'Next.js & React', icon: Zap },
  { label: 'SEO Technique', icon: Shield },
  { label: 'Performance Web', icon: Heart },
];

export function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="section-divider relative overflow-hidden bg-[#f8f8f8] py-32 md:py-40 lg:py-48"
    >
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-primary/5 absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/5 absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Badge - Colored style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <span className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm">
                <Users className="h-4 w-4" />À propos de nous
              </span>
            </motion.div>

            {/* Title with gradient */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display mb-8 text-4xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
            >
              L&apos;agence web{' '}
              <span className="heading-underline heading-underline-long">
                <span className="text-gradient">nouvelle génération</span>
              </span>
            </motion.h2>

            {/* Description with better spacing */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 text-lg leading-relaxed text-gray-600 md:text-xl"
            >
              KB-COM conçoit des sites web qui ne se contentent pas d&apos;exister — ils{' '}
              <span className="text-highlight font-semibold text-gray-900">performent</span>. Nous
              combinons expertise technique de pointe et vision créative pour transformer vos
              ambitions digitales en succès mesurables.
            </motion.p>

            {/* Location badge - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-md"
            >
              <MapPin className="text-primary h-5 w-5" />
              <span className="text-sm font-semibold text-gray-700">
                Basée à Tours, Centre-Val de Loire
              </span>
            </motion.div>

            {/* Expertise badges - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-10 flex flex-wrap gap-3"
            >
              {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.span
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="card-hover-lift inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm"
                  >
                    <Icon className="text-primary h-4 w-4" />
                    {badge.label}
                  </motion.span>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button href="/contact" variant="gradient" className="btn-shine">
                Discutons de votre projet
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - YouTube Video */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {/* Video container with border style */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-3 shadow-2xl">
              {/* Inner video wrapper - taller aspect ratio */}
              <div
                className="relative overflow-hidden rounded-2xl bg-gray-900"
                style={{ paddingBottom: '75%' }}
              >
                <iframe
                  src="https://www.youtube.com/embed/wNseBcjqhAw?rel=0&modestbranding=1"
                  title="KB-COM Présentation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>

              {/* Decorative badge on video - Colored */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-primary/10 text-primary badge-float absolute -top-4 -right-4 rounded-full px-5 py-2.5 text-sm font-bold shadow-lg"
              >
                🎬 Notre vision
              </motion.div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              className="bg-primary/10 absolute -bottom-6 -left-6 h-28 w-28 rounded-3xl"
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -right-8 -bottom-8 h-20 w-20 rounded-full bg-violet-100"
              animate={{ y: [0, 6, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
