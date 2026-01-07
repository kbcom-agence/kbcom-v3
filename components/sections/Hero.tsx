import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="from-primary via-primary to-primary-light relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br">
      {/* Background overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center md:px-8 lg:px-12">
        <h1 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
          Votre Agence Web à Tours
          <br />
          <span className="text-primary-contrast">
            Création de Sites Internet Performants & Référencés
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
          Nous transformons vos idées en sites web modernes, rapides et optimisés pour Google.
          Experts Next.js, React et SEO basés à Tours.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="text-primary inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Demander un Devis Gratuit
            <ArrowRight className="h-5 w-5" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/portfolio"
            className="hover:text-primary inline-flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Voir Nos Réalisations
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
