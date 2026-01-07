import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

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

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
    expect(screen.getByRole('main')).toBeDefined();
  });

  it('has single H1 with correct text', () => {
    render(<HomePage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeDefined();
    expect(h1.textContent).toContain('Votre Agence Web à Tours');
  });

  it('renders primary CTA linking to contact page', () => {
    render(<HomePage />);
    const ctaButtons = screen.getAllByText(/Demander un Devis/i);
    expect(ctaButtons.length).toBeGreaterThan(0);
    // Check at least one links to /contact
    const contactLinks = ctaButtons.filter(
      (btn) => btn.closest('a')?.getAttribute('href') === '/contact'
    );
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it('renders all 4 service cards', () => {
    render(<HomePage />);
    expect(screen.getByText('Création de Sites Web')).toBeDefined();
    expect(screen.getByText('E-commerce')).toBeDefined();
    expect(screen.getByText('SEO & Référencement')).toBeDefined();
    expect(screen.getByText('Applications Web Sur Mesure')).toBeDefined();
  });

  it('renders "Nos Services Web" section heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Nos Services Web')).toBeDefined();
  });

  it('renders "Pourquoi Choisir KB-COM ?" section heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Pourquoi Choisir KB-COM ?')).toBeDefined();
  });

  it('renders trust bar with "Ils nous font confiance" text', () => {
    render(<HomePage />);
    expect(screen.getByText('Ils nous font confiance')).toBeDefined();
  });

  it('renders stats section with experience metric', () => {
    render(<HomePage />);
    expect(screen.getByText(/Années d'Expérience/i)).toBeDefined();
  });

  it('renders final CTA section', () => {
    render(<HomePage />);
    expect(screen.getByText('Prêt à Lancer Votre Projet Web ?')).toBeDefined();
  });
});
