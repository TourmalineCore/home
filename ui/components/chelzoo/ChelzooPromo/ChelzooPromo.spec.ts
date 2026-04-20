import { test } from "../../../playwright-tests/custom-test";
import { BREAKPOINTS } from "../../../playwright-tests/constants/breakpoints";
import { ComponentName } from "../../../common/enums";

test.describe(`ChelzooPromoTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_PROMO);
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
        testId: ComponentName.CHELZOO_PROMO,
        breakpoint,
        breakpointName,
      });
    });
  }
});
