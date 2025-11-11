import { ReactNode } from 'react'
import { classes } from '../classes.js'

type Props = {
  title?: string
  variant?: 'note' | 'info' | 'warning' | 'tip' | 'danger'
  children: ReactNode
  [key: string]: any
}

export const Callout = ({ variant, title, children }: Props) => {
  return (
    <div className={classes('callout', variant ?? 'note')}>
      {title && <div className="title">{title}</div>}
      <div className="body">{children}</div>
    </div>
  )
}
