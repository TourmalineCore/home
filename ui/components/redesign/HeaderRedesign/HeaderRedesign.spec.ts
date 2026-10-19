import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from '../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../playwright-tests/constants/breakpoints';
import { Breakpoint, BreakpointName, ComponentName } from '../../../common/enums';

const TEST_ID = `header-redesign`;

test.describe(`Header`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.HEADER);
  });

  for (const {
    name,
    breakpoint,
    breakpointName,
  } of BREAKPOINTS) {
    test(name, async ({
      testScreenshotAtBreakpoint,
    }) => {
      await testScreenshotAtBreakpoint({
        testId: TEST_ID,
        breakpoint,
        breakpointName,
      });
    });
  }

  test.describe(`ShowSubmenuTests`, () => {
    const breakpoints = BREAKPOINTS.filter((breakpoint) => breakpoint.breakpoint === Breakpoint.DESKTOP_XL);

    for (const {
      name,
      breakpoint,
      breakpointName,
    } of breakpoints) {
      test(name, async ({
        page,
        setViewportSize,
      }: {
        page: Page;
        setViewportSize: CustomTestFixtures["setViewportSize"];
      }) => {
        await setViewportSize({
          width: breakpoint,
        });

        await page.getByTestId(`header-accordion`)
          .first()
          .hover();

        await page.getByTestId(`header-redesign`)
          .evaluate((el) => {
            el.style.paddingBottom = `400px`;
          });

        await expect(page.getByTestId(`header-redesign`))
          .toHaveScreenshot(`${TEST_ID}-submenu-${breakpointName}.png`);
      });
    }
  });

  test.describe(`ShowLangTooltipTests`, () => {
    const breakpoints = BREAKPOINTS.filter((breakpoint) => breakpoint.breakpoint === Breakpoint.MOBILE
      || breakpoint.breakpoint === Breakpoint.DESKTOP_XL);

    for (const {
      name,
      breakpoint,
      breakpointName,
    } of breakpoints) {
      test(name, async ({
        page,
        setViewportSize,
      }: {
        page: Page;
        setViewportSize: CustomTestFixtures["setViewportSize"];
      }) => {
        await setViewportSize({
          width: breakpoint,
        });

        if (breakpoint === Breakpoint.MOBILE) {
          await page.getByTestId(`lang-switch`)
            .click();
        } else {
          await page.getByTestId(`lang-switch`)
            .hover();
        }

        await page.waitForTimeout(150);

        await page.getByTestId(`header-redesign`)
          .evaluate((el) => {
            el.style.paddingBottom = `120px`;
          });

        await expect(page.getByTestId(`header-redesign`))
          .toHaveScreenshot(`${TEST_ID}-lang-tooltip-${breakpointName}.png`);
      });
    }
  });

  test.describe(`Scroll to top after switching between pages`, () => {
    const testCases = [
      {
        breakpointName: BreakpointName.DESKTOP,
        breakpoint: Breakpoint.DESKTOP,
      },
      {
        breakpointName: BreakpointName.MOBILE,
        breakpoint: Breakpoint.MOBILE,
      },
    ];

    for (const {
      breakpointName,
      breakpoint,
    } of testCases) {
      test(`
        GIVEN page in ${breakpointName} breakpoint
        AND the page has been scrolled away from the top
        WHEN the user opens the burger menu, expands a section, and taps a link to another page
        THEN after the redirect the new page opens scrolled to the top
      `, async ({
        page,
        setViewportSize,
      }: {
        page: Page;
        setViewportSize: CustomTestFixtures["setViewportSize"];
      }) => {
        await setViewportSize({
          width: breakpoint,
        });

        await expect(await getScrollY({
          page,
        }))
          .toBe(0);

        await page.evaluate(() => {
          document.body.style.minHeight = `3000px`;
        });

        // Scroll down to hide the header, then scroll up slightly to make it reappear (this is the expected smart-header behavior).
        // Then click on the desired link in the header.
        await page.mouse.wheel(0, 1000);

        await page.mouse.wheel(0, -200);

        await page.waitForTimeout(100);

        await expect(await getScrollY({
          page,
        }))
          .not
          .toBe(0);

        const currentUrl = page.url();

        if (breakpoint === Breakpoint.MOBILE) {
          await page
            .getByTestId(`header-redesign-burger`)
            .click();
        }

        await page
          .getByTestId(`header-accordion-button`)
          .filter({
            visible: true,
          })
          .first()
          .click();

        await page
          .getByText(`UI/UX дизайн`)
          .filter({
            visible: true,
          })
          .first()
          .click();

        await page.waitForURL((url) => url.toString() !== currentUrl, {
          waitUntil: `networkidle`,
        });

        await page.getByText(`UX/UI design`)
          .waitFor({
            state: `visible`,
          });

        await expect(await getScrollY({
          page,
        }))
          .toBe(0);
      });
    }
  });
});

async function getScrollY({
  page,
}: {
  page: Page;
}) {
  return page.evaluate(() => window.scrollY);
}
