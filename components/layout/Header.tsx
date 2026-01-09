'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Menu } from 'lucide-react';
import { navItems } from '@/lib/navigation';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Détermine si on est en haut de la page
      setIsAtTop(currentScrollY < 50);

      // Détermine la direction du scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isActive = (href: string) => pathname === href;

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Header disparaît quand on scroll vers le bas, apparaît quand on scroll vers le haut
  const headerClasses = `fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
    scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
  } ${isAtTop ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm'}`;

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main"
        className="focus:bg-primary focus:ring-primary-light sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:outline-none"
      >
        Aller au contenu principal
      </a>

      <header className={headerClasses}>
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
          {/* Logo KB */}
          <Link
            href="/"
            aria-label="KB-COM - Retour à l'accueil"
            className="focus-visible:outline-primary-light flex items-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <img
              src="/images/kb-logo.svg"
              alt="KB-COM Logo"
              className="h-12 w-12 transition-transform duration-300 hover:scale-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  // Dropdown menu
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      aria-label={`Menu ${item.label}`}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      className={`hover:text-primary focus-visible:outline-primary-light flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        isActive(item.href)
                          ? 'text-primary'
                          : isAtTop
                            ? 'text-gray-900'
                            : 'text-gray-900'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown content */}
                    {openDropdown === item.label && (
                      <div
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute top-full left-0 z-50 mt-1 min-w-[240px] rounded-xl border border-gray-200 bg-white py-2 shadow-xl"
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`hover:text-primary focus-visible:outline-primary-light block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                              isActive(subItem.href) ? 'text-primary bg-gray-50' : ''
                            }`}
                            aria-current={isActive(subItem.href) ? 'page' : undefined}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular nav link
                  <Link
                    href={item.href}
                    className={`hover:text-primary focus-visible:outline-primary-light block rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isActive(item.href)
                        ? 'text-primary'
                        : isAtTop
                          ? 'text-gray-900'
                          : 'text-gray-900'
                    }`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: Contact CTA + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Contact CTA button (hidden on mobile) */}
            <Link
              href="/contact"
              className="from-primary-light via-primary to-primary-dark focus-visible:outline-primary-light hover:shadow-primary/40 hidden items-center rounded-full border-2 border-white/30 bg-gradient-to-b px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 md:inline-flex"
            >
              Démarrer un projet
            </Link>

            {/* Hamburger menu button (mobile only) */}
            <button
              onClick={onMenuClick}
              aria-label="Ouvrir le menu de navigation"
              aria-expanded="false"
              className="focus-visible:outline-primary-light rounded-lg p-2 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
            >
              <Menu className="h-6 w-6 text-gray-900" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
