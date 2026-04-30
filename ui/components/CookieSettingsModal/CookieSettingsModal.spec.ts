import { ComponentName } from "../../common/enums";
import { BREAKPOINTS } from "../../playwright-tests/constants/breakpoints";
import { test } from "../../playwright-tests/custom-test";

test.describe(`CookieSettingsModal`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.COOKIE_SETTINGS_MODAL);
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
        testId: ComponentName.COOKIE_SETTINGS_MODAL,
        breakpoint,
        breakpointName,
      });
    });
  }
});
