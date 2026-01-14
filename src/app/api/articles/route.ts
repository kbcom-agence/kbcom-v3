import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET /api/articles - Liste tous les articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (featured === 'true') where.featured = true

    const articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' }
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles' },
      { status: 500 }
    )
  }
}

// POST /api/articles - Créer un article (protégé)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const data = await request.json()

    // Générer le slug si non fourni
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const article = await prisma.article.create({
      data: {
        slug: data.slug,
        title: data.title,
        titleAccent: data.titleAccent || null,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        categoryLabel: data.categoryLabel,
        authorName: data.authorName,
        authorRole: data.authorRole,
        authorAvatar: data.authorAvatar || null,
        publishedAt: new Date(data.publishedAt),
        readingTime: data.readingTime,
        image: data.image,
        imageAlt: data.imageAlt || null,
        tags: data.tags || [],
        featured: data.featured || false
      }
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article' },
      { status: 500 }
    )
  }
}
