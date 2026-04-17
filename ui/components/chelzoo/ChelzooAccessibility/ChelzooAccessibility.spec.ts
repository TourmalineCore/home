import { test } from "../../../playwright-tests/custom-test";
import { ComponentName } from "../../../common/screenshot-component-registry";
import { BREAKPOINTS } from "../../../playwright-tests/constants/breakpoints";

test.describe(`ChelzooAccessibilityTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_ACCESSIBILITY);
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
        testId: ComponentName.CHELZOO_ACCESSIBILITY,
        breakpoint,
        breakpointName,
      });
    });
  }
});
