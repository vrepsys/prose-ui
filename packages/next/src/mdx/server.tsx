import { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { Callout } from './callout'
import { Caption } from './caption'
import { CodeBlock } from './code-block/code-block'
import { codeToHtml } from './code-block/highlighter'
import { Frame } from './frame'
import { Heading, type Props as HeadingProps } from './heading'
import { Image } from './image'
import { InlineMath} from './inline-math'
import { BlockMath } from './block-math'

type HeadingPropsWithoutLevel = Omit<HeadingProps, 'level'>

const h1 = (props: HeadingPropsWithoutLevel) => <Heading level={1} {...props} />
const h2 = (props: HeadingPropsWithoutLevel) => <Heading level={2} {...props} />
const h3 = (props: HeadingPropsWithoutLevel) => <Heading level={3} {...props} />
const h4 = (props: HeadingPropsWithoutLevel) => <Heading level={4} {...props} />
const h5 = (props: HeadingPropsWithoutLevel) => <Heading level={5} {...props} />
const h6 = (props: HeadingPropsWithoutLevel) => <Heading level={6} {...props} />

export { Callout, CodeBlock, codeToHtml, Frame, Heading, Image, Link, InlineMath, BlockMath }

export const mdxComponents: MDXComponents = {
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
} as any as MDXComponents
