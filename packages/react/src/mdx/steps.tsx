import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { classes } from '../classes.js'
import { resolveIconNode, type IconSource } from './icon-utils.js'

type TitleSize = 'base' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type StepsProps = ComponentPropsWithoutRef<'ol'> & {
  titleSize?: TitleSize
  children: ReactNode
}

export type StepProps = ComponentPropsWithoutRef<'li'> & {
  title: string
  icon?: IconSource
  children?: ReactNode
}

export const Steps = ({ children, titleSize = 'base', className, ...rest }: StepsProps) => {
  return (
    <ol className={classes('steps', className)} data-title-size={titleSize} {...rest}>
      {children}
    </ol>
  )
}

export const Step = ({ title, icon, children, className, ...rest }: StepProps) => {
  const resolvedIcon = resolveIconNode(icon)
  return (
    <li className={classes('step', className)} {...rest}>
      <div className="step-indicator" aria-hidden="true">
        {resolvedIcon ?? <span className="step-number" />}
      </div>
      <div className="step-content">
        <p className="step-title">{title}</p>
        {children && <div className="step-body">{children}</div>}
      </div>
    </li>
  )
}
