import type { MDXComponents } from 'mdx/types.js'
import { Callout } from './callout.js'
import { Caption } from './caption.js'
import { CodeBlock } from './code-block/code-block.js'
import { Frame } from './frame.js'
import { Heading, type Props as HeadingProps } from './heading.js'
import { Image, type ImageProps } from './image.js'
import { InlineMath } from './inline-math.js'
import { BlockMath } from './block-math.js'
import { Link, type LinkProps } from './link.js'

type HeadingPropsWithoutLevel = Omit<HeadingProps, 'level'>

const h1 = (props: HeadingPropsWithoutLevel) => <Heading level={1} {...props} />
const h2 = (props: HeadingPropsWithoutLevel) => <Heading level={2} {...props} />
const h3 = (props: HeadingPropsWithoutLevel) => <Heading level={3} {...props} />
const h4 = (props: HeadingPropsWithoutLevel) => <Heading level={4} {...props} />
const h5 = (props: HeadingPropsWithoutLevel) => <Heading level={5} {...props} />
const h6 = (props: HeadingPropsWithoutLevel) => <Heading level={6} {...props} />

const baseComponents = {
  InlineMath,
  BlockMath,
  Callout,
  CodeBlock,
  Image,
  Frame,
  Caption,
  Link,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
}

export type ProseUIMdxComponents = typeof baseComponents
export type ProseUILinkProps = LinkProps
export type ProseUIImageProps = ImageProps

export const createMdxComponents = (overrides: Partial<ProseUIMdxComponents> = {}) => {
  return {
    ...baseComponents,
    ...overrides,
  } as MDXComponents
}

export const mdxComponents = createMdxComponents()

export { Callout, CodeBlock, Frame, Heading, Image, Link, InlineMath, BlockMath, Caption }
