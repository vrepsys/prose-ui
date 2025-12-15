import { ReactNode } from 'react'

export type Props = {
  title?: string
  language?: string
  showLineNumbers?: boolean
  code?: string
  highlightedCode?: string
  children: ReactNode
  [key: string]: any
}
