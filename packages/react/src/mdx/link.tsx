import { AnchorHTMLAttributes } from 'react'

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
}

export const Link = ({ children, ...props }: LinkProps) => {
  return <a {...props}>{children}</a>
}
