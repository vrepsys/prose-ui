import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const classes = (...classNames: ClassValue[]) => twMerge(clsx(classNames))
