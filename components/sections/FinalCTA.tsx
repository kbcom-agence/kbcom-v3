import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { contactInfo } from '@/lib/navigation';

export function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-[#3a67ff] to-[#2a4fd9] py-20">
      <div className="container mx-auto px-4 text-center md:px-8 lg:px-12">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Prêt à Lancer Votre Projet Web ?
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
          Obtenez un devis gratuit en moins de 24 heures
        </p>

        {/* Primary CTA */}
        <Link
          href="/contact"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-base font-semibold text-[#3a67ff] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Demander un Devis
          <ArrowRight className="h-5 w-5" />
        </Link>

        {/* Secondary CTA - Phone */}
        <div className="text-white/90">
          <p className="mb-2 text-sm">Ou appelez-nous :</p>
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 rounded text-xl font-semibold text-white transition-colors hover:text-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={`Appeler ${contactInfo.phone}`}
          >
            <Phone className="h-5 w-5" />
            {contactInfo.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
