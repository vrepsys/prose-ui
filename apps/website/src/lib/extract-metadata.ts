import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import { extractToc } from './extract-toc.js'
import { extractTitle } from './extract-title.js'

export const extractMetadata = async (mdx: string) => {
  const ast = remark().use(remarkMdx).parse({ value: mdx })
  return { toc: extractToc(ast), title: extractTitle(ast) }
}
