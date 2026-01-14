'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { RichTextEditor } from '@/components/admin/RichTextEditor'

const serviceTypes = [
  { value: 'sites', label: 'Site Web', color: 'bg-blue-500' },
  { value: 'seo', label: 'SEO', color: 'bg-pink-500' },
  { value: 'apps', label: 'Application', color: 'bg-purple-500' },
  { value: 'automation', label: 'Automatisation', color: 'bg-orange-500' }
]

export default function NewRealisationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    nameAccent: '',
    client: '',
    industry: '',
    year: new Date().getFullYear().toString(),
    shortDescription: '',
    fullDescription: '',
    results: '',
    image: '',
    imageAlt: '',
    gallery: '',
    tags: '',
    technologies: '',
    serviceType: 'sites',
    url: '',
    featured: false
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/realisations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          results: formData.results.split('\n').map(r => r.trim()).filter(Boolean),
          gallery: formData.gallery.split(',').map(g => g.trim()).filter(Boolean),
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
          technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
          imageAlt: formData.imageAlt || null
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erreur lors de la création')
      }

      router.push('/admin/realisations')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/realisations" className="p-2 hover:bg-white/50 rounded-xl transition-colors">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nouvelle réalisation</h1>
          <p className="text-gray-500 mt-0.5">Créez un nouveau projet</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        {/* Main - 2 cols */}
        <div className="col-span-2 space-y-6">
          {/* Projet */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5 space-y-4">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Informations projet
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Nom *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Favikon" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Partie accentuée</label>
                  <input type="text" name="nameAccent" value={formData.nameAccent} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Client *</label>
                  <input type="text" name="client" value={formData.client} onChange={handleChange} required className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Secteur *</label>
                  <input type="text" name="industry" value={formData.industry} onChange={handleChange} required className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="SaaS / Tech" />
                </div>
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5 space-y-4">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Descriptions
              </h2>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Description courte *</label>
                <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} required rows={2} className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Résumé en 1-2 phrases pour la liste" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Description complète *</label>
                <RichTextEditor
                  value={formData.fullDescription}
                  onChange={(html) => setFormData(prev => ({ ...prev, fullDescription: html }))}
                  placeholder="Description détaillée du projet..."
                  minHeight="200px"
                />
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5 space-y-4">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Résultats clés
              </h2>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Résultats (un par ligne)</label>
                <textarea name="results" value={formData.results} onChange={handleChange} rows={4} className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none" placeholder="+45% conversion&#10;Score 98/100 PageSpeed&#10;Temps de chargement < 2s" />
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Type & Année */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5 space-y-4">
              <h2 className="text-sm font-semibold text-gray-900">Publication</h2>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Type *</label>
                <div className="grid grid-cols-2 gap-2">
                  {serviceTypes.map(type => (
                    <button key={type.value} type="button" onClick={() => setFormData(p => ({ ...p, serviceType: type.value }))}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${formData.serviceType === type.value ? `${type.color} text-white shadow-lg` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Année *</label>
                  <input type="text" name="year" value={formData.year} onChange={handleChange} required className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">URL</label>
                  <input type="url" name="url" value={formData.url} onChange={handleChange} placeholder="https://" className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200/50">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`relative w-11 h-6 rounded-full transition-colors ${formData.featured ? 'bg-purple-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.featured ? 'left-6' : 'left-1'}`} />
                  </div>
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="sr-only" />
                  <span className="text-sm text-gray-700">Projet vedette</span>
                </label>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-slate-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5 space-y-3">
              <h2 className="text-sm font-semibold text-gray-900">Images & Tags</h2>
              <ImageUpload
                value={formData.image}
                onChange={(path) => setFormData(prev => ({ ...prev, image: path }))}
                altText={formData.imageAlt}
                onAltChange={(alt) => setFormData(prev => ({ ...prev, imageAlt: alt }))}
                folder="realisations"
                aspectRatio={16 / 10}
                label="Image de couverture *"
              />
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Galerie</label>
                <input type="text" name="gallery" value={formData.gallery} onChange={handleChange} placeholder="img1.jpg, img2.jpg" className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Tags</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="SaaS, Design" className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Technologies</label>
                <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="Next.js, React" className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button type="submit" disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 disabled:opacity-50 transition-all hover:scale-[1.02]">
              {loading ? 'Création...' : 'Créer'}
            </button>
            <Link href="/admin/realisations" className="w-full px-6 py-3 bg-white/50 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-white/80 transition-all text-center">
              Annuler
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
