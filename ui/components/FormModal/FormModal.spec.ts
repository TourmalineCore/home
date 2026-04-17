import { test } from '../../playwright-tests/custom-test';
import { BreakpointName, ComponentName } from '../../common/enums';
import { BREAKPOINTS } from '../../playwright-tests/constants/breakpoints';

const TEST_ID = `form-modal`;

const heightMap: Record<BreakpointName, number> = {
  mobile: 801,
  tablet: 1024,
  'tablet-xl': 1024,
  desktop: 768,
  'desktop-xl': 1080,
};

test.describe(`FormModal`, () => {
  test.beforeEach(async ({
    page,
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.FORM_MODAL);

    await page.addStyleTag({
      content: `
    *:focus {
      outline: none !important;
      box-shadow: none !important;
    }`,
    });
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
        height: heightMap[breakpointName],
      });
    });
  }
});
