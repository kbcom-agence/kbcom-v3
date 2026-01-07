'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { navItems, contactInfo } from '@/lib/navigation';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main"
        className="focus:bg-primary focus:ring-primary-light sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:outline-none"
      >
        Aller au contenu principal
      </a>

      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
          isScrolled ? 'h-16 bg-white shadow-md' : 'h-20 bg-transparent md:bg-white md:shadow-sm'
        }`}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            aria-label="KB-COM - Retour à l'accueil"
            className="focus-visible:outline-primary-light flex items-center rounded-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Image
              src="/assets/logo/kbcom_logo_dark.svg"
              alt="KB-COM Logo"
              width={isScrolled ? 160 : 192}
              height={isScrolled ? 40 : 48}
              priority
              className="transition-all duration-300"
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
                      className={`hover:text-primary focus-visible:outline-primary-light flex items-center gap-1 rounded-lg px-4 py-2 text-base font-medium text-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        isActive(item.href) ? 'text-primary' : ''
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
                        className="absolute top-full left-0 z-50 mt-1 min-w-[240px] rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
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
                    className={`hover:text-primary focus-visible:outline-primary-light block rounded-lg px-4 py-2 text-base font-medium text-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isActive(item.href) ? 'text-primary border-primary border-b-2' : ''
                    }`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: Phone + Contact button + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Phone number (hidden on mobile) */}
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="hover:text-primary focus-visible:outline-primary-light hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 lg:flex"
              aria-label={`Appeler ${contactInfo.phone}`}
            >
              <Phone className="h-4 w-4" />
              <span>{contactInfo.phone}</span>
            </a>

            {/* Contact CTA button (hidden on mobile) */}
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark focus-visible:outline-primary-light hidden items-center rounded-xl px-6 py-2.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 md:inline-flex"
            >
              Contact
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

      {/* Spacer to prevent content from going under fixed header */}
      <div className={isScrolled ? 'h-16' : 'h-20'} />
    </>
  );
}
