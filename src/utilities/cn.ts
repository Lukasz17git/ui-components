import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Joins class names; on Tailwind conflicts the last one wins (`cn('px-2', 'px-4')` -> `'px-4'`) */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
