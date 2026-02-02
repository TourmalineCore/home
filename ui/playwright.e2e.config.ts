import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

dotenv.config({
  path: path.resolve(__dirname, `.env.development`),
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: `./playwright-tests/e2e`,
  outputDir: `./playwright-test-results/e2e-tests`,
  testMatch: `**/*.spec.{js,ts}`,
  timeout: 45000,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry twice locally and in pipelines to avoid extra flackiness after a retry or two */
  retries: 2,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? `blob` : `html`,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.FRONTEND_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: `on-first-retry`,
    screenshot: `only-on-failure`,
  },
  projects: [
    {
      name: `e2e tests`,
      use: {
        ...devices[`Desktop Chrome`],
      },
    },
  ],
});
