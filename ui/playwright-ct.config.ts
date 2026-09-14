import { defineConfig, devices } from '@playwright/experimental-ct-react';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

/**
 * Config for Playwright Component Testing (state/content/container layers).
 * Separate from playwright.config.ts (screenshot/E2E-on-a-real-page tests), since component
 * tests mount an isolated component via Vite instead of navigating a running Next.js page.
 * See https://playwright.dev/docs/test-components.
 */
export default defineConfig({
  testDir: `./`,
  testMatch: `**/*.ct.spec.tsx`,
  outputDir: `./playwright-test-results/ct`,
  snapshotDir: `./playwright-tests/screenshots`,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: process.env.CI ? 4 : undefined,
  reporter: process.env.CI ? `blob` : `html`,
  use: {
    trace: `on-first-retry`,
    ctPort: 3101,
    ctViteConfig: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname),
        },
      },
      plugins: [
        // Playwright only wires up its own default @vitejs/plugin-react (the automatic JSX
        // runtime, without which every component crashes with "React is not defined") when
        // `ctViteConfig.plugins` is empty - see @playwright/experimental-ct-core's createConfig.
        // Since svgr() below is non-empty, it has to be listed here explicitly ourselves.
        react(),

        // Mirrors next-react-svg, the webpack loader the app itself uses to import `.svg` files
        // as React components (e.g. `import IconCross from '../icons/cross.svg'`) - component
        // tests build via Vite instead of webpack, so without this plugin those same imports
        // fail to resolve as components here even though they work fine in the real Next.js app.
        // `include` is widened from this plugin's default of `**/*.svg?react` to plain `**/*.svg`,
        // since next-react-svg treats every `.svg` import as a component with no opt-in suffix.
        svgr({
          include: `**/*.svg`,
        }),
      ],
    },
  },
  projects: [
    {
      name: `chromium`,
      use: {
        ...devices[`Desktop Chrome`],
      },
    },
  ],
});
