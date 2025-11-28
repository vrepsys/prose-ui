import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import katex from 'katex'
import { literalAttr, textElement } from '../factories/mdx.js'
import { replaceNode } from './mdx-utils.js'

const remarkInlineMath: Plugin<[], Root> = () => {
  return (tree, _file) => {
    visit(tree, 'inlineMath', (node, index, parent) => {
      const renderedMath = katex.renderToString(node.value, {
        throwOnError: false,
      })

      const inlineMathJsx = textElement(
        'InlineMath',
        [{ type: 'text', value: node.value }],
        [literalAttr('renderedMath', renderedMath)],
      )
      replaceNode(parent, index, inlineMathJsx)
    })
  }
}

export default remarkInlineMath
