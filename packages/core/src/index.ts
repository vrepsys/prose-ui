import remarkGfm from 'remark-gfm'
import remarkCodeBlock from './remark/remark-code-block.js'
import remarkImage, { Options as ImageOptions } from './remark/remark-image.js'
import remarkLink, { Options as LinkOptions } from './remark/remark-link.js'

export type Options = {
  link?: LinkOptions
  image?: ImageOptions
}

export const remarkPlugins = (options: Options = {}) => {
  return [remarkGfm, remarkCodeBlock, remarkImage(options.image), remarkLink(options.link)]
}
