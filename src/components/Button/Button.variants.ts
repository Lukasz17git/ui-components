import { createComponentVariants } from '../../utilities/createComponentVariants'

export const buttonVariants = createComponentVariants({
  color: {
    primary: ['bg-primary text-primary-foreground', 'hover:bg-primary-hover'],
    secondary: ['bg-secondary text-secondary-foreground', 'hover:bg-secondary-hover'],
    outline: ['border border-border bg-transparent text-foreground', 'hover:bg-muted'],
    ghost: ['bg-transparent text-foreground', 'hover:bg-muted'],
    destructive: ['bg-destructive text-destructive-foreground', 'hover:bg-destructive-hover'],
  },
  size: {
    sm: 'h-8 gap-1.5 px-3 text-xs',
    md: 'h-9 gap-2 px-4 text-sm',
    lg: 'h-10 gap-2 px-5 text-base',
  },
  shape: {
    square: 'aspect-square px-0',
  },
})
