'use client';

import { motion } from 'framer-motion';

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className = '' }: AnimatedGradientProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />

      {/* Primary flowing blob - top left */}
      <motion.div
        className="absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(90,138,255,0.4) 0%, rgba(90,138,255,0.1) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 120, 60, 0],
          y: [0, 80, 140, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary blob - top right with purple tint */}
      <motion.div
        className="absolute top-0 -right-32 h-[600px] w-[600px] rounded-full opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(99,102,241,0.15) 50%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -100, -50, 0],
          y: [0, 100, 50, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center glow orb */}
      <motion.div
        className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(96,165,250,0.3) 0%, rgba(147,197,253,0.1) 40%, transparent 60%)',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom left accent - cyan/teal */}
      <motion.div
        className="absolute -bottom-20 -left-20 h-[450px] w-[450px] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(56,189,248,0.15) 50%, transparent 70%)',
          filter: 'blur(45px)',
        }}
        animate={{
          x: [0, 80, 40, 0],
          y: [0, -60, -100, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating orb 1 - small accent */}
      <motion.div
        className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.4, 0.8, 1],
          opacity: [0.6, 1, 0.4, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating orb 2 - small accent */}
      <motion.div
        className="absolute bottom-1/3 left-1/4 h-24 w-24 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
          filter: 'blur(15px)',
        }}
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.7, 1.3, 1],
          opacity: [0.5, 0.9, 0.3, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Light beam effect - diagonal */}
      <motion.div
        className="absolute top-0 -left-1/4 h-[800px] w-[200px] rotate-[25deg] opacity-20"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
          filter: 'blur(30px)',
        }}
        animate={{
          x: [0, 800, 0],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 5,
        }}
      />

      {/* Morphing blob - organic shape simulation */}
      <motion.div
        className="absolute top-1/2 right-1/3 h-[300px] w-[350px] opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(129,140,248,0.4) 0%, transparent 70%)',
          filter: 'blur(35px)',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }}
        animate={{
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '40% 60% 60% 40% / 60% 40% 60% 40%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
          scale: [1, 1.1, 0.95, 1],
          rotate: [0, 10, -5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle pulse rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/20"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-200/20"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
