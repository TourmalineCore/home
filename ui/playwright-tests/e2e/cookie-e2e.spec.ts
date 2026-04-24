import { COOKIE_ACCEPT } from "../../common/constants/cookie";
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
  test(
    `
    GIVEN no cookie consent
    WHEN the user accepts cookies
    THEN metrics are initialized and tracking starts
    `,
    async ({
      goto,
      page,
    }: {
      goto: CustomTestFixtures['goto'];
      setViewportSize: CustomTestFixtures['setViewportSize'];
      page: Page;
    }) => {
      await goto(process.env.FRONTEND_URL as string);

      checkNoConsentState(page);

      await page
        .getByTestId(`accept-button`)
        .click();

      await expect(page
        .getByTestId(`cookie`))
        .toBeHidden();

      await expect(await getCookies(page))
        .toMatchObject([
          {
            name: `${COOKIE_ACCEPT}`,
            value: `true`,
          },
        ]);

      const consentIdAfterAccept = await getConsentIdFromLocalStorage(page);

      await expect(consentIdAfterAccept)
        .not
        .toBeNull();

      const metricTagAfterAcceptCookies = await getYandexMetricTag(page);

      await expect(metricTagAfterAcceptCookies)
        .toHaveCount(1);

      // const metricTagPhonoAfterAcceptCookies = await getYandexMetricTagPhono(page);

      // await expect(metricTagPhonoAfterAcceptCookies)
      //   .toHaveCount(1);

      const cms = createCmsActions(page);

      await test.step(
        `Check cookie consentId in CMS`,
        () => page.goto(process.env.CMS_URL as string),
      );

      await cms.authorize();

      await cms.navigateToContentManager();

      await cms.skipTutorial();

      await cms.navigateToContentTypeByName(`Cookie consent`);

      await expect(page.getByText(consentIdAfterAccept!))
        .toBeVisible();
    },
  );
}

async function rejectCookieTest() {
  test(
    `
    GIVEN no cookie consent
    WHEN the user rejects cookies
    THEN metrics are not initialized and tracking does not start
    `,
    async ({
      goto,
      page,
    }: {
      goto: CustomTestFixtures['goto'];
      setViewportSize: CustomTestFixtures['setViewportSize'];
      page: Page;
    }) => {
      await goto(process.env.FRONTEND_URL as string);

      checkNoConsentState(page);

      await page
        .getByTestId(`reject-button`)
        .click();

      const consentIdAfterReject = await getConsentIdFromLocalStorage(page);

      await expect(consentIdAfterReject)
        .toBeNull();

      await expect(page
        .getByTestId(`cookie`))
        .toBeHidden();

      await expect(await getCookies(page))
        .toMatchObject([
          {
            name: `${COOKIE_ACCEPT}`,
            value: `false`,
          },
        ]);

      const metricTagAfterAcceptCookies = await getYandexMetricTag(page);

      await expect(metricTagAfterAcceptCookies)
        .toHaveCount(0);
    },
  );
}

async function getCookies(page: Page) {
  return page.context()
    .cookies();
}

async function getConsentIdFromLocalStorage(page: Page) {
  return page.evaluate(() => localStorage.getItem(`consentId`));
}

async function getYandexMetricTag(page: Page) {
  return page.locator(`script[src="https://mc.yandex.ru/metrika/tag.js"]`);
}

// async function getYandexMetricTagPhono(page: Page) {
//   return page.locator(`script[src="https://mc.yandex.ru/metrika/tag_phono.js"]`);
// }

async function checkNoConsentState(page: Page) {
  await expect(await getCookies(page))
    .toEqual([]);

  const metricTagBeforeAcceptCookies = await getYandexMetricTag(page);

  await expect(metricTagBeforeAcceptCookies)
    .toHaveCount(0);

  // const metricTagPhonoBeforeAcceptCookies = await getYandexMetricTagPhono(page);

  // await expect(metricTagPhonoBeforeAcceptCookies)
  //   .toHaveCount(0);

  const consentIdBeforeReject = await getConsentIdFromLocalStorage(page);

  await expect(consentIdBeforeReject)
    .toBeNull();
}
