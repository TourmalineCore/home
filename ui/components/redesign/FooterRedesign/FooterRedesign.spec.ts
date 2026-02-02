import { test } from '../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../playwright-tests/constants/breakpoints';
import { ComponentName } from '../../../common/enums';

const TEST_ID = `footer`;

test.describe(`Footer`, () => {
  test.beforeEach(async ({
    page,
    goToComponentsPage,
  }) => {
    // Set a fixed date so that the test will be stable and doesn't depend on the current date
    await page.clock.setFixedTime(new Date(`2025-10-26T08:00:00Z`));

    await goToComponentsPage(ComponentName.FOOTER);
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
});
