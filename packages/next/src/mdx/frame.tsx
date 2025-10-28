import { ReactNode } from 'react'
import { Caption } from './caption'

type Props = {
  align?: 'left' | 'right' | 'center' | 'stretch'
  caption?: string
  children: ReactNode
}

export const Frame = ({ align, caption, children }: Props) => {
  return (
    <figure data-align={align || 'left'} className="frame">
      {children}
      {caption && <Caption>{caption}</Caption>}
    </figure>
  )
}
