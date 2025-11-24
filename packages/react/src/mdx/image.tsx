import { ImgHTMLAttributes } from 'react'
import Zoom from 'react-medium-image-zoom'
import { type Booleanish, parseBoolean } from './booleanish.js'


export type ImageProps = {
  src: string
  alt?: string
  href?: string
  width?: number
  height?: number
  blurDataURL?: string
  zoom?: Booleanish
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'>

export const Image = ({ src, alt, href, width, height, blurDataURL, zoom, ...rest }: ImageProps) => {
  const imgProps: ImgHTMLAttributes<HTMLImageElement> = {
    src,
    alt,
    width,
    height,
    ...rest,
  }
  const dataAttrs = blurDataURL ? ({ 'data-blur': blurDataURL } as const) : undefined
  const render = <img {...imgProps} {...dataAttrs} />
  if (href) {
    return <a href={href}>{render}</a>
  }
  if (!parseBoolean(zoom)) {
    return render
  }
  return (
    <Zoom wrapElement="span" zoomMargin={30}>
      {render}
    </Zoom>
  )
}
