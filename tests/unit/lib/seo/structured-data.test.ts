import { describe, it, expect } from 'vitest';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
} from '@/lib/seo/structured-data';
import { SITE_NAME, SITE_URL } from '@/lib/seo/metadata';

describe('SEO Structured Data Utilities', () => {
  describe('generateOrganizationSchema', () => {
    it('should generate valid Organization schema', () => {
      const schema = generateOrganizationSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe(SITE_NAME);
      expect(schema.url).toBe(SITE_URL);
    });

    it('should include logo URL', () => {
      const schema = generateOrganizationSchema();

      expect(schema.logo).toContain('/assets/logo/kbcom_logo_dark.svg');
      expect(schema.logo).toContain(SITE_URL);
    });

    it('should include description', () => {
      const schema = generateOrganizationSchema();

      expect(schema.description).toBeTruthy();
      expect(schema.description).toContain('Agence Web');
    });

    it('should include address with Tours location', () => {
      const schema = generateOrganizationSchema();

      expect(schema.address).toMatchObject({
        '@type': 'PostalAddress',
        addressLocality: 'Tours',
        addressCountry: 'FR',
      });
    });

    it('should include contact point', () => {
      const schema = generateOrganizationSchema();

      expect(schema.contactPoint).toBeDefined();
      expect(schema.contactPoint?.['@type']).toBe('ContactPoint');
      expect(schema.contactPoint?.contactType).toBe('customer service');
      expect(schema.contactPoint?.email).toBe('contact@kb-com.fr');
    });

    it('should be valid JSON-LD', () => {
      const schema = generateOrganizationSchema();
      const jsonString = JSON.stringify(schema);

      expect(() => JSON.parse(jsonString)).not.toThrow();
    });
  });

  describe('generateLocalBusinessSchema', () => {
    it('should generate valid LocalBusiness schema', () => {
      const schema = generateLocalBusinessSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('LocalBusiness');
      expect(schema.name).toBe(SITE_NAME);
      expect(schema.url).toBe(SITE_URL);
      expect(schema['@id']).toBe(SITE_URL);
    });

    it('should include image and address', () => {
      const schema = generateLocalBusinessSchema();

      expect(schema.image).toContain('/assets/logo/kbcom_logo_dark.svg');
      expect(schema.address).toMatchObject({
        '@type': 'PostalAddress',
        addressLocality: 'Tours',
        addressCountry: 'FR',
      });
    });

    it('should be valid JSON-LD', () => {
      const schema = generateLocalBusinessSchema();
      const jsonString = JSON.stringify(schema);

      expect(() => JSON.parse(jsonString)).not.toThrow();
    });
  });

  describe('generateWebSiteSchema', () => {
    it('should generate valid WebSite schema', () => {
      const schema = generateWebSiteSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe(SITE_NAME);
      expect(schema.url).toBe(SITE_URL);
    });

    it('should be valid JSON-LD', () => {
      const schema = generateWebSiteSchema();
      const jsonString = JSON.stringify(schema);

      expect(() => JSON.parse(jsonString)).not.toThrow();
    });
  });

  describe('Schema.org compliance', () => {
    it('Organization schema should have all required fields', () => {
      const schema = generateOrganizationSchema();
      const requiredFields = ['@context', '@type', 'name', 'url'];

      requiredFields.forEach((field) => {
        expect(schema).toHaveProperty(field);
        expect(schema[field as keyof typeof schema]).toBeTruthy();
      });
    });

    it('LocalBusiness schema should have all required fields', () => {
      const schema = generateLocalBusinessSchema();
      const requiredFields = ['@context', '@type', 'name', 'address', '@id'];

      requiredFields.forEach((field) => {
        expect(schema).toHaveProperty(field);
      });
    });

    it('all schemas should use https://schema.org context', () => {
      const orgSchema = generateOrganizationSchema();
      const businessSchema = generateLocalBusinessSchema();
      const siteSchema = generateWebSiteSchema();

      expect(orgSchema['@context']).toBe('https://schema.org');
      expect(businessSchema['@context']).toBe('https://schema.org');
      expect(siteSchema['@context']).toBe('https://schema.org');
    });
  });
});
