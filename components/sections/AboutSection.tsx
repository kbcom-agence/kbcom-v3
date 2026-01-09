'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, MapPin, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { value: '70+', label: 'Clients accompagnés', icon: Users },
  { value: '2019', label: 'Année de création', icon: Calendar },
  { value: 'Tours', label: 'Centre-Val de Loire', icon: MapPin },
];

const expertise = [
  'Next.js & React',
  'E-Commerce',
  'SEO Technique',
  'Applications Web',
  'UI/UX Design',
  'Performance Web',
];

export function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const decorativeRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#0a0a0f] py-24 md:py-32 lg:py-40"
    >
      {/* Background texture - Noise grain effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative geometric elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient circle */}
        <motion.div
          className="absolute top-1/4 -right-[20%] h-[600px] w-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(59,103,255,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
            y: backgroundY,
          }}
        />

        {/* Rotating square frame */}
        <motion.div
          className="absolute top-[15%] left-[10%] h-32 w-32 border border-white/[0.08]"
          style={{ rotate: decorativeRotate }}
        />

        {/* Diagonal lines */}
        <svg
          className="absolute top-0 right-0 h-full w-1/2 opacity-[0.04]"
          preserveAspectRatio="none"
        >
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="0%"
              y1={`${i * 15}%`}
              x2="100%"
              y2={`${i * 15 + 30}%`}
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Floating dots */}
        <motion.div
          className="absolute bottom-[30%] left-[20%] h-2 w-2 rounded-full bg-blue-500/40"
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[20%] right-[30%] h-1.5 w-1.5 rounded-full bg-violet-500/50"
          animate={{ y: [0, 10, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        {/* Top section - Editorial header */}
        <div className="mb-20 grid gap-12 lg:mb-28 lg:grid-cols-12 lg:gap-8">
          {/* Left column - Big typography */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Overline */}
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-violet-500" />
                <span className="text-sm font-medium tracking-[0.2em] text-white/50 uppercase">
                  Qui sommes-nous
                </span>
              </div>

              {/* Main headline */}
              <h2 className="font-['Cal_Sans',Inter,sans-serif] text-4xl leading-[1.1] font-bold tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
                Une agence web
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                    nouvelle génération
                  </span>
                  {/* Underline effect */}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-3 w-full bg-gradient-to-r from-blue-500/20 to-violet-500/20"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Right column - Description */}
          <div className="flex flex-col justify-end lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="mb-6 text-lg leading-relaxed text-white/60 md:text-xl">
                Basée à <span className="font-medium text-white">Tours</span>, KB-COM conçoit des
                sites web qui ne se contentent pas d&apos;exister — ils{' '}
                <span className="font-medium text-white">performent</span>.
              </p>
              <p className="text-base leading-relaxed text-white/40">
                Nous combinons expertise technique de pointe et vision créative pour transformer vos
                ambitions digitales en succès mesurables. Chaque projet est une mission.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Middle section - Bento grid style */}
        <div className="mb-20 grid gap-4 md:grid-cols-2 lg:mb-28 lg:grid-cols-3">
          {/* Stats cards */}
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.04]"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05]">
                    <Icon className="h-5 w-5 text-white/40" />
                  </div>
                  <div className="mb-2 font-['Cal_Sans',Inter,sans-serif] text-4xl font-bold tracking-tight text-white md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-white/40">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom section - Expertise + CTA */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Expertise tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="mb-8 text-sm font-medium tracking-[0.2em] text-white/50 uppercase">
              Nos expertises
            </h3>
            <div className="flex flex-wrap gap-3">
              {expertise.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.6 + index * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-white"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col justify-end"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-8 backdrop-blur-sm lg:p-10">
              <p className="mb-6 text-lg leading-relaxed text-white/60">
                Prêt à donner vie à votre projet ? Discutons de vos ambitions et voyons comment nous
                pouvons les concrétiser.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                Démarrer un projet
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex justify-center lg:mt-28"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
