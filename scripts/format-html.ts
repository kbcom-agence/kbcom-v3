import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Convertir du texte brut ou semi-HTML en HTML bien structuré
function toStructuredHtml(text: string): string {
  if (!text) return ''

  let result = text.trim()

  // Si c'est déjà du HTML bien formaté avec des balises p ou h2, on le garde
  if (result.startsWith('<h2>') || result.startsWith('<p>')) {
    return result
  }

  // Détecter les paragraphes par double saut de ligne ou par phrases longues
  const paragraphs: string[] = []

  // Diviser par double saut de ligne d'abord
  const blocks = result.split(/\n\n+/)

  for (const block of blocks) {
    const trimmed = block.trim()
    if (!trimmed) continue

    // Vérifier si c'est un titre (commence par un numéro suivi de point)
    const titleMatch = trimmed.match(/^(\d+)\.\s+([^\n]+)/)
    if (titleMatch) {
      // C'est un titre
      const title = titleMatch[0]
      const rest = trimmed.substring(title.length).trim()
      paragraphs.push(`<h3>${title}</h3>`)
      if (rest) {
        paragraphs.push(`<p>${rest}</p>`)
      }
    } else if (trimmed.includes(':') && trimmed.length < 100 && !trimmed.includes('.')) {
      // Probablement un sous-titre
      paragraphs.push(`<h3>${trimmed}</h3>`)
    } else {
      // Paragraphe normal - diviser si trop long
      const sentences = trimmed.split(/(?<=[.!?])\s+/)
      let currentPara = ''

      for (const sentence of sentences) {
        if (currentPara.length + sentence.length > 400) {
          if (currentPara) {
            paragraphs.push(`<p>${currentPara.trim()}</p>`)
          }
          currentPara = sentence + ' '
        } else {
          currentPara += sentence + ' '
        }
      }
      if (currentPara.trim()) {
        paragraphs.push(`<p>${currentPara.trim()}</p>`)
      }
    }
  }

  return paragraphs.join('\n')
}

// Nettoyer le texte de tout résidu (fichiers, métadonnées, etc.)
function cleanText(text: string): string {
  if (!text) return ''

  let result = text

  // Supprimer les noms de fichiers avec extensions
  result = result.replace(/\b[\w-]+\.(webp|jpg|jpeg|png|gif|svg|pdf|mp4|mp3|doc|docx|xls|xlsx)\b/gi, '')

  // Supprimer les tailles de fichiers (ex: "1.15 MB", "250 KB")
  result = result.replace(/\d+(\.\d+)?\s*(MB|KB|GB|B)\b/gi, '')

  // Supprimer les URLs
  result = result.replace(/https?:\/\/[^\s<>"]+/gi, '')

  // Supprimer les balises vides
  result = result.replace(/<[^>]+>\s*<\/[^>]+>/g, '')

  // Nettoyer les espaces multiples
  result = result.replace(/\s{2,}/g, ' ')

  // Nettoyer les sauts de ligne multiples
  result = result.replace(/\n{3,}/g, '\n\n')

  return result.trim()
}

async function main() {
  console.log('📝 Formatage HTML des descriptions...\n')

  const realisations = await prisma.realisation.findMany()

  for (const r of realisations) {
    // Nettoyer d'abord
    const cleanedChallenge = cleanText(r.challenge)
    const cleanedSolution = cleanText(r.solution)
    const cleanedFull = cleanText(r.fullDescription)

    // Puis formater en HTML
    const formattedChallenge = toStructuredHtml(cleanedChallenge)
    const formattedSolution = toStructuredHtml(cleanedSolution)

    await prisma.realisation.update({
      where: { id: r.id },
      data: {
        challenge: formattedChallenge,
        solution: formattedSolution,
        fullDescription: cleanedFull
      }
    })

    console.log(`✅ ${r.name}${r.nameAccent || ''}`)
  }

  // Afficher un exemple
  const example = await prisma.realisation.findFirst({ where: { slug: 'site-vitrine-moorea-festival-edition-2024' } })
  console.log('\n📝 Exemple CHALLENGE (Moorea 2024):')
  console.log(example?.challenge?.substring(0, 600))
  console.log('\n📝 Exemple SOLUTION:')
  console.log(example?.solution?.substring(0, 600))
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
