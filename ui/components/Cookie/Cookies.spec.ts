import { ComponentName } from "../../common/enums";
import { BREAKPOINTS } from "../../playwright-tests/constants/breakpoints";
import { Page, test } from "../../playwright-tests/custom-test";

const TEST_ID = `cookie`;

test.describe(`Cookie`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.COOKIE);
  });

  test(`AcceptTest`, acceptTest);

  test(`RejectTest`, rejectTest);

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

async function acceptTest({
  page,
}: {
  page: Page;
}) {
  await page.getByTestId(TEST_ID)
    .isVisible();

  await page.getByTestId(`accept-button`)
    .click();

  await page.getByTestId(TEST_ID)
    .isHidden();
}

async function rejectTest({
  page,
}: {
  page: Page;
}) {
  await page.getByTestId(TEST_ID)
    .isVisible();

  await page.getByTestId(`reject-button`)
    .click();

  await page.getByTestId(TEST_ID)
    .isHidden();
}
