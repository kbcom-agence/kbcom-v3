import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/metadata';

/**
 * Generates robots.txt configuration
 * Automatically served at /robots.txt
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // Block API routes (no SEO value)
          '/studio/', // Block Sanity Studio admin (future)
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
