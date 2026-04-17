import { ComponentName } from "../../common/enums";
import { BREAKPOINTS } from "../../playwright-tests/constants/breakpoints";
import { test } from "../../playwright-tests/custom-test";

const TEST_ID = `three-column-grid`;

test.describe(`ThreeColumnGrid`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.THREE_COLUMN_GRID);
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
        testId: TEST_ID,
        breakpoint,
        breakpointName,
      });
    });
  }
});
