import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    passWithNoTests: true,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '.yarn/**',
      'packages/mce/src/**/*.{test,spec}.{ts,js,jsx,tsx}',
    ],
  },
})
