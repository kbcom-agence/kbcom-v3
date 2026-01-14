import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'
import sharp from 'sharp'

/**
 * Génère un nom de fichier SEO-friendly à partir du alt text
 */
function generateSeoFileName(altText: string): string {
  return altText
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9]+/g, '-')     // Remplace les caractères spéciaux par des tirets
    .replace(/(^-|-$)/g, '')          // Supprime les tirets en début/fin
    .substring(0, 60)                 // Limite la longueur
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'uploads'
    const altText = formData.get('altText') as string

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou GIF.' },
        { status: 400 }
      )
    }

    // Vérifier la taille (max 10MB pour permettre les images haute résolution avant compression)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux. Maximum 10MB.' },
        { status: 400 }
      )
    }

    // Générer le nom de fichier SEO-friendly
    const timestamp = Date.now()
    let seoName: string

    if (altText && altText.trim()) {
      seoName = generateSeoFileName(altText)
    } else {
      // Fallback: utiliser le nom original nettoyé
      const originalName = file.name.replace(/\.[^/.]+$/, '') // Enlever l'extension
      seoName = generateSeoFileName(originalName) || 'image'
    }

    const fileName = `${seoName}-${timestamp}.webp`

    // Créer le dossier si nécessaire
    const uploadDir = path.join(process.cwd(), 'public', folder)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Convertir en buffer
    const bytes = await file.arrayBuffer()
    const inputBuffer = Buffer.from(bytes)

    // Traitement avec Sharp: conversion WebP + optimisation
    const optimizedBuffer = await sharp(inputBuffer)
      .webp({
        quality: 85,           // Qualité optimale pour le web
        effort: 6,             // Niveau de compression (0-6)
        smartSubsample: true,  // Meilleur sous-échantillonnage chromatique
      })
      .resize({
        width: 1920,           // Largeur max pour les images de blog
        height: 1080,          // Hauteur max
        fit: 'inside',         // Garde les proportions
        withoutEnlargement: true // Ne pas agrandir les petites images
      })
      .toBuffer()

    // Sauvegarder le fichier optimisé
    const filePath = path.join(uploadDir, fileName)
    await writeFile(filePath, optimizedBuffer)

    // Retourner le chemin public
    const publicPath = `/${folder}/${fileName}`

    return NextResponse.json({
      success: true,
      path: publicPath,
      fileName,
      originalSize: file.size,
      optimizedSize: optimizedBuffer.length,
      compressionRatio: Math.round((1 - optimizedBuffer.length / file.size) * 100)
    })
  } catch (error) {
    console.error('Erreur upload:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    )
  }
}
