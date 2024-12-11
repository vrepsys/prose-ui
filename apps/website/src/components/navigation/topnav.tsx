'use client'

import { ThemeToggle } from '../theme-toggle'
import { MobileNav } from './mobile-nav'
import { Logo } from './logo'
import { Button } from '../ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GithubButton } from '../github-button'
import { useEffect, useState } from 'react'
import { classes } from '@/utils/classes'

export const TopNav = () => {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(0)
  const [borerOpacity, setBorderOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  useEffect(() => {
    setBorderOpacity(pathname === '/' ? Math.min(scrolled, 80) / 80 : 1)
  }, [scrolled, pathname])
  return (
    // bg-color-base border-b-color-base border-b
    <header
      className={classes(
        'bg-color-base sticky top-0 z-10 flex h-[var(--topnav-height)] w-full py-2',
        borerOpacity > 0 && 'border-b',
      )}
      style={{
        borderBottomColor: `hsl(var(--p-color-border) / ${borerOpacity})`,
      }}
    >
      <div className="relative mx-auto flex w-full max-w-[var(--site-width)] items-center justify-between px-[var(--site-padding-x)] lg:gap-8">
        <div className="flex shrink-0 items-center gap-2">
          <Logo href="/" showText />
        </div>

        <nav className="hidden items-center justify-start gap-2 md:flex">
          <Button variant="navitem" active={/^\/docs(\/|$)/.test(pathname)} asChild>
            <Link href="/docs">Documentation</Link>
          </Button>
          <Button variant="navitem" active={/^\/templates(\/|$)/.test(pathname)} asChild>
            <Link href="/templates">Templates</Link>
          </Button>
          <div className="hidden items-center justify-start gap-2 md:flex">
            <GithubButton />
            <ThemeToggle />
          </div>
        </nav>
        <nav className="flex flex-1 items-center justify-end gap-2 md:hidden">
          <GithubButton />
          <ThemeToggle />
          <MobileNav />
        </nav>
      </div>
    </header>
  )
}
