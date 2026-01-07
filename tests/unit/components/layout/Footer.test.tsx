import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

// Mock Next.js modules
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('Footer', () => {
  it('renders the KB-COM logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('KB-COM Logo');
    expect(logo).toBeDefined();
  });

  it('renders the tagline', () => {
    render(<Footer />);
    expect(screen.getByText('Votre agence web à Tours')).toBeDefined();
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText('123 Rue Exemple, 37000 Tours, France')).toBeDefined();
    expect(screen.getByText('02 XX XX XX XX')).toBeDefined();
    expect(screen.getByText('contact@kb-com.fr')).toBeDefined();
  });

  it('renders Services section with all links', () => {
    render(<Footer />);
    expect(screen.getByText('Services', { selector: 'h3' })).toBeDefined();
    expect(screen.getByText('Création de Sites Web')).toBeDefined();
    expect(screen.getByText('E-commerce')).toBeDefined();
    expect(screen.getByText('SEO & Référencement')).toBeDefined();
    expect(screen.getByText('Applications Web Sur Mesure')).toBeDefined();
  });

  it('renders Ressources section with all links', () => {
    render(<Footer />);
    expect(screen.getByText('Ressources', { selector: 'h3' })).toBeDefined();
    expect(screen.getByText('Portfolio')).toBeDefined();
    expect(screen.getByText('Blog')).toBeDefined();
    expect(screen.getByText('À Propos')).toBeDefined();
    // Contact appears in multiple sections, so we just check it exists
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('renders Légal section with all links', () => {
    render(<Footer />);
    expect(screen.getByText('Légal', { selector: 'h3' })).toBeDefined();
    expect(screen.getByText('Politique de Confidentialité')).toBeDefined();
    expect(screen.getByText('Mentions Légales')).toBeDefined();
    expect(screen.getByText('Politique de Cookies')).toBeDefined();
  });

  it('renders copyright text with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} KB-COM`))).toBeDefined();
  });

  it('renders "Made with ❤️ in Tours" text', () => {
    render(<Footer />);
    expect(screen.getByText(/Made with/)).toBeDefined();
    expect(screen.getByText(/in Tours/)).toBeDefined();
  });

  it('renders sitemap link', () => {
    render(<Footer />);
    const sitemapLink = screen.getByText('Plan du site');
    expect(sitemapLink).toBeDefined();
    expect(sitemapLink.getAttribute('href')).toBe('/sitemap.xml');
  });

  it('renders social media links', () => {
    render(<Footer />);
    const linkedinLink = screen.getByLabelText('Suivez-nous sur LinkedIn');
    const twitterLink = screen.getByLabelText('Suivez-nous sur Twitter');
    expect(linkedinLink).toBeDefined();
    expect(twitterLink).toBeDefined();
  });

  it('has correct contact links with href attributes', () => {
    render(<Footer />);

    // Phone link
    const phoneLink = screen.getByLabelText('Appeler 02 XX XX XX XX');
    expect(phoneLink.getAttribute('href')).toBe('tel:02XXXXXXXX');

    // Email link
    const emailLink = screen.getByLabelText('Envoyer un email à contact@kb-com.fr');
    expect(emailLink.getAttribute('href')).toBe('mailto:contact@kb-com.fr');
  });
});
