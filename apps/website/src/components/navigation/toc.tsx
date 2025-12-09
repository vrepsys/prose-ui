'use client'

import { useCallback, useEffect, useRef, useState, forwardRef } from 'react'
import Link from 'next/link'
import { Section } from '@/lib/extract-toc'
import { Button } from '../ui/button'
import { useContentScroll } from '@/components/content-scroll-context'
import { CircleArrowUpIcon } from 'lucide-react'

type Heading = {
  id: string
  top: number
}

type Props = {
  sections: Section[]
}

export const Toc = ({ sections: rawSections }: Props) => {
  const sections = rawSections.filter((section) => section.depth === 2)
  const [currentSectionId, setCurrentSectionId] = useState(sections[0]?.id)
  const [scrolled, setScrolled] = useState(0)
  const scrollHandlerLocked = useRef(false)
  const scrollContainerRef = useContentScroll()
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)

  const smoothScrollTo = useCallback(
    (targetScrollTop: number) => {
      const container = scrollContainerRef?.current
      if (!container) return

      const start = container.scrollTop
      const distance = targetScrollTop - start
      const startTime = performance.now()
      const duration = 150

      const scroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        container.scrollTop = start + distance * easeOut
        if (progress < 1) requestAnimationFrame(scroll)
      }
      requestAnimationFrame(scroll)
    },
    [scrollContainerRef],
  )

  const makeHeadings = useCallback(
    (sections: Section[]): Heading[] =>
      sections
        .map((section) => {
          const el = document.getElementById(section.id)
          if (!el) return null

          const style = window.getComputedStyle(el)
          const scrollMt = parseFloat(style.scrollMarginTop)
          const top = el.offsetTop - scrollMt
          return { id: section.id, top }
        })
        .filter((h): h is Heading => h !== null),
    [],
  )

  useEffect(() => {
    const container = scrollContainerRef?.current
    if (!container || sections.length === 0) {
      return
    }

    const headings = makeHeadings(sections)
    if (headings.length === 0) {
      return
    }

    const handleScroll = () => {
      const top = container.scrollTop
      setScrolled(top)

      if (scrollHandlerLocked.current) {
        return
      }

      let current = headings[0].id

      for (const heading of headings) {
        if (top >= heading.top - 100) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSectionId(current)
    }

    container.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [sections, makeHeadings, scrollContainerRef])

  const setActive = useCallback(
    (sectionId: string, shouldScroll: boolean = true) => {
      scrollHandlerLocked.current = true
      setCurrentSectionId(sectionId)

      if (shouldScroll) {
        const el = document.getElementById(sectionId)
        if (el) {
          const style = window.getComputedStyle(el)
          const scrollMt = parseFloat(style.scrollMarginTop)
          const targetScrollTop = el.offsetTop - scrollMt
          smoothScrollTo(targetScrollTop)
        }
      }
    },
    [smoothScrollTo],
  )

  useEffect(() => {
    if (scrollHandlerLocked.current) {
      const timeout = setTimeout(() => (scrollHandlerLocked.current = false), 400)
      return () => clearTimeout(timeout)
    }
  }, [currentSectionId])

  // Update indicator position when active section changes
  useEffect(() => {
    const activeIndex = sections.findIndex((section) => section.id === currentSectionId)
    if (activeIndex === -1 || !indicatorRef.current) return

    const activeItem = itemRefs.current[activeIndex]
    if (!activeItem) return

    const ulElement = activeItem.parentElement
    if (!ulElement) return

    const ulRect = ulElement.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()

    const top = itemRect.top - ulRect.top
    const height = itemRect.height

    indicatorRef.current.style.top = `${top}px`
    indicatorRef.current.style.height = `${height}px`
  }, [currentSectionId, sections])

  return (
    <nav className="relative flex flex-col">
      {sections.length > 0 && (
        <>
          <h2 className="py-1.5 text-sm font-semibold text-foreground">On this page</h2>

          <ul role="list" className="relative ml-px border-l-2 pl-3">
            {/* Sliding indicator */}
            <div
              ref={indicatorRef}
              className="absolute -left-0.5 w-0.5 bg-accent-foreground transition-all duration-200 ease-out"
              style={{ top: 0, height: 0 }}
            />

            {sections.map((section, index) => (
              <Item
                key={section.id}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                section={section}
                isActive={section.id === currentSectionId}
                onClick={(e) => {
                  e.preventDefault()
                  setActive(section.id, true)
                }}
              />
            ))}
          </ul>
        </>
      )}
      <div
        className="text-xmuted-foreground hover:text-muted-foreground relative ml-[3px] mt-2 pl-3 transition-opacity duration-200"
        style={{
          opacity: Math.min(Math.max(scrolled - 30, 0) / 300, 1),
          pointerEvents: scrolled > 0 ? 'auto' : 'none',
        }}
      >
        <Button
          variant="link"
          size="compact"
          onClick={() => smoothScrollTo(0)}
        >
          Scroll to top
          <CircleArrowUpIcon className="size-4" />
        </Button>
      </div>
    </nav>
  )
}

type ItemProps = {
  section: Section
  isActive: boolean
  onClick: (e: React.MouseEvent) => void
}

const Item = forwardRef<HTMLLIElement, ItemProps>(({ section, isActive, onClick }, ref) => (
  <li ref={ref}>
    <Button
      asChild
      variant="link"
      size="compact"
      className={isActive ? 'text-accent-foreground text-wrap' : 'text-xmuted-foreground text-wrap hover:text-muted-foreground'}
    >
      <Link href={`#${section.id}`} onClick={onClick}>
        {section.title}
      </Link>
    </Button>
  </li>
))
Item.displayName = 'Item'
