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
      <Button variant="ghost" className={className} size="lg" asChild>
        <Link href="/docs">
          <SiGithub size={16} /> Source code
        </Link>
      </Button>
    </div>
  )
}
