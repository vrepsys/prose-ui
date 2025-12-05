import type { CSSProperties, ReactNode } from 'react'

export type SubtitleProps = {
  children: ReactNode
  style?: CSSProperties
}

export function Subtitle({ children, style }: SubtitleProps) {
  return (
    <div className="subtitle" style={style}>
      {children}
    </div>
  )
}

