import { test } from "../../../playwright-tests/custom-test";
import { ComponentName } from "../../../common/enums";
import { BREAKPOINTS } from "../../../playwright-tests/constants/breakpoints";

test.describe(`ChelzooInfrastructureTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_INFRASTRUCTURE);
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
        testId: ComponentName.CHELZOO_INFRASTRUCTURE,
        breakpoint,
        breakpointName,
      });
    });
  }
});
