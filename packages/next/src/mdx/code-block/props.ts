import { ReactNode } from 'react'
import { BuiltinLanguage } from 'shiki'

export type Props = {
  title?: string
  language?: BuiltinLanguage
  showLineNumbers?: boolean
  children: ReactNode
  [key: string]: any
}
