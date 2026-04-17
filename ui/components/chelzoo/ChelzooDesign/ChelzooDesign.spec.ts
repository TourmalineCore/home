import { test } from "../../../playwright-tests/custom-test";
import { ComponentName } from "../../../common/screenshot-component-registry";
import { BREAKPOINTS } from "../../../playwright-tests/constants/breakpoints";

test.describe(`ChelzooDesignTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_DESIGN);
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
        testId: ComponentName.CHELZOO_DESIGN,
        breakpoint,
        breakpointName,
      });
    });
  }
});
