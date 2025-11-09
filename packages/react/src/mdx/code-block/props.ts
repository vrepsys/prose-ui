import { ReactNode } from 'react'
import { BuiltinLanguage } from 'shiki'

export type Props = {
  title?: string
  language?: BuiltinLanguage
  showLineNumbers?: boolean
  code?: string
  highlightedCode?: string
  children: ReactNode
  [key: string]: any
}
