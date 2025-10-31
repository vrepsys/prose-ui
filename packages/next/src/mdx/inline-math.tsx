import { InlineMath as KatexInlineMath } from 'react-katex'

type Props = {
  children: string
}

export const InlineMath = ({ children }: Props) => {
  return <KatexInlineMath math={children} />
}
