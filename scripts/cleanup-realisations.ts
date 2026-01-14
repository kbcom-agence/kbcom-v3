import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Supprimer les balises img et leurs contenus des descriptions
function removeImages(html: string): string {
  if (!html) return html

  // Supprimer les balises <img .../>
  let cleaned = html.replace(/<img[^>]*\/?>/gi, '')

  // Supprimer les balises <figure>...</figure> qui contiennent souvent des images
  cleaned = cleaned.replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')

  // Nettoyer les paragraphes vides qui restent
  cleaned = cleaned.replace(/<p>\s*<\/p>/gi, '')
  cleaned = cleaned.replace(/<p>&nbsp;<\/p>/gi, '')

  return cleaned
}

// Générer nameAccent depuis le nom complet
function splitName(fullName: string): { name: string; nameAccent: string | null } {
  // Patterns de séparation courants
  const separators = [' — ', ' - ', ' : ']

  for (const sep of separators) {
    const parts = fullName.split(sep)
    if (parts.length === 2 && parts[0].length > 3 && parts[1].length > 3) {
      return {
        name: parts[0] + sep.trim().charAt(0) === '-' ? ' —' : '',
        nameAccent: parts[1]
      }
    }
  }

  // Pattern spécial: "Moorea Festival — Édition 2026" -> "Moorea Festival" + " — Édition 2026"
  const dashMatch = fullName.match(/^(.+?)(\s*[—-]\s*.+)$/)
  if (dashMatch && dashMatch[1].length > 5) {
    return {
      name: dashMatch[1],
      nameAccent: dashMatch[2]
    }
  }

  return { name: fullName, nameAccent: null }
}

// Slugs des réalisations de test à supprimer
const testSlugs = [
  'favikon',
  'shipup',
  'maison-bleue',
  'menuiserie-music',
  'cabinet-avocat-martin',
  'dashboard-logistique',
  'automatisation-agence-immo',
  'restaurant-gastronomique'
]

async function main() {
  console.log('🧹 Nettoyage des réalisations...\n')

  // 1. Supprimer les réalisations de test
  console.log('1️⃣ Suppression des réalisations de test...')
  for (const slug of testSlugs) {
    try {
      await prisma.realisation.delete({
        where: { slug }
      })
      console.log(`   ✅ Supprimé: ${slug}`)
    } catch {
      console.log(`   ⚠️ Non trouvé: ${slug}`)
    }
  }

  // 2. Récupérer toutes les réalisations restantes
  console.log('\n2️⃣ Nettoyage des images dans les descriptions...')
  const realisations = await prisma.realisation.findMany()

  let updated = 0
  for (const r of realisations) {
    const cleanedFull = removeImages(r.fullDescription)
    const cleanedChallenge = removeImages(r.challenge)
    const cleanedSolution = removeImages(r.solution)

    // Vérifier si nameAccent est vide et générer automatiquement
    let nameAccent = r.nameAccent
    let name = r.name

    if (!nameAccent) {
      const split = splitName(r.name)
      name = split.name
      nameAccent = split.nameAccent
    }

    // Vérifier si quelque chose a changé
    const hasChanges =
      cleanedFull !== r.fullDescription ||
      cleanedChallenge !== r.challenge ||
      cleanedSolution !== r.solution ||
      name !== r.name ||
      nameAccent !== r.nameAccent

    if (hasChanges) {
      await prisma.realisation.update({
        where: { id: r.id },
        data: {
          fullDescription: cleanedFull,
          challenge: cleanedChallenge,
          solution: cleanedSolution,
          name,
          nameAccent
        }
      })
      console.log(`   ✅ Mis à jour: ${r.name}`)
      if (nameAccent) {
        console.log(`      📝 Nom: "${name}" | Accent: "${nameAccent}"`)
      }
      updated++
    }
  }

  console.log(`\n📊 Résumé:`)
  console.log(`   - Réalisations de test supprimées: ${testSlugs.length}`)
  console.log(`   - Réalisations mises à jour: ${updated}`)
  console.log(`   - Total réalisations restantes: ${realisations.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
