import type { Metadata } from 'next';

/**
 * Site-wide constants for metadata generation
 */
export const SITE_NAME = 'KB-COM';
export const SITE_URL = 'https://kb-com.fr';
export const SITE_TITLE = 'KB-COM - Agence Web à Tours';
export const SITE_DESCRIPTION =
  'Agence Web à Tours spécialisée en création de sites internet performants, e-commerce et SEO. Expertise Next.js, React et solutions sur mesure.';
export const DEFAULT_KEYWORDS = [
  'agence web Tours',
  'création site internet Tours',
  'développement web Tours',
  'SEO Tours',
  'e-commerce Tours',
  'Next.js',
  'React',
];

/**
 * Parameters for generating page-specific metadata
 */
export interface PageMetadataParams {
  /** Page title (will be suffixed with "| KB-COM") */
  title: string;
  /** Meta description (150-160 characters recommended) */
  description: string;
  /** Page path (e.g., "/services", "/about") */
  path: string;
  /** Optional keywords for the page */
  keywords?: string[];
  /** Optional Open Graph image URL */
  ogImage?: string;
}

/**
 * Generates Next.js Metadata object for a page
 *
 * @param params - Page metadata parameters
 * @returns Next.js Metadata object with SEO-optimized values
 *
 * @example
 * ```ts
 * export const metadata = generatePageMetadata({
 *   title: 'Services',
 *   description: 'Découvrez nos services de création web...',
 *   path: '/services',
 *   keywords: ['création site', 'développement web'],
 * });
 * ```
 */
export function generatePageMetadata(params: PageMetadataParams): Metadata {
  const {
    title,
    description,
    path,
    keywords = DEFAULT_KEYWORDS,
    ogImage = `${SITE_URL}/og-image.png`,
  } = params;

  const canonicalUrl = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * Generates default metadata for the root layout
 *
 * @returns Default Next.js Metadata object
 */
export function generateDefaultMetadata(): Metadata {
  return {
    title: {
      template: `%s | ${SITE_NAME}`,
      default: SITE_TITLE,
    },
    description: SITE_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // To be added when Search Console is set up
      // google: 'verification-token',
    },
  };
}
