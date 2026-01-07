import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generateDefaultMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema } from '@/lib/seo/structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = generateDefaultMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="fr">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
