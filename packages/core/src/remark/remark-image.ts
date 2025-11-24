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

const isInlineImage = (parent: any): boolean => {
  return parent?.type === 'paragraph' && Array.isArray(parent.children) && parent.children.length > 1
}

const createZoomAttr = (zoom: boolean) => {
  return attr(
    'zoom',
    attrValueExpression(
      zoom.toString(),
      estree([expressionStatement(literalExpression(zoom))]),
    ),
  )
}

const mapUrl = (url: string, basePath: string): string => {
  if (EXTERNAL_URL_REGEX.test(url)) {
    return url
  }
  return url.startsWith('/') ? `${basePath}${url}` : `${basePath}/${url}`
}

const createImageTag = (
  src: string | MdxJsxAttributeValueExpression,
  {
    alt,
    width,
    height,
    zoom,
  }: { alt?: string; width?: number; height?: number; zoom?: boolean },
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
  const zoomAttr = zoom !== undefined ? createZoomAttr(zoom) : undefined

  return flowElement('Image', [], [attr('src', src), attr('alt', alt), widthAttr, heightAttr, zoomAttr])
}

export type Options = {
  imageDir?: string
  basePath?: string
}
const DEFAULT_IMAGE_DIR = './public'
const BLUR_EXT = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff', 'gif']

const remarkImage = ({ imageDir, basePath }: Options = { imageDir: DEFAULT_IMAGE_DIR }) => {
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

    // Compute width, height, blurDataURL for each path
    const dimensions = new Map<string, { width: number; height: number; blurDataURL?: string }>()
    for (const localPath of localPaths) {
      const fullPath = path.join(imageDir, localPath)
      if (!dimensions.has(localPath)) {
        if (fs.existsSync(fullPath)) {
          const sharpImage = sharp(fullPath)
          const metadata = await sharpImage.metadata()
          const { width, height } = metadata
          let blurDataURL
          const extension = path.extname(localPath).toLowerCase().replace('.', '')
          if (BLUR_EXT.includes(extension)) {
            try {
              blurDataURL = await generateBlurDataURL(fullPath)
            } catch (error) {
              console.error('Error generating blurDataURL for', localPath, ':', error)
            }
          }

          if (width && height) {
            dimensions.set(localPath, { width, height, blurDataURL })
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

      const isInline = isInlineImage(parent)

      imageTag = createImageTag(url, {
        alt: node?.alt ?? undefined,
        zoom: isInline ? false : undefined,
        ...size,
      })
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
      (node, _index, parent) => {
        node = node as MdxJsxFlowElement | MdxJsxTextElement
        const attrs = attrsToObj(node.attributes)
        let width = parseNumberExpressionAttr(attrs, 'width')
        let height = parseNumberExpressionAttr(attrs, 'height')
        const src = parseStringAttr(attrs, 'src')
        let url = src ? slash(decodeURI(src)) : undefined
        if (url) {
          if (basePath) {
            attrs['src'].value = mapUrl(url, basePath)
          }
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
            if (size.blurDataURL) {
              node.attributes.push(attr('blurDataURL', size.blurDataURL)!)
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

        if (!attrs.zoom) {
          node.attributes.push(createZoomAttr(isInlineImage(parent) ? false : true)!)
        }
      },
    )

    done()
  }
  return plugin
}
async function generateBlurDataURL(fullPath: string) {
  const smallImg = await sharp(fullPath).resize(8, 8, { fit: 'inside' })
  const buffer = await smallImg.jpeg({ quality: 10 }).toBuffer()
  const base64Image = buffer.toString('base64')
  return `data:image/jpeg;base64,${base64Image}`
}

export default remarkImage
