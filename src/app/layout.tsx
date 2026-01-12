import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Hedvig_Letters_Serif, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/layout";
import "./globals.css";

// Font serif artistique pour les accents
const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin"],
  variable: "--font-hedvig",
  display: "swap",
});

// Font Cormorant Garamond pour les titres (plus légère)
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kb-com.fr"),
  title: {
    default: "KB-COM | Agence Web à Tours - Création de Sites Internet & SEO",
    template: "%s | KB-COM - Agence Web Tours",
  },
  description:
    "Agence web à Tours spécialisée en création de sites internet, référencement SEO, développement d'applications web et automatisation. Devis gratuit pour votre projet digital.",
  keywords: [
    "agence web tours",
    "création site internet tours",
    "référencement seo tours",
    "développeur web tours",
    "agence digitale tours",
    "site vitrine tours",
    "application web tours",
    "automatisation entreprise",
    "agence web 37",
    "webmaster tours",
  ],
  authors: [{ name: "KB-COM" }],
  creator: "KB-COM",
  publisher: "KB-COM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://kb-com.fr",
    siteName: "KB-COM",
    title: "KB-COM | Agence Web à Tours - Création de Sites Internet & SEO",
    description:
      "Agence web à Tours spécialisée en création de sites internet, référencement SEO, développement d'applications web et automatisation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KB-COM - Agence Web à Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KB-COM | Agence Web à Tours",
    description:
      "Création de sites internet, SEO, applications web et automatisation à Tours.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "votre-code-verification-google",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable} ${hedvig.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
