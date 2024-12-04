import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import { makeSections, type Section } from './make-sections.js'

export const buildToc = async (content: string) => {
  const ast = remark().use(remarkMdx).parse({ value: content })
  return makeSections(ast)
}
