import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'

// Couleurs par type de service
const serviceColors: Record<string, { color: string; accentColor: string }> = {
  sites: { color: '#3b82f6', accentColor: '#6366f1' },      // Bleu
  seo: { color: '#ec4899', accentColor: '#f43f5e' },        // Rose
  apps: { color: '#8b5cf6', accentColor: '#a855f7' },       // Violet
  automation: { color: '#f59e0b', accentColor: '#f97316' }  // Orange
}

type RouteParams = { params: Promise<{ id: string }> }

// GET /api/realisations/[id] - Récupérer une réalisation
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params

    // Chercher par ID ou par slug
    const isNumeric = /^\d+$/.test(id)

    const realisation = await prisma.realisation.findFirst({
      where: isNumeric ? { id: parseInt(id) } : { slug: id }
    })

    if (!realisation) {
      return NextResponse.json(
        { error: 'Réalisation non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json(realisation)
  } catch (error) {
    console.error('Error fetching realisation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la réalisation' },
      { status: 500 }
    )
  }
}

// PUT /api/realisations/[id] - Modifier une réalisation (protégé)
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    // Couleurs automatiques selon le type de service
    const colors = serviceColors[data.serviceType] || serviceColors.sites

    const realisation = await prisma.realisation.update({
      where: { id: parseInt(id) },
      data: {
        slug: data.slug,
        name: data.name,
        nameAccent: data.nameAccent,
        accentColor: colors.accentColor,
        client: data.client,
        industry: data.industry,
        year: data.year,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        results: data.results,
        testimonialQuote: data.testimonialQuote,
        testimonialAuthor: data.testimonialAuthor,
        testimonialRole: data.testimonialRole,
        image: data.image,
        gallery: data.gallery,
        tags: data.tags,
        technologies: data.technologies,
        serviceType: data.serviceType,
        color: colors.color,
        url: data.url,
        featured: data.featured
      }
    })

    return NextResponse.json(realisation)
  } catch (error) {
    console.error('Error updating realisation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la modification de la réalisation' },
      { status: 500 }
    )
  }
}

// DELETE /api/realisations/[id] - Supprimer une réalisation (protégé)
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await params

    await prisma.realisation.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting realisation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la réalisation' },
      { status: 500 }
    )
  }
}
