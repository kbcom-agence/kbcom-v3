import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Décoder toutes les entités HTML
function decodeHtmlEntities(html: string): string {
  if (!html) return html

  const entities: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&rdquo;': '"',
    '&ldquo;': '"',
    '&hellip;': '...',
    '&ndash;': '–',
    '&mdash;': '—',
    '&eacute;': 'é',
    '&egrave;': 'è',
    '&ecirc;': 'ê',
    '&euml;': 'ë',
    '&agrave;': 'à',
    '&acirc;': 'â',
    '&icirc;': 'î',
    '&iuml;': 'ï',
    '&ocirc;': 'ô',
    '&ouml;': 'ö',
    '&ucirc;': 'û',
    '&ugrave;': 'ù',
    '&uuml;': 'ü',
    '&ccedil;': 'ç',
    '&oelig;': 'œ',
    '&aelig;': 'æ',
    '&laquo;': '«',
    '&raquo;': '»',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&euro;': '€',
    '&pound;': '£',
    '&yen;': '¥',
    '&cent;': '¢',
    '&deg;': '°',
    '&plusmn;': '±',
    '&times;': '×',
    '&divide;': '÷',
    '&frac12;': '½',
    '&frac14;': '¼',
    '&frac34;': '¾',
    '&Eacute;': 'É',
    '&Egrave;': 'È',
    '&Ecirc;': 'Ê',
    '&Agrave;': 'À',
    '&Acirc;': 'Â',
    '&Ocirc;': 'Ô',
    '&Ucirc;': 'Û',
    '&Ccedil;': 'Ç',
    '&Icirc;': 'Î',
  }

  let result = html

  // Remplacer les entités nommées
  for (const [entity, char] of Object.entries(entities)) {
    result = result.split(entity).join(char)
  }

  // Remplacer les entités numériques &#123;
  result = result.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))

  // Remplacer les entités hexadécimales &#x1F4A1;
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))

  return result
}

// Nettoyer le HTML pour avoir un contenu propre et bien formaté
function cleanHtml(html: string): string {
  if (!html) return html

  let result = html

  // Supprimer le XML declaration
  result = result.replace(/<\?xml[^>]*\?>/gi, '')

  // Supprimer les balises img
  result = result.replace(/<img[^>]*\/?>/gi, '')

  // Supprimer les balises figure
  result = result.replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')

  // Décoder les entités HTML
  result = decodeHtmlEntities(result)

  // Nettoyer les espaces multiples
  result = result.replace(/\s+/g, ' ')

  // Ajouter des sauts de ligne après les balises de bloc pour meilleure lisibilité
  result = result.replace(/<\/(h[1-6]|p|div|ul|ol|li|blockquote)>/gi, '</$1>\n')
  result = result.replace(/<(h[1-6]|ul|ol|blockquote)[^>]*>/gi, '\n<$1>')

  // Supprimer les paragraphes vides
  result = result.replace(/<p>\s*<\/p>/gi, '')
  result = result.replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '')

  // Nettoyer les espaces en début/fin
  result = result.trim()

  // Supprimer les sauts de ligne multiples
  result = result.replace(/\n{3,}/g, '\n\n')

  return result
}

async function main() {
  console.log('🧹 Nettoyage complet des descriptions...\n')

  const realisations = await prisma.realisation.findMany()

  for (const r of realisations) {
    const cleanedFull = cleanHtml(r.fullDescription)
    const cleanedChallenge = cleanHtml(r.challenge)
    const cleanedSolution = cleanHtml(r.solution)
    const cleanedShort = decodeHtmlEntities(r.shortDescription)

    await prisma.realisation.update({
      where: { id: r.id },
      data: {
        fullDescription: cleanedFull,
        challenge: cleanedChallenge,
        solution: cleanedSolution,
        shortDescription: cleanedShort
      }
    })

    console.log(`✅ ${r.name}${r.nameAccent || ''}`)
  }

  console.log(`\n✅ ${realisations.length} réalisations nettoyées!`)
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
