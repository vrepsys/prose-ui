import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { flowElement, flowExpression } from '../factories/mdx.js'
import { estree, expressionStatement, literalExpression } from '../factories/estree.js'

const remarkBlockMath: Plugin<[], Root> = () => {
  return (tree, _file) => {
    visit(tree, 'math', (node, index, parent) => {
      const content = flowExpression(
        `'${node.value}'`,
        estree([expressionStatement(literalExpression(node.value))]),
      )
      const blockMathJsx = flowElement(
        'BlockMath',
        [content],
        [],
      )
      if (parent && index !== undefined) {
        parent.children.splice(index, 1, blockMathJsx)
      }
    })
  }
}

export default remarkBlockMath

