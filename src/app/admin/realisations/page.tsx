'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Realisation {
  id: number
  slug: string
  name: string
  nameAccent?: string
  client: string
  serviceType: string
  year: string
  featured: boolean
  color: string
}

const serviceStyles: Record<string, { bg: string; text: string; dot: string }> = {
  sites: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  seo: { bg: 'bg-pink-50', text: 'text-pink-700', dot: 'bg-pink-500' },
  apps: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  automation: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' }
}

const serviceLabels: Record<string, string> = {
  sites: 'Site Web',
  seo: 'SEO',
  apps: 'Application',
  automation: 'Automatisation'
}

export default function RealisationsPage() {
  const [realisations, setRealisations] = useState<Realisation[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchRealisations() {
    try {
      const res = await fetch('/api/realisations')
      const data = await res.json()
      setRealisations(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching realisations:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRealisations()
  }, [])

  async function handleDelete(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réalisation ?')) return

    try {
      const res = await fetch(`/api/realisations/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setRealisations(realisations.filter((r) => r.id !== id))
      }
    } catch (error) {
      console.error('Error deleting realisation:', error)
    }
  }

  async function toggleFeatured(realisation: Realisation) {
    try {
      const res = await fetch(`/api/realisations/${realisation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !realisation.featured })
      })
      if (res.ok) {
        setRealisations(realisations.map(r =>
          r.id === realisation.id ? { ...r, featured: !r.featured } : r
        ))
      }
    } catch (error) {
      console.error('Error updating realisation:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Réalisations</h1>
          <p className="text-gray-500 mt-1">Gérez vos projets et références</p>
        </div>
        <Link
          href="/admin/realisations/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle réalisation
        </Link>
      </div>

      {/* Table */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl blur-xl opacity-30" />
        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl shadow-black/5 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-500 mt-4">Chargement...</p>
            </div>
          ) : realisations.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Aucune réalisation pour le moment</p>
              <p className="text-gray-500 text-sm mt-1">Créez votre première réalisation pour commencer</p>
              <Link
                href="/admin/realisations/new"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-purple-50 text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Créer une réalisation
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Année
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {realisations.map((realisation) => {
                  const style = serviceStyles[realisation.serviceType] || { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500' }
                  return (
                    <tr key={realisation.id} className="group hover:bg-white/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg"
                            style={{ backgroundColor: realisation.color }}
                          >
                            {realisation.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                              {realisation.name}
                              {realisation.nameAccent && <span className="text-purple-500">{realisation.nameAccent}</span>}
                            </p>
                            <p className="text-sm text-gray-500 mt-0.5">/realisations/{realisation.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {realisation.client}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${style.bg} ${style.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                          {serviceLabels[realisation.serviceType] || realisation.serviceType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {realisation.year}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => toggleFeatured(realisation)}
                            className={`relative w-10 h-6 rounded-full transition-colors ${
                              realisation.featured ? 'bg-purple-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                                realisation.featured ? 'left-5' : 'left-1'
                              }`}
                            />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/realisations/${realisation.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Voir"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <Link
                            href={`/admin/realisations/${realisation.id}`}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(realisation.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
