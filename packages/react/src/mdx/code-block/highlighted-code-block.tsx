'use client'

import { ScrollArea } from '../../ui/scroll-area.js'
import { CopyButton } from './copy-button.js'
import { Props } from './props.js'

export const HighlightedCodeBlock = ({
  highlightedCode,
  code,
  title,
  showLineNumbers,
}: Omit<Props, 'children'> & { highlightedCode: any; code: string }) => {
  const lines = code.trim().split(/\r\n|\r|\n/)
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
      <div className="body">
        {code && showLineNumbers && (
          <div className="line-numbers">
            {Array(lines.length)
              .fill(0)
              .map((_, i) => (
                <div className="line-number" key={i}>
                  {i + 1}
                </div>
              ))}
          </div>
        )}
        <ScrollArea>
          <div className="code-container" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </ScrollArea>
        {!title && <CopyButton content={code} />}
      </div>
    </div>
  )
}
