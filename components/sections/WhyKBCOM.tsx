import { CheckCircle, Zap, Award, Users } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Expertise Technique',
    description:
      'Maîtrise des technologies modernes (Next.js, React, TypeScript) pour des sites ultra-performants et évolutifs.',
  },
  {
    icon: Award,
    title: 'SEO Garanti',
    description:
      'Objectif Top 3 Google sur vos mots-clés cibles. Stratégie SEO intégrée dès la conception du projet.',
  },
  {
    icon: Users,
    title: 'Accompagnement Local',
    description:
      'Basés à Tours, nous sommes disponibles pour des rendez-vous en personne et un suivi personnalisé de votre projet.',
  },
];

export function WhyKBCOM() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Pourquoi Choisir KB-COM ?
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="mb-4 rounded-full bg-[#3a67ff]/10 p-4">
                  <Icon className="h-8 w-8 text-[#3a67ff]" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">{benefit.title}</h3>

                <p className="leading-relaxed text-gray-600">{benefit.description}</p>

                <CheckCircle className="mt-4 h-6 w-6 text-green-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
