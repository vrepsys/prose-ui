'use client'

import { CopyButton } from '../components/copy-button.js'
import { Props } from './props.js'
import { HighlightedCodeBlockBody } from './highlighted-code-block-body.js'

export const HighlightedCodeBlock = ({
  highlightedCode,
  code,
  title,
  showLineNumbers,
}: Omit<Props, 'children'> & { highlightedCode: any; code: string }) => {
  const attrs = {
    'data-show-line-numbers': showLineNumbers ? '' : undefined,
    'data-has-title': title ? '' : undefined,
  }
  return (
    <div {...attrs} className="code-block">
      {title && (
        <div className="header">
          <div className="title">{title}</div>
          <CopyButton content={code} />
        </div>
      )}
      <HighlightedCodeBlockBody
        code={code}
        highlightedCode={highlightedCode}
        showLineNumbers={showLineNumbers}
        showCopyButton={!title}
      />
    </div>
  )
}
