import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import { remarkPlugins } from '@prose-ui/core'
import { extractToc } from './extract-toc.js'
import { extractTitle } from './extract-title.js'

export const extractMetadata = async (mdx: string) => {
  // Apply all remarkPlugins for consistency with content compilation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let processor: any = remark().use(remarkMdx)
  
  for (const plugin of remarkPlugins()) {
    processor = processor.use(plugin)
  }
  
  const ast = processor.parse({ value: mdx })
  return { toc: extractToc(ast), title: extractTitle(ast) }
}
