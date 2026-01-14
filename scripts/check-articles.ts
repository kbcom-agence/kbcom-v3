import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function check() {
  const articles = await prisma.article.findMany({
    where: { image: '' },
    select: { title: true, titleAccent: true, excerpt: true }
  })

  console.log(`\n📋 ${articles.length} articles importés:\n`)

  articles.forEach((a, i) => {
    console.log(`${i + 1}. ${a.title}`)
    console.log(`   🎨 Accent: ${a.titleAccent || '(aucun)'}`)
    console.log(`   📝 Excerpt: ${a.excerpt.substring(0, 70)}...`)
    console.log('')
  })

  await prisma.$disconnect()
}

check()
