import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const realisations = await prisma.realisation.findMany({
    select: { slug: true, name: true, fullDescription: true }
  })

  console.log(`\n${realisations.length} réalisations:\n`)
  realisations.forEach(r => {
    console.log(`- ${r.slug}`)
    console.log(`  Nom: ${r.name}`)
    console.log(`  Description: ${r.fullDescription.length} caractères`)
    console.log('')
  })

  await prisma.$disconnect()
}

main()
