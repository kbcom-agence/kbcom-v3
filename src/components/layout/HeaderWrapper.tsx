'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export function HeaderWrapper() {
  const pathname = usePathname()

  // Ne pas afficher le header sur les pages admin
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return <Header />
}
