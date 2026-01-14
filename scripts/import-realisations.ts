import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { parse } from 'csv-parse/sync'

const prisma = new PrismaClient()

// Mapper le type de service du CSV vers le serviceType de l'app
function mapServiceType(service: string): string {
  const s = service?.toLowerCase().trim() || ''

  if (s.includes('développement') || s.includes('web') || s.includes('site')) return 'sites'
  if (s.includes('seo') || s.includes('référencement')) return 'seo'
  if (s.includes('application') || s.includes('app')) return 'apps'
  if (s.includes('automatisation') || s.includes('automation')) return 'automation'
  if (s.includes('charte') || s.includes('graphique') || s.includes('design')) return 'sites'

  return 'sites'
}

// Nettoyer le HTML pour obtenir du texte
function cleanHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&hellip;/g, '...')
    .replace(/&eacute;/g, 'é')
    .replace(/&egrave;/g, 'è')
    .replace(/&agrave;/g, 'à')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&ucirc;/g, 'û')
    .replace(/&icirc;/g, 'î')
    .replace(/&acirc;/g, 'â')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&oelig;/g, 'œ')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/\s+/g, ' ')
    .trim()
}

// Extraire les sections h2 de la description
function extractSections(html: string): { challenge: string; solution: string } {
  // Trouver tous les h2 et leur contenu
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>([\s\S]*?)(?=<h2|$)/gi
  const sections: { title: string; content: string }[] = []

  let match
  while ((match = h2Regex.exec(html)) !== null) {
    sections.push({
      title: cleanHtml(match[1]),
      content: cleanHtml(match[2])
    })
  }

  // Première section = challenge, deuxième = solution
  const challenge = sections[0]
    ? `${sections[0].title}\n\n${sections[0].content}`
    : 'Projet réalisé par KB-COM.'

  const solution = sections[1]
    ? `${sections[1].title}\n\n${sections[1].content}`
    : sections[0]?.content || 'Solution sur mesure développée par notre équipe.'

  return { challenge, solution }
}

// Générer une couleur basée sur le type de service
function getColorForService(serviceType: string): string {
  const colors: Record<string, string> = {
    sites: '#3B82F6',    // blue
    seo: '#EC4899',      // pink
    apps: '#8B5CF6',     // purple
    automation: '#F97316' // orange
  }
  return colors[serviceType] || '#3B82F6'
}

async function main() {
  console.log('📥 Import des réalisations depuis le CSV...\n')

  // Lire le fichier CSV
  const csvPath = String.raw`C:\Users\Kevin B\Downloads\projects.csv`
  const content = readFileSync(csvPath, 'utf-8')

  // Parser le CSV
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true,
    trim: true,
  })

  console.log(`📄 ${records.length} réalisations trouvées dans le CSV\n`)

  let imported = 0
  let skipped = 0
  let errors = 0

  for (const row of records) {
    try {
      const slug = row.slug?.trim()
      if (!slug) {
        console.log(`⚠️  Réalisation sans slug, ignorée`)
        skipped++
        continue
      }

      // Vérifier si la réalisation existe déjà
      const existing = await prisma.realisation.findUnique({
        where: { slug }
      })

      if (existing) {
        console.log(`ℹ️  Réalisation existante: ${slug}`)
        skipped++
        continue
      }

      // Mapper les champs
      const serviceType = mapServiceType(row.service || '')
      const color = getColorForService(serviceType)

      // Nettoyer la description courte
      let shortDescription = ''
      if (row.short) {
        shortDescription = cleanHtml(row.short)
      } else if (row.meta_description) {
        shortDescription = cleanHtml(row.meta_description)
      }

      // Limiter à 200 caractères
      if (shortDescription.length > 200) {
        shortDescription = shortDescription.substring(0, shortDescription.lastIndexOf(' ', 200)) + '...'
      }

      // Extraire challenge et solution de la description
      const { challenge, solution } = extractSections(row.description || '')

      // Extraire l'année de created_at
      let year = new Date().getFullYear().toString()
      if (row.created_at) {
        const parsed = new Date(row.created_at.replace(' ', 'T'))
        if (!isNaN(parsed.getTime())) {
          year = parsed.getFullYear().toString()
        }
      }

      // Parser les technologies depuis tools
      const technologies = row.tools
        ? row.tools.split('|').map((t: string) => t.trim()).filter(Boolean)
        : []

      // Créer la réalisation
      await prisma.realisation.create({
        data: {
          slug,
          name: row.title || 'Sans titre',
          nameAccent: null,
          accentColor: color,
          client: row.industry || 'Client',
          industry: row.service || 'Développement web',
          year,
          shortDescription,
          fullDescription: row.description || '',
          challenge,
          solution,
          results: [],
          testimonialQuote: null,
          testimonialAuthor: null,
          testimonialRole: null,
          image: '', // Sera ajouté manuellement
          imageAlt: null,
          gallery: [],
          tags: [],
          technologies,
          serviceType,
          color,
          url: null,
          featured: false
        }
      })

      console.log(`✅ Importé: ${row.title}`)
      console.log(`   🏢 Client: ${row.industry} | 🔧 Service: ${serviceType}`)
      console.log(`   📅 Année: ${year} | 🛠️ Tech: ${technologies.join(', ') || 'N/A'}`)
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
