import type { PhrasingContent, Root } from 'mdast'
import slash from 'slash'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { attr, textElement } from '../factories/mdx.js'
import { replaceNode } from './mdx-utils.js'

export const EXTERNAL_URL_REGEX = /^https?:\/\//

const createLinkTag = ({ href, children }: { href: string; children: PhrasingContent[] }) => {
  return textElement('Link', children, [attr('href', href)])
}

export type Options = {
  mapUrl?: (url: string) => string
}

const remarkLink = ({ mapUrl }: Options = {}) => {
  const plugin: Plugin<[], Root> = () => async (tree, _file, done) => {
    // process markdown syntax links
    visit(tree, 'link', (node, index, parent) => {
      let url = slash(decodeURI(node.url))
      if (mapUrl) {
        url = mapUrl(url)
      }
      if (url.startsWith('/')) {
        const linkTag = createLinkTag({ children: node.children, href: url })
        replaceNode(parent, index, linkTag)
      }
    })

    done()
  }
  return plugin
}

export default remarkLink
