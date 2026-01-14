/**
 * Utilitaires pour les articles de blog
 */

/**
 * Supprime les balises HTML d'un texte
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Génère automatiquement un extrait SEO depuis le contenu HTML
 * Prend le premier paragraphe et le tronque à ~155 caractères
 */
export function generateExcerpt(content: string, maxLength: number = 155): string {
  // Supprime les balises HTML
  const plainText = stripHtml(content)

  // Si le texte est plus court que la limite, le retourner tel quel
  if (plainText.length <= maxLength) {
    return plainText
  }

  // Tronquer à la limite et ajouter "..."
  const truncated = plainText.substring(0, maxLength)

  // Trouver le dernier espace pour ne pas couper un mot
  const lastSpace = truncated.lastIndexOf(' ')
  if (lastSpace > maxLength - 30) {
    return truncated.substring(0, lastSpace) + '...'
  }

  return truncated + '...'
}

/**
 * Calcule le temps de lecture estimé en minutes
 * Basé sur une vitesse de lecture moyenne de 200 mots par minute
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  // Supprime les balises HTML
  const plainText = stripHtml(content)

  // Compte les mots (séparés par des espaces)
  const words = plainText.split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length

  // Calcule le temps de lecture (minimum 1 minute)
  const minutes = Math.ceil(wordCount / wordsPerMinute)

  return Math.max(1, minutes)
}

/**
 * Génère un slug à partir d'un titre
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Évite les tirets multiples
    .replace(/^-|-$/g, '') // Supprime les tirets en début/fin
}
