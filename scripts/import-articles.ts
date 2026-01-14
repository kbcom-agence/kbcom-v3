import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { parse } from 'csv-parse/sync'

const prisma = new PrismaClient()

// Mapper les catégories du CSV vers les catégories de l'app
function mapCategory(csvCategory: string): { category: string; categoryLabel: string } {
  const cat = csvCategory?.toLowerCase().trim() || ''

  const categoryMap: Record<string, { category: string; categoryLabel: string }> = {
    'site internet': { category: 'web', categoryLabel: 'Développement Web' },
    'communication': { category: 'business', categoryLabel: 'Business' },
    'seo': { category: 'seo', categoryLabel: 'SEO' },
    'référencement': { category: 'seo', categoryLabel: 'SEO' },
    'automatisation': { category: 'automation', categoryLabel: 'Automatisation' },
    'business': { category: 'business', categoryLabel: 'Business' },
    'web': { category: 'web', categoryLabel: 'Développement Web' },
  }

  return categoryMap[cat] || { category: 'web', categoryLabel: 'Développement Web' }
}

// Calculer le temps de lecture
function calculateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')
  const words = text.split(' ').filter(w => w.length > 0).length
  return Math.max(1, Math.ceil(words / 200))
}

// Nettoyer le HTML pour l'excerpt
function cleanHtmlForExcerpt(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')      // Supprimer toutes les balises HTML
    .replace(/&nbsp;/g, ' ')      // Remplacer &nbsp;
    .replace(/&amp;/g, '&')       // Remplacer &amp;
    .replace(/&lt;/g, '<')        // Remplacer &lt;
    .replace(/&gt;/g, '>')        // Remplacer &gt;
    .replace(/&quot;/g, '"')      // Remplacer &quot;
    .replace(/&#39;/g, "'")       // Remplacer &#39;
    .replace(/\s+/g, ' ')         // Normaliser les espaces
    .trim()
}

// Extraire la partie accentuée du titre
function splitTitle(fullTitle: string): { title: string; titleAccent: string | null } {
  // Patterns courants pour séparer le titre
  // Ex: "Agence web Tours : Sites & SEO pour réussite locale" -> accent sur "réussite locale"
  // Ex: "SEO vs Google Ads : quelle stratégie" -> accent sur "quelle stratégie"

  const colonIndex = fullTitle.lastIndexOf(':')
  if (colonIndex > 10 && colonIndex < fullTitle.length - 5) {
    const beforeColon = fullTitle.substring(0, colonIndex).trim()
    const afterColon = fullTitle.substring(colonIndex + 1).trim()

    // Si la partie après ":" est significative, on l'utilise comme accent
    if (afterColon.length > 3 && afterColon.length < 60) {
      return {
        title: beforeColon + ' :',
        titleAccent: ' ' + afterColon
      }
    }
  }

  // Pattern avec tiret
  const dashIndex = fullTitle.lastIndexOf(' - ')
  if (dashIndex > 10) {
    const beforeDash = fullTitle.substring(0, dashIndex).trim()
    const afterDash = fullTitle.substring(dashIndex + 3).trim()

    if (afterDash.length > 3 && afterDash.length < 40) {
      return {
        title: beforeDash,
        titleAccent: ' - ' + afterDash
      }
    }
  }

  // Sinon, pas d'accent
  return {
    title: fullTitle,
    titleAccent: null
  }
}

async function main() {
  console.log('🗑️  Suppression des anciens articles importés...\n')

  // Supprimer les articles qui n'ont pas d'image (ceux qu'on vient d'importer)
  const deleted = await prisma.article.deleteMany({
    where: {
      image: ''
    }
  })
  console.log(`   Supprimés: ${deleted.count} articles\n`)

  console.log('📥 Import des articles depuis le CSV...\n')

  // Lire le fichier CSV
  const csvPath = String.raw`C:\Users\Kevin B\Downloads\blogs.csv`
  const content = readFileSync(csvPath, 'utf-8')

  // Parser le CSV avec la librairie officielle
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true,
    trim: true,
  })

  console.log(`📄 ${records.length} articles trouvés dans le CSV\n`)

  let imported = 0
  let skipped = 0
  let errors = 0

  for (const row of records) {
    try {
      const slug = row.slug?.trim()
      if (!slug) {
        console.log(`⚠️  Article sans slug, ignoré`)
        skipped++
        continue
      }

      // Vérifier si l'article existe déjà
      const existing = await prisma.article.findUnique({
        where: { slug }
      })

      if (existing) {
        console.log(`ℹ️  Article existant: ${slug}`)
        skipped++
        continue
      }

      // Mapper la catégorie
      const { category, categoryLabel } = mapCategory(row.category || '')

      // Récupérer le contenu complet
      const description = row.description || ''
      const readingTime = calculateReadingTime(description)

      // Nettoyer et utiliser meta_description comme excerpt
      let excerpt = ''
      if (row.meta_description) {
        excerpt = cleanHtmlForExcerpt(row.meta_description)
      }

      // Si pas d'excerpt ou trop court, générer depuis le contenu
      if (!excerpt || excerpt.length < 20) {
        const cleanContent = cleanHtmlForExcerpt(description)
        excerpt = cleanContent.length > 155
          ? cleanContent.substring(0, cleanContent.lastIndexOf(' ', 155)) + '...'
          : cleanContent
      }

      // Parser la date created_at
      let publishedAt = new Date()
      if (row.created_at) {
        const parsed = new Date(row.created_at.replace(' ', 'T'))
        if (!isNaN(parsed.getTime())) {
          publishedAt = parsed
        }
      }

      // Séparer le titre et la partie accentuée
      const { title, titleAccent } = splitTitle(row.title || 'Sans titre')

      // Créer l'article
      await prisma.article.create({
        data: {
          slug,
          title,
          titleAccent,
          excerpt,
          content: description,
          category,
          categoryLabel,
          authorName: 'KB-COM',
          authorRole: 'Agence Web',
          publishedAt,
          readingTime,
          image: '',
          imageAlt: null,
          tags: [],
          featured: false
        }
      })

      console.log(`✅ Importé: ${title}${titleAccent || ''}`)
      console.log(`   📅 Date: ${publishedAt.toLocaleDateString('fr-FR')}`)
      console.log(`   📝 Excerpt: ${excerpt.substring(0, 80)}...`)
      imported++

    } catch (error) {
      console.log(`❌ Erreur pour "${row.title?.substring(0, 30)}...": ${error}`)
      errors++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`📊 Résumé de l'import:`)
  console.log(`   ✅ Importés: ${imported}`)
  console.log(`   ℹ️  Ignorés/Existants: ${skipped}`)
  console.log(`   ❌ Erreurs: ${errors}`)
  console.log('='.repeat(50))
}

main()
  .catch((e) => {
    console.error('❌ Erreur fatale:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
