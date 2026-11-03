import { defineConfig, devices } from '@playwright/experimental-ct-react';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: `./`,
  outputDir: `./playwright-test-results/test`,
  snapshotDir: `./playwright-tests/screenshots`,
  testMatch: `**/*.spec.tsx`,
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 4 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: `html`,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: `on-first-retry`,

    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,
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
      ] as any,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: `chromium`,
      use: {
        ...devices[`Desktop Chrome`],
      },
    },
    {
      name: `firefox`,
      use: {
        ...devices[`Desktop Firefox`],
      },
    },
    {
      name: `webkit`,
      use: {
        ...devices[`Desktop Safari`],
      },
    },
  ],
});
