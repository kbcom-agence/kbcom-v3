'use client';

import { motion } from 'framer-motion';

export function TrustBar() {
  // Logos d'entreprises fictifs - style SaaS moderne
  const logos = [
    { name: 'TechCorp', width: 120 },
    { name: 'Innovate', width: 100 },
    { name: 'Digital+', width: 110 },
    { name: 'CloudFlow', width: 130 },
    { name: 'Nexus', width: 90 },
    { name: 'Quantum', width: 115 },
    { name: 'Vertex', width: 95 },
    { name: 'Pulse', width: 85 },
  ];

  // Double les logos pour un défilement infini seamless
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="relative overflow-hidden border-y border-gray-100 bg-gradient-to-b from-white to-gray-50/50 py-8">
      <div className="relative container mx-auto px-4 md:px-8 lg:px-12">
        {/* Title - très discret */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center text-xs font-medium tracking-wider text-gray-400 uppercase"
        >
          Ils nous font confiance
        </motion.p>

        {/* Infinite scroll container */}
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-gray-50/50 to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-gray-50/50 to-transparent" />

          {/* Scrolling logos */}
          <motion.div
            className="flex gap-12"
            animate={{
              x: [0, -1200],
            }}
            transition={{
              x: {
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex shrink-0 items-center justify-center opacity-40 grayscale transition-all duration-300 hover:opacity-70 hover:grayscale-0"
                style={{ width: `${logo.width}px` }}
              >
                {/* Placeholder logo - texte stylisé */}
                <div
                  className="font-bold tracking-tight text-gray-700"
                  style={{ fontSize: '20px' }}
                >
                  {logo.name}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
