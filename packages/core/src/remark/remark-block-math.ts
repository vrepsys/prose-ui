import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import katex from 'katex'
import { flowElement, literalAttr, literalFlowExpression } from '../factories/mdx.js'
import { replaceNode } from './mdx-utils.js'

const remarkBlockMath: Plugin<[], Root> = () => {
  return (tree, _file) => {
    visit(tree, 'math', (node, index, parent) => {
      const renderedMath = katex.renderToString(node.value, {
        displayMode: true,
        throwOnError: false,
      })

      const blockMathJsx = flowElement(
        'BlockMath',
        [literalFlowExpression(node.value)],
        [literalAttr('renderedMath', renderedMath)],
      )
      replaceNode(parent, index, blockMathJsx)
    })
  }
}

export default remarkBlockMath
