'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const badges = [
  { label: 'Next.js & React', color: 'default' },
  { label: 'SEO Technique', color: 'default' },
  { label: 'Performance Web', color: 'default' },
];

export function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#f8f8f8] py-24 md:py-32">
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
              className="mb-6"
            >
              <span className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm">
                <Users className="h-4 w-4" />À propos de nous
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display mb-6 text-4xl leading-[1.1] font-semibold tracking-tight text-gray-900 md:text-5xl"
            >
              L&apos;agence web <span className="text-primary">nouvelle génération</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6 text-lg leading-relaxed text-gray-600"
            >
              KB-COM conçoit des sites web qui ne se contentent pas d&apos;exister — ils{' '}
              <span className="font-semibold text-gray-900">performent</span>. Nous combinons
              expertise technique de pointe et vision créative pour transformer vos ambitions
              digitales en succès mesurables.
            </motion.p>

            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 flex items-center gap-2 text-gray-500"
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Basée à Tours, Centre-Val de Loire</span>
            </motion.div>

            {/* Expertise badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8 flex flex-wrap gap-2"
            >
              {badges.map((badge, index) => (
                <motion.span
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                >
                  {badge.label}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button href="/contact" variant="gradient">
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
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-2 shadow-2xl">
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
                className="bg-primary/10 text-primary absolute -top-3 -right-3 rounded-full px-4 py-2 text-xs font-semibold shadow-md"
              >
                🎬 Notre vision
              </motion.div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              className="bg-primary/10 absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl"
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -right-6 -bottom-6 h-16 w-16 rounded-full bg-violet-100"
              animate={{ y: [0, 6, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
