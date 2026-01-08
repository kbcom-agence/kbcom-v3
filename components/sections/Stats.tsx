'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  {
    value: 5,
    suffix: '+',
    label: "Années d'Expérience",
  },
  {
    value: 50,
    suffix: '+',
    label: 'Projets Réalisés',
  },
  {
    value: 40,
    suffix: '+',
    label: 'Clients Satisfaits',
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-primary/10 absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/10 absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Gradient circle background */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="from-primary/5 to-accent/5 h-40 w-40 rounded-full bg-gradient-to-br blur-2xl" />
              </div>

              {/* Value */}
              <div className="from-primary to-accent mb-3 bg-gradient-to-r bg-clip-text text-6xl font-black text-transparent md:text-7xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <div className="text-base font-semibold tracking-wider text-gray-600 uppercase md:text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
