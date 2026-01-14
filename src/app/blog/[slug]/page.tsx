"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { use } from "react";

// Types
interface Article {
  id: number;
  slug: string;
  title: string;
  titleAccent?: string;
  excerpt: string;
  content: string;
  category: string;
  categoryLabel: string;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  readingTime: number;
  image: string;
  imageAlt?: string;
  tags: string[];
  featured: boolean;
}

// Category colors
const categoryColors: Record<string, { color: string; gradient: string }> = {
  seo: { color: "#EC4899", gradient: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)" },
  web: { color: "#3B82F6", gradient: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)" },
  automation: { color: "#F97316", gradient: "linear-gradient(135deg, #F97316 0%, #FBBF24 100%)" },
  business: { color: "#10B981", gradient: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)" },
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [otherArticles, setOtherArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fetch article and other articles
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all articles
        const res = await fetch("/api/articles");
        if (res.ok) {
          const articles: Article[] = await res.json();
          const currentArticle = articles.find(a => a.slug === slug);
          if (currentArticle) {
            setArticle(currentArticle);
            setOtherArticles(articles.filter(a => a.slug !== slug).slice(0, 4));
          } else {
            router.push("/blog");
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'article:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug, router]);

  const categoryStyle = article ? categoryColors[article.category] : categoryColors.web;

  const articleRef = useRef<HTMLElement>(null);

  // Progress bar - only track when article is loaded
  const { scrollYProgress } = useScroll({
    target: loading ? undefined : articleRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Update progress percentage
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!loading && article) {
      setProgress(Math.round(v * 100));
      setIsVisible(v > 0.05 && v < 0.95);
    }
  });

  // Loading state
  if (loading || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement de l&apos;article...</p>
        </div>
      </div>
    );
  }

  return (
    <article ref={articleRef} className="bg-[#0c0c1d]">
      {/* Progress Bar - Fixed at bottom */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 h-1 origin-left"
        style={{
          scaleX,
          background: categoryStyle.gradient,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Progress indicator */}
      <div
        className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: categoryStyle.gradient }}>
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-900">{progress}%</span>
          <span className="text-xs text-gray-500 ml-1">lu</span>
        </div>
      </div>

      {/* Wrapper pour l'effet sticky reveal */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-white">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${categoryStyle.color}10 0%, transparent 50%)`,
            }}
          />
          <div
            className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: categoryStyle.color }}
          />

          <div className="container-kb relative">
            <motion.div
              initial="hidden"
              animate="visible"
            >
              {/* Breadcrumb */}
              <motion.nav variants={fadeInUp} custom={0} className="mb-8">
                <ol className="flex items-center gap-2 text-sm text-gray-500">
                  <li><Link href="/" className="hover:text-gray-900 transition-colors">Accueil</Link></li>
                  <li>/</li>
                  <li><Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link></li>
                  <li>/</li>
                  <li className="text-gray-900 font-medium truncate max-w-[200px]">{article.title}</li>
                </ol>
              </motion.nav>

              {/* Category + Meta */}
              <motion.div variants={fadeInUp} custom={0.05} className="flex flex-wrap items-center gap-4 mb-6">
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                  style={{ background: categoryStyle.gradient }}
                >
                  {article.categoryLabel}
                </span>
                <span className="text-gray-500 text-sm">{article.readingTime} min de lecture</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 text-sm">
                  {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </motion.div>

              {/* Titre */}
              <motion.h1
                variants={fadeInUp}
                custom={0.1}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl"
              >
                {article.title}
                {article.titleAccent && (
                  <span style={{ color: categoryStyle.color }}>{article.titleAccent}</span>
                )}
              </motion.h1>

              {/* Excerpt */}
              <motion.p
                variants={fadeInUp}
                custom={0.15}
                className="mt-6 text-xl text-gray-600 max-w-3xl"
              >
                {article.excerpt}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Image principale */}
        <section className="relative z-10 -mt-8 pb-16 bg-white">
          <div className="container-kb">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl"
            >
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.imageAlt || `${article.title}${article.titleAccent || ''}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ backgroundColor: categoryStyle.color }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/50 text-xl font-medium">Image de l&apos;article</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Contenu de l'article */}
        <section className="relative z-10 py-16 bg-white">
          <div className="container-kb px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="article-content"
                style={{ '--accent-color': categoryStyle.color } as React.CSSProperties}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>

          {/* Styles dynamiques pour le contenu */}
          <style jsx global>{`
            .article-content {
              font-size: 1.125rem;
              line-height: 1.8;
              color: #1f2937;
            }

            .article-content p {
              margin-bottom: 1.5rem;
              color: #374151;
            }

            .article-content h2 {
              font-size: 1.75rem;
              font-weight: 700;
              color: #111827;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
              padding-bottom: 0.75rem;
              border-bottom: 3px solid var(--accent-color);
            }

            .article-content h3 {
              font-size: 1.375rem;
              font-weight: 600;
              color: #1f2937;
              margin-top: 2rem;
              margin-bottom: 1rem;
              padding-left: 1rem;
              border-left: 4px solid var(--accent-color);
            }

            .article-content strong {
              color: #111827;
              font-weight: 700;
            }

            .article-content a {
              color: var(--accent-color);
              text-decoration: none;
              font-weight: 500;
              border-bottom: 1px solid transparent;
              transition: border-color 0.2s;
            }

            .article-content a:hover {
              border-bottom-color: var(--accent-color);
            }

            .article-content ul, .article-content ol {
              margin: 1.5rem 0;
              padding-left: 0;
              color: #374151;
              list-style: none;
            }

            .article-content li {
              margin-bottom: 0.75rem;
              padding-left: 1.75rem;
              position: relative;
            }

            .article-content ul li::before {
              content: '';
              position: absolute;
              left: 0;
              top: 0.6rem;
              width: 8px;
              height: 8px;
              background: var(--accent-color);
              border-radius: 2px;
              transform: rotate(45deg);
            }

            .article-content ol {
              counter-reset: list-counter;
            }

            .article-content ol li {
              counter-increment: list-counter;
            }

            .article-content ol li::before {
              content: counter(list-counter);
              position: absolute;
              left: 0;
              top: 0.1rem;
              width: 1.4rem;
              height: 1.4rem;
              background: var(--accent-color);
              color: white;
              font-size: 0.75rem;
              font-weight: 700;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .article-content blockquote {
              margin: 2rem 0;
              padding: 1.5rem 2rem;
              background: linear-gradient(135deg, ${categoryStyle.color}10 0%, ${categoryStyle.color}05 100%);
              border-left: 4px solid var(--accent-color);
              border-radius: 0 1rem 1rem 0;
              font-style: italic;
              color: #4b5563;
            }

            .article-content table {
              width: 100%;
              margin: 2rem 0;
              border-collapse: collapse;
              border-radius: 0.75rem;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            .article-content th {
              background: linear-gradient(135deg, ${categoryStyle.color}15 0%, ${categoryStyle.color}10 100%);
              color: #111827;
              font-weight: 600;
              padding: 1rem;
              text-align: left;
              border-bottom: 2px solid var(--accent-color);
            }

            .article-content td {
              padding: 1rem;
              border-bottom: 1px solid #e5e7eb;
              color: #374151;
            }

            .article-content tr:hover td {
              background-color: #f9fafb;
            }

            .article-content code {
              background-color: #f3f4f6;
              padding: 0.25rem 0.5rem;
              border-radius: 0.375rem;
              font-size: 0.875rem;
              color: #111827;
            }

            .article-content pre {
              background-color: #1f2937;
              padding: 1.5rem;
              border-radius: 0.75rem;
              overflow-x: auto;
              margin: 1.5rem 0;
            }

            .article-content pre code {
              background: none;
              padding: 0;
              color: #e5e7eb;
            }

            .article-content sup {
              color: var(--accent-color);
              font-weight: 600;
            }
          `}</style>
        </section>

        {/* Carousel autres articles */}
        <section className="relative z-10 py-16 bg-gray-50">
          <div className="container-kb">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Autres <span className="font-playfair italic">articles</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherArticles.map((otherArticle) => {
                const otherStyle = categoryColors[otherArticle.category];
                return (
                  <Link
                    key={otherArticle.id}
                    href={`/blog/${otherArticle.slug}`}
                    className="group"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{ backgroundColor: otherStyle.color }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Contenu */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                            style={{ background: otherStyle.gradient }}
                          >
                            {otherArticle.categoryLabel}
                          </span>
                          <span className="text-xs text-gray-400">{otherArticle.readingTime} min</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm group-hover:text-gray-700 transition-colors">
                          {otherArticle.title}{otherArticle.titleAccent}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Lien vers tous les articles */}
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Voir tous les articles
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* CTA + Footer */}
      <footer className="sticky bottom-0 z-0">
        <div className="relative overflow-hidden">
          {/* Auras de couleur */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
          </div>

          {/* Texte watermark */}
          <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none">
            <span className="text-[15vw] font-bold text-white/[0.03] tracking-tight leading-none translate-y-[20%]">
              KB-COM
            </span>
          </div>

          {/* Section CTA */}
          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-8 md:pt-12 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                Lancez votre projet
              </span>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                Prêt à donner vie à votre{" "}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  projet digital ?
                </span>
              </h2>

              <p className="text-base text-gray-400 mb-5 max-w-xl mx-auto">
                Discutons de vos objectifs et créons ensemble une solution sur mesure.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/devis"
                  className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
                    boxShadow: '0 4px 20px rgba(59,130,246,0.4), inset 0 1px 1px rgba(255,255,255,0.2)'
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" style={{ height: '50%' }} />
                  <span className="relative font-semibold text-white">Demander un devis</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-700 bg-white/5 backdrop-blur-sm text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-gray-600"
                >
                  Nous contacter
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Séparateur */}
          <div className="relative z-10 mx-6 md:mx-12 lg:mx-20">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          </div>

          {/* Footer */}
          <div className="relative z-10 px-6 md:px-12 lg:px-20 py-6 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white font-bold text-base">K</span>
                  </div>
                  <span className="text-lg font-bold text-white">KB-COM</span>
                </div>
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                  Agence web à Tours spécialisée en création de sites, SEO et automatisation.
                </p>
                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/in/kevin-boutant/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all" aria-label="LinkedIn">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/agence.kbcom/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-pink-500 transition-all" aria-label="Instagram">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                </div>
                <a href="https://g.page/r/CQExample/review" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-white/5 border border-gray-800 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
                  <span className="text-xs font-medium text-gray-300">5/5 sur Google</span>
                </a>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Services</h4>
                <ul className="space-y-2">
                  <li><Link href="/services/creation-site-internet" className="text-gray-400 hover:text-white transition-colors text-sm">Création de sites</Link></li>
                  <li><Link href="/services/agence-seo" className="text-gray-400 hover:text-white transition-colors text-sm">Référencement SEO</Link></li>
                  <li><Link href="/services/application-web" className="text-gray-400 hover:text-white transition-colors text-sm">Applications web</Link></li>
                  <li><Link href="/services/automatisation" className="text-gray-400 hover:text-white transition-colors text-sm">Automatisation</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Entreprise</h4>
                <ul className="space-y-2">
                  <li><Link href="/a-propos" className="text-gray-400 hover:text-white transition-colors text-sm">À propos</Link></li>
                  <li><Link href="/realisations" className="text-gray-400 hover:text-white transition-colors text-sm">Réalisations</Link></li>
                  <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Rue de Clocheville, 37000 Tours
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:contact@kb-com.fr" className="hover:text-white transition-colors">contact@kb-com.fr</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+33640631953" className="hover:text-white transition-colors">06 40 63 19 53</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="relative z-10 px-6 md:px-12 lg:px-20 py-4 border-t border-gray-800/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
              <p>© 2024 KB-COM. Tous droits réservés.</p>
              <div className="flex gap-4">
                <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
                <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
