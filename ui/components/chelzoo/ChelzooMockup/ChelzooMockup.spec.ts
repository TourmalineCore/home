import { ComponentName } from "../../../common/screenshot-component-registry";
import { BREAKPOINTS } from "../../../playwright-tests/constants/breakpoints";
import { test } from "../../../playwright-tests/custom-test";

test.describe(`ChelzooMockupTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_MOCKUP);
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
        testId: ComponentName.CHELZOO_MOCKUP,
        breakpoint,
        breakpointName,
      });
    });
  }
});
