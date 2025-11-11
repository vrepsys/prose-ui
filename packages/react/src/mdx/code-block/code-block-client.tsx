'use client'

import { ReactNode, isValidElement, useEffect, useState } from 'react'
import { decode } from 'html-entities'
import { codeToHtml } from './highlighter.js'
import { Props } from './props.js'
import { HighlightedCodeBlock } from './highlighted-code-block.js'

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

  // Astro's MDX compiler wraps fencing output in a React element that exposes the actual
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

/**
 * Client-side version of CodeBlock for Astro compatibility.
 * Does syntax highlighting on the client side.
 * Use this with Astro's client:load directive.
 */
export const CodeBlockClient = (props: Props) => {
  const { language, children, code: codeProp, highlightedCode: highlightedCodeProp, ...rest } = props

  const derivedCode = codeProp ?? extractCodeString(children) ?? ''

  if (highlightedCodeProp) {
    return (
      <HighlightedCodeBlock
        code={derivedCode}
        highlightedCode={highlightedCodeProp}
        language={language}
        {...rest}
      />
    )
  }

  const [highlightedCode, setHighlightedCode] = useState<string>('')
  const [code, setCode] = useState<string>(derivedCode)

  useEffect(() => {
    const extractedCode = codeProp ?? extractCodeString(children) ?? ''
    setCode(extractedCode)

    codeToHtml({
      code: extractedCode,
      language: language || 'text',
    }).then(setHighlightedCode)
  }, [children, language, codeProp])

  if (!highlightedCode) {
    return (
      <div className="code-block">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    )
  }

  return (
    <HighlightedCodeBlock
      code={code}
      highlightedCode={highlightedCode}
      language={language}
      {...rest}
    />
  )
}
