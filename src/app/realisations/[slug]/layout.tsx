import type { Metadata } from "next";
import prisma from "@/lib/prisma";

// Générer les métadonnées dynamiquement
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const realisation = await prisma.realisation.findUnique({
    where: { slug }
  });

  if (!realisation) {
    return {
      title: "Projet non trouvé",
    };
  }

  const fullName = realisation.name + (realisation.nameAccent || "");

  return {
    title: `${fullName} - ${realisation.industry} | Étude de cas`,
    description: realisation.shortDescription,
    openGraph: {
      title: `${fullName} | Réalisation KB-COM`,
      description: realisation.shortDescription,
      url: `https://kb-com.fr/realisations/${realisation.slug}`,
      type: "article",
      images: realisation.image ? [
        {
          url: realisation.image,
          width: 1200,
          height: 630,
          alt: realisation.imageAlt || `${fullName} - Projet KB-COM`,
        },
      ] : [],
    },
    alternates: {
      canonical: `https://kb-com.fr/realisations/${realisation.slug}`,
    },
  };
}

// Générer les params statiques pour le build
export async function generateStaticParams() {
  const realisations = await prisma.realisation.findMany({
    select: { slug: true }
  });

  return realisations.map((realisation) => ({
    slug: realisation.slug,
  }));
}

export default function RealisationDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
