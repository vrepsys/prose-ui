import {
  AlertCircle,
  AlertTriangle,
  InfoIcon,
  LightbulbIcon,
  ScrollTextIcon,
  type LucideIcon
} from 'lucide-react'
import { ReactNode } from 'react'
import { classes } from '../classes.js'

type Props = {
  title?: string
  variant?: 'note' | 'info' | 'warning' | 'tip' | 'danger'
  children: ReactNode
  [key: string]: any
}

const icons: Record<NonNullable<Props['variant']>, LucideIcon> = {
  note: ScrollTextIcon,
  info: InfoIcon,
  tip: LightbulbIcon,
  warning: AlertCircle,
  danger: AlertTriangle,
}

export const Callout = ({ variant, title, children }: Props) => {
  const Icon = icons[variant ?? 'note']

  return (
    <div className={classes('callout')} data-variant={variant ?? 'note'}>
      <div className="callout-content">
        {title && (
          <div className="callout-title">
            <Icon className='callout-icon' aria-hidden="true" /> {title}
          </div>
        )}
        <div className="callout-body-container">
          {!title && <Icon className='callout-icon' aria-hidden="true" />}
          <div className="callout-body">{children}</div>
        </div>
      </div>
    </div>
  )
}
