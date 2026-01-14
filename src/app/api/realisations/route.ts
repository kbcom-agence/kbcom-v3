import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'

// Couleurs par type de service
const serviceColors: Record<string, { color: string; accentColor: string }> = {
  sites: { color: '#3b82f6', accentColor: '#6366f1' },      // Bleu
  seo: { color: '#ec4899', accentColor: '#f43f5e' },        // Rose
  apps: { color: '#10b981', accentColor: '#059669' },       // Vert
  automation: { color: '#f59e0b', accentColor: '#f97316' }  // Orange
}

// GET /api/realisations - Liste toutes les réalisations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceType = searchParams.get('serviceType')
    const featured = searchParams.get('featured')
    const showOnHome = searchParams.get('showOnHome')

    const where: Record<string, unknown> = {}
    if (serviceType) where.serviceType = serviceType
    if (featured === 'true') where.featured = true
    if (showOnHome === 'true') where.showOnHome = true

    const realisations = await prisma.realisation.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(realisations)
  } catch (error) {
    console.error('Error fetching realisations:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des réalisations' },
      { status: 500 }
    )
  }
}

// POST /api/realisations - Créer une réalisation (protégé)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const data = await request.json()

    // Générer le slug si non fourni
    if (!data.slug) {
      data.slug = data.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Couleurs automatiques selon le type de service
    const colors = serviceColors[data.serviceType] || serviceColors.sites

    const realisation = await prisma.realisation.create({
      data: {
        slug: data.slug,
        name: data.name,
        nameAccent: data.nameAccent || null,
        accentColor: colors.accentColor,
        client: data.client,
        industry: data.industry,
        year: data.year,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        challenge: '',
        solution: '',
        results: data.results || [],
        testimonialQuote: data.testimonialQuote || null,
        testimonialAuthor: data.testimonialAuthor || null,
        testimonialRole: data.testimonialRole || null,
        image: data.image,
        imageAlt: data.imageAlt || null,
        gallery: data.gallery || [],
        tags: data.tags || [],
        technologies: data.technologies || [],
        serviceType: data.serviceType,
        color: colors.color,
        url: data.url || null,
        featured: data.featured || false,
        showOnHome: data.showOnHome || false
      }
    })

    return NextResponse.json(realisation, { status: 201 })
  } catch (error) {
    console.error('Error creating realisation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la réalisation' },
      { status: 500 }
    )
  }
}
