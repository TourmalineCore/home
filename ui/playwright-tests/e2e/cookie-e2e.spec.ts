import { COOKIE_ACCEPT, COOKIE_SETTINGS } from "../../common/constants/cookie";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../custom-test";

test.describe(`Cookie`, () => {
  test.describe(`Accept cookie test`, acceptCookieTest);
  test.describe(`Reject cookie test`, rejectCookieTest);
  test.describe(`Webvisor checkbox tests`, webvisorCheckboxTests);
});

async function acceptCookieTest() {
  test(`
    GIVEN no cookie consent
    WHEN the user accepts cookies
    THEN metrics are initialized and tracking starts
    `, async ({
    goto,
    page,
  }: {
    goto: CustomTestFixtures['goto'];
    setViewportSize: CustomTestFixtures['setViewportSize'];
    page: Page;
  }) => {
    await goto(process.env.FRONTEND_URL as string);

    await checkNoConsentState(page);

    await page
      .getByTestId(`accept-button`)
      .click();

    await expect(page
      .getByTestId(`cookie`))
      .toBeHidden();

    const cookieAccept = await getCookieAcceptFromCookie(page);

    const cookieSettings = await getCookieSettingsFromCookie(page);

    await expect(cookieAccept)
      .toEqual(`true`);

    await expect(cookieSettings)
      .toEqual({
        analytics: true,
        webvisor: true,
      });

    const metricTag = await getYandexMetricTag(page);

    await expect(metricTag)
      .toHaveCount(1);
  });
}

async function rejectCookieTest() {
  test(`
    GIVEN no cookie consent
    WHEN the user rejects cookies
    THEN metrics are not initialized and tracking does not start
    `, async ({
    goto,
    page,
  }: {
    goto: CustomTestFixtures['goto'];
    setViewportSize: CustomTestFixtures['setViewportSize'];
    page: Page;
  }) => {
    await goto(process.env.FRONTEND_URL as string);

    await checkNoConsentState(page);

    await page
      .getByTestId(`reject-button`)
      .click();

    await expect(page
      .getByTestId(`cookie`))
      .toBeHidden();

    const cookieAccept = await getCookieAcceptFromCookie(page);

    const cookieSettings = await getCookieSettingsFromCookie(page);

    await expect(cookieAccept)
      .toEqual(`false`);

    await expect(cookieSettings)
      .toEqual({
        analytics: false,
        webvisor: false,
      });

    const metricTag = await getYandexMetricTag(page);

    await expect(metricTag)
      .toHaveCount(0);
  });
}

async function webvisorCheckboxTests() {
  test(`
    GIVEN cookie settings modal is open
    AND analytics is turned off
    THEN webvisor should be disabled
    `, async ({
    goto,
    page,
  }: {
    goto: CustomTestFixtures['goto'];
    setViewportSize: CustomTestFixtures['setViewportSize'];
    page: Page;
  }) => {
    await goto(process.env.FRONTEND_URL as string);

    await checkNoConsentState(page);

    await page
      .getByTestId(`cookie-settings-button`)
      .click();

    const analyticsCheckbox = page.getByRole(`checkbox`, {
      name: `analytics`,
    });
    const webvisorCheckbox = page.getByRole(`checkbox`, {
      name: `webvisor`,
    });

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
    goto,
    page,
  }: {
    goto: CustomTestFixtures['goto'];
    setViewportSize: CustomTestFixtures['setViewportSize'];
    page: Page;
  }) => {
    await goto(process.env.FRONTEND_URL as string);

    await checkNoConsentState(page);

    await page
      .getByTestId(`cookie-settings-button`)
      .click();

    const analyticsCheckbox = page.getByRole(`checkbox`, {
      name: `analytics`,
    });
    const webvisorCheckbox = page.getByRole(`checkbox`, {
      name: `webvisor`,
    });

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
    goto,
    page,
  }: {
    goto: CustomTestFixtures['goto'];
    setViewportSize: CustomTestFixtures['setViewportSize'];
    page: Page;
  }) => {
    await goto(process.env.FRONTEND_URL as string);

    await checkNoConsentState(page);

    await page
      .getByTestId(`cookie-settings-button`)
      .click();

    const analyticsCheckbox = page.getByRole(`checkbox`, {
      name: `analytics`,
    });
    const webvisorCheckbox = page.getByRole(`checkbox`, {
      name: `webvisor`,
    });

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

async function getCookieAcceptFromCookie(page: Page) {
  const cookies = await page.context()
    .cookies();

  return cookies.find(({
    name,
  }) => name === COOKIE_ACCEPT)?.value;
}

async function getCookieSettingsFromCookie(page: Page) {
  const cookies = await page.context()
    .cookies();

  const cookieSettings = cookies.find(({
    name,
  }) => name === COOKIE_SETTINGS)?.value;

  const decodeCookieSettings = decodeURIComponent(cookieSettings as string);

  return JSON.parse(decodeCookieSettings);
}

async function getYandexMetricTag(page: Page) {
  return page.locator(`script[src="https://mc.yandex.ru/metrika/tag.js"]`);
}

async function checkNoConsentState(page: Page) {
  await expect(await page.context()
    .cookies())
    .toEqual([]);

  const metricTag = await getYandexMetricTag(page);

  await expect(metricTag)
    .toHaveCount(0);
}
