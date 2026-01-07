import { SITE_NAME, SITE_URL } from './metadata';

/**
 * Schema.org Organization type
 */
export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': string;
    addressLocality: string;
    addressCountry: string;
  };
  contactPoint?: {
    '@type': string;
    contactType: string;
    email?: string;
    telephone?: string;
  };
  sameAs?: string[];
}

/**
 * Schema.org LocalBusiness type
 */
export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  image: string;
  '@id': string;
  url: string;
  telephone?: string;
  address: {
    '@type': string;
    streetAddress?: string;
    addressLocality: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: Array<{
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  sameAs?: string[];
}

/**
 * Generates Schema.org Organization JSON-LD markup
 *
 * @returns Organization schema object
 *
 * @example
 * ```tsx
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{
 *     __html: JSON.stringify(generateOrganizationSchema()),
 *   }}
 * />
 * ```
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo/kbcom_logo_dark.svg`,
    description:
      'Agence Web à Tours spécialisée en création de sites internet performants, e-commerce et SEO',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tours',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@kb-com.fr',
      // Phone number to be added when available
    },
    // Social media links to be added in future stories
    sameAs: [
      // 'https://www.facebook.com/kbcom',
      // 'https://www.linkedin.com/company/kbcom',
      // 'https://twitter.com/kbcom',
    ],
  };
}

/**
 * Generates Schema.org LocalBusiness JSON-LD markup
 * (To be used on homepage and contact page)
 *
 * @returns LocalBusiness schema object
 *
 * @example
 * ```tsx
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{
 *     __html: JSON.stringify(generateLocalBusinessSchema()),
 *   }}
 * />
 * ```
 */
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    image: `${SITE_URL}/assets/logo/kbcom_logo_dark.svg`,
    '@id': SITE_URL,
    url: SITE_URL,
    // Phone number to be added
    // telephone: '+33-X-XX-XX-XX-XX',
    address: {
      '@type': 'PostalAddress',
      // streetAddress: 'XX rue XXX', // To be added
      addressLocality: 'Tours',
      // postalCode: '37000', // To be added
      addressCountry: 'FR',
    },
    // Geo coordinates to be added when exact address available
    // geo: {
    //   '@type': 'GeoCoordinates',
    //   latitude: 47.394144,
    //   longitude: 0.68484,
    // },
    // Opening hours to be added
    // openingHoursSpecification: [
    //   {
    //     '@type': 'OpeningHoursSpecification',
    //     dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    //     opens: '09:00',
    //     closes: '18:00',
    //   },
    // ],
    sameAs: [
      // Social media links to be added
    ],
  };
}

/**
 * Schema.org WebSite type for site search
 */
export interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  potentialAction?: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}

/**
 * Generates Schema.org WebSite JSON-LD markup with search action
 * (To be used when site search is implemented)
 *
 * @returns WebSite schema object
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    // Search action to be uncommented when search is implemented
    // potentialAction: {
    //   '@type': 'SearchAction',
    //   target: {
    //     '@type': 'EntryPoint',
    //     urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    //   },
    //   'query-input': 'required name=search_term_string',
    // },
  };
}
