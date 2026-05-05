import { COOKIE_ACCEPT, COOKIE_SETTINGS } from "../../common/constants/cookie";
import { createCmsActions } from "../create-cms-actions";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../custom-test";

test.describe(`Cookie`, () => {
  test.describe(`Accept cookie test`, acceptCookieTest);
  test.describe(`Reject cookie test`, rejectCookieTest);
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

    const consentId = await getConsentIdFromLocalStorage(page);

    await expect(consentId)
      .not
      .toBeNull();

    const metricTag = await getYandexMetricTag(page);

    await expect(metricTag)
      .toHaveCount(1);

    await page.waitForTimeout(10000);

    const allScripts = await page.evaluate(() => Array.from(document.querySelectorAll(`script`))
      .map((s) => s.src)
      .filter((src) => src));

    console.log(`=== All Yandex scripts ===`, allScripts);

    const metricTagPhono = await getYandexMetricTagPhono(page);

    await expect(metricTagPhono)
      .toHaveCount(1);

    const cms = createCmsActions(page);

    await test.step(
      `Check cookie consentId in CMS`,
      () => page.goto(process.env.CMS_URL as string),
    );

    await cms.authorize();

    await cms.navigateToContentManager();

    await cms.skipTutorial();

    await cms.navigateToContentTypeByName(`Cookie consent`);

    await expect(page.getByText(consentId!))
      .toBeVisible();
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

    const consentId = await getConsentIdFromLocalStorage(page);

    await expect(consentId)
      .toBeNull();

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

    const metricTagPhono = await getYandexMetricTagPhono(page);

    await expect(metricTagPhono)
      .toHaveCount(0);
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

async function getConsentIdFromLocalStorage(page: Page) {
  return page.evaluate(() => localStorage.getItem(`consentId`));
}

async function getYandexMetricTag(page: Page) {
  return page.locator(`script[src="https://mc.yandex.ru/metrika/tag.js"]`);
}

async function getYandexMetricTagPhono(page: Page) {
  return page.locator(`script[src="https://mc.yandex.ru/metrika/tag_phono.js"]`);
}

async function checkNoConsentState(page: Page) {
  await expect(await page.context()
    .cookies())
    .toEqual([]);

  const metricTag = await getYandexMetricTag(page);

  await expect(metricTag)
    .toHaveCount(0);

  const metricTagPhono = await getYandexMetricTagPhono(page);

  await expect(metricTagPhono)
    .toHaveCount(0);

  const consentId = await getConsentIdFromLocalStorage(page);

  await expect(consentId)
    .toBeNull();
}
