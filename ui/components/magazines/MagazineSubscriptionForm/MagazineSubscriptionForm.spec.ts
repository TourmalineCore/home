import { ComponentName } from "../../../common/enums";
import { BREAKPOINTS } from "../../../playwright-tests/constants/breakpoints";
import { test } from "../../../playwright-tests/custom-test";

test.describe(`MagazineSubscriptionFormTests`, () => {
  for (const {
    name,
    breakpoint,
    breakpointName,
  } of BREAKPOINTS) {
    test(name, async ({
      testScreenshotAtBreakpoint,
      goToComponentsPage,
    }) => {
      await goToComponentsPage(ComponentName.MAGAZINE_SUBSCRIPTION_FORM);

      await testScreenshotAtBreakpoint({
        testId: ComponentName.MAGAZINE_SUBSCRIPTION_FORM,
        breakpoint,
        breakpointName,
      });
    });
  }
});
