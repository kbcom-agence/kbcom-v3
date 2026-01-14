import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Nettoyer et reformater le HTML pour qu'il soit compatible avec TipTap et prose
function formatHtmlContent(html: string): string {
  if (!html) return ''

  let content = html.trim()

  // Si c'est du texte brut ou mal formaté, on le reformate
  // Supprimer les balises h3 qui enveloppent tout
  if (content.startsWith('<h3>') && content.endsWith('</h3>') && content.split('</h3>').length === 2) {
    content = content.replace(/^<h3>/, '').replace(/<\/h3>$/, '')
  }

  // Extraire le contenu des balises p pour retraiter
  const paragraphs = content.split(/<\/p>\s*<p>|<\/p>\n<p>/).map(p => {
    return p.replace(/^<p>/, '').replace(/<\/p>$/, '').trim()
  })

  // Reformater avec une meilleure structure
  const result: string[] = []

  for (const para of paragraphs) {
    if (!para) continue

    // Détecter les titres numérotés au début (1., 2., etc.)
    const titleMatch = para.match(/^(\d+)\.\s+([A-ZÉÈÀÙÂÊÎÔÛÇ][^.!?:]{10,50})(?:\s|$)/)

    if (titleMatch) {
      // Séparer le titre du reste
      const title = titleMatch[0].trim()
      const rest = para.substring(titleMatch[0].length).trim()

      result.push(`<h3>${title}</h3>`)
      if (rest) {
        result.push(`<p>${rest}</p>`)
      }
    } else {
      result.push(`<p>${para}</p>`)
    }
  }

  return result.join('\n')
}

// Données de remplacement pour certains projets avec du contenu propre
const contentUpdates: Record<string, { challenge?: string; solution?: string }> = {
  'kbflow-cockpit-interne': {
    challenge: `<h3>Optimiser la gestion interne de l'agence</h3>
<p>KBFLOW est l'application web interne que nous avons développée pour optimiser le fonctionnement quotidien de l'agence. Conçue comme un véritable cockpit de pilotage, cette plateforme centralise toutes les informations essentielles et automatise les tâches répétitives.</p>
<p>Le défi principal était de créer un outil qui s'adapte parfaitement à nos processus tout en restant évolutif pour accompagner la croissance de KB-COM.</p>`,
    solution: `<h3>Un dashboard sur mesure et évolutif</h3>
<p>Notre équipe a développé une application complète intégrant plusieurs modules clés :</p>
<ul>
<li><strong>Gestion des projets</strong> : suivi en temps réel de l'avancement, deadlines et jalons</li>
<li><strong>CRM intégré</strong> : centralisation des contacts clients et historique des échanges</li>
<li><strong>Facturation automatisée</strong> : génération de devis et factures en quelques clics</li>
<li><strong>Reporting avancé</strong> : tableaux de bord personnalisables avec métriques clés</li>
</ul>
<p>L'application est construite avec React et Next.js, garantissant des performances optimales et une expérience utilisateur fluide.</p>`
  },
  'site-vitrine-moorea-festival-edition-2024': {
    challenge: `<h3>Un festival qui grandit, des besoins qui évoluent</h3>
<p>Depuis maintenant deux ans, le Moorea Festival nous fait confiance pour l'accompagner dans sa présence en ligne. Ce festival de musique électro, qui se déroule dans le petit village de La Chapelle-Blanc-Saint-Martin en Indre-et-Loire, a su se démarquer en invitant de grandes têtes d'affiche : Kavinsky, Sound of Legend, Marnik, Vladimir Cauchemar, W&W, Holy Priest...</p>
<p>Événement phare pour les amateurs d'électro, le Moorea Festival attire chaque été un public toujours plus nombreux, attiré par la qualité de sa programmation et la convivialité de son ambiance.</p>`,
    solution: `<h3>Un site vitrine complet pour une expérience immersive</h3>
<p>Pour soutenir la notoriété grandissante du Moorea Festival, l'objectif de KB-COM était de concevoir un site au style unique, moderne et impactant. Nous avons développé une plateforme riche en fonctionnalités :</p>
<ul>
<li><strong>Billetterie intégrée</strong> : achat en ligne avec gestion des formules (pass, VIP)</li>
<li><strong>Système Cashless</strong> : transactions sécurisées et fluides sur place</li>
<li><strong>Infos pratiques</strong> : accès, hébergements, horaires en un clic</li>
<li><strong>Newsletter</strong> : communication directe avec la communauté</li>
<li><strong>Module Instagram</strong> : valorisation des moments forts du festival</li>
</ul>
<p>Conçu pour s'adapter aux différents supports, le site se veut responsive et intuitif, renforçant l'impact du Moorea Festival sur la scène électro.</p>`
  },
  'site-ecommerce-atoutstock': {
    challenge: `<h3>Un site e-commerce ambitieux à créer de zéro</h3>
<p>Atoutstock, entreprise spécialisée dans les produits de déstockage et fins de série, avait besoin d'une plateforme e-commerce performante pour vendre ses produits en ligne. Le défi : créer une boutique en ligne capable de gérer un catalogue conséquent avec des prix attractifs.</p>
<p>L'enjeu principal était de proposer une expérience d'achat fluide tout en mettant en avant les bonnes affaires disponibles.</p>`,
    solution: `<h3>Une boutique en ligne optimisée pour la conversion</h3>
<p>KB-COM a développé un site e-commerce complet avec :</p>
<ul>
<li><strong>Catalogue produits</strong> : navigation intuitive par catégories et filtres</li>
<li><strong>Fiches produits optimisées</strong> : photos, descriptions et prix barrés</li>
<li><strong>Panier et checkout</strong> : processus d'achat simplifié</li>
<li><strong>Paiement sécurisé</strong> : intégration Stripe pour les transactions</li>
<li><strong>Gestion des stocks</strong> : synchronisation automatique des quantités</li>
</ul>
<p>Le site est optimisé pour le référencement naturel, permettant d'attirer un trafic qualifié et de maximiser les ventes.</p>`
  }
}

async function main() {
  console.log('🎨 Formatage du contenu des réalisations...\n')

  // Appliquer les mises à jour manuelles pour les projets spécifiques
  for (const [slug, updates] of Object.entries(contentUpdates)) {
    const realisation = await prisma.realisation.findFirst({ where: { slug } })
    if (realisation) {
      await prisma.realisation.update({
        where: { id: realisation.id },
        data: updates
      })
      console.log(`✅ ${slug} - contenu mis à jour avec structure HTML propre`)
    }
  }

  // Reformater les autres réalisations qui n'ont pas de contenu manuel
  const realisations = await prisma.realisation.findMany()

  for (const r of realisations) {
    if (contentUpdates[r.slug]) continue // Déjà traité

    const needsUpdate =
      (r.challenge && !r.challenge.includes('<ul>') && !r.challenge.includes('<h3>')) ||
      (r.solution && !r.solution.includes('<ul>') && !r.solution.includes('<h3>'))

    if (needsUpdate) {
      const updates: { challenge?: string; solution?: string } = {}

      if (r.challenge && !r.challenge.includes('<h3>')) {
        updates.challenge = formatHtmlContent(r.challenge)
      }
      if (r.solution && !r.solution.includes('<h3>')) {
        updates.solution = formatHtmlContent(r.solution)
      }

      if (Object.keys(updates).length > 0) {
        await prisma.realisation.update({
          where: { id: r.id },
          data: updates
        })
        console.log(`📝 ${r.slug} - reformaté automatiquement`)
      }
    } else {
      console.log(`⏭️  ${r.slug} - déjà bien formaté`)
    }
  }

  console.log('\n✅ Formatage terminé!')

  // Afficher un exemple
  const example = await prisma.realisation.findFirst({ where: { slug: 'kbflow-cockpit-interne' } })
  console.log('\n📝 Exemple KBFlow - Challenge:')
  console.log(example?.challenge)
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
