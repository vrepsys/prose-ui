import type { MDXComponents } from 'mdx/types.js'
import { Callout } from './callout.js'
import { Caption } from './caption.js'
import { Subtitle } from './subtitle.js'
import { CodeBlock } from './code-block/code-block.js'
import { CodeGroup } from './code-group.js'
import { Frame } from './frame.js'
import { Heading, type Props as HeadingProps } from './heading.js'
import { Image, type ImageProps } from './image.js'
import { InlineMath } from './inline-math.js'
import { BlockMath } from './block-math.js'
import { Link, type LinkProps } from './link.js'
import { Card } from './card.js'
import { Cards } from './cards.js'
import { Steps, Step } from './steps.js'
import { parseBoolean } from './booleanish.js'
import { Tabs, Tab } from './tabs.js'
export type { Booleanish } from './booleanish.js'

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
  CodeGroup,
  Card,
  Cards,
  Steps,
  Step,
  Image,
  Frame,
  Caption,
  Subtitle,
  Link,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  Tabs,
  Tab,
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

export {
  Callout,
  Card,
  Cards,
  CodeBlock,
  CodeGroup,
  Frame,
  Heading,
  Image,
  Link,
  InlineMath,
  BlockMath,
  Caption,
  Subtitle,
  Steps,
  Step,
  Tabs,
  Tab,
  parseBoolean,
}
