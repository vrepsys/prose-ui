import type { Root, Code } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { attr, flowElement, flowExpression } from '../factories/mdx.js'
import { estree, expressionStatement, literalExpression } from '../factories/estree.js'

const TITLE_REGEX = /title=(['"])(?<title>.*)(\1)/i

const remarkCodeBlock: Plugin<[], Root> = () => {
  return (tree, _file) => {
    visit(tree, 'code', (node: Code, index, parent) => {
      // when lang is not present showLineNumbers and title will apper in node.lang
      const attrsStr = [node.lang, node.meta ?? ''].filter((x) => !!x).join(' ')
      const m = attrsStr.match(TITLE_REGEX)
      const title = m?.groups?.title
      const lang =
        node.lang && !node.lang.includes('showLineNumbers') && !node.lang.includes('title=')
          ? node.lang
          : undefined
      const showLineNumbers = attrsStr.includes('showLineNumbers')

      const content = flowExpression(
        `'${node.value}'`,
        estree([expressionStatement(literalExpression(node.value))]),
      )
      const codeBlockJsx = flowElement(
        'CodeBlock',
        [content],
        [
          attr('language', lang),
          attr('title', title),
          attr('showLineNumbers', showLineNumbers ? null : undefined),
        ],
      )
      if (parent && index !== undefined) {
        parent.children.splice(index, 1, codeBlockJsx)
      }
    })
  }
}

export default remarkCodeBlock
