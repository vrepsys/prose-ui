import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { textElement } from '../factories/mdx.js'

const remarkInlineMath: Plugin<[], Root> = () => {
  return (tree, _file) => {
    visit(tree, 'inlineMath', (node, index, parent) => {
      const inlineMathJsx = textElement(
        'InlineMath',
        [
          {
            type: 'text',
            value: node.value,
          },
        ],
        [],
      )
      if (parent && index !== undefined) {
        parent.children.splice(index, 1, inlineMathJsx)
      }
    })
  }
}

export default remarkInlineMath