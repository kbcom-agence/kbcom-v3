import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/Header';

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

describe('Header', () => {
  const mockOnMenuClick = vi.fn();

  it('renders the KB-COM logo', () => {
    render(<Header onMenuClick={mockOnMenuClick} />);
    const logo = screen.getByAltText('KB-COM Logo');
    expect(logo).toBeDefined();
  });

  it('renders all navigation items', () => {
    render(<Header onMenuClick={mockOnMenuClick} />);
    expect(screen.getByText('Services')).toBeDefined();
    expect(screen.getByText('Portfolio')).toBeDefined();
    expect(screen.getByText('À Propos')).toBeDefined();
    expect(screen.getByText('Blog')).toBeDefined();
    // Contact appears multiple times (nav and button), so use getAllByText
    const contactElements = screen.getAllByText('Contact');
    expect(contactElements.length).toBeGreaterThan(0);
  });

  it('renders the skip to main content link', () => {
    render(<Header onMenuClick={mockOnMenuClick} />);
    const skipLink = screen.getByText('Aller au contenu principal');
    expect(skipLink).toBeDefined();
    expect(skipLink.getAttribute('href')).toBe('#main');
  });

  it('renders the hamburger menu button', () => {
    render(<Header onMenuClick={mockOnMenuClick} />);
    const hamburgerButton = screen.getByLabelText('Ouvrir le menu de navigation');
    expect(hamburgerButton).toBeDefined();
  });

  it('calls onMenuClick when hamburger button is clicked', () => {
    render(<Header onMenuClick={mockOnMenuClick} />);
    const hamburgerButton = screen.getByLabelText('Ouvrir le menu de navigation');
    hamburgerButton.click();
    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  it('renders the contact CTA button', () => {
    render(<Header onMenuClick={mockOnMenuClick} />);
    const contactButtons = screen.getAllByText('Contact');
    // Should have at least one Contact button (desktop CTA)
    expect(contactButtons.length).toBeGreaterThan(0);
  });
});
