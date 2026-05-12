import { ComponentName } from "../../common/enums";
import { BREAKPOINTS } from "../../playwright-tests/constants/breakpoints";
import { expect, Page, test } from "../../playwright-tests/custom-test";

test.describe(`CookieSettingsModal`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.COOKIE_SETTINGS_MODAL);
  });

  test.describe(`Webvisor checkbox tests`, webvisorCheckboxTests);

  for (const {
    name,
    breakpoint,
    breakpointName,
  } of BREAKPOINTS) {
    test(name, async ({
      testScreenshotAtBreakpoint,
    }) => {
      await testScreenshotAtBreakpoint({
        testId: ComponentName.COOKIE_SETTINGS_MODAL,
        breakpoint,
        breakpointName,
      });
    });
  }
});

async function webvisorCheckboxTests() {
  test(`
    GIVEN cookie settings modal is open
    WHEN analytics is turned off
    THEN webvisor should be disabled
    `, async ({
    page,
  }: {
    page: Page;
  }) => {
    const analyticsCheckbox = getAnalyticsCheckbox(page);
    const webvisorCheckbox = getWebvisorCheckbox(page);

    if (await analyticsCheckbox.isChecked()) {
      await analyticsCheckbox.click();
    }

    await expect(webvisorCheckbox)
      .toBeDisabled();
  });

  test(`
    GIVEN cookie settings modal is open
    WHEN analytics is turned on
    THEN webvisor should be enabled
    `, async ({
    page,
  }: {
    page: Page;
  }) => {
    const analyticsCheckbox = getAnalyticsCheckbox(page);
    const webvisorCheckbox = getWebvisorCheckbox(page);

    if (!await analyticsCheckbox.isChecked()) {
      await analyticsCheckbox.click();
    }

    await expect(webvisorCheckbox)
      .toBeEnabled();
  });

  test(`
    GIVEN cookie settings modal is open 
    AND both analytics and webvisor are turned on
    WHEN analytics is turned off 
    THEN webvisor should be unchecked and disabled
    `, async ({
    page,
  }: {
    page: Page;
  }) => {
    const analyticsCheckbox = getAnalyticsCheckbox(page);
    const webvisorCheckbox = getWebvisorCheckbox(page);

    if (!await analyticsCheckbox.isChecked()) {
      await analyticsCheckbox.click();
    }
    if (!await webvisorCheckbox.isChecked()) {
      await webvisorCheckbox.click();
    }

    await expect(webvisorCheckbox)
      .toBeChecked();

    await analyticsCheckbox.click();

    await expect(webvisorCheckbox)
      .not
      .toBeChecked();

    await expect(webvisorCheckbox)
      .toBeDisabled();
  });
}

function getAnalyticsCheckbox(page: Page) {
  return page.getByTestId(`checkbox-analytics`)
    .filter({
      visible: true,
    });
}

function getWebvisorCheckbox(page: Page) {
  return page.getByTestId(`checkbox-webvisor`)
    .filter({
      visible: true,
    });
}
