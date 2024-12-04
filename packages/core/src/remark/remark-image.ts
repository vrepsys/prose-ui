import fs from 'fs'
import type { Root } from 'mdast'
import {
  MdxJsxAttributeValueExpression,
  MdxJsxFlowElement,
  MdxJsxTextElement,
} from 'mdast-util-mdx-jsx'
import sharp from 'sharp'
import slash from 'slash'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { estree, expressionStatement, literalExpression } from '../factories/estree.js'

import path from 'path'
import { attr, attrValueExpression, flowElement } from '../factories/mdx.js'
import { attrsToObj, parseNumberExpressionAttr, parseStringAttr } from './jsx-utils.js'

export const EXTERNAL_URL_REGEX = /^https?:\/\//

const createImageTag = (
  src: string | MdxJsxAttributeValueExpression,
  { alt, width, height }: { alt?: string; width?: number; height?: number },
) => {
  const widthAttr =
    width !== undefined
      ? attr(
          'width',
          attrValueExpression(
            width.toString(),
            estree([expressionStatement(literalExpression(width.toString()))]),
          ),
        )
      : undefined
  const heightAttr =
    height !== undefined
      ? attr(
          'height',
          attrValueExpression(
            height.toString(),
            estree([expressionStatement(literalExpression(height.toString()))]),
          ),
        )
      : undefined
  return flowElement('Image', [], [attr('src', src), attr('alt', alt), widthAttr, heightAttr])
}

export type Options = {
  imageDir?: string
}
const DEFAULT_IMAGE_DIR = './public'

const remarkImage = ({ imageDir }: Options = { imageDir: DEFAULT_IMAGE_DIR }) => {
  imageDir = imageDir ?? DEFAULT_IMAGE_DIR
  const plugin: Plugin<[], Root> = () => async (tree, _file, done) => {
    const localPaths = new Set<string>()

    // Collect markdown image paths
    visit(tree, 'image', (node) => {
      let url = slash(decodeURI(node.url))
      if (url.startsWith('/')) {
        localPaths.add(url)
      }
    })

    // Collect JSX Image paths
    visit(
      tree,
      [
        { type: 'mdxJsxFlowElement', name: 'Image' },
        { type: 'mdxJsxTextElement', name: 'Image' },
      ],
      (node) => {
        node = node as MdxJsxFlowElement | MdxJsxTextElement
        const src = node.attributes.find(
          (x) => x.type === 'mdxJsxAttribute' && x.name === 'src' && typeof x.value === 'string',
        ) as any
        let url = src ? slash(decodeURI(src.value)) : undefined
        if (url && url.startsWith('/')) {
          localPaths.add(url)
        }
      },
    )

    // Compute width and height for each path
    const dimensions = new Map<string, { width: number; height: number }>()
    for (const localPath of localPaths) {
      const fullPath = path.join(imageDir, localPath)
      if (!dimensions.has(localPath)) {
        if (fs.existsSync(fullPath)) {
          const { width, height } = await sharp(fullPath).metadata()
          if (width && height) {
            dimensions.set(localPath, { width, height })
          }
        } else {
          console.error('Image not found', fullPath)
        }
      }
    }

    // Replace markdown images with the JSX Image
    visit(tree, 'image', (node, index, parent) => {
      let url = slash(decodeURI(node.url))
      let imageTag: MdxJsxFlowElement
      const size = dimensions.get(url) || {}

      imageTag = createImageTag(url, { alt: node?.alt ?? undefined, ...size })
      if (parent && index !== undefined) {
        parent.children.splice(index, 1, imageTag)
      }
    })

    visit(
      tree,
      [
        { type: 'mdxJsxFlowElement', name: 'Image' },
        { type: 'mdxJsxTextElement', name: 'Image' },
      ],
      (node) => {
        node = node as MdxJsxFlowElement | MdxJsxTextElement
        const attrs = attrsToObj(node.attributes)
        let width = parseNumberExpressionAttr(attrs, 'width')
        let height = parseNumberExpressionAttr(attrs, 'height')
        const src = parseStringAttr(attrs, 'src')
        let url = src ? slash(decodeURI(src)) : undefined
        if (url) {
          const size = dimensions.get(url)
          if (size) {
            if (width && !height) {
              height = Math.round((size.height / size.width) * width)
            } else if (height && !width) {
              width = Math.round((size.width / size.height) * height)
            } else if (!(width && height)) {
              width = size.width
              height = size.height
            }
          }
        }

        const widthAttr =
          !attrs.width && width
            ? attr(
                'width',
                attrValueExpression(
                  width.toString(),
                  estree([expressionStatement(literalExpression(width.toString()))]),
                ),
              )
            : undefined

        const heightAttr =
          !attrs.height && height
            ? attr(
                'height',
                attrValueExpression(
                  height.toString(),
                  estree([expressionStatement(literalExpression(height.toString()))]),
                ),
              )
            : undefined
        if (widthAttr) {
          node.attributes.push(widthAttr)
        }
        if (heightAttr) {
          node.attributes.push(heightAttr)
        }
      },
    )
    done()
  }
  return plugin
}

export default remarkImage
