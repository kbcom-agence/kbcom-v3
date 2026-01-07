import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/metadata';

/**
 * Generates dynamic sitemap for the website
 * Automatically served at /sitemap.xml
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return [
    // Homepage - highest priority, updated weekly
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Main service pages - high priority
    {
      url: `${SITE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Portfolio - high priority, updated frequently
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // About page - medium priority, updated monthly
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Blog listing - medium priority, updated daily
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.6,
    },
    // Contact page - high priority for conversion
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Future: Dynamic pages will be added here
    // - Blog posts from Sanity CMS (Story 4.x)
    // - Portfolio projects (Story 3.x)
    // - Geographic landing pages (Story 5.x)
  ];
}
