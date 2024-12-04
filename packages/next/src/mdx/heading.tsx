import { HTMLAttributes } from 'react'
import slugify from 'slugify'

export type Props = {
  level: 1 | 2 | 3 | 4 | 5 | 6
} & HTMLAttributes<HTMLHeadingElement>

export const Heading = (props: Props) => {
  let { id, level, ...rest } = props
  if (!id && typeof props.children === 'string') {
    id = slugify(props.children, {
      lower: true,
      strict: true,
    }).replaceAll(/(^\d)|[^a-zA-Z0-9-_]/g, '')
  }
  const H: React.ElementType = `h${level}` as React.ElementType
  return (
    <H id={id} {...rest}>
      {props.children}
    </H>
  )
}
