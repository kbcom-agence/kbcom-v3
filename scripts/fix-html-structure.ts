import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Convertir le texte en HTML bien structuré avec paragraphes
function toProperHtml(text: string): string {
  if (!text) return ''

  let content = text.trim()

  // Supprimer les balises h3 qui enveloppent tout le contenu
  content = content.replace(/^<h3>(.+)<\/h3>$/s, '$1')

  // Supprimer les autres balises HTML mal placées
  content = content.replace(/<\/?h[1-6]>/gi, '')
  content = content.replace(/<\/?p>/gi, '')

  // Diviser en phrases pour créer des paragraphes logiques
  // On cherche les points de rupture naturels
  const sentences = content.split(/(?<=[.!?])\s+/)

  const paragraphs: string[] = []
  let currentPara = ''

  for (const sentence of sentences) {
    // Détecter les titres numérotés (1., 2., etc.)
    const titleMatch = sentence.match(/^(\d+)\.\s+([A-Z][^.]+)/)

    if (titleMatch && currentPara.length === 0) {
      // C'est un titre
      const titleText = titleMatch[0].trim()
      paragraphs.push(`<h3>${titleText}</h3>`)
      // Le reste de la phrase après le titre
      const rest = sentence.substring(titleMatch[0].length).trim()
      if (rest) {
        currentPara = rest + ' '
      }
    } else {
      currentPara += sentence + ' '

      // Créer un nouveau paragraphe tous les ~3-4 phrases ou 300-400 caractères
      if (currentPara.length > 300 && sentence.endsWith('.')) {
        paragraphs.push(`<p>${currentPara.trim()}</p>`)
        currentPara = ''
      }
    }
  }

  // Ajouter le dernier paragraphe
  if (currentPara.trim()) {
    paragraphs.push(`<p>${currentPara.trim()}</p>`)
  }

  return paragraphs.join('\n')
}

async function main() {
  console.log('🔧 Reformatage du HTML des réalisations...\n')

  const realisations = await prisma.realisation.findMany()

  for (const r of realisations) {
    // Vérifier si le challenge ou solution ont besoin d'être reformatés
    const needsFixChallenge = r.challenge && (
      r.challenge.startsWith('<h3>') && r.challenge.endsWith('</h3>') && !r.challenge.includes('</h3>\n<')
    )
    const needsFixSolution = r.solution && (
      r.solution.startsWith('<h3>') && r.solution.endsWith('</h3>') && !r.solution.includes('</h3>\n<')
    )

    if (needsFixChallenge || needsFixSolution) {
      const updates: { challenge?: string; solution?: string } = {}

      if (needsFixChallenge) {
        updates.challenge = toProperHtml(r.challenge)
        console.log(`📝 Challenge reformaté pour: ${r.name}`)
      }

      if (needsFixSolution) {
        updates.solution = toProperHtml(r.solution)
        console.log(`📝 Solution reformatée pour: ${r.name}`)
      }

      await prisma.realisation.update({
        where: { id: r.id },
        data: updates
      })

      console.log(`✅ ${r.name}${r.nameAccent || ''}\n`)
    } else {
      console.log(`⏭️  ${r.name}${r.nameAccent || ''} - déjà bien formaté`)
    }
  }

  // Afficher un exemple après correction
  const example = await prisma.realisation.findFirst({
    where: { slug: 'site-vitrine-moorea-festival-edition-2024' }
  })
  console.log('\n📝 Exemple CHALLENGE après correction:')
  console.log(example?.challenge?.substring(0, 600))
  console.log('\n📝 Exemple SOLUTION après correction:')
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
