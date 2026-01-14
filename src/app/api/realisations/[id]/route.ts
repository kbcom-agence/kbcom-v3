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

    // Construction des données à mettre à jour (mise à jour partielle)
    const updateData: Record<string, unknown> = {}

    if (data.slug !== undefined) updateData.slug = data.slug
    if (data.name !== undefined) updateData.name = data.name
    if (data.nameAccent !== undefined) updateData.nameAccent = data.nameAccent
    if (data.client !== undefined) updateData.client = data.client
    if (data.industry !== undefined) updateData.industry = data.industry
    if (data.year !== undefined) updateData.year = data.year
    if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription
    if (data.fullDescription !== undefined) updateData.fullDescription = data.fullDescription
    if (data.results !== undefined) updateData.results = data.results
    if (data.testimonialQuote !== undefined) updateData.testimonialQuote = data.testimonialQuote
    if (data.testimonialAuthor !== undefined) updateData.testimonialAuthor = data.testimonialAuthor
    if (data.testimonialRole !== undefined) updateData.testimonialRole = data.testimonialRole
    if (data.image !== undefined) updateData.image = data.image
    if (data.gallery !== undefined) updateData.gallery = data.gallery
    if (data.tags !== undefined) updateData.tags = data.tags
    if (data.technologies !== undefined) updateData.technologies = data.technologies
    if (data.url !== undefined) updateData.url = data.url
    if (data.featured !== undefined) updateData.featured = data.featured
    if (data.showOnHome !== undefined) updateData.showOnHome = data.showOnHome

    // Couleurs automatiques selon le type de service
    if (data.serviceType !== undefined) {
      const colors = serviceColors[data.serviceType] || serviceColors.sites
      updateData.serviceType = data.serviceType
      updateData.color = colors.color
      updateData.accentColor = colors.accentColor
    }

    const realisation = await prisma.realisation.update({
      where: { id: parseInt(id) },
      data: updateData
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
