import NextLink from 'next/link'
import {
  createMdxComponents,
  type ProseUIMdxComponents,
  type ProseUILinkProps,
} from '@prose-ui/react'

import { Image } from './image.js'

export const Link = (props: ProseUILinkProps) => {
  return <NextLink {...props} />
}

const overrides: Partial<ProseUIMdxComponents> = {
  Link,
  Image,
}

export const mdxComponents: ReturnType<typeof createMdxComponents> = createMdxComponents(overrides)

export { Image }
