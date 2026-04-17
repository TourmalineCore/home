import { test } from "../../../playwright-tests/custom-test";
import { BREAKPOINTS } from "../../../playwright-tests/constants/breakpoints";
import { ComponentName } from "../../../common/screenshot-component-registry";

test.describe(`ChelzooAboutTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_ABOUT);
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
        testId: ComponentName.CHELZOO_ABOUT,
        breakpoint,
        breakpointName,
      });
    });
  }
});
