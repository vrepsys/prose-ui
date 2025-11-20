import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react'
import { isValidElement } from 'react'
import { ArrowRight, icons, type LucideIcon } from 'lucide-react'
import { classes } from '../classes.js'

type NativeProps = Omit<ComponentPropsWithoutRef<'div'>, 'title' | 'children' | 'color' | 'href'> &
  Omit<ComponentPropsWithoutRef<'a'>, 'title' | 'children' | 'color' | 'href'>

type CardIcon = string | ReactNode | ComponentType<Record<string, unknown>>
type Booleanish = boolean | 'true' | 'false' | undefined

const lucideIconMap = icons as Record<string, LucideIcon>

const toPascalCase = (value: string) => {
  return value
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('')
}

const resolveLucideIcon = (name: string) => {
  if (!name) return undefined
  if (lucideIconMap[name]) return lucideIconMap[name]
  const normalized = toPascalCase(name)
  return lucideIconMap[normalized]
}

const resolveIconNode = (icon?: CardIcon) => {
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

const parseBoolean = (value: Booleanish) => {
  if (typeof value === 'string') {
    if (!value.length) return true
    return value.toLowerCase() === 'true'
  }
  return Boolean(value)
}

const isExternalHref = (href?: string) => {
  if (!href) return false
  return /^https?:\/\//i.test(href)
}

export type CardProps = NativeProps & {
  title: string
  icon?: CardIcon
  color?: string
  href?: string
  horizontal?: Booleanish
  cta?: string
  arrow?: Booleanish
  children?: ReactNode
}

export const Card = ({
  title,
  icon,
  color: iconColor,
  href,
  horizontal,
  cta,
  arrow,
  children,
  className,
  target,
  rel,
  ...rest
}: CardProps) => {
  const resolvedIcon = resolveIconNode(icon)
  const isHorizontal = parseBoolean(horizontal)
  const external = isExternalHref(href)
  const showArrow = typeof arrow !== 'undefined' ? parseBoolean(arrow) : external
  const Root: 'a' | 'div' = href ? 'a' : 'div'
  const rootClassName = classes('card', href && 'interactive', isHorizontal && 'horizontal', className)

  const rootProps: Record<string, unknown> = {
    ...rest,
    className: rootClassName,
  }

  if (href) {
    rootProps.href = href
    if (target) {
      rootProps.target = target
    } else if (external) {
      rootProps.target = '_blank'
    }
    if (rel) {
      rootProps.rel = rel
    } else if (external) {
      rootProps.rel = 'noreferrer noopener'
    }
  }

  return (
    <Root {...rootProps}>
      <div className="card-content">
        <div className="card-header">
          {resolvedIcon && (
            <span className="card-icon" aria-hidden="true" style={iconColor ? { color: iconColor } : undefined}>
              {resolvedIcon}
            </span>
          )}
          <div className="card-text">
            <p className="card-title">{title}</p>
          </div>
        </div>
        {children && <div className="card-body">{children}</div>}
      </div>
      {(cta || showArrow) && (
        <div className="card-footer">
          {cta && <span className="card-cta">{cta}</span>}
          {showArrow && <ArrowRight className="card-arrow" aria-hidden="true" />}
        </div>
      )}
    </Root>
  )
}
