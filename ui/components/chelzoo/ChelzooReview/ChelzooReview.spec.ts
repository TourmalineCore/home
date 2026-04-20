import { ComponentName } from "../../../common/enums";
import { BREAKPOINTS } from "../../../playwright-tests/constants/breakpoints";
import { test } from "../../../playwright-tests/custom-test";

test.describe(`ChelzooReviewTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_REVIEW);
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
        testId: ComponentName.CHELZOO_TASKS,
        breakpoint,
        breakpointName,
      });
    });
  }
});
