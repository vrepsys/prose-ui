export type NavCategory = {
  type: 'category'
  name: string
  children: (NavLink | NavFolder)[]
}

export type NavLink = {
  type: 'link'
  name: string
  href: string
}

export type NavFolder = {
  type: 'folder'
  name: string
  href?: string
  children: (NavLink | NavFolder)[]
}

export type NavTopLevelItem = NavCategory | NavLink | NavFolder

export type NavItem = NavCategory | NavLink | NavFolder

export type NavTree = NavTopLevelItem[]
