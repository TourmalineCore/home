import { COOKIE_ACCEPT, COOKIE_SETTINGS } from "../../common/constants/cookie";
import { cmsFetch } from "../../services/cms/api/http-client";
import { createCmsActions } from "../create-cms-actions";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../custom-test";

test.describe(`Cookie`, () => {
  test.describe(`Integration with CMS`, integrationWithCMSTest);
  test.describe(`Accept cookie test`, acceptCookieTest);
  test.describe(`Reject cookie test`, rejectCookieTest);
});

async function integrationWithCMSTest() {
  test.beforeEach(async () => {
    await cleanupCookieApi();
  });

  test.afterEach(async () => {
    await cleanupCookieApi();
  });

  test(`
    GIVEN an empty cookies data in CMS
    WHEN filling and publishing cookie in CMS UI
    SHOULD see filled cookie on frontend UI 
  `, async ({
    goto,
    page,
  }: {
    goto: CustomTestFixtures['goto'];
    page: Page;
  }) => {
    const bannerText = `Banner text`;
    const analyticsText = `Analytics text`;
    const webvisorText = `Webvisor text`;
    const privacyText = `Privacy text`;

    const cms = createCmsActions(page);

    await page.goto(process.env.CMS_URL as string);

    await test.step(`Authorize in CMS`, cms.authorize);

    await test.step(`Fill and publish cookie`, fillAndPublishCookie);

    await test.step(`Check cookie content on UI`, checkCookieOnUi);

    async function fillAndPublishCookie() {
      await cms.navigateToContentManager();

      await cms.skipTutorial();

      await cms.navigateToContentTypeByName(`Cookie`);

      const richTextEditor = page.locator(`.CodeMirror`)
        .first();
      await richTextEditor.click();
      await page.keyboard.type(bannerText);

      await cms.fillTextareaByName({
        name: `analyticsText`,
        value: analyticsText,
      });

      await cms.fillTextareaByName({
        name: `webvisorText`,
        value: webvisorText,
      });

      await cms.fillTextareaByName({
        name: `privacyText`,
        value: privacyText,
      });

      await cms.publish();
    }

    async function checkCookieOnUi() {
      await goto();

      await expect(page.getByText(bannerText))
        .toBeVisible();

      await page.getByTestId(`cookie-settings-button`)
        .click();

      await expect(page.getByText(analyticsText))
        .toBeVisible();

      await expect(page.getByText(webvisorText))
        .toBeVisible();

      await expect(page.getByText(privacyText))
        .toBeVisible();
    }
  });
}

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

    const metricTag = getYandexMetricTag(page);

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

    const metricTag = getYandexMetricTag(page);

    await expect(metricTag)
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

function getYandexMetricTag(page: Page) {
  return page.locator(`script[src="https://mc.yandex.ru/metrika/tag.js"]`);
}

async function checkNoConsentState(page: Page) {
  await expect(await page.context()
    .cookies())
    .toEqual([]);

  const metricTag = getYandexMetricTag(page);

  await expect(metricTag)
    .toHaveCount(0);
}

async function cleanupCookieApi() {
  try {
    const response = await cmsFetch(`/cookie?locale=en`, {
      method: `DELETE`,
    });

    await expect(response.status, `Cookie should be deleted with status 204`)
      .toEqual(204);
  } catch (error: any) {
    throw new Error(`Failed to delete cookie: ${error.message}`);
  }
}
