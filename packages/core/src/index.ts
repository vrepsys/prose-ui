import remarkGfm from 'remark-gfm'
import remarkMath, { Options as MathOptions } from 'remark-math'
import remarkCodeGroup from './remark/remark-code-group.js'
import remarkCodeBlock from './remark/remark-code-block.js'
import remarkImage, { Options as ImageOptions } from './remark/remark-image.js'
import remarkInlineMath from './remark/remark-inline-math.js'
import remarkBlockMath from './remark/remark-block-math.js'
import remarkLink, { Options as LinkOptions } from './remark/remark-link.js'
import remarkTabs from './remark/remark-tabs.js'
import type { Plugin } from 'unified'

export { highlightCode } from './highlight-code.js'

export type Options = {
  link?: LinkOptions
  image?: ImageOptions
  math?: MathOptions
}

export const remarkPlugins = (options: Options = {}) => {
  const mathPlugin: Plugin = function () {
    return remarkMath.call(this, options.math)
  }

  return [
    remarkGfm,
    remarkCodeGroup,
    remarkCodeBlock,
    remarkTabs,
    mathPlugin,
    remarkImage(options.image),
    remarkLink(options.link),
    remarkInlineMath,
    remarkBlockMath,
  ]
}
