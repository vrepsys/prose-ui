import { Props } from './props.js'
import { HighlightedCodeBlock } from './highlighted-code-block.js'

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
