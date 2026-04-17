import { test } from '../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../playwright-tests/constants/breakpoints';
import { ComponentName } from '../../../common/enums';

test.describe(`ChelzooCMSTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_CMS);
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
        testId: ComponentName.CHELZOO_CMS,
        breakpoint,
        breakpointName,
      });
    });
  }
});
