import { Browser, Page } from '@playwright/test';
import { expect, test } from '../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../playwright-tests/constants/breakpoints';
import { AppRoute, ComponentName } from '../../../common/enums';

const TEST_ID = `form-block`;

test.describe(`FormBlockScreenshotTests`, () => {
  for (const {
    name,
    breakpoint,
    breakpointName,
  } of BREAKPOINTS) {
    test(name, async ({
      testScreenshotAtBreakpoint,
      goToComponentsPage,
    }) => {
      await goToComponentsPage(ComponentName.FORM_BLOCK);

      await testScreenshotAtBreakpoint({
        testId: TEST_ID,
        breakpoint,
        breakpointName,
      });
    });
  }
});

test.describe(`FormDisplayDependingOnGeolocationTests`, () => {
  test(`FormIsDisplayedInRussiaCountryTest`, formIsDisplayedInRussiaTest);

  test(`FormIsNotDisplayedOutsideOfRussia`, formIsNotDisplayedOutsideOfRussia);
});

test.describe(`SubmitButtonStateBasedOnPrivacyPolicyConsentTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.FORM_BLOCK);
  });

  test(`SubmitButtonIsDisabledWithoutConsentTest`, submitButtonIsDisabledWithoutConsentTest);

  test(`SubmitButtonIsEnabledWithConsentTest`, submitButtonIsEnabledWithConsentTest);
});

test.describe(`FormInputsShouldHaveYmDisableKeysClassNameToDisguiseFromWebvisor`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.FORM_BLOCK);
  });

  test(`CheckClassNameTest`, checkClassName);
});

test.describe(`Error`, errorTests);

async function errorTests() {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.FORM_BLOCK);
  });

  test(
    `
    GIVEN form is displayed
    WHEN user submits the form and email sending fails
    THEN error message is displayed
    AND user can try submitting the form again and email sending succeeds
    THEN error message is not displayed
    `,
    errorMessageDisplayTests,
  );
}

async function errorMessageDisplayTests({
  page,
}: {
  page: Page;
}) {
  const errorText = `Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже или отправьте ваш запрос на почту contact@tourmalinecore.com`;

  await page.route(`/api/send-email`, (route) => route.fulfill({
    status: 500,
  }));

  await page.getByTestId(`form-redesign-name-input`)
    .fill(`Test Name`);

  await page.getByTestId(`form-redesign-email-input`)
    .fill(`test@test.ru`);

  await page.getByTestId(`form-redesign-message-textarea`)
    .fill(`Test Message`);

  await page.getByTestId(`form-block-consent-checkbox`)
    .check();

  await page.getByTestId(`form-block-submit-button`)
    .click();

  await expect(
    page.getByText(errorText),
  )
    .toBeVisible();

  await page.route(`/api/send-email`, (route) => route.fulfill({
    status: 200,
  }));

  await page.getByTestId(`form-block-submit-button`)
    .click();

  await expect(
    page.getByText(errorText),
  )
    .not
    .toBeVisible();
}

async function checkClassName({
  page,
}: {
  page: Page;
}) {
  expect(page.getByTestId(`form-redesign-name-input`))
    .toContainClass(`ym-disable-keys`);

  expect(page.getByTestId(`form-redesign-email-input`))
    .toContainClass(`ym-disable-keys`);

  expect(page.getByTestId(`form-redesign-message-textarea`))
    .toContainClass(`ym-disable-keys`);
}

async function formIsNotDisplayedOutsideOfRussia({
  browser,
}: {
  browser: Browser;
}) {
  // Set American coordinates
  const context = await browser.newContext({
    permissions: [`geolocation`],
    geolocation: {
      latitude: 38.7946,
      longitude: 106.5348,
    },
  });

  const page = await context.newPage();

  await page.goto(AppRoute.Main);

  await expect(page.getByTestId(TEST_ID))
    .not
    .toBeVisible();

  await browser.close();
}

async function formIsDisplayedInRussiaTest({
  browser,
}: {
  browser: Browser;
}) {
  // Set Russian coordinates
  const context = await browser.newContext({
    permissions: [`geolocation`],
    geolocation: {
      latitude: 61.5240,
      longitude: 105.3188,
    },
  });

  const page = await context.newPage();

  await page.goto(AppRoute.Main);

  await expect(page.getByTestId(TEST_ID))
    .toBeVisible();

  await browser.close();
}

async function submitButtonIsDisabledWithoutConsentTest({
  page,
}: {
  page: Page;
}) {
  await expect(page.getByTestId(`form-block-consent-checkbox`))
    .not
    .toBeChecked();

  await expect(page.getByTestId(`form-block-submit-button`))
    .toBeDisabled();
}

async function submitButtonIsEnabledWithConsentTest({
  page,
}: {
  page: Page;
}) {
  await expect(page.getByTestId(`form-block-consent-checkbox`))
    .not
    .toBeChecked();

  await page.getByTestId(`form-block-consent-checkbox`)
    .check();

  await expect(page.getByTestId(`form-block-submit-button`))
    .not
    .toBeDisabled();
}
