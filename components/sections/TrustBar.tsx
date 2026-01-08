'use client';

import { motion } from 'framer-motion';

export function TrustBar() {
  const clients = [
    { name: 'Client 1', logo: '🏢' },
    { name: 'Client 2', logo: '🏪' },
    { name: 'Client 3', logo: '🏭' },
    { name: 'Client 4', logo: '🏛️' },
    { name: 'Client 5', logo: '🏦' },
    { name: 'Client 6', logo: '🏥' },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-sm font-semibold tracking-wider text-gray-600 uppercase"
        >
          Ils nous font confiance
        </motion.p>

        <div className="grid grid-cols-2 items-center justify-items-center gap-6 md:grid-cols-3 lg:grid-cols-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex h-24 w-full items-center justify-center rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="text-5xl" aria-label={client.name}>
                {client.logo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
