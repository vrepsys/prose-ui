import { Root } from 'mdast'
import { toString } from 'mdast-util-to-string'

export const extractTitle = (root: Root): string | null => {
  for (const node of root.children) {
    if (node.type === 'heading' && node.depth === 1) {
      return toString(node)
    }
  }
  return null
}
