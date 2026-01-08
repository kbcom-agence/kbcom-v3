import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generateDefaultMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema } from '@/lib/seo/structured-data';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = generateDefaultMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
