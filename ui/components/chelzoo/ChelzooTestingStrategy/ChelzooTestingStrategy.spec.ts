import { test } from '../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../playwright-tests/constants/breakpoints';
import { ComponentName } from '../../../common/screenshot-component-registry';

test.describe(`ChelzooTestingStrategyTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_TESTING_STRATEGY);
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
        testId: ComponentName.CHELZOO_TESTING_STRATEGY,
        breakpoint,
        breakpointName,
      });
    });
  }
});
