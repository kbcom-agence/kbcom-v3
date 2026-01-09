'use client';

import { useState } from 'react';
import { Header } from './Header';
import { MobileMenu } from './MobileMenu';
import { Footer } from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <main id="main">{children}</main>
      <Footer />

      {/* Global bottom blur overlay */}
      <div
        className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 h-32"
        style={{
          background:
            'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 40%, transparent 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          maskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
        }}
      />
    </>
  );
}
