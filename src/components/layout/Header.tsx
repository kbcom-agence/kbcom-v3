"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Accueil", href: "/" },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Création de Sites", href: "/services/creation-site-internet" },
      { name: "Référencement SEO", href: "/services/referencement-seo" },
      { name: "Applications Web", href: "/services/application-web" },
      { name: "Automatisation", href: "/services/automatisation" },
    ],
  },
  { name: "Réalisations", href: "/realisations" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={`
          mx-auto max-w-6xl rounded-2xl border transition-all duration-300
          ${
            scrolled
              ? "bg-white/70 border-white/40 shadow-lg shadow-blue-500/5"
              : "bg-white/50 border-white/30"
          }
          backdrop-blur-xl
        `}
        aria-label="Navigation principale"
      >
        <div className="flex items-center justify-between h-14 px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">KB</span>
            </div>
            <span className="text-lg font-bold text-gray-900">KB-COM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-white/50 flex items-center gap-1">
                    {item.name}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown glassmorphisme */}
                  <div
                    className={`
                      absolute top-full left-0 mt-2 w-56 rounded-xl border border-white/40
                      bg-white/70 backdrop-blur-xl shadow-xl shadow-blue-500/10
                      py-2 transition-all duration-200 origin-top
                      ${servicesOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                    `}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-white/50"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* CTA Button - Style pill 3D */}
          <div className="hidden md:block">
            <Link
              href="/devis"
              className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
                boxShadow: `
                  0 1px 2px rgba(0,0,0,0.1),
                  0 2px 4px rgba(59,130,246,0.3),
                  0 4px 8px rgba(99,102,241,0.15),
                  inset 0 1px 1px rgba(255,255,255,0.4),
                  inset 0 -1px 1px rgba(0,0,0,0.1)
                `
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent" style={{ height: '50%' }} />
              <span className="relative text-sm font-semibold text-white drop-shadow-sm">Devis gratuit</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu glassmorphisme */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300
            ${mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"}
          `}
        >
          <div className="px-4 pt-2 border-t border-white/30">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-600 font-medium flex items-center justify-between rounded-lg hover:bg-white/50"
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all ${servicesOpen ? "max-h-48" : "max-h-0"}`}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-8 py-2 text-sm text-gray-500"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2.5 text-sm text-gray-600 font-medium rounded-lg hover:bg-white/50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="px-4 pt-3">
              <Link
                href="/devis"
                className="relative flex items-center justify-center w-full px-5 py-3 overflow-hidden rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
                  boxShadow: `
                    0 1px 2px rgba(0,0,0,0.1),
                    0 2px 4px rgba(59,130,246,0.3),
                    inset 0 1px 1px rgba(255,255,255,0.4)
                  `
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent" style={{ height: '50%' }} />
                <span className="relative text-sm font-semibold text-white">Devis gratuit</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
