import { MetadataRoute } from 'next';

/**
 * Generates Web App Manifest for PWA functionality
 * Automatically served at /manifest.webmanifest
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 * @see https://web.dev/add-manifest/
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KB-COM - Agence Web à Tours',
    short_name: 'KB-COM',
    description: 'Agence Web à Tours - Création de sites internet performants et référencés',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3a67ff', // KB-COM primary blue color
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'productivity'],
    lang: 'fr',
    dir: 'ltr',
  };
}
