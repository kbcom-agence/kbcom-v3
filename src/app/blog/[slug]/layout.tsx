import type { Metadata } from "next";
import { articles, getArticleBySlug } from "@/data/articles";

// Générer les métadonnées dynamiquement
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
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
      authors: [article.author.name],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    alternates: {
      canonical: `https://kb-com.fr/blog/${article.slug}`,
    },
  };
}

// Générer les params statiques pour le build
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticleDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
