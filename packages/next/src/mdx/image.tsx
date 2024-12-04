import NextImage from 'next/image'

type Props = {
  src: string
  alt?: string
  href?: string
  width?: number
  height?: number
}

export const Image = ({ src, alt, href, width, height }: Props) => {
  let render
  if (src.startsWith('http') && (width === undefined || height === undefined)) {
    render = <img src={src} alt={alt} />
  } else {
    const props = {
      width: width ?? 100,
      height: height ?? 100,
    }
    render = <NextImage src={src} alt={alt ?? ''} {...props} />
  }
  if (href) {
    render = <a href={href}>{render}</a>
  }
  return render
}
