import { ReactNode } from 'react'

export const Caption = ({ children }: { children: ReactNode }) => {
  return <figcaption className="caption">{children}</figcaption>
}
