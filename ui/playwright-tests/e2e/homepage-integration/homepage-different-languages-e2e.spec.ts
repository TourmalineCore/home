import { E2E_UI_NAME_PREFIX } from "../../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";
import { cleanupHomepageApi, updateHomepageApi } from "./homepage-api-helpers";

const HERO_TITLE_EN = `${E2E_UI_NAME_PREFIX} Tourmaline Core Tech Company`;
const HERO_DESCRIPTION_EN = `${E2E_UI_NAME_PREFIX} Launching MVP, working on R&D projects, complex enterprise services, and websites.`;
const HERO_TITLE_RU = `${E2E_UI_NAME_PREFIX} IT-компания Tourmaline Core`;
const HERO_DESCRIPTION_RU = `${E2E_UI_NAME_PREFIX} Запускаем MVP, делаем R&D проекты, сложные корпоративные сервисы и сайты.`;

const META_TITLE = `Homepage`;
const META_DESCRIPTION = `Development of public websites, customized enterprise information systems, and applications`;
const META_KEYWORDS = `public websites, enterprise information systems, software development`;

test.describe(`Creating homepage in different languages`, homepageDifferentLanguagesTest);

function homepageDifferentLanguagesTest() {
  test.beforeEach(async () => {
    await cleanupHomepageApi();

    await cleanupHomepageApi({
      locale: `ru`,
    });

    await updateHomepageApi({
      title: HERO_TITLE_EN,
      description: HERO_DESCRIPTION_EN,
      metaTitle: META_TITLE,
      metaDescription: META_DESCRIPTION,
      keywords: META_KEYWORDS,
    });

    await updateHomepageApi({
      title: HERO_TITLE_RU,
      description: HERO_DESCRIPTION_RU,
      metaTitle: META_TITLE,
      metaDescription: META_DESCRIPTION,
      keywords: META_KEYWORDS,
      locale: `ru`,
    });
  });

  test.afterEach(async () => {
    await cleanupHomepageApi();

    await cleanupHomepageApi({
      locale: `ru`,
    });
  });

  test(
    `
    GIVEN homepage content filled in multiple languages via API
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

      await expect(page.getByText(HERO_TITLE_EN))
        .toBeVisible();

      await expect(page.getByText(HERO_DESCRIPTION_EN))
        .toBeVisible();

      await page.getByTestId(`lang-switch`)
        .hover();

      await page.getByText(`RU`)
        .click();

      await page.waitForLoadState(`networkidle`);

      await expect(page.getByText(HERO_TITLE_RU))
        .toBeVisible();

      await expect(page.getByText(HERO_DESCRIPTION_RU))
        .toBeVisible();
    },
  );
}
