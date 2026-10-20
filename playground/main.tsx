import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { Button } from '../src'
import './styles.css'

const COLORS = ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const
const SIZES = ['sm', 'md', 'lg'] as const

const App = () => {
  const [isPending, setIsPending] = useState(false)

  const save = () => {
    setIsPending(true)
    setTimeout(() => setIsPending(false), 1500)
  }

  return (
    <main className='flex flex-col gap-8 p-8 text-foreground'>
      <h1 className='text-2xl font-semibold'>Button</h1>

      {SIZES.map((size) => (
        <div key={size} className='flex flex-wrap items-center gap-3'>
          {COLORS.map((color) => (
            <Button key={color} variant={{ color, size }}>
              {color} {size}
            </Button>
          ))}
        </div>
      ))}

      <div className='flex flex-wrap items-center gap-3'>
        <Button disabled>Disabled</Button>
        <Button isPending={isPending} onClick={save}>
          Click to save
        </Button>
        <Button variant={{ shape: 'square' }} aria-label='Add'>
          +
        </Button>
        <Button nativeButton={false} render={<a href='#links' />} variant={{ color: 'outline' }}>
          Rendered as a link
        </Button>
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
