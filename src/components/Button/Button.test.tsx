import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  it('renders a native button with type="button"', () => {
    render(<Button>Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })
    expect(button.tagName).toBe('BUTTON')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('uses the given type', () => {
    render(<Button type='submit'>Send</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('fires onClick', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not fire onClick when disabled', () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(button).toBeDisabled()
    expect(onClick).not.toHaveBeenCalled()
  })

  describe('isPending', () => {
    it('blocks clicks but keeps the button focusable and its name', () => {
      const onClick = vi.fn()
      render(
        <Button onClick={onClick} isPending>
          Save
        </Button>,
      )

      const button = screen.getByRole('button', { name: 'Save' })
      fireEvent.click(button)
      button.focus()

      expect(onClick).not.toHaveBeenCalled()
      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(button).toHaveAttribute('aria-busy', 'true')
      expect(button).toHaveFocus()
    })

    it('lets an explicit disabled value win', () => {
      render(
        <Button disabled={false} isPending>
          Save
        </Button>,
      )

      expect(screen.getByRole('button')).toBeEnabled()
    })
  })

  describe('className', () => {
    it('merges with the default classes, the given ones winning', () => {
      render(<Button className='px-8'>Save</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-8', 'bg-primary')
      expect(button).not.toHaveClass('px-4')
    })

    it('applies the variant classes', () => {
      render(<Button variant={{ color: 'destructive', size: 'lg' }}>Delete</Button>)

      expect(screen.getByRole('button')).toHaveClass('bg-destructive', 'h-10')
    })

    it('keeps only className when unstyled', () => {
      render(
        <Button unstyled className='only-this'>
          Save
        </Button>,
      )

      expect(screen.getByRole('button')).toHaveAttribute('class', 'only-this')
    })
  })

  it('forwards the ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Save</Button>)

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('renders another element with render', () => {
    render(
      <Button nativeButton={false} render={<a href='/home' />}>
        Home
      </Button>,
    )

    expect(screen.getByRole('button', { name: 'Home' }).tagName).toBe('A')
  })
})
