import { BREAKPOINTS } from "../constants/breakpoints";
import { test } from "../custom-test";

test.describe(`Analyzing home page for accessibility using axe core`, () => {
  test.beforeEach(async ({
    goto,
  }) => {
    await goto();
  });

  for (const {
    name,
    breakpoint,
    breakpointName,
  } of BREAKPOINTS) {
    test(name, async ({
      testAxeCoreCheckAtBreakpoint,
    }) => {
      await testAxeCoreCheckAtBreakpoint({
        pageName: `home`,
        breakpoint,
        breakpointName,
      });
    });
  }
});

test.describe(`Analyzing chelzoo page for accessibility using axe core`, () => {
  test.beforeEach(async ({
    goto,
  }) => {
    await goto(`/chelzoo`);
  });

  for (const {
    name,
    breakpoint,
    breakpointName,
  } of BREAKPOINTS) {
    test(name, async ({
      testAxeCoreCheckAtBreakpoint,
    }) => {
      await testAxeCoreCheckAtBreakpoint({
        pageName: `chelzoo`,
        breakpoint,
        breakpointName,
        // Chelzoo page has mobile-only scroll container because keyboard navigation not required
        // This rule is not valid for our case
        disableRules: [`scrollable-region-focusable`],
      });
    });
  }
});
