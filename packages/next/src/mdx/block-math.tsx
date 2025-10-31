import { BlockMath as KatexBlockMath } from 'react-katex'

type Props = {
  children: string
}

export const BlockMath = ({ children }: Props) => {
  return <KatexBlockMath math={children} />
}
