'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { TreeNode } from './sidenav'

type ContextProps = {
  expandByHref: (href: string) => void
  expandFolder: (path: string) => void
  isExpanded: (path: string) => boolean
  toggleExpandFolder: (path: string) => void
}

const SidenavContext = createContext<ContextProps | undefined>(undefined)

function getPathsByUrl(
  tree: TreeNode[],
  pathsByUrl: Map<string, string> = new Map<string, string>(),
) {
  tree.forEach((item) => {
    if ('href' in item && item.href) {
      pathsByUrl.set(item.href, item.path)
    }
    if ('children' in item) {
      getPathsByUrl(item.children, pathsByUrl)
    }
  })
  return pathsByUrl
}

export const SidenavProvider = ({ tree, children }: { tree: TreeNode[]; children: ReactNode }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set<string>())
  const pathsByUrl = getPathsByUrl(tree)
  const expandFolder = (path: string) => setExpandedFolders((x) => new Set(x.add(path)))

  const expandByHref = (href: string) => {
    const path = pathsByUrl.get(href)
    if (path) {
      const expand = path
        .slice(1)
        .split('/')
        .slice(0, -1)
        .map((_, i, dirs) => `/${dirs.slice(0, i + 1).join('/')}`)
        .filter((path) => !expandedFolders.has(path))

      if (expand.length > 0) {
        setExpandedFolders((x) => {
          expand.forEach((path) => x.add(path))
          return new Set(x)
        })
      }
    }
  }

  const isExpanded = (path: string) => expandedFolders.has(path)

  useEffect(() => {
    console.log(expandedFolders)
  }, [expandedFolders])

  const toggleExpandFolder = useCallback(
    (path: string) => {
      setExpandedFolders((all) => {
        all = new Set(all)
        if (isExpanded(path)) {
          all.delete(path)
        } else {
          return all.add(path)
        }
        return all
      })
    },
    [isExpanded, expandedFolders],
  )

  return (
    <SidenavContext.Provider
      value={{
        expandFolder,
        expandByHref,
        isExpanded,
        toggleExpandFolder,
      }}
    >
      {children}
    </SidenavContext.Provider>
  )
}

export const useSideNav = (): ContextProps => {
  const context = useContext(SidenavContext)
  if (context === undefined) {
    throw new Error('useSideNav must be used within a SidenavProvider')
  }
  return context
}
