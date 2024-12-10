import { ReactNode, isValidElement } from 'react'
import { codeToHtml } from './highlighter'
import { Props } from './props'
import { HighlightedCodeBlock } from './highlighted-code-block'

function extractCodeString(children: ReactNode): string {
  if (typeof children === 'string') {
    return children
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => extractCodeString(child))
      .filter(Boolean)
      .join('\n')
  }

  if (isValidElement<{ children?: ReactNode }>(children) && children.props.children) {
    return extractCodeString(children.props.children)
  }

  return ''
}

export const CodeBlock = async (props: Props) => {
  const { language, children } = props
  const code = extractCodeString(children)
  const highlightedCode = await codeToHtml({
    code,
    language: language || 'text',
  })
  return <HighlightedCodeBlock code={code} highlightedCode={highlightedCode} {...props} />
}
