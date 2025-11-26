'use client'

import { ScrollArea } from '../../ui/scroll-area.js'
import { CopyButton } from '../components/copy-button.js'

export const HighlightedCodeBlockBody = ({
  code,
  highlightedCode,
  showLineNumbers,
  showCopyButton,
}: {
  code: string
  highlightedCode: any
  showLineNumbers?: boolean
  showCopyButton?: boolean
}) => {
  const lines = code.trim().split(/\r\n|\r|\n/)
  return (
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
      {showCopyButton && <CopyButton content={code} />}
    </div>
  )
}

