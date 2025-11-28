import type { Root, Code } from 'mdast'
import type { Parent } from 'unist'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import { attr, flowElement, literalAttr, literalFlowExpression } from '../factories/mdx.js'
import { highlightCode } from '../highlight-code.js'
import { parseCodeBlockMeta } from './code-utils.js'
import { replaceNode } from './mdx-utils.js'

const isInsideCodeGroup = (parent: Parent | undefined): boolean => {
  if (!parent) return false
  const p = parent as MdxJsxFlowElement
  return p.type === 'mdxJsxFlowElement' && p.name === 'CodeGroup'
}

const remarkCodeBlock: Plugin<[], Root> = () => {
  return async (tree) => {
    const codeNodes: Array<{ node: Code; index: number; parent: Parent }> = []

    visit(tree, 'code', (node: Code, index, parent) => {
      // Skip code blocks inside CodeGroup - they are handled by remark-code-group
      if (isInsideCodeGroup(parent)) {
        return
      }
      if (parent && typeof index === 'number') {
        codeNodes.push({ node, index, parent })
      }
    })

    for (const { node, index, parent } of codeNodes) {
      const { title, lang, showLineNumbers } = parseCodeBlockMeta(node)

      const highlightedCode = await highlightCode(node.value, lang)

      const codeBlockJsx = flowElement(
        'CodeBlock',
        [literalFlowExpression(node.value)],
        [
          attr('language', lang),
          attr('title', title),
          attr('showLineNumbers', showLineNumbers ? null : undefined),
          literalAttr('code', node.value),
          literalAttr('highlightedCode', highlightedCode),
        ],
      )
      replaceNode(parent, index, codeBlockJsx)
    }
  }
}

export default remarkCodeBlock
