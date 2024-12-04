'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { navigationTree } from './nav-tree'
import { SideNav } from './sidenav'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { ThemeToggle } from '../theme-toggle'
import { Logo } from './logo'
import { Button } from '../ui/button'
import Link from 'next/link'
import { MenuIcon, XIcon } from 'lucide-react'

export const MobileNav = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          aria-label="Open navigation"
          size="icon"
          onClick={() => setOpen(true)}
          className={className}
        >
          <MenuIcon size={16} />
        </Button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <>
            <Dialog.Content forceMount asChild>
              <div className="fixed inset-0 z-50 grid h-screen w-screen grid-rows-[auto_1fr]">
                <VisuallyHidden.Root>
                  <Dialog.Title>Navigation</Dialog.Title>
                </VisuallyHidden.Root>
                <motion.nav
                  className="border-color-base flex h-[var(--topnav-height)] w-full items-center justify-between gap-2 border-b px-[var(--site-padding-x)] py-2"
                  transition={{ duration: 0.15, ease: 'easeInOut' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Logo showText href="/" onClick={() => setOpen(false)} />
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button
                      size="icon"
                      onClick={() => setOpen(false)}
                      aria-label="Close navigation"
                    >
                      <XIcon size={16} />
                    </Button>
                  </div>
                </motion.nav>

                <motion.nav
                  className="bg-color-base flex h-full flex-col gap-0 overflow-y-scroll"
                  transition={{ duration: 0.15, ease: 'easeInOut' }}
                  initial={{ translateX: 100, opacity: 0 }}
                  animate={{ translateX: 0, opacity: 1 }}
                  exit={{ translateX: 100, opacity: 0 }}
                >
                  <div className="px-[var(--site-padding-x)] py-6">
                    <SideNav tree={navigationTree} />
                  </div>
                  <div className="bg-color-low px-2 pb-40 pt-6">
                    <Button variant="link" asChild>
                      <Link href="#">Support</Link>
                    </Button>
                    <Button variant="link" asChild>
                      <Link href="#">Create account</Link>
                    </Button>
                    <Button variant="link" asChild>
                      <Link href="#">Sign in</Link>
                    </Button>
                  </div>
                </motion.nav>
              </div>
            </Dialog.Content>
          </>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
