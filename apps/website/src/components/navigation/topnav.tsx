'use client'

import { ThemeToggle } from '../theme-toggle'
import { MobileNav } from './mobile-nav'
import { Logo } from './logo'
import { Button } from '../ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SiGithub } from '@icons-pack/react-simple-icons'

export const TopNav = () => {
  const pathname = usePathname()
  return (
    <header className="bg-color-base border-b-color-base sticky top-0 z-10 flex h-[var(--topnav-height)] w-full border-b py-2">
      <div className="relative mx-auto flex w-full max-w-[var(--site-width)] items-center justify-between px-[var(--site-padding-x)] lg:gap-8">
        <div className="flex shrink-0 items-center gap-2 md:w-[calc(var(--side-nav-width)-var(--site-padding-x))]">
          <Logo href="/" showText />
        </div>
        <nav className="hidden items-center justify-start gap-2 md:flex">
          <Button variant="navitem" active={/^\/docs(\/|$)/.test(pathname)} asChild>
            <Link href="/docs">Documentation</Link>
          </Button>
          <Button variant="navitem" active={/^\/templates(\/|$)/.test(pathname)} asChild>
            <Link href="/templates">Templates</Link>
          </Button>
          <Button variant="navitem" active={/^\/cms(\/|$)/.test(pathname)} asChild>
            <Link href="/cms">Inline editor</Link>
          </Button>
        </nav>
        <div className="hidden items-center justify-start gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="https://github.com/vrepsys/prose-ui">
              <SiGithub size={16} />
              Github
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        <nav className="flex flex-1 items-center justify-end gap-2 md:hidden">
          <ThemeToggle />
          <MobileNav />
        </nav>
      </div>
    </header>
  )
}
