'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { SidenavProvider, useSideNav } from './sidenav-context'
import { NavTree } from './types'
import { classes } from '@/utils/classes'

type Props = {
  tree: NavTree
  largeTMP?: boolean
}

const SidenavCategory = ({
  item,
  level,
}: {
  item: TreeNode
  level: number
  largeTMP?: boolean
}) => {
  return (
    <div className="flex flex-col">
      <h4 className="text-color-base px-0 py-1.5 font-semibold md:text-sm">{item.name}</h4>
      <ul className="-ml-[0.875rem] flex flex-col gap-px md:-ml-2" aria-label={item.name}>
        <SidenavItems items={item.children} level={level} />
      </ul>
    </div>
  )
}

const FolderItem = ({
  url,
  className,
  onClick,
  children,
}: {
  url?: string
  className: string
  onClick: () => void
  children: ReactNode
}) => {
  return url ? (
    <Link className={className} onClick={onClick} href={url}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={className} role="switch">
      {children}
    </button>
  )
}

const hasChildWithPathname = (item: TreeNode, pathname: string): boolean => {
  if (item.href === pathname) {
    return true
  }
  if (item.children) {
    return item.children.some((child) => hasChildWithPathname(child, pathname))
  }
  return false
}

const SidenavFolder = ({ item, level }: { item: TreeNode; level: number }) => {
  const pathname = usePathname()
  const { isExpanded, expandByHref, toggleExpandFolder } = useSideNav()
  useEffect(() => {
    expandByHref(pathname)
  }, [pathname])
  const active = hasChildWithPathname(item, pathname)
  const open = item.href === pathname

  const expanded = isExpanded(item.path)
  return (
    <li className="flex flex-col">
      <FolderItem
        url={item.href}
        onClick={() => {
          // For folders that don't have a page -- every click triggers expand toggle
          // For folders with a page -- we prevent the collapse and just open
          // the page if folder is already expanded
          if (!item.href || !expanded || open) {
            toggleExpandFolder(item.path)
          }
        }}
        className={classes(
          'group relative mb-px flex cursor-pointer flex-row items-center justify-between rounded-md px-[0.875rem] py-2 font-medium transition md:px-2 md:py-[0.3rem] md:text-sm',
          active
            ? 'text-color-accent-high'
            : 'hover:text-color-low text-color-lower hover:bg-color-low/60',
          open && 'bg-color-lower',
        )}
      >
        <span>{item.name}</span>
        <span
          className={classes(
            'shrink-0 transform transition-transform',
            expanded ? 'text-foreground rotate-90' : 'text-muted-foreground rotate-0',
          )}
        >
          <ChevronRight
            className={classes(
              'transform-none transition-colors',
              active ? 'stroke-color-base' : 'stroke-color-lower group-hover:stroke-color-low',
            )}
            size={15}
          />
        </span>
      </FolderItem>
      <FolderContents item={item} level={level} expanded={expanded} />
    </li>
  )
}

const FolderContents = ({
  expanded,
  item,
  level,
}: {
  expanded: boolean
  item: TreeNode
  level: number
}) => {
  return (
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.ul
          role="list"
          layoutScroll
          className="flex flex-col gap-px overflow-y-clip pl-4"
          aria-label={item.name}
          transition={{ duration: 0.15 }}
          initial={{ height: 0, opacity: 0.7 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0.7 }}
        >
          <SidenavItems items={item.children} level={level + 1} />
        </motion.ul>
      )}
    </AnimatePresence>
  )
}

const SidenavLink = ({ item }: { item: TreeNode; level: number }) => {
  const pathname = usePathname()
  const active = item.href === pathname
  return (
    <li className="relative">
      <Link
        className={classes(
          'flex w-full cursor-pointer rounded-lg px-[0.875rem] py-2 font-medium transition md:px-2 md:py-[0.3rem] md:text-sm',
          active
            ? 'bg-color-low text-color-accent-high'
            : 'hover:text-color-low text-color-lower hover:bg-color-low/60',
        )}
        href={item.href!}
      >
        {item.name}
      </Link>
    </li>
  )
}

const SidenavItems = ({ items, level }: { items: TreeNode[]; level: number }) => {
  return (
    <>
      {items.map((item) => {
        if (item.type === 'category') {
          return <SidenavCategory key={item.path} item={item} level={level} />
        } else if (item.type === 'folder') {
          return <SidenavFolder key={item.path} item={item} level={level} />
        } else {
          return <SidenavLink key={item.path} item={item} level={level} />
        }
      })}
    </>
  )
}

export const SideNav = ({ tree }: Props) => {
  const node = generateTree(tree)
  return (
    <SidenavProvider tree={node}>
      <nav>
        <ul className="flex flex-col gap-6">
          <SidenavItems items={node} level={0} />
        </ul>
      </nav>
    </SidenavProvider>
  )
}

export type TreeNode = {
  name: string
  type: 'category' | 'link' | 'folder'
  path: string
  href?: string
  children: TreeNode[]
}

function generateTree(tree: NavTree): TreeNode[] {
  let counter = 0
  const generate = (tree: NavTree, parentPath: string = ''): TreeNode[] => {
    return [
      ...tree.map((item) => {
        const { type, name } = item
        const path = `${parentPath}/${++counter}`
        if (type === 'link' || type === 'folder') {
          const children = type === 'folder' ? generate(item.children, path) : []
          return {
            type,
            name,
            href: item.href ? `/docs${item.href}`.replace(/\/$/, '') : undefined,
            path,
            children,
          }
        }
        return {
          name,
          path,
          type,
          children: generate(item.children, path),
        }
      }),
    ]
  }
  return generate(tree)
}
