import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Décoder TOUTES les entités HTML possibles
function decodeAllEntities(text: string): string {
  if (!text) return text

  // Créer un map complet des entités
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
    '&bull;': '•',
    '&middot;': '·',
    '&eacute;': 'é',
    '&egrave;': 'è',
    '&ecirc;': 'ê',
    '&euml;': 'ë',
    '&agrave;': 'à',
    '&acirc;': 'â',
    '&auml;': 'ä',
    '&icirc;': 'î',
    '&iuml;': 'ï',
    '&ocirc;': 'ô',
    '&ouml;': 'ö',
    '&ograve;': 'ò',
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
    '&Ntilde;': 'Ñ',
    '&ntilde;': 'ñ',
  }

  let result = text

  // Remplacer les entités nommées
  for (const [entity, char] of Object.entries(entities)) {
    result = result.split(entity).join(char)
  }

  // Remplacer les entités numériques décimales &#123;
  result = result.replace(/&#(\d+);/g, (_, num) => {
    const code = parseInt(num, 10)
    return code > 0 ? String.fromCharCode(code) : ''
  })

  // Remplacer les entités hexadécimales &#x1F4A1;
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
    const code = parseInt(hex, 16)
    return code > 0 ? String.fromCharCode(code) : ''
  })

  return result
}

// Nettoyer complètement le HTML
function deepClean(html: string): string {
  if (!html) return html

  let result = html

  // 1. Supprimer le XML declaration
  result = result.replace(/<\?xml[^>]*\?>/gi, '')

  // 2. Supprimer les balises img
  result = result.replace(/<img[^>]*\/?>/gi, '')

  // 3. Supprimer les balises figure
  result = result.replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')

  // 4. Supprimer les balises a (liens) mais garder le texte
  result = result.replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')

  // 5. Décoder les entités HTML
  result = decodeAllEntities(result)

  // 6. Normaliser les sauts de ligne dans le HTML
  // Ajouter saut de ligne après fermeture de blocs
  result = result.replace(/<\/(h[1-6]|p|div|li|blockquote)>/gi, '</$1>\n')
  // Ajouter saut de ligne avant ouverture de certains blocs
  result = result.replace(/<(h[1-6]|ul|ol|blockquote)([^>]*)>/gi, '\n<$1$2>')

  // 7. Supprimer les paragraphes vides
  result = result.replace(/<p>\s*<\/p>/gi, '')
  result = result.replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '')
  result = result.replace(/<p>&nbsp;<\/p>/gi, '')

  // 8. Nettoyer les espaces multiples (mais pas les sauts de ligne)
  result = result.replace(/[ \t]+/g, ' ')

  // 9. Nettoyer les sauts de ligne multiples
  result = result.replace(/\n{3,}/g, '\n\n')

  // 10. Trim final
  result = result.trim()

  return result
}

// Convertir texte brut avec numéros en HTML structuré
function structureText(text: string): string {
  if (!text) return text

  // Si c'est déjà du HTML avec des balises, on nettoie juste
  if (text.includes('<h2>') || text.includes('<p>')) {
    return deepClean(text)
  }

  // Sinon, on structure le texte brut
  let result = text

  // Convertir les titres numérotés "1. Titre" en H2
  result = result.replace(/^(\d+)\.\s+([^\n]+)/gm, '<h2>$1. $2</h2>')

  // Envelopper les paragraphes
  const lines = result.split('\n')
  const structured: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (trimmed.startsWith('<h2>')) {
      structured.push(trimmed)
    } else if (!trimmed.startsWith('<')) {
      structured.push(`<p>${trimmed}</p>`)
    } else {
      structured.push(trimmed)
    }
  }

  return structured.join('\n')
}

async function main() {
  console.log('🧹 Nettoyage profond des descriptions...\n')

  const realisations = await prisma.realisation.findMany()

  for (const r of realisations) {
    const cleanedFull = deepClean(r.fullDescription)
    const cleanedChallenge = deepClean(r.challenge)
    const cleanedSolution = deepClean(r.solution)
    const cleanedShort = decodeAllEntities(r.shortDescription)

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

  // Afficher un exemple
  const example = await prisma.realisation.findFirst({ where: { slug: 'site-ecommerce-atoutstock' } })
  console.log('\n📝 Exemple (challenge):')
  console.log(example?.challenge?.substring(0, 400))
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
