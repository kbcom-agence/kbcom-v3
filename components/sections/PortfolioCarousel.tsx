'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const absDiff = Math.abs(diff);

    if (absDiff === 0) {
      // Card active au centre
      return {
        scale: 1,
        x: '0%',
        z: 0,
        opacity: 1,
        rotateY: 0,
      };
    } else if (diff === -1 || (activeIndex === 0 && index === projects.length - 1)) {
      // Card à gauche
      return {
        scale: 0.85,
        x: '-60%',
        z: -100,
        opacity: 0.6,
        rotateY: 25,
      };
    } else if (diff === 1 || (activeIndex === projects.length - 1 && index === 0)) {
      // Card à droite
      return {
        scale: 0.85,
        x: '60%',
        z: -100,
        opacity: 0.6,
        rotateY: -25,
      };
    } else {
      // Cards cachées
      return {
        scale: 0.7,
        x: diff < 0 ? '-100%' : '100%',
        z: -200,
        opacity: 0,
        rotateY: diff < 0 ? 45 : -45,
      };
    }
  };

  return (
    <section className="relative -mt-32 mb-16 overflow-hidden py-20 md:-mt-48 md:py-32">
      {/* Gradient fade top */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-32 bg-gradient-to-b from-white to-transparent" />

      <div className="relative container mx-auto px-4">
        {/* 3D Carousel Container */}
        <div
          className="relative mx-auto h-[400px] w-full max-w-4xl md:h-[500px]"
          style={{ perspective: '2000px' }}
        >
          {projects.map((project, index) => {
            const style = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={project.id}
                className="absolute top-1/2 left-1/2 w-[85%] max-w-2xl cursor-pointer md:w-[70%]"
                style={{
                  originX: 0.5,
                  originY: 0.5,
                }}
                animate={{
                  scale: style.scale,
                  x: `calc(-50% + ${style.x})`,
                  y: '-50%',
                  z: style.z,
                  opacity: style.opacity,
                  rotateY: style.rotateY,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.32, 0.72, 0, 1],
                }}
                onClick={() => setActiveIndex(index)}
                whileHover={isActive ? { scale: 1.02 } : {}}
              >
                <div
                  className={`group relative aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 shadow-2xl transition-shadow duration-300 ${
                    isActive ? 'shadow-[0_25px_50px_-12px_rgba(58,103,255,0.25)]' : ''
                  }`}
                >
                  {/* Placeholder */}
                  <div className="from-primary/5 to-primary/10 absolute inset-0 flex items-center justify-center bg-gradient-to-br">
                    <span className="text-8xl opacity-40">{project.placeholder}</span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <h3 className="text-xl font-bold text-white md:text-2xl">{project.title}</h3>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-primary h-3 w-3 rounded-full shadow-lg" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="mt-12 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-primary w-8' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au projet ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Gradient fade bottom */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}
