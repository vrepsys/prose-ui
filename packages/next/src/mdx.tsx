import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  createMdxComponents,
  type ProseUIMdxComponents,
  type ProseUILinkProps,
  type ProseUIImageProps,
} from '@prose-ui/react'

export const Link = (props: ProseUILinkProps) => {
  return <NextLink {...props} />
}

export const Image = ({
  src,
  alt,
  href,
  width,
  height,
  blurDataURL,
  ...rest
}: ProseUIImageProps) => {
  let render
  if (width === undefined || height === undefined) {
    render = <img src={src} alt={alt} {...rest} />
  } else {
    render = (
      <NextImage
        src={src}
        alt={alt ?? ''}
        placeholder={blurDataURL ? 'blur' : undefined}
        blurDataURL={blurDataURL}
        width={width}
        height={height}
        {...rest}
      />
    )
  }
  if (href) {
    render = <a href={href}>{render}</a>
  }
  return render
}

const overrides: Partial<ProseUIMdxComponents> = {
  Link,
  Image,
}

export const mdxComponents: ReturnType<typeof createMdxComponents> = createMdxComponents(overrides)
