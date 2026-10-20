import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  // CJS too, so CJS-only setups (e.g. Jest) can still require it
  format: ['esm', 'cjs'],
  platform: 'neutral',
  dts: true,
  sourcemap: true,
  copy: ['src/styles.css'],
  // Writes "exports", "main" and "types" in package.json from the build output
  exports: {
    customExports: { './styles.css': './dist/styles.css' },
  },
  publint: true,
  // styles.css has no types, attw would report it as "No resolution"
  attw: { level: 'error', excludeEntrypoints: ['./styles.css'] },
  // Fails on publint warnings too, except the "use ESM only" advice
  failOnWarn: true,
  suppressWarnings: ['We recommend using the ESM format'],
})
