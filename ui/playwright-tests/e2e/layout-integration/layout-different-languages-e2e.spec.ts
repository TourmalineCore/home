import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";
import { cleanupLayoutApi, updateLayoutApi } from "./layout-api-helpers";

const EMAIL_ADDRESS = `test@tourmalinecore.com`;

const BUTTON_LABEL_EN = `Discuss the project`;
const FOOTER_NAVIGATION_CAPTION_EN = `Navigation`;

const BUTTON_LABEL_RU = `Обсудить проект`;
const FOOTER_NAVIGATION_CAPTION_RU = `Навигация`;

test.describe(`Creating layout in different languages`, layoutDifferentLanguagesTest);

function layoutDifferentLanguagesTest() {
  test.beforeEach(async () => {
    await cleanupLayoutApi();

    await cleanupLayoutApi({
      locale: `ru`,
    });

    await updateLayoutApi({
      buttonLabel: BUTTON_LABEL_EN,
      navigationListCaption: FOOTER_NAVIGATION_CAPTION_EN,
      emailAddress: EMAIL_ADDRESS,
    });

    await updateLayoutApi({
      buttonLabel: BUTTON_LABEL_RU,
      navigationListCaption: FOOTER_NAVIGATION_CAPTION_RU,
      emailAddress: EMAIL_ADDRESS,
      locale: `ru`,
    });
  });

  test.afterEach(async () => {
    await cleanupLayoutApi();

    await cleanupLayoutApi({
      locale: `ru`,
    });
  });

  test(
    `
    GIVEN layout content filled in multiple languages via API
    WHEN viewing the website in default language
    THEN content should display in English
    AND WHEN switching to Russian language
    THEN content should display correct Russian translations
    `,
    async ({
      goto,
      page,
    }: {
      goto: CustomTestFixtures['goto'];
      page: Page;
    }) => {
      await goto();

      await expect(page.getByText(BUTTON_LABEL_EN))
        .toBeVisible();

      await expect(page.getByText(FOOTER_NAVIGATION_CAPTION_EN))
        .toBeVisible();

      await page.getByTestId(`lang-switch`)
        .hover();

      await page.getByText(`RU`)
        .click();

      await page.waitForLoadState(`networkidle`);

      await expect(page.getByText(BUTTON_LABEL_RU))
        .toBeVisible();

      await expect(page.getByText(FOOTER_NAVIGATION_CAPTION_RU))
        .toBeVisible();
    },
  );
}
