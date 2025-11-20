import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react'
import { classes } from '../classes.js'

export type ColumnsProps = ComponentPropsWithoutRef<'div'> & {
  columns?: number
  children: ReactNode
}

export const Columns = ({ columns = 3, className, children, style, ...rest }: ColumnsProps) => {
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
