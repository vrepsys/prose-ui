import { Button } from './ui/button'
import Link from 'next/link'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { classes } from '@/utils/classes'

export const LandingButtons = ({ className }: { className: string }) => {
  return (
    <div className={classes('flex items-center gap-2', className)}>
      <Button size="lg" asChild>
        <Link href="/docs">View documentation</Link>
      </Button>
      <Button variant="ghost" size="lg" asChild>
        <Link href="https://github.com/vrepsys/prose-ui" className="!text-color-base">
          <SiGithub size={16} /> Star on GitHub
        </Link>
      </Button>
    </div>
  )
}
