import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileMenu } from '@/components/layout/MobileMenu';

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

describe('MobileMenu', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  afterEach(() => {
    // Reset body overflow style
    document.body.style.overflow = 'unset';
  });

  it('does not render when isOpen is false', () => {
    render(<MobileMenu isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByText('Menu')).toBeNull();
  });

  it('renders when isOpen is true', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Menu')).toBeDefined();
  });

  it('renders all navigation items', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Services')).toBeDefined();
    expect(screen.getByText('Portfolio')).toBeDefined();
    expect(screen.getByText('À Propos')).toBeDefined();
    expect(screen.getByText('Blog')).toBeDefined();
    // Contact appears in multiple places (nav + section title), so use getAllByText
    const contactElements = screen.getAllByText('Contact');
    expect(contactElements.length).toBeGreaterThan(0);
  });

  it('renders the close button', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
    const closeButton = screen.getByLabelText('Fermer le menu');
    expect(closeButton).toBeDefined();
  });

  it('calls onClose when close button is clicked', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
    const closeButton = screen.getByLabelText('Fermer le menu');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
    const backdrop = screen.getByRole('dialog').previousElementSibling as HTMLElement;
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders the CTA button "Demander un Devis"', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Demander un Devis')).toBeDefined();
  });

  it('renders contact information', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('02 XX XX XX XX')).toBeDefined();
    expect(screen.getByText('contact@kb-com.fr')).toBeDefined();
    expect(screen.getByText('123 Rue Exemple, 37000 Tours, France')).toBeDefined();
  });

  it('renders social links section', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Suivez-nous')).toBeDefined();
  });

  it('expands Services accordion when clicked', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
    const servicesButton = screen.getByText('Services').closest('button');
    expect(servicesButton).toBeDefined();

    // Initially, dropdown items should not be visible
    expect(screen.queryByText('Création de Sites Web')).toBeNull();

    // Click to expand
    if (servicesButton) {
      fireEvent.click(servicesButton);
    }

    // Now dropdown items should be visible
    expect(screen.getByText('Création de Sites Web')).toBeDefined();
    expect(screen.getByText('E-commerce')).toBeDefined();
    expect(screen.getByText('SEO & Référencement')).toBeDefined();
    expect(screen.getByText('Applications Web Sur Mesure')).toBeDefined();
  });

  it('prevents body scroll when menu is open', () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
    expect(document.body.style.overflow).toBe('hidden');
  });
});
