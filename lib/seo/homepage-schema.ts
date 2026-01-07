/**
 * Generate LocalBusiness Schema.org markup for homepage
 * Optimized for local SEO in Tours, France
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'KB-COM',
    image: 'https://kb-com.fr/assets/logo/kbcom_logo_dark.svg',
    '@id': 'https://kb-com.fr',
    url: 'https://kb-com.fr',
    telephone: '+33-2-XX-XX-XX-XX',
    email: 'contact@kb-com.fr',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Rue Exemple',
      addressLocality: 'Tours',
      postalCode: '37000',
      addressRegion: 'Centre-Val de Loire',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.394144,
      longitude: 0.68484,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: ['https://linkedin.com/company/kbcom', 'https://twitter.com/kbcom'],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 47.394144,
        longitude: 0.68484,
      },
      geoRadius: '50000', // 50km service radius
    },
  };
}
