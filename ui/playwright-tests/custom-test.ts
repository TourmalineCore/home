/* eslint-disable no-console */
import { test as base, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import fs, { mkdirSync, writeFileSync } from 'fs';
import { dirname } from "path";
import { Breakpoint, BreakpointName } from '../common/enums';

export type CustomTestFixtures = {
  apiImageMock: () => void;
  testScreenshotAtBreakpoint: (
    options: {
      testId: string;
      breakpoint: Breakpoint;
      breakpointName: BreakpointName;
      height?: number;
    }) => void;
  goToComponentsPage: (path: string) => void;
  goto: (path?: string) => void;
  gotoInPreviewMode: (options?: {
    slug: string;
  }) => void;
  setViewportSize: (options?: { width?: number; height?: number; }) => void;
  testAxeCoreCheckAtBreakpoint: (
    options: {
      pageName: string;
      breakpoint: Breakpoint;
      breakpointName: BreakpointName;
    }) => void;
};

// https://playwright.dev/docs/test-fixtures
// Extend base playwright test
export const test = base.extend<CustomTestFixtures>({
  goto: async ({
    page,
    apiImageMock,
  }, use) => {
    const goto = async (path: string = ``) => {
      await apiImageMock();

      // interrupting the connection for gif, for more stable work of tests
      await page.route(`**/**.gif`, (route) => route.abort());

      await page.goto(`${process.env.FRONTEND_URL}/${path}`, {
        waitUntil: `networkidle`,
      });
    };

    await use(goto);
  },

  goToComponentsPage: async ({
    page,
    apiImageMock,
  }, use) => {
    const goToComponentsPage = async (path: string) => {
      // hide cookie banner
      await page.addInitScript(() => {
        localStorage.setItem(`cookieAccept`, `false`);
      });
      await apiImageMock();

      // interrupting the connection for gif, for more stable work of tests
      await page.route(`**/**.gif`, (route) => route.abort());

      await page.goto(`/ru/components/${path}`, {
        waitUntil: `networkidle`,
      });
    };

    await use(goToComponentsPage);
  },

  gotoInPreviewMode: async ({
    page,
    apiImageMock,
  }, use) => {
    const gotoInPreviewMode = async ({
      slug = ``,
    }: {
      slug?: string;
    } = {}) => {
      await apiImageMock();

      await page.goto(`/api/preview?secret=secret&slug=${slug}`);
    };

    await use(gotoInPreviewMode);
  },

  testScreenshotAtBreakpoint: async ({
    page,
    setViewportSize,
  }, use) => {
    const testScreenshotAtBreakpoint = async ({
      testId,
      breakpoint,
      breakpointName,
      height,
    }: {
      testId: string;
      breakpoint: Breakpoint;
      breakpointName: BreakpointName;
      height?: number;
    }) => {
      // This is necessary so that the tests do not crop the screenshots.
      await page.addStyleTag({
        content: `html, body, #__next { height: auto !important; min-height: 100% !important; }`,
      });

      await setViewportSize({
        width: breakpoint,
        height,
      });

      await expect(page.getByTestId(testId))
        .toHaveScreenshot(`${testId}-${breakpointName}.png`);
    };

    await use(testScreenshotAtBreakpoint);
  },

  setViewportSize: async ({
    page,
  }, use) => {
    const setViewportSize = async ({
      width = Breakpoint.MOBILE,
      height = 768,
    }: {
      width?: number;
      height?: number;
    } = {}) => {
      await page.setViewportSize({
        width,
        height,
      });
    };

    await use(setViewportSize);
  },

  apiImageMock: async ({
    page,
  }, use) => {
    const PNG_STUB_FILE = fs.readFileSync(`./playwright-tests/fixtures/stub.png`);

    const apiImageMock = async () => {
      await page.route(`**/_next/image*`, async (route, request) => {
        // Make sure that the browser is waiting for an image
        const accept = await request.headerValue(`accept`);
        const acceptsPng = accept?.includes(`image/*`);

        if (!acceptsPng) return route.continue();

        return route.fulfill({
          contentType: `image/png`,
          body: PNG_STUB_FILE,
        });
      });
    };

    await use(apiImageMock);
  },

  testAxeCoreCheckAtBreakpoint: async ({
    page,
    setViewportSize,
  }, use) => {
    const testAxeCoreCheckAtBreakpoint = async ({
      pageName,
      breakpoint,
      breakpointName,
    }: {
      pageName: string;
      breakpoint: Breakpoint;
      breakpointName: BreakpointName;
    }) => {
      await setViewportSize({
        width: breakpoint,
      });

      const results = await new AxeBuilder({
        page,
      })
        .analyze();

      const {
        violations,
      } = results;

      if (violations.length > 0) {
        const reportPath = `./playwright-test-results/axe-reports/axe-report-${pageName}-${breakpointName}.json`;

        mkdirSync(dirname(reportPath), {
          recursive: true,
        });

        writeFileSync(reportPath, JSON.stringify(violations, null, 2));

        violations.forEach((violation, index) => {
          console.error(`\n${index + 1}. ${violation.id} (Impact: ${violation.impact})`);
          console.error(`${violation.description}`);
          console.error(`Help: ${violation.help}`);
          console.error(`Affected ${violation.nodes.length} node(s)`);
          console.error(`More info: ${violation.helpUrl}`);
        });

        throw new Error(`Accessibility violations found: ${violations.length}`);
      }
    };

    await use(testAxeCoreCheckAtBreakpoint);
  },
});

export {
  expect,
  type Page,
} from '@playwright/test';
