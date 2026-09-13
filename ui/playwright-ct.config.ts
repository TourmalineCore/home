import { defineConfig, devices } from '@playwright/experimental-ct-react';
import path from 'path';

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
