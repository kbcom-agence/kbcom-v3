import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const realisations = await prisma.realisation.findMany({
    select: {
      slug: true,
      name: true,
      nameAccent: true,
      fullDescription: true,
      challenge: true,
      solution: true
    }
  })

  for (const r of realisations) {
    console.log('\n' + '='.repeat(80))
    console.log(`📁 ${r.slug}`)
    console.log(`   Nom: ${r.name}${r.nameAccent || ''}`)
    console.log('\n--- FULL DESCRIPTION (500 chars) ---')
    console.log(r.fullDescription?.substring(0, 500))
    console.log('\n--- CHALLENGE (500 chars) ---')
    console.log(r.challenge?.substring(0, 500))
    console.log('\n--- SOLUTION (500 chars) ---')
    console.log(r.solution?.substring(0, 500))
  }
}

main()
  .finally(() => prisma.$disconnect())
