import { Button as ButtonPrimitive } from '@base-ui/react/button'

import { cn } from '../../utilities/cn'
import type { TButtonProps } from './Button.types'
import { buttonVariants } from './Button.variants'

const BUTTON_BASE_CLASSES = [
  'relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap select-none',
  'transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'data-disabled:cursor-not-allowed data-disabled:opacity-50 aria-busy:cursor-wait',
  '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
]

export const Button = ({
  variant,
  className,
  disabled,
  isPending = false,
  focusableWhenDisabled,
  unstyled = false,
  type = 'button',
  children,
  ...rest
}: TButtonProps) => (
  <ButtonPrimitive
    {...rest}
    type={type}
    disabled={disabled ?? isPending}
    focusableWhenDisabled={focusableWhenDisabled ?? isPending}
    aria-busy={isPending || undefined}
    className={
      unstyled
        ? className
        : cn(...BUTTON_BASE_CLASSES, ...buttonVariants({ color: 'primary', size: 'md', ...variant }), className)
    }
  >
    {isPending && (
      <span aria-hidden className='absolute inset-0 flex items-center justify-center'>
        <span className='size-4 animate-spin rounded-full border-2 border-current border-r-transparent' />
      </span>
    )}
    {/* opacity-0 keeps the width and the accessible name while pending */}
    <span className={cn('inline-flex items-center gap-[inherit]', isPending && 'opacity-0')}>{children}</span>
  </ButtonPrimitive>
)
