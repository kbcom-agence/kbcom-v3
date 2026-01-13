import Link from "next/link";

const services = [
  { name: "Création de Sites Internet", href: "/services/creation-site-internet" },
  { name: "Référencement SEO", href: "/services/agence-seo" },
  { name: "Applications Web", href: "/services/application-web" },
  { name: "Automatisation", href: "/services/automatisation" },
];

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Réalisations", href: "/realisations" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Demande de devis", href: "/devis" },
];

const legal = [
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "Politique de confidentialité", href: "/politique-confidentialite" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-kb py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-white">KB-COM</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Agence web à Tours spécialisée en création de sites internet,
              référencement SEO, développement d&apos;applications web et
              automatisation.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Tours, France (37)</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@kb-com.fr"
                  className="text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  contact@kb-com.fr
                </a>
              </li>
              <li>
                <a
                  href="tel:+33600000000"
                  className="text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  06 00 00 00 00
                </a>
              </li>
            </ul>

            {/* CTA */}
            <Link
              href="/devis"
              className="inline-block mt-6 btn-gradient-primary text-sm"
            >
              Devis gratuit
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} KB-COM. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Schema.org LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://kb-com.fr/#organization",
            name: "KB-COM",
            description:
              "Agence web à Tours spécialisée en création de sites internet, référencement SEO, développement d'applications web et automatisation.",
            url: "https://kb-com.fr",
            logo: "https://kb-com.fr/logo.png",
            image: "https://kb-com.fr/og-image.jpg",
            telephone: "+33600000000",
            email: "contact@kb-com.fr",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tours",
              addressRegion: "Centre-Val de Loire",
              postalCode: "37000",
              addressCountry: "FR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 47.394144,
              longitude: 0.68484,
            },
            areaServed: [
              {
                "@type": "City",
                name: "Tours",
              },
              {
                "@type": "AdministrativeArea",
                name: "Indre-et-Loire",
              },
              {
                "@type": "AdministrativeArea",
                name: "Centre-Val de Loire",
              },
            ],
            priceRange: "€€",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
              },
            ],
            sameAs: [
              "https://www.linkedin.com/company/kb-com",
              "https://twitter.com/kbcom",
            ],
          }),
        }}
      />
    </footer>
  );
}
