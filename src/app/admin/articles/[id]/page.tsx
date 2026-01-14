'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { generateExcerpt, calculateReadingTime } from '@/lib/article-utils'
import { ImageUpload } from '@/components/admin/ImageUpload'

const categories = [
  { value: 'seo', label: 'SEO', color: 'bg-pink-500' },
  { value: 'web', label: 'Développement Web', color: 'bg-blue-500' },
  { value: 'automation', label: 'Automatisation', color: 'bg-orange-500' },
  { value: 'business', label: 'Business', color: 'bg-emerald-500' }
]

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    titleAccent: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'web',
    publishedAt: '',
    readingTime: 5,
    image: '',
    imageAlt: '',
    tags: '',
    featured: false
  })

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${params.id}`)
        if (!res.ok) throw new Error('Article non trouvé')
        const article = await res.json()
        setFormData({
          title: article.title || '',
          titleAccent: article.titleAccent || '',
          slug: article.slug || '',
          excerpt: article.excerpt || '',
          content: article.content || '',
          category: article.category || 'web',
          publishedAt: article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : '',
          readingTime: article.readingTime || 5,
          image: article.image || '',
          imageAlt: article.imageAlt || '',
          tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
          featured: article.featured || false
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de chargement')
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [params.id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const content = e.target.value
    const autoExcerpt = generateExcerpt(content)
    const autoReadingTime = calculateReadingTime(content)

    setFormData(prev => ({
      ...prev,
      content,
      excerpt: autoExcerpt,
      readingTime: autoReadingTime
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const categoryLabel = categories.find(c => c.value === formData.category)?.label || formData.category

      const res = await fetch(`/api/articles/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          categoryLabel,
          authorName: 'KB-COM',
          authorRole: 'Agence Web',
          readingTime: parseInt(String(formData.readingTime)),
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
          imageAlt: formData.imageAlt || null
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erreur lors de la modification')
      }

      router.push('/admin/articles')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 mt-4">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/articles"
          className="p-2 hover:bg-white/50 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Modifier l&apos;article</h1>
          <p className="text-gray-500 mt-0.5">/{formData.slug}</p>
        </div>
        <Link
          href={`/blog/${formData.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-white/80 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Voir
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        {/* Main content - 2 cols */}
        <div className="col-span-2 space-y-6">
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Titre */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Titre de l&apos;article
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Titre principal *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Partie accentuée</label>
                  <input
                    type="text"
                    name="titleAccent"
                    value={formData.titleAccent}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-500 mb-2">Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100/50 border border-gray-200 rounded-xl text-gray-600 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-slate-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Contenu (HTML)
              </h2>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleContentChange}
                required
                rows={20}
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all font-mono text-sm resize-none"
              />
              <p className="text-xs text-gray-400 mt-2">L&apos;extrait et le temps de lecture sont recalculés automatiquement.</p>
            </div>
          </div>

          {/* Extrait auto-généré */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Extrait SEO
                <span className="ml-auto text-xs font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Auto-généré</span>
              </h2>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={2}
                maxLength={160}
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-400">Vous pouvez modifier l&apos;extrait si besoin</p>
                <span className={`text-xs font-medium ${formData.excerpt.length > 150 ? 'text-orange-500' : 'text-gray-400'}`}>
                  {formData.excerpt.length}/160
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - 1 col */}
        <div className="space-y-6">
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5">
              <ImageUpload
                value={formData.image}
                onChange={(path) => setFormData(prev => ({ ...prev, image: path }))}
                altText={formData.imageAlt}
                onAltChange={(alt) => setFormData(prev => ({ ...prev, imageAlt: alt }))}
                folder="blog"
                aspectRatio={16 / 9}
                label="Image de couverture *"
              />
            </div>
          </div>

          {/* Publication */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Publication</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Catégorie *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          formData.category === cat.value
                            ? `${cat.color} text-white shadow-lg`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Date *</label>
                  <input
                    type="date"
                    name="publishedAt"
                    value={formData.publishedAt}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Temps de lecture</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      name="readingTime"
                      value={formData.readingTime}
                      onChange={handleChange}
                      min={1}
                      className="w-20 px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 text-center focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <span className="text-sm text-gray-500">minutes</span>
                    <span className="ml-auto text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Auto</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200/50">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`relative w-11 h-6 rounded-full transition-colors ${formData.featured ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.featured ? 'left-6' : 'left-1'}`} />
                    </div>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">Article vedette</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Tags</h2>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Next.js, React, SEO"
                className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Séparés par des virgules</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enregistrement...
                </span>
              ) : (
                'Enregistrer'
              )}
            </button>
            <Link
              href="/admin/articles"
              className="w-full px-6 py-3 bg-white/50 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-white/80 transition-all text-center"
            >
              Annuler
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
