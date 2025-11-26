import type { Root, Code } from 'mdast'
import type { Parent } from 'unist'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import { attr, attrValueExpression, flowElement, flowExpression } from '../factories/mdx.js'
import { estree, expressionStatement, literalExpression } from '../factories/estree.js'
import { highlightCode } from '../highlight-code.js'
import { parseCodeBlockMeta } from './code-utils.js'

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

      const content = flowExpression(
        `'${node.value}'`,
        estree([expressionStatement(literalExpression(node.value))]),
      )

      const codeAttr = attr(
        'code',
        attrValueExpression(
          JSON.stringify(node.value),
          estree([expressionStatement(literalExpression(node.value))]),
        ),
      )

      const highlightedCodeAttr = attr(
        'highlightedCode',
        attrValueExpression(
          JSON.stringify(highlightedCode),
          estree([expressionStatement(literalExpression(highlightedCode))]),
        ),
      )

      const codeBlockJsx = flowElement(
        'CodeBlock',
        [content],
        [
          attr('language', lang),
          attr('title', title),
          attr('showLineNumbers', showLineNumbers ? null : undefined),
          codeAttr,
          highlightedCodeAttr,
        ],
      )
      if (parent && index !== undefined) {
        parent.children.splice(index, 1, codeBlockJsx)
      }
    }
  }
}

export default remarkCodeBlock
