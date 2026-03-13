import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from '../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../playwright-tests/constants/breakpoints';
import { Breakpoint, ComponentName } from '../../../common/enums';

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
    const breakpoints = BREAKPOINTS.filter((breakpoint) => breakpoint.breakpoint === Breakpoint.TABLET_XL
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

        await page.getByTestId(`lang-switch`)
          .hover();

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
});
