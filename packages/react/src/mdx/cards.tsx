import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react'
import { classes } from '../classes.js'

export type CardsProps = ComponentPropsWithoutRef<'div'> & {
  columns?: number
  children: ReactNode
}

export const Cards = ({ columns = 3, className, children, style, ...rest }: CardsProps) => {
  return (
    <div
      className={classes('columns', className)}
      style={{ '--columns': columns, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  )
}

