import slugify from 'slugify'
import { Root } from 'mdast'
import { toString } from 'mdast-util-to-string'

export type Section = {
  id: string
  title: string
  depth: number
}

export const extractToc = (root: Root): Section[] => {
  const sections: Section[] = []
  for (const node of root.children) {
    if (node.type === 'heading') {
      const title = toString(node)
      const id = slugify(title, {
        lower: true,
        strict: true,
      }).replaceAll(/(^\d)|[^a-zA-Z0-9-_]/g, '')
      sections.push({ id, title, depth: node.depth })
    }
  }
  return sections
}
