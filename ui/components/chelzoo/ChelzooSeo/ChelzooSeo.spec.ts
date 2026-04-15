import { test } from "../../../playwright-tests/custom-test";
import { ComponentName } from "../../../common/enums";
import { BREAKPOINTS } from "../../../playwright-tests/constants/breakpoints";

test.describe(`ChelzooSeoTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_SEO);
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
        testId: ComponentName.CHELZOO_SEO,
        breakpoint,
        breakpointName,
      });
    });
  }
});
