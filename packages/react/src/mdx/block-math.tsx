type Props = {
  children: string
  renderedMath?: string
}

export const BlockMath = ({ children, renderedMath }: Props) => {
  if (renderedMath) {
    return <div className="block-math" dangerouslySetInnerHTML={{ __html: renderedMath }} />
  }

  return <div className="katex">{children}</div>
}
