import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';

// Mock Next.js modules
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />);
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toBeDefined();
    expect(headline.textContent).toContain('Votre Agence Web à Tours');
  });

  it('renders the subheadline', () => {
    render(<Hero />);
    expect(screen.getByText(/Nous transformons vos idées en sites web modernes/i)).toBeDefined();
  });

  it('renders primary CTA button', () => {
    render(<Hero />);
    const ctaButton = screen.getByText('Demander un Devis Gratuit');
    expect(ctaButton).toBeDefined();
    expect(ctaButton.closest('a')?.getAttribute('href')).toBe('/contact');
  });

  it('renders secondary CTA button', () => {
    render(<Hero />);
    const secondaryCTA = screen.getByText('Voir Nos Réalisations');
    expect(secondaryCTA).toBeDefined();
    expect(secondaryCTA.closest('a')?.getAttribute('href')).toBe('/portfolio');
  });

  it('renders as a section element', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section');
    expect(section).toBeDefined();
  });
});
