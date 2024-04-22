import viteConfig from './vite.config.ts';
import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  viteConfig({ mode: 'test' }),
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude],
      root: fileURLToPath(new URL('./test/spec', import.meta.url)),
    },
  }),
);
