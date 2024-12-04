'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { classes } from '@/utils/classes'
import { Section } from '@/lib/make-sections'
import { Button } from '../ui/button'

type Heading = {
  id: string
  top: number
}

type Props = {
  sections: Section[]
}

export const Toc = ({ sections }: Props) => {
  const [currentSectionId, setCurrentSectionId] = useState(sections?.[0]?.id)
  const scrollHandlerLocked = useRef(false)
  sections = sections.filter((section) => [2, 3].includes(section.depth))

  const makeHeadings = useCallback(
    (sections: Section[]): Heading[] =>
      sections
        .map((section) => section.id)
        .map((id) => {
          const el = document.getElementById(id)
          if (!el) {
            return null
          }

          const style = window.getComputedStyle(el)
          const scrollMt = parseFloat(style.scrollMarginTop)
          const top = window.scrollY + el.getBoundingClientRect().top - scrollMt
          return { id, top }
        })
        .filter((h): h is Heading => h !== null),
    [],
  )

  useEffect(() => {
    if (sections.length === 0) {
      return
    }
    const headings = makeHeadings(sections)
    if (headings.length === 0) {
      return
    }
    const handleScroll = () => {
      if (scrollHandlerLocked.current) {
        return
      }

      const top = window.scrollY
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

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sections, makeHeadings])

  const isActive = (section: Section) => section.id === currentSectionId || false

  const setActive = (sectionId: string) => {
    scrollHandlerLocked.current = true
    setCurrentSectionId(sectionId)
  }

  useEffect(() => {
    if (scrollHandlerLocked.current) {
      const timeout = setTimeout(() => (scrollHandlerLocked.current = false), 400)
      return () => clearTimeout(timeout)
    }
  }, [currentSectionId])

  if (sections.length === 0) {
    return null
  }

  return (
    <nav>
      <h2 className="py-1.5 text-sm font-semibold">On this page</h2>

      <ul role="list">
        {sections.map((section) => (
          <Item
            key={section.id}
            section={section}
            active={isActive(section)}
            onClick={() => setActive(section.id)}
          />
        ))}
      </ul>
    </nav>
  )
}

type ItemProps = {
  section: Section
  active: boolean
  onClick: () => void
}

const Item = ({ section, active, onClick }: ItemProps) => {
  return (
    <li>
      <Button
        asChild
        variant="link"
        size="compact"
        active={active}
        className={classes(section.depth < 3 ? 'pl-0' : 'pl-3', 'text-wrap')}
      >
        <Link href={`#${section.id}`} onClick={onClick}>
          {section.title}
        </Link>
      </Button>
    </li>
  )
}
