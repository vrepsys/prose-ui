import type { Code } from 'mdast'

const TITLE_REGEX = /title=(['"])(?<title>.*)(\1)/i

export type CodeBlockMeta = {
  title: string | undefined
  lang: string
  showLineNumbers: boolean
}

export function parseCodeBlockMeta(node: Code): CodeBlockMeta {
  const attrsStr = [node.lang, node.meta ?? ''].filter((x) => !!x).join(' ')
  const match = attrsStr.match(TITLE_REGEX)
  const title = match?.groups?.title
  const lang =
    node.lang && !node.lang.includes('showLineNumbers') && !node.lang.includes('title=')
      ? node.lang
      : 'text'
  const showLineNumbers = attrsStr.includes('showLineNumbers')

  return { title, lang, showLineNumbers }
}

