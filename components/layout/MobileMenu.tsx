'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, ChevronDown, Phone, Mail, MapPin, Linkedin, Twitter } from 'lucide-react';
import { navItems, contactInfo, socialLinks } from '@/lib/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const isActive = (href: string) => pathname === href;

  const handleAccordionToggle = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm overflow-y-auto bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="focus-visible:outline-primary-light rounded-lg p-2 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X className="h-6 w-6 text-gray-900" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4" aria-label="Navigation mobile">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.dropdown ? (
                  // Accordion for dropdown items
                  <div>
                    <button
                      onClick={() => handleAccordionToggle(item.label)}
                      aria-expanded={expandedItem === item.label}
                      className="focus-visible:outline-primary-light flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          expandedItem === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Sub-items */}
                    {expandedItem === item.label && (
                      <ul className="mt-2 ml-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              onClick={onClose}
                              className={`hover:text-primary focus-visible:outline-primary-light block rounded-lg px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                                isActive(subItem.href) ? 'text-primary bg-gray-50' : ''
                              }`}
                              aria-current={isActive(subItem.href) ? 'page' : undefined}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Regular nav link
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`focus-visible:outline-primary-light block rounded-lg px-4 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isActive(item.href) ? 'text-primary border-primary border-l-4 bg-gray-50' : ''
                    }`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="px-4 py-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="bg-primary hover:bg-primary-dark focus-visible:outline-primary-light flex w-full items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Demander un Devis
          </Link>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-200 px-4 py-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Contact</h3>
          <ul className="space-y-3">
            <li>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="hover:text-primary focus-visible:outline-primary-light flex items-center gap-3 rounded-lg p-2 text-sm text-gray-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={`Appeler ${contactInfo.phone}`}
              >
                <Phone className="h-5 w-5" />
                <span>{contactInfo.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-primary focus-visible:outline-primary-light flex items-center gap-3 rounded-lg p-2 text-sm text-gray-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={`Envoyer un email à ${contactInfo.email}`}
              >
                <Mail className="h-5 w-5" />
                <span>{contactInfo.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-3 p-2 text-sm text-gray-700">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <span>{contactInfo.address}</span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-200 px-4 py-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Suivez-nous</h3>
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon === 'Linkedin' ? Linkedin : Twitter;
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Suivez-nous sur ${social.platform}`}
                  className="hover:bg-primary focus-visible:outline-primary-light rounded-lg bg-gray-100 p-2.5 text-gray-700 transition-all duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
