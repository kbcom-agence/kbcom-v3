import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | KB-COM - Agence Web Tours",
  description: "Conseils, guides et actualités sur le développement web, le SEO, l'automatisation et le marketing digital. Expertise d'une agence web à Tours.",
  openGraph: {
    title: "Blog | KB-COM - Agence Web Tours",
    description: "Conseils, guides et actualités sur le développement web, le SEO, l'automatisation et le marketing digital.",
    url: "https://kb-com.fr/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://kb-com.fr/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
