type TVariants = Record<string, Record<string, string | readonly string[]>>

type TVariantOptions<T extends TVariants> = { [K in keyof T]?: keyof T[K] | undefined }

/** Options accepted by a variants function (`{ color?: 'primary' | ..., size?: 'sm' | ... }`) */
export type TComponentVariants<T> = T extends (options?: infer TOptions) => string[] ? NonNullable<TOptions> : never

/** Returns a function that turns `{ color: 'primary' }` into that variant's classes */
export const createComponentVariants =
   <const T extends TVariants>(variants: T) =>
   (options?: TVariantOptions<T>): string[] => {
      if (!options) return []

      return Object.entries(options).flatMap(([category, variantKey]) => {
         if (variantKey === undefined) return []
         const classes = variants[category]?.[variantKey]
         if (classes === undefined) return []
         return typeof classes === 'string' ? [classes] : [...classes]
      })
   }
