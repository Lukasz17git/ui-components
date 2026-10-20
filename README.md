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
2. When pushed to `master`, CI opens a "Version Packages" PR.
3. Merging that PR publishes to npm with [trusted publishing](https://docs.npmjs.com/trusted-publishers) (no npm token needed).
