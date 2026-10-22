# UI Components

React components built on [Base UI](https://base-ui.com) and styled with Tailwind CSS v4.

```bash
npm install @lukasz17/ui-components
```

Needs `react@^19`, `react-dom@^19` and `tailwindcss@^4` in your app.

## Setup

Import the styles after Tailwind in your main CSS file:

```css
@import 'tailwindcss';
@import '@lukasz17/ui-components/styles.css';
```

`styles.css` adds the theme colors (`--color-primary`, ...) and makes Tailwind scan the components for their classes, so nothing else needs to be configured. To change a color, redefine it in your own `@theme` after the import:

```css
@theme {
  --color-primary: oklch(0.6 0.2 150);
}
```

## Button

[Base UI Button](https://base-ui.com/react/components/button) with variants and a pending state.

```tsx
import { Button } from '@lukasz17/ui-components'

<Button onClick={save}>Save</Button>
<Button variant={{ color: 'destructive', size: 'lg' }}>Delete</Button>
<Button isPending={isSaving}>Save</Button>
<Button nativeButton={false} render={<a href='/home' />}>Home</Button>
```

| Prop        | Default                            | Does                                                                                                      |
| ----------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `variant`   | `{ color: 'primary', size: 'md' }` | `color`: `primary` `secondary` `outline` `ghost` `destructive`; `size`: `sm` `md` `lg`; `shape`: `square` |
| `isPending` | `false`                            | Shows a spinner and blocks clicks, keeping the button's width, focus and accessible name                  |
| `unstyled`  | `false`                            | Drops the default classes, keeping only `className`                                                       |
| `className` |                                    | Merged with the default classes; on conflicts it wins (`px-8` replaces `px-4`)                            |
| `type`      | `'button'`                         | Native button type                                                                                        |

Every other [Base UI Button prop](https://base-ui.com/react/components/button#api-reference) and native `<button>` attribute is passed through, `ref` included. An explicit `disabled` wins over `isPending`.

## Utilities

The helpers the components are built with, to build your own the same way.

```tsx
import { buttonVariants, cn, createComponentVariants, type TComponentVariants } from '@lukasz17/ui-components'

cn('px-4 py-2', isActive && 'bg-primary', 'px-8') // 'py-2 bg-primary px-8' when isActive is true

const badgeVariants = createComponentVariants({
  color: { neutral: 'bg-muted text-foreground', danger: ['bg-destructive', 'text-destructive-foreground'] },
  size: { sm: 'px-1.5 text-xs', md: 'px-2 text-sm' },
})

badgeVariants({ color: 'danger', size: 'sm' }) // ['bg-destructive', 'text-destructive-foreground', 'px-1.5 text-xs']
type TBadgeVariants = TComponentVariants<typeof badgeVariants> // { readonly color?: 'neutral' | 'danger'; readonly size?: 'sm' | 'md' }

const docsLink = (
  <a href='/docs' className={cn(...buttonVariants({ color: 'outline', size: 'sm' }))}>
    Docs
  </a>
)
```

| Export                              | Does                                                                                                                                   |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `cn(...classes)`                    | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge): on conflicts the last class wins |
| `createComponentVariants(variants)` | Returns a function that turns `{ category: key }` into that variant's classes, as an array to spread into `cn`                         |
| `TComponentVariants<typeof fn>`     | The options that function accepts, to type a `variant` prop                                                                            |
| `buttonVariants`                    | The Button's variant classes, to style a link or another element like a button                                                         |

A variants function skips categories set to `undefined` and keys it doesn't have, and returns `[]` without options. It returns only the variant classes, without the Button's base ones (layout, focus ring, disabled state).

## Development

| Script           | Does                                                                    |
| ---------------- | ----------------------------------------------------------------------- |
| `npm run dev`    | Opens the playground (`playground/`) to try the components              |
| `npm test`       | Runs the tests once (`npm run test:watch` for watch mode)               |
| `npm run lint`   | Type-checks `src`, the tests and the playground                         |
| `npm run build`  | Builds ESM + CJS to `dist` and checks the package with publint and attw |
| `npm run format` | Formats with Prettier                                                   |
| `npx changeset`  | Adds a changeset for the next release                                   |

### Adding a component

1. Create `src/components/<Name>/` with `<Name>.tsx`, `<Name>.types.ts`, `<Name>.variants.ts` (if it has variants) and `<Name>.test.tsx`.
2. Export it from `src/index.ts`.
3. Add it to `playground/main.tsx`.

### Releasing

1. Run `npx changeset`, pick the bump type and describe the change, and commit the generated file.
2. When pushed to `master`, CI opens a "Version Packages" PR and runs the checks on it.
3. Merging that PR publishes to npm with [trusted publishing](https://docs.npmjs.com/trusted-publishers) (no npm token needed).
