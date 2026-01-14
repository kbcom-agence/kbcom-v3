import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const r = await prisma.realisation.findFirst({
    where: { slug: 'site-ecommerce-atoutstock' }
  })

  console.log('=== FULL DESCRIPTION (500 premiers caractères) ===')
  console.log(r?.fullDescription?.substring(0, 500))
  console.log('\n=== CHALLENGE ===')
  console.log(r?.challenge?.substring(0, 300))
}

main()
  .finally(() => prisma.$disconnect())
