import type { ComponentType, ReactNode } from 'react'
import { isValidElement } from 'react'
import { icons, type LucideIcon } from 'lucide-react'

export type IconSource = string | ReactNode | ComponentType<Record<string, unknown>>

const lucideIconMap = icons as Record<string, LucideIcon>

const toPascalCase = (value: string) => {
  return value
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('')
}

export const resolveLucideIcon = (name: string) => {
  if (!name) return undefined
  if (lucideIconMap[name]) return lucideIconMap[name]
  const normalized = toPascalCase(name)
  return lucideIconMap[normalized]
}

export const resolveIconNode = (icon?: IconSource) => {
  if (!icon) return null
  if (typeof icon === 'string') {
    const IconComponent = resolveLucideIcon(icon)
    return IconComponent ? <IconComponent aria-hidden="true" /> : null
  }
  if (isValidElement(icon)) {
    return icon
  }
  if (typeof icon === 'function') {
    const IconComponent = icon as ComponentType<Record<string, unknown>>
    return <IconComponent aria-hidden="true" />
  }
  return null
}
