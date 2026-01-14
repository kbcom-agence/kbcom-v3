import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'

type RouteParams = { params: Promise<{ id: string }> }

// GET /api/articles/[id] - Récupérer un article
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params

    // Chercher par ID ou par slug
    const isNumeric = /^\d+$/.test(id)

    const article = await prisma.article.findFirst({
      where: isNumeric ? { id: parseInt(id) } : { slug: id }
    })

    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'article' },
      { status: 500 }
    )
  }
}

// PUT /api/articles/[id] - Modifier un article (protégé)
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

    const article = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        slug: data.slug,
        title: data.title,
        titleAccent: data.titleAccent,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        categoryLabel: data.categoryLabel,
        authorName: data.authorName,
        authorRole: data.authorRole,
        authorAvatar: data.authorAvatar,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
        readingTime: data.readingTime,
        image: data.image,
        imageAlt: data.imageAlt,
        tags: data.tags,
        featured: data.featured
      }
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la modification de l\'article' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[id] - Supprimer un article (protégé)
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

    await prisma.article.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'article' },
      { status: 500 }
    )
  }
}
