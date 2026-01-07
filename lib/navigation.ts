/**
 * Navigation Configuration
 * Centralized navigation structure for Header, Footer, and MobileMenu
 */

export interface NavItem {
  label: string;
  href: string;
  dropdown?: NavItem[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

/**
 * Primary Navigation Items
 * Used in Header and MobileMenu
 */
export const navItems: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Création de Sites Web', href: '/services/creation-sites-web' },
      { label: 'E-commerce', href: '/services/e-commerce' },
      { label: 'SEO & Référencement', href: '/services/seo-referencement' },
      {
        label: 'Applications Web Sur Mesure',
        href: '/services/applications-web',
      },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'À Propos', href: '/a-propos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Footer Link Sections
 */
export const footerSections: FooterSection[] = [
  {
    title: 'Services',
    links: [
      { label: 'Création de Sites Web', href: '/services/creation-sites-web' },
      { label: 'E-commerce', href: '/services/e-commerce' },
      { label: 'SEO & Référencement', href: '/services/seo-referencement' },
      {
        label: 'Applications Web Sur Mesure',
        href: '/services/applications-web',
      },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Blog', href: '/blog' },
      { label: 'À Propos', href: '/a-propos' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Politique de Confidentialité', href: '/privacy' },
      { label: 'Mentions Légales', href: '/legal' },
      { label: 'Politique de Cookies', href: '/cookies' },
    ],
  },
];

/**
 * Social Media Links
 */
export const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    href: 'https://linkedin.com/company/kbcom',
    icon: 'Linkedin',
  },
  {
    platform: 'Twitter',
    href: 'https://twitter.com/kbcom',
    icon: 'Twitter',
  },
];

/**
 * Contact Information
 * Placeholder values - to be replaced by client
 */
export const contactInfo = {
  address: '123 Rue Exemple, 37000 Tours, France',
  phone: '02 XX XX XX XX',
  email: 'contact@kb-com.fr',
  tagline: 'Votre agence web à Tours',
};

/**
 * Company Information
 */
export const companyInfo = {
  name: 'KB-COM',
  founded: 2026,
  location: 'Tours',
};
