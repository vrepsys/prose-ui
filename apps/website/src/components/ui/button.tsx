import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { classes } from '@/utils/classes'

const buttonVariants = cva(
  'cursor-pointer inline-flex gap-2 items-center tansition duration-100 text-nowrap font-medium',
  {
    variants: {
      variant: {
        primary: `transition ease-in-out text-background bg-strong-foreground hover:bg-strong-foreground/90 active:translate-y-px rounded-md sm:rounded-sm hover:ring-1 ring-offset-background hover:ring-foreground/20 hover:ring-offset-2`,
        reactive:
          'transition text-base group-hover:text-base/90 group-hover:bg-[var(--p-color-text-strong)] hover:bg-color-accent-base active:translate-y-px rounded-md sm:rounded-sm tracking-tight',
        secondary:
          'text-color-base hover:text-color-base bg-color-low hover:bg-color-lower active:translate-y-px rounded-md sm:rounded-sm',
        ghost:
          'text-muted-foreground hover:text-strong-foreground hover:bg-sidenav-hover active:translate-y-px rounded-md sm:rounded-sm',
        link: 'text-color-low hover:text-color-base', 
        navitem: 'rounded-lg',
      },
      size: {
        default: 'py-1.5 px-4 sm:px-2 min-w-11 min-h-11 sm:min-w-8 sm:min-h-8 text-sm',
        compact: 'py-1 px-0.5 text-sm',
        lg: 'font-semibold text-sm h-10 rounded-md px-4 tracking-[-0.015em]',
        icon: 'justify-center h-8 w-8',
      },
      active: {
        true: 'text-color-accent-high hover:text-color-accent-high',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'navitem',
        active: true,
        class: 'bg-sidenav-active text-strong-foreground',
      },
      {
        variant: 'navitem',
        active: false,
        class: 'text-muted-foreground hover:text-strong-foreground hover:bg-sidenav-hover',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      active: false,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, active, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={classes(buttonVariants({ variant, size, className, active }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
