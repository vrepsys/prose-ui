import { ScrollArea } from '../../ui/scroll-area'
import { CopyButton } from './copy-button'
import { Props } from './props'

export const HighlightedCodeBlock = ({
  highlightedCode,
  code,
  title,
  showLineNumbers,
}: Omit<Props, 'children'> & { highlightedCode: any; code: string }) => {
  const lines = code.trim().split(/\r\n|\r|\n/)
  const attrs = {
    'data-show-line-nubmers': showLineNumbers,
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
