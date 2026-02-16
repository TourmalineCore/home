import { createCmsActions } from "../../create-cms-actions";
import { E2E_UI_NAME_PREFIX } from "../../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";
import { cleanupHomepageApi } from "./homepage-api-helpers";

const HERO_TITLE = `${E2E_UI_NAME_PREFIX} Tourmaline Core Tech Company`;
const HERO_DESCRIPTION = `${E2E_UI_NAME_PREFIX} Launching MVP, working on R&D projects, complex enterprise services, and websites.`;

const META_TITLE = `Homepage`;
const META_DESCRIPTION = `Development of public websites, customized enterprise information systems, and applications`;
const META_KEYWORDS = `public websites, enterprise information systems, software development`;

test.describe(`Main scenario for filling homepage`, homepageMainScenarioTest);

function homepageMainScenarioTest() {
  test.beforeEach(async () => {
    await cleanupHomepageApi();
  });

  test.afterEach(async () => {
    await cleanupHomepageApi();
  });

  test(
    `
    GIVEN an empty homepage
    WHEN adding hero component and SEO metadata in CMS
    AND publishing it
    THEN homepage should display hero content and correct SEO tags on frontend
    `,
    async ({
      goto,
      page,
    }: {
      goto: CustomTestFixtures['goto'];
      page: Page;
    }) => {
      const cms = createCmsActions(page);

      await page.goto(process.env.CMS_URL as string);

      await test.step(`Authorize in CMS`, cms.authorize);

      await test.step(`Setup CMS content`, setupCmsContent);

      await test.step(`Check homepage content on ui`, checkHomepageOnUi);

      async function setupCmsContent() {
        await cms.navigateToContentManager();

        await cms.skipTutorial();

        await test.step(`Filling homepage content`, fillAndPublishHomepageCmsUi);

        async function fillAndPublishHomepageCmsUi() {
          await cms.navigateToContentTypeByName(`Homepage`);

          await cms.addComponentBlock();

          await test.step(`Filling hero block`, fillHeroBlocksCmsUi);

          async function fillHeroBlocksCmsUi() {
            await cms.clickOnText(`hero`);

            await cms.clickOnText(`hero`);

            await cms.fillInputByName({
              name: `blocks.0.title`,
              value: HERO_TITLE,
            });

            await cms.fillTextareaByName({
              name: `blocks.0.description`,
              value: HERO_DESCRIPTION,
            });

            await cms.fillInputByName({
              name: `seo.metaTitle`,
              value: META_TITLE,
            });

            await cms.fillInputByName({
              name: `seo.metaDescription`,
              value: META_DESCRIPTION,
            });

            await cms.fillTextareaByName({
              name: `seo.keywords`,
              value: META_KEYWORDS,
            });
          }

          await cms.publish();
        }
      }

      async function checkHomepageOnUi() {
        await goto();

        await expect(page.getByText(HERO_TITLE))
          .toBeVisible();

        await page.getByText(HERO_DESCRIPTION)
          .hover();

        await expect(page)
          .toHaveTitle(META_TITLE);

        await expect(page.locator(`meta[name="description"]`))
          .toHaveAttribute(`content`, META_DESCRIPTION);

        await expect(page.locator(`meta[name="keywords"]`))
          .toHaveAttribute(`content`, META_KEYWORDS);
      }
    },
  );
}
