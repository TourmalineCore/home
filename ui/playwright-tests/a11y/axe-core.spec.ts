import { BREAKPOINTS } from "../constants/breakpoints";
import { test } from "../custom-test";

test.describe(`Analyzing pages for accessibility using axe core `, () => {
  test.describe(`Check home page`, () => {
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
});
