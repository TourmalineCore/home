import { test } from '../../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../../playwright-tests/constants/breakpoints';
import { BreakpointName, ComponentName } from '../../../../common/enums';

const TEST_ID = `chelzoo-hero`;

const heightMap: Record<BreakpointName, number> = {
  mobile: 689,
  tablet: 708,
  'tablet-xl': 830,
  desktop: 830,
  'desktop-xl': 1152,
};
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
        height: heightMap[breakpointName],
      });
    });
  }
});
