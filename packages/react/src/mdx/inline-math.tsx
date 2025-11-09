type Props = {
  children: string
  renderedMath?: string
}

export const InlineMath = ({ children, renderedMath }: Props) => {
  if (renderedMath) {
    return <span className="inline-math" dangerouslySetInnerHTML={{ __html: renderedMath }} />
  }

  return <span className="katex">{children}</span>
}
