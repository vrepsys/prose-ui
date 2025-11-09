import { ReactNode, isValidElement } from 'react'
import { decode } from 'html-entities'
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

  // Astro’s MDX compiler wraps fencing output in a React element that exposes the actual
  // string on `props.value` (no plain string children). We peek at `value` first
  // to support the Starlight runtime, and recurse through `children` as a fallback.
  if (isValidElement<{ children?: ReactNode; value?: string }>(children)) {
    const valueProp = (children.props as { value?: unknown }).value
    if (typeof valueProp === 'string') {
      return decode(valueProp)
    }
    if (valueProp && typeof (valueProp as { toString?: () => string }).toString === 'function') {
      const stringified = (valueProp as { toString: () => string }).toString()
      const decoded = decode(stringified)
      return decoded
    }
    if (children.props.children) {
      return extractCodeString(children.props.children)
    }
  }

  return ''
}

export const CodeBlock = (props: Props) => {
  const { language, children, code, highlightedCode, ...rest } = props

  return (
    <HighlightedCodeBlock
      code={code || ''}
      highlightedCode={highlightedCode || ''}
      language={language}
      {...rest}
    />
  )
}
