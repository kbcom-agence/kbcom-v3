import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServicesPreview } from '@/components/sections/ServicesPreview';

// Mock Next.js modules
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('ServicesPreview', () => {
  it('renders the section heading', () => {
    render(<ServicesPreview />);
    expect(screen.getByText('Nos Services Web')).toBeDefined();
  });

  it('renders all 4 service cards', () => {
    render(<ServicesPreview />);
    expect(screen.getByText('Création de Sites Web')).toBeDefined();
    expect(screen.getByText('E-commerce')).toBeDefined();
    expect(screen.getByText('SEO & Référencement')).toBeDefined();
    expect(screen.getByText('Applications Web Sur Mesure')).toBeDefined();
  });

  it('each service card has "En savoir plus" link', () => {
    render(<ServicesPreview />);
    const links = screen.getAllByText('En savoir plus');
    expect(links.length).toBe(4);
  });

  it('service cards link to correct pages', () => {
    render(<ServicesPreview />);

    // Création de Sites Web
    const websiteCard = screen.getByText('Création de Sites Web').closest('div');
    const websiteLink = websiteCard?.querySelector('a');
    expect(websiteLink?.getAttribute('href')).toBe('/services/creation-sites-web');

    // E-commerce
    const ecommerceCard = screen.getByText('E-commerce').closest('div');
    const ecommerceLink = ecommerceCard?.querySelector('a');
    expect(ecommerceLink?.getAttribute('href')).toBe('/services/e-commerce');

    // SEO
    const seoCard = screen.getByText('SEO & Référencement').closest('div');
    const seoLink = seoCard?.querySelector('a');
    expect(seoLink?.getAttribute('href')).toBe('/services/seo-referencement');

    // Applications Web Sur Mesure
    const appsCard = screen.getByText('Applications Web Sur Mesure').closest('div');
    const appsLink = appsCard?.querySelector('a');
    expect(appsLink?.getAttribute('href')).toBe('/services/applications-web');
  });

  it('renders service descriptions', () => {
    render(<ServicesPreview />);
    expect(screen.getByText(/Sites vitrine modernes et responsives/i)).toBeDefined();
    expect(screen.getByText(/Boutiques en ligne performantes/i)).toBeDefined();
    expect(screen.getByText(/Stratégies SEO complètes/i)).toBeDefined();
    expect(screen.getByText(/Solutions web complexes et sur-mesure/i)).toBeDefined();
  });
});
