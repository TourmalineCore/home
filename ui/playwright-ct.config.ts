import { defineConfig, devices } from '@playwright/experimental-ct-react';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

/**
 * Config for Playwright Component Testing. Separate from playwright.config.ts (screenshot/E2E
 * tests), since component tests mount a component via Vite instead of navigating a running page.
 * See https://playwright.dev/docs/test-components.
 */
export default defineConfig({
  testDir: `./`,
  outputDir: `./playwright-test-results/ct`,
  testMatch: `**/*.ct.spec.tsx`,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: process.env.CI ? 4 : undefined,
  reporter: process.env.CI ? `blob` : `html`,
  use: {
    trace: `on-first-retry`,

    ctTemplateDir: `./playwright-tests/ct`,
    ctPort: 3101,
    ctViteConfig: {
      plugins: [
        // Playwright adds its own @vitejs/plugin-react (the automatic JSX runtime) only when
        // `ctViteConfig.plugins` is empty, so listing svgr() below means listing this too
        react(),

        // Vite equivalent of next-react-svg, which the app uses to import `.svg` as components.
        // `include` is widened from the plugin's default `**/*.svg?react`, since next-react-svg
        // needs no such suffix
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
