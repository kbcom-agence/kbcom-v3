'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Placeholder pour vos images de réalisations
// Remplacez par vos vraies images
const projects = [
  {
    id: 1,
    title: 'E-commerce Boutique Mode',
    image: '/images/portfolio/project1.jpg', // À remplacer
    placeholder: '🛍️',
  },
  {
    id: 2,
    title: 'Site Vitrine Restaurant',
    image: '/images/portfolio/project2.jpg', // À remplacer
    placeholder: '🍽️',
  },
  {
    id: 3,
    title: 'Application SaaS',
    image: '/images/portfolio/project3.jpg', // À remplacer
    placeholder: '💼',
  },
  {
    id: 4,
    title: 'Portfolio Photographe',
    image: '/images/portfolio/project4.jpg', // À remplacer
    placeholder: '📸',
  },
  {
    id: 5,
    title: 'Site Immobilier',
    image: '/images/portfolio/project5.jpg', // À remplacer
    placeholder: '🏠',
  },
];

export function PortfolioCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 3000); // Change toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 font-['Cal_Sans',Inter,sans-serif] text-3xl font-bold text-gray-900 md:text-4xl">
            Nos Dernières Réalisations
          </h2>
          <p className="text-gray-600">Des projets qui performent et convertissent</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative mx-auto max-w-5xl">
          <div className="flex gap-6 overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: `-${currentIndex * 100}%`,
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              {projects.concat(projects).map((project, index) => (
                <motion.div
                  key={`${project.id}-${index}`}
                  className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-lg">
                    {/* Placeholder - Remplacez par vraies images */}
                    <div className="from-primary/10 to-primary/5 absolute inset-0 flex items-center justify-center bg-gradient-to-br">
                      <span className="text-8xl">{project.placeholder}</span>
                    </div>

                    {/* Overlay au hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/0 transition-all duration-300 group-hover:bg-gray-900/80">
                      <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <h3 className="px-6 text-center font-semibold text-white">
                          {project.title}
                        </h3>
                      </div>
                    </div>
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
    </section>
  );
}
