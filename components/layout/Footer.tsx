import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Linkedin, Twitter } from 'lucide-react';
import { footerSections, contactInfo, socialLinks, companyInfo } from '@/lib/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: KB-COM Info */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/assets/logo/kbcom_logo_dark.svg"
                alt="KB-COM Logo"
                width={160}
                height={40}
              />
            </Link>
            <p className="mb-4 text-sm text-gray-600">{contactInfo.tagline}</p>

            {/* Contact Information */}
            <div className="mb-6 space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
                <span>{contactInfo.address}</span>
              </div>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="hover:text-primary focus-visible:outline-primary-light flex items-center gap-2 rounded text-sm text-gray-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={`Appeler ${contactInfo.phone}`}
              >
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{contactInfo.phone}</span>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-primary focus-visible:outline-primary-light flex items-center gap-2 rounded text-sm text-gray-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={`Envoyer un email à ${contactInfo.email}`}
              >
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{contactInfo.email}</span>
              </a>
            </div>

            {/* Social Links */}
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
                    className="hover:bg-primary focus-visible:outline-primary-light rounded-lg bg-white p-2 text-gray-700 shadow-sm transition-all duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2, 3, 4: Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-primary focus-visible:outline-primary-light rounded text-sm text-gray-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <p>
                © {currentYear} {companyInfo.name}. Tous droits réservés.
              </p>
              <Link
                href="/sitemap.xml"
                className="hover:text-primary focus-visible:outline-primary-light rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Plan du site
              </Link>
            </div>
            <p className="text-center md:text-right">
              Made with{' '}
              <span className="text-red-500" aria-label="amour">
                ❤️
              </span>{' '}
              in {companyInfo.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
