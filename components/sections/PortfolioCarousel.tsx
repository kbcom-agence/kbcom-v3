'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Placeholder pour vos images de réalisations
const projects = [
  {
    id: 1,
    title: 'E-commerce Boutique Mode',
    image: '/images/portfolio/project1.jpg',
    placeholder: '🛍️',
  },
  {
    id: 2,
    title: 'Site Vitrine Restaurant',
    image: '/images/portfolio/project2.jpg',
    placeholder: '🍽️',
  },
  {
    id: 3,
    title: 'Application SaaS',
    image: '/images/portfolio/project3.jpg',
    placeholder: '💼',
  },
  {
    id: 4,
    title: 'Portfolio Photographe',
    image: '/images/portfolio/project4.jpg',
    placeholder: '📸',
  },
  {
    id: 5,
    title: 'Site Immobilier',
    image: '/images/portfolio/project5.jpg',
    placeholder: '🏠',
  },
];

export function PortfolioCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative -mt-32 mb-32 md:-mt-48">
      {/* Gradient fade top */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-32 bg-gradient-to-b from-white to-transparent" />

      <div className="relative container mx-auto px-4 md:px-8 lg:px-12">
        {/* Carousel container */}
        <div className="relative mx-auto max-w-7xl">
          <div className="flex gap-6 overflow-hidden rounded-3xl">
            <motion.div
              className="flex gap-6"
              animate={{
                x: `-${currentIndex * (100 / 3)}%`,
              }}
              transition={{
                duration: 0.8,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              {projects.concat(projects).map((project, index) => (
                <motion.div
                  key={`${project.id}-${index}`}
                  className="min-w-[calc(100%-24px)] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 shadow-2xl">
                    {/* Placeholder avec gradient */}
                    <div className="from-primary/5 to-primary/10 absolute inset-0 flex items-center justify-center bg-gradient-to-br">
                      <span className="text-8xl opacity-40">{project.placeholder}</span>
                    </div>

                    {/* Overlay au hover */}
                    <div className="from-primary/0 to-primary/0 group-hover:from-primary/90 group-hover:to-primary-dark/90 absolute inset-0 flex items-center justify-center bg-gradient-to-br transition-all duration-500">
                      <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <h3 className="px-6 text-center text-xl font-bold text-white">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Reflection effect */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-primary w-8' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller au projet ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gradient fade bottom */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}
