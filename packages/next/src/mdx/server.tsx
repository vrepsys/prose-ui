import { MDXComponents } from 'mdx/types'
import { Callout } from './callout'
import { CodeBlock } from './code-block/code-block'
import { Image } from './image'
import { Heading, type Props as HeadingProps } from './heading'
import { Frame } from './frame'
import Link from 'next/link'
import { codeToHtml } from './code-block/highlighter'

type HeadingPropsWithoutLevel = Omit<HeadingProps, 'level'>

const h1 = (props: HeadingPropsWithoutLevel) => <Heading level={1} {...props} />
const h2 = (props: HeadingPropsWithoutLevel) => <Heading level={2} {...props} />
const h3 = (props: HeadingPropsWithoutLevel) => <Heading level={3} {...props} />
const h4 = (props: HeadingPropsWithoutLevel) => <Heading level={4} {...props} />
const h5 = (props: HeadingPropsWithoutLevel) => <Heading level={5} {...props} />
const h6 = (props: HeadingPropsWithoutLevel) => <Heading level={6} {...props} />

export { Callout, CodeBlock, Image, Frame, Link, Heading, codeToHtml }

export const mdxComponents: MDXComponents = {
  Callout,
  CodeBlock,
  Image,
  Frame,
  Link,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
} as any as MDXComponents
