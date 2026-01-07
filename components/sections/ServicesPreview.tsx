import Link from 'next/link';
import { Monitor, ShoppingCart, TrendingUp, Settings, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: 'Création de Sites Web',
    description:
      'Sites vitrine modernes et responsives, optimisés pour le référencement naturel. Next.js, React, performances garanties.',
    href: '/services/creation-sites-web',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description:
      'Boutiques en ligne performantes avec gestion de catalogue, paiements sécurisés, et expérience utilisateur optimale.',
    href: '/services/e-commerce',
  },
  {
    icon: TrendingUp,
    title: 'SEO & Référencement',
    description:
      'Stratégies SEO complètes pour atteindre le Top 3 Google sur vos mots-clés cibles. Audits, optimisation, suivi mensuel.',
    href: '/services/seo-referencement',
  },
  {
    icon: Settings,
    title: 'Applications Web Sur Mesure',
    description:
      'Solutions web complexes et sur-mesure : SaaS, CRM, plateformes internes. Technologies modernes et évolutives.',
    href: '/services/applications-web',
  },
];

export function ServicesPreview() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Nos Services Web
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-gray-300 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#3a67ff] hover:shadow-lg"
              >
                <div className="mb-4">
                  <Icon className="h-12 w-12 text-[#3a67ff]" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">{service.title}</h3>

                <p className="mb-6 leading-relaxed text-gray-600">{service.description}</p>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 rounded font-medium text-[#3a67ff] transition-all duration-300 hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8aff]"
                >
                  En savoir plus
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
