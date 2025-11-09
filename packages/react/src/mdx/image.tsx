import { ImgHTMLAttributes } from 'react'

export type ImageProps = {
  src: string
  alt?: string
  href?: string
  width?: number
  height?: number
  blurDataURL?: string
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'>

export const Image = ({ src, alt, href, width, height, blurDataURL, ...rest }: ImageProps) => {
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
  return render
}
