import { describe, it, expect } from 'vitest';
import {
  generatePageMetadata,
  generateDefaultMetadata,
  SITE_NAME,
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  DEFAULT_KEYWORDS,
} from '@/lib/seo/metadata';

describe('SEO Metadata Utilities', () => {
  describe('generatePageMetadata', () => {
    it('should generate correct metadata structure', () => {
      const metadata = generatePageMetadata({
        title: 'Services',
        description: 'Nos services de développement web',
        path: '/services',
      });

      expect(metadata).toHaveProperty('title', 'Services');
      expect(metadata).toHaveProperty('description', 'Nos services de développement web');
      expect(metadata).toHaveProperty('keywords');
      expect(metadata).toHaveProperty('openGraph');
      expect(metadata).toHaveProperty('twitter');
      expect(metadata).toHaveProperty('alternates');
    });

    it('should apply title with site name in OpenGraph', () => {
      const metadata = generatePageMetadata({
        title: 'About',
        description: 'À propos de KB-COM',
        path: '/about',
      });

      expect(metadata.openGraph?.title).toBe(`About | ${SITE_NAME}`);
    });

    it('should generate correct canonical URL', () => {
      const metadata = generatePageMetadata({
        title: 'Contact',
        description: 'Contactez-nous',
        path: '/contact',
      });

      expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/contact`);
      expect(metadata.openGraph?.url).toBe(`${SITE_URL}/contact`);
    });

    it('should use default keywords when not provided', () => {
      const metadata = generatePageMetadata({
        title: 'Portfolio',
        description: 'Nos réalisations',
        path: '/portfolio',
      });

      expect(metadata.keywords).toEqual(DEFAULT_KEYWORDS);
    });

    it('should use custom keywords when provided', () => {
      const customKeywords = ['portfolio', 'projets', 'réalisations'];
      const metadata = generatePageMetadata({
        title: 'Portfolio',
        description: 'Nos réalisations',
        path: '/portfolio',
        keywords: customKeywords,
      });

      expect(metadata.keywords).toEqual(customKeywords);
    });

    it('should include OpenGraph metadata with correct locale', () => {
      const metadata = generatePageMetadata({
        title: 'Services',
        description: 'Nos services',
        path: '/services',
      });

      expect(metadata.openGraph).toMatchObject({
        locale: 'fr_FR',
        type: 'website',
        siteName: SITE_NAME,
      });
    });

    it('should include Twitter Card metadata', () => {
      const metadata = generatePageMetadata({
        title: 'Blog',
        description: 'Articles et actualités',
        path: '/blog',
      });

      expect(metadata.twitter).toMatchObject({
        card: 'summary_large_image',
        title: `Blog | ${SITE_NAME}`,
        description: 'Articles et actualités',
      });
    });

    it('should use custom OG image when provided', () => {
      const customOgImage = `${SITE_URL}/custom-og.png`;
      const metadata = generatePageMetadata({
        title: 'Services',
        description: 'Nos services',
        path: '/services',
        ogImage: customOgImage,
      });

      expect(metadata.openGraph?.images).toEqual([
        {
          url: customOgImage,
          width: 1200,
          height: 630,
          alt: 'Services',
        },
      ]);
    });
  });

  describe('generateDefaultMetadata', () => {
    it('should generate default metadata with title template', () => {
      const metadata = generateDefaultMetadata();

      expect(metadata.title).toMatchObject({
        template: `%s | ${SITE_NAME}`,
        default: SITE_TITLE,
      });
    });

    it('should include default description and keywords', () => {
      const metadata = generateDefaultMetadata();

      expect(metadata.description).toBe(SITE_DESCRIPTION);
      expect(metadata.keywords).toEqual(DEFAULT_KEYWORDS);
    });

    it('should set metadataBase to site URL', () => {
      const metadata = generateDefaultMetadata();

      expect(metadata.metadataBase).toEqual(new URL(SITE_URL));
    });

    it('should include robots configuration', () => {
      const metadata = generateDefaultMetadata();

      expect(metadata.robots).toMatchObject({
        index: true,
        follow: true,
      });
    });

    it('should include OpenGraph default configuration', () => {
      const metadata = generateDefaultMetadata();

      expect(metadata.openGraph).toMatchObject({
        type: 'website',
        locale: 'fr_FR',
        url: SITE_URL,
        siteName: SITE_NAME,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
      });
    });
  });

  describe('Constants', () => {
    it('should have correct site constants', () => {
      expect(SITE_NAME).toBe('KB-COM');
      expect(SITE_URL).toBe('https://kb-com.fr');
      expect(SITE_TITLE).toContain('KB-COM');
      expect(SITE_TITLE).toContain('Tours');
      expect(SITE_DESCRIPTION).toContain('Agence Web');
      expect(SITE_DESCRIPTION).toContain('Tours');
    });

    it('should have default keywords array', () => {
      expect(Array.isArray(DEFAULT_KEYWORDS)).toBe(true);
      expect(DEFAULT_KEYWORDS.length).toBeGreaterThan(0);
      expect(DEFAULT_KEYWORDS).toContain('agence web Tours');
    });
  });
});
