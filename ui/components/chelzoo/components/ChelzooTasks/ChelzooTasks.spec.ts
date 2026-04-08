import { BreakpointName, ComponentName } from "../../../../common/enums";
import { BREAKPOINTS } from "../../../../playwright-tests/constants/breakpoints";
import { test } from "../../../../playwright-tests/custom-test";

const heightMap: Record<BreakpointName, number> = {
  mobile: 689,
  tablet: 708,
  'tablet-xl': 830,
  desktop: 830,
  'desktop-xl': 1152,
};
test.describe(`TaskTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_TASKS);
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
        height: heightMap[breakpointName],
      });
    });
  }
});
