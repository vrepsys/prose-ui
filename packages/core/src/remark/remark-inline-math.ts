import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import katex from 'katex'
import { attr, attrValueExpression, textElement } from '../factories/mdx.js'
import { estree, expressionStatement, literalExpression } from '../factories/estree.js'

const remarkInlineMath: Plugin<[], Root> = () => {
  return (tree, _file) => {
    visit(tree, 'inlineMath', (node, index, parent) => {
      const renderedMath = katex.renderToString(node.value, {
        throwOnError: false,
      })

      const renderedAttr = attr(
        'renderedMath',
        attrValueExpression(
          JSON.stringify(renderedMath),
          estree([expressionStatement(literalExpression(renderedMath))]),
        ),
      )

      const inlineMathJsx = textElement(
        'InlineMath',
        [
          {
            type: 'text',
            value: node.value,
          },
        ],
        [renderedAttr],
      )
      if (parent && index !== undefined) {
        parent.children.splice(index, 1, inlineMathJsx)
      }
    })
  }
}

export default remarkInlineMath
