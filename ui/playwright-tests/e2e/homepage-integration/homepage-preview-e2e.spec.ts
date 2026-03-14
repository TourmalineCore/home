import { E2E_UI_DRAFT_NAME_PREFIX } from "../../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";
import { cleanupHomepageApi, updateHomepageApi } from "./homepage-api-helpers";

const HERO_TITLE_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Tourmaline Core Tech Company`;
const HERO_DESCRIPTION_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Launching MVP, working on R&D projects, complex enterprise services, and websites.`;

const META_TITLE = `Homepage`;
const META_DESCRIPTION = `Development of public websites, customized enterprise information systems, and applications`;
const META_KEYWORDS = `public websites, enterprise information systems, software development`;

test.describe(`Check preview mode`, homepagePreviewTest);

function homepagePreviewTest() {
  test.beforeEach(async () => {
    await cleanupHomepageApi();

    await updateHomepageApi({
      title: HERO_TITLE_DRAFT,
      description: HERO_DESCRIPTION_DRAFT,
      metaTitle: META_TITLE,
      metaDescription: META_DESCRIPTION,
      keywords: META_KEYWORDS,
      status: `draft`,
    });
  });

  test.afterEach(async () => {
    await cleanupHomepageApi();
  });

  test(
    `
    GIVEN homepage content saved as draft via API
    WHEN viewing the public website
    THEN draft content should not be visible
    BUT WHEN viewing in preview mode
    THEN all draft content should be displayed
    `,
    async ({
      goto,
      gotoInPreviewMode,
      page,
    }: {
      goto: CustomTestFixtures['goto'];
      gotoInPreviewMode: CustomTestFixtures['gotoInPreviewMode'];
      page: Page;
    }) => {
      await goto();

      await expect(page.getByText(HERO_TITLE_DRAFT))
        .toBeHidden();

      await expect(page.getByText(HERO_DESCRIPTION_DRAFT))
        .toBeHidden();

      await gotoInPreviewMode();

      await expect(page.getByText(HERO_TITLE_DRAFT))
        .toBeVisible();

      await expect(page.getByText(HERO_DESCRIPTION_DRAFT))
        .toBeVisible();
    },
  );
}
