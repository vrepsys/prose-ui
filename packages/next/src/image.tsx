'use client'

import NextImage from 'next/image'
import Zoom from 'react-medium-image-zoom'

import { type ProseUIImageProps, parseBoolean } from '@prose-ui/react'

export const Image = ({
  src,
  alt,
  href,
  width,
  height,
  blurDataURL,
  zoom = true,
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
    return <a href={href}>{render}</a>
  }
  if (!parseBoolean(zoom)) {
    return render
  }
  return (
    <Zoom wrapElement="span" zoomMargin={30} zoomImg={{
      src,
      alt: alt ?? '',
      width,
      height,
    } as any}>
      {render}
    </Zoom>
  )
}
