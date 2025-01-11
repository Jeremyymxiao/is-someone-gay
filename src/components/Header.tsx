'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-gray-200/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1">
            {!isHome && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-white/20"
              >
                <Link href="/">Home</Link>
              </Button>
            )}
          </div>
          
          <nav className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:bg-white/20"
            >
              <Link href="/questions">Vote</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:bg-white/20"
            >
              <Link href="/articles">Articles</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
