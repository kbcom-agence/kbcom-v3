'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { RichTextEditor } from '@/components/admin/RichTextEditor'

const serviceTypes = [
  { value: 'sites', label: 'Site Web', color: 'bg-blue-500' },
  { value: 'seo', label: 'SEO', color: 'bg-pink-500' },
  { value: 'apps', label: 'Application', color: 'bg-emerald-500' },
  { value: 'automation', label: 'Automatisation', color: 'bg-orange-500' }
]

export default function EditRealisationPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '', nameAccent: '', slug: '', client: '', industry: '', year: '',
    shortDescription: '', fullDescription: '', results: '',
    image: '', imageAlt: '', gallery: '', tags: '', technologies: '', serviceType: 'sites', url: '', featured: false
  })

  useEffect(() => {
    async function fetchRealisation() {
      try {
        const res = await fetch(`/api/realisations/${params.id}`)
        if (!res.ok) throw new Error('Réalisation non trouvée')
        const data = await res.json()
        setFormData({
          name: data.name || '', nameAccent: data.nameAccent || '', slug: data.slug || '',
          client: data.client || '', industry: data.industry || '',
          year: data.year || '', shortDescription: data.shortDescription || '', fullDescription: data.fullDescription || '',
          results: Array.isArray(data.results) ? data.results.join('\n') : '',
          image: data.image || '', imageAlt: data.imageAlt || '',
          gallery: Array.isArray(data.gallery) ? data.gallery.join(', ') : '',
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
          technologies: Array.isArray(data.technologies) ? data.technologies.join(', ') : '',
          serviceType: data.serviceType || 'sites', url: data.url || '', featured: data.featured || false
        })
      } catch (err) { setError(err instanceof Error ? err.message : 'Erreur') }
      finally { setLoading(false) }
    }
    fetchRealisation()
  }, [params.id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/realisations/${params.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          results: formData.results.split('\n').map(r => r.trim()).filter(Boolean),
          gallery: formData.gallery.split(',').map(g => g.trim()).filter(Boolean),
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
          technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
        })
      })
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || 'Erreur') }
      router.push('/admin/realisations')
    } catch (err) { setError(err instanceof Error ? err.message : 'Erreur') }
    finally { setSaving(false) }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 mt-4">Chargement...</p>
        </div>
      </div>
    )
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
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Modifier la réalisation</h1>
          <p className="text-gray-500 mt-0.5">/{formData.slug}</p>
        </div>
        <Link href={`/realisations/${formData.slug}`} target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-white/80 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Voir
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        {/* Main */}
        <div className="col-span-2 space-y-6">
          {/* Projet */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5 space-y-4">
              <h2 className="text-sm font-semibold text-gray-900">Informations projet</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Nom *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Slug</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-100/50 border border-gray-200 rounded-xl text-sm text-gray-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Partie accentuée</label>
                <input type="text" name="nameAccent" value={formData.nameAccent} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Client *</label>
                  <input type="text" name="client" value={formData.client} onChange={handleChange} required className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Secteur *</label>
                  <input type="text" name="industry" value={formData.industry} onChange={handleChange} required className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5 space-y-4">
              <h2 className="text-sm font-semibold text-gray-900">Descriptions</h2>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Description courte *</label>
                <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} required rows={2} className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 resize-none" placeholder="Résumé en 1-2 phrases pour la liste" />
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
              <h2 className="text-sm font-semibold text-gray-900">Résultats clés</h2>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Résultats (un par ligne)</label>
                <textarea name="results" value={formData.results} onChange={handleChange} rows={4} className="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 resize-none" placeholder="+45% de conversion&#10;Score 98/100 PageSpeed&#10;Temps de chargement < 2s" />
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
                  <input type="text" name="year" value={formData.year} onChange={handleChange} required className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">URL</label>
                  <input type="url" name="url" value={formData.url} onChange={handleChange} className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500" />
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200/50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`relative w-11 h-6 rounded-full transition-colors ${formData.featured ? 'bg-purple-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.featured ? 'left-6' : 'left-1'}`} />
                  </div>
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="sr-only" />
                  <span className="text-sm text-gray-700">Projet vedette</span>
                </label>
              </div>
            </div>
          </div>

          {/* Image de couverture */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5 space-y-3">
              <h2 className="text-sm font-semibold text-gray-900">Image de couverture</h2>
              <ImageUpload
                value={formData.image}
                altText={formData.imageAlt}
                onChange={(path) => setFormData(prev => ({ ...prev, image: path }))}
                onAltChange={(alt) => setFormData(prev => ({ ...prev, imageAlt: alt }))}
                folder="realisations"
                aspectRatio={4 / 3}
              />
            </div>
          </div>

          {/* Tags & Technologies */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-slate-100 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 p-6 shadow-xl shadow-black/5 space-y-3">
              <h2 className="text-sm font-semibold text-gray-900">Tags & Technologies</h2>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Tags</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tag1, Tag2, Tag3" className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Technologies</label>
                <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Next.js, TailwindCSS" className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button type="submit" disabled={saving}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 disabled:opacity-50 transition-all hover:scale-[1.02]">
              {saving ? 'Enregistrement...' : 'Enregistrer'}
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
