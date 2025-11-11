import type { Root, Code } from 'mdast'
import type { Parent } from 'unist'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { attr, attrValueExpression, flowElement, flowExpression } from '../factories/mdx.js'
import { estree, expressionStatement, literalExpression } from '../factories/estree.js'
import { highlightCode } from '../highlight-code.js'

const TITLE_REGEX = /title=(['"])(?<title>.*)(\1)/i

const remarkCodeBlock: Plugin<[], Root> = () => {
  return async (tree) => {
    const codeNodes: Array<{ node: Code; index: number; parent: Parent }> = []

    visit(tree, 'code', (node: Code, index, parent) => {
      if (parent && typeof index === 'number') {
        codeNodes.push({ node, index, parent })
      }
    })

    for (const { node, index, parent } of codeNodes) {
      // when lang is not present showLineNumbers and title will apper in node.lang
      const attrsStr = [node.lang, node.meta ?? ''].filter((x) => !!x).join(' ')
      const m = attrsStr.match(TITLE_REGEX)
      const title = m?.groups?.title
      const lang =
        node.lang && !node.lang.includes('showLineNumbers') && !node.lang.includes('title=')
          ? node.lang
          : undefined
      const showLineNumbers = attrsStr.includes('showLineNumbers')

      const highlightedCode = await highlightCode(node.value, lang || 'text')

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
