import NextImage from 'next/image'

type Props = {
  src: string
  alt?: string
  href?: string
  width?: number
  height?: number
  blurDataURL?: string
}

export const Image = ({ src, alt, href, width, height, blurDataURL }: Props) => {
  let render
  if (width === undefined || height === undefined) {
    render = <img src={src} alt={alt} />
  } else {
    render = (
      <NextImage
        src={src}
        alt={alt ?? ''}
        placeholder={blurDataURL ? 'blur' : undefined}
        blurDataURL={blurDataURL}
        width={width}
        height={height}
      />
    )
  }
  if (href) {
    render = <a href={href}>{render}</a>
  }
  return render
}
