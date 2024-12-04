import { ReactNode } from 'react'

type Props = {
  align?: 'left' | 'right' | 'center' | 'stretch'
  caption?: string
  children: ReactNode
}

export const Frame = ({ align, caption, children }: Props) => {
  return (
    <figure data-align={align || 'left'} className="frame">
      {children}
      {caption && <figcaption className="caption">{caption}</figcaption>}
    </figure>
  )
}
