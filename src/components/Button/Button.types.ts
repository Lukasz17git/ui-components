import type { Button as ButtonPrimitive } from '@base-ui/react/button'

import type { TComponentVariants } from '../../utilities/createComponentVariants'
import type { buttonVariants } from './Button.variants'

export type TButtonProps = Omit<ButtonPrimitive.Props, 'className'> & {
  className?: string | undefined
  variant?: TComponentVariants<typeof buttonVariants> | undefined
  /** Drops the default classes, keeping only `className` */
  unstyled?: boolean | undefined
  /** Shows a spinner and disables the button, keeping its width and focus */
  isPending?: boolean | undefined
}
