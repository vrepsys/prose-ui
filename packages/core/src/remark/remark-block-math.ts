import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import katex from 'katex'
import { attr, attrValueExpression, flowElement, flowExpression } from '../factories/mdx.js'
import { estree, expressionStatement, literalExpression } from '../factories/estree.js'

const remarkBlockMath: Plugin<[], Root> = () => {
  return (tree, _file) => {
    visit(tree, 'math', (node, index, parent) => {
      const renderedMath = katex.renderToString(node.value, {
        displayMode: true,
        throwOnError: false,
      })

      const renderedAttr = attr(
        'renderedMath',
        attrValueExpression(
          JSON.stringify(renderedMath),
          estree([expressionStatement(literalExpression(renderedMath))]),
        ),
      )

      const content = flowExpression(
        `'${node.value}'`,
        estree([expressionStatement(literalExpression(node.value))]),
      )
      const blockMathJsx = flowElement('BlockMath', [content], [renderedAttr])
      if (parent && index !== undefined) {
        parent.children.splice(index, 1, blockMathJsx)
      }
    })
  }
}

export default remarkBlockMath
