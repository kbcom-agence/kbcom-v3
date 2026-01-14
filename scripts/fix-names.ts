import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Générer nameAccent depuis le nom complet - version corrigée
function splitName(fullName: string): { name: string; nameAccent: string | null } {
  // Pattern: "Moorea Festival — Édition 2026" -> "Moorea Festival" + " — Édition 2026"
  const emDashMatch = fullName.match(/^(.+?)(\s*—\s*.+)$/)
  if (emDashMatch && emDashMatch[1].length > 3) {
    return {
      name: emDashMatch[1],
      nameAccent: emDashMatch[2]
    }
  }

  // Pattern: "KBProspect - Automatisation" -> "KBProspect" + " - Automatisation"
  const dashMatch = fullName.match(/^(.+?)(\s*-\s*.+)$/)
  if (dashMatch && dashMatch[1].length > 3) {
    return {
      name: dashMatch[1],
      nameAccent: dashMatch[2]
    }
  }

  return { name: fullName, nameAccent: null }
}

// Mappages manuels pour les noms corrects
const nameCorrections: Record<string, { name: string; nameAccent: string | null }> = {
  'site-ecommerce-atoutstock': { name: 'Atoutstock', nameAccent: null },
  'charte-graphique-ehmir-agence-de-voyage': { name: 'Ehmir', nameAccent: ' agence de voyage' },
  'application-web-franceclat': { name: 'France', nameAccent: 'éclat' },
  'site-vitrine-agence-web-kobytrix': { name: 'Agence web', nameAccent: ' Kobytrix' },
  'site-ecommerce-lavieencitations': { name: 'Lavie', nameAccent: 'encitations' },
  'site-ecommerce-association-magnificat': { name: 'Association', nameAccent: ' Magnificat' },
  'site-vitrine-marchau-creation': { name: 'Marchau', nameAccent: ' Création' },
  'site-vitrine-moorea-festival-edition-2024': { name: 'Moorea Festival', nameAccent: ' — Édition 2024' },
  'kbprospect-automatisation': { name: 'KBProspect', nameAccent: ' — Automatisation' },
  'kbflow-cockpit-interne': { name: 'KBFlow', nameAccent: ' — Cockpit interne' },
  'site-vitrine-moorea-festival-edition-2025-2026': { name: 'Moorea Festival', nameAccent: ' — Édition 2026' }
}

async function main() {
  console.log('🔧 Correction des noms des réalisations...\n')

  const realisations = await prisma.realisation.findMany()

  for (const r of realisations) {
    const correction = nameCorrections[r.slug]

    if (correction) {
      await prisma.realisation.update({
        where: { id: r.id },
        data: {
          name: correction.name,
          nameAccent: correction.nameAccent
        }
      })
      console.log(`✅ ${r.slug}`)
      console.log(`   Nom: "${correction.name}" | Accent: "${correction.nameAccent || '(aucun)'}"`)
    } else {
      // Utiliser le split automatique
      const split = splitName(r.name)
      if (split.name !== r.name || split.nameAccent !== r.nameAccent) {
        await prisma.realisation.update({
          where: { id: r.id },
          data: {
            name: split.name,
            nameAccent: split.nameAccent
          }
        })
        console.log(`✅ ${r.slug} (auto)`)
        console.log(`   Nom: "${split.name}" | Accent: "${split.nameAccent || '(aucun)'}"`)
      } else {
        console.log(`⏭️ ${r.slug} - pas de changement`)
      }
    }
  }

  console.log('\n✅ Terminé!')
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
