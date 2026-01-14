import type { Metadata } from "next";

// Générer les métadonnées dynamiquement
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Fetch article from API (server-side)
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles`, { cache: 'no-store' });

    if (!res.ok) {
      return { title: "Article non trouvé" };
    }

    const articles = await res.json();
    const article = articles.find((a: { slug: string }) => a.slug === slug);

    if (!article) {
      return { title: "Article non trouvé" };
    }

    const fullTitle = article.title + (article.titleAccent || "");

    return {
      title: `${fullTitle} | Blog KB-COM`,
      description: article.excerpt,
      openGraph: {
        title: `${fullTitle} | Blog KB-COM`,
        description: article.excerpt,
        url: `https://kb-com.fr/blog/${article.slug}`,
        type: "article",
        publishedTime: article.publishedAt,
        images: article.image ? [
          {
            url: article.image.startsWith('/') ? `https://kb-com.fr${article.image}` : article.image,
            width: 1200,
            height: 630,
            alt: fullTitle,
          },
        ] : [],
      },
      alternates: {
        canonical: `https://kb-com.fr/blog/${article.slug}`,
      },
    };
  } catch {
    return { title: "Article non trouvé" };
  }
}

export default function ArticleDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
