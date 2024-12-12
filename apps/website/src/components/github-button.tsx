import { Link } from '@prose-ui/next'
import { Button } from './ui/button'
import { SiGithub } from '@icons-pack/react-simple-icons'

export const GithubButton = () => {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="https://github.com/vrepsys/prose-ui">
        <SiGithub size={16} />
      </Link>
    </Button>
  )
}
