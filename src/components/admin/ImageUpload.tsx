'use client'

import { useState, useRef, useCallback } from 'react'
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageUploadProps {
  value: string
  onChange: (path: string) => void
  altText?: string
  onAltChange?: (alt: string) => void
  folder?: string
  aspectRatio?: number
  label?: string
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export function ImageUpload({
  value,
  onChange,
  altText = '',
  onAltChange,
  folder = 'blog',
  aspectRatio = 16 / 9,
  label = 'Image'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [uploadStats, setUploadStats] = useState<{ original: number; optimized: number; ratio: number } | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setError('')
      setUploadStats(null)
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '')
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, aspectRatio))
  }, [aspectRatio])

  const getCroppedImg = useCallback(async (): Promise<Blob | null> => {
    if (!imgRef.current || !completedCrop) return null

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height

    canvas.width = completedCrop.width * scaleX
    canvas.height = completedCrop.height * scaleY

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    )

    // Envoyer en PNG pour préserver la qualité (Sharp convertira en WebP côté serveur)
    return new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/png', 1)
    })
  }, [completedCrop])

  const handleUpload = async () => {
    setUploading(true)
    setError('')

    try {
      const croppedBlob = await getCroppedImg()
      if (!croppedBlob) {
        setError('Erreur lors du crop')
        return
      }

      const formData = new FormData()
      formData.append('file', croppedBlob, 'image.png')
      formData.append('folder', folder)

      // Envoyer le alt text pour le nom de fichier SEO
      if (altText && altText.trim()) {
        formData.append('altText', altText.trim())
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erreur upload')
      }

      // Afficher les stats d'optimisation
      if (data.originalSize && data.optimizedSize) {
        setUploadStats({
          original: Math.round(data.originalSize / 1024),
          optimized: Math.round(data.optimizedSize / 1024),
          ratio: data.compressionRatio
        })
      }

      onChange(data.path)
      handleCancel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur upload')
    } finally {
      setUploading(false)
    }
  }

  const handleCancel = () => {
    setImgSrc('')
    setCrop(undefined)
    setCompletedCrop(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>

      {/* Champ Alt Text SEO */}
      {onAltChange && (
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Texte alternatif (SEO)
            <span className="ml-1 text-emerald-600 font-normal">Important pour le référencement</span>
          </label>
          <input
            type="text"
            value={altText}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Ex: Création site internet agence web Tours"
            className="w-full px-3 py-2 bg-white/80 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-400 mt-1">Décrivez l&apos;image en incluant vos mots-clés SEO</p>
        </div>
      )}

      {/* Image actuelle */}
      {value && !imgSrc && (
        <div className="space-y-2">
          <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <img
              src={value}
              alt={altText || 'Prévisualisation'}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Changer
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>

          {/* Stats d'optimisation */}
          {uploadStats && (
            <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                WebP optimisé: {uploadStats.optimized}KB
                <span className="text-gray-400 mx-1">•</span>
                <span className="text-emerald-700 font-medium">-{uploadStats.ratio}%</span>
              </span>
            </div>
          )}

          {/* Indicateur format WebP */}
          {value && value.endsWith('.webp') && (
            <div className="flex items-center gap-1.5 text-xs text-blue-600">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Format WebP optimisé pour le SEO
            </div>
          )}
        </div>
      )}

      {/* Zone de sélection */}
      {!value && !imgSrc && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
        >
          <svg className="w-10 h-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-600 font-medium">Cliquez pour sélectionner</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP - Auto-converti en WebP optimisé</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={onSelectFile}
        className="hidden"
      />

      {/* Zone de crop inline */}
      {imgSrc && (
        <div className="space-y-3">
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Crop"
                onLoad={onImageLoad}
                className="max-w-full"
              />
            </ReactCrop>
          </div>

          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}

          {/* Rappel alt text avant upload */}
          {onAltChange && !altText && (
            <p className="text-orange-500 text-xs flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Pensez à remplir le texte alternatif pour le SEO
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-3 py-2 text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading || !completedCrop}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-500/30 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Optimisation WebP...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Valider
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
