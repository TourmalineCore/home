import { test } from '../../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../../playwright-tests/constants/breakpoints';
import { ComponentName } from '../../../../common/enums';

const TEST_ID = `chelzoo-hero`;

test.describe(`ChelzooHeroTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.CHELZOO_HERO);
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
