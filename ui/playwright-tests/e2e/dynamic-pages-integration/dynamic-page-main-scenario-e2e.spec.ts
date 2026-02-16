import { cmsFetch } from "../../../services/cms/api/http-client";
import { E2E_UI_NAME_PREFIX } from "../../constants/e2e-ui-name-prefix";
import { createCmsActions } from "../../create-cms-actions";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";

export const DYNAMIC_PAGE_NAME = `${E2E_UI_NAME_PREFIX} Frontend`;
const DYNAMIC_PAGE_LINK = `frontend-e2e-test`;

const HERO_TITLE = `${E2E_UI_NAME_PREFIX} Frontend page`;
const HERO_DESCRIPTION = `${E2E_UI_NAME_PREFIX} Launching MVP, working on R&D projects, complex enterprise services, and websites.`;

const META_TITLE = `Frontend`;
const META_DESCRIPTION = `Development of public websites, customized enterprise information systems, and applications`;
const META_KEYWORDS = `public websites, enterprise information systems, software development`;

const ENDPOINT = `/navigations`;

test.describe(`Main scenario for create dynamic page`, dynamicPageMainScenarioTest);

function dynamicPageMainScenarioTest() {
  test.beforeEach(async () => {
    await cleanupDynamicPageApi();
  });

  test.afterEach(async () => {
    await cleanupDynamicPageApi();
  });

  test(
    `GIVEN an empty homepage
       WHEN filling and publishing homepage in CMS UI
       SHOULD see filled homepage on frontend UI 
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

      await test.step(`Check dynamic page on ui`, checkDynamicPageOnUi);

      async function setupCmsContent() {
        await cms.navigateToContentManager();

        await cms.skipTutorial();

        await test.step(`Create dynamic page`, createAndPublishDynamicPageCmsUi);

        async function createAndPublishDynamicPageCmsUi() {
          await cms.navigateToContentTypeByName(`Navigation`);

          await cms.createNewEntry();

          await test.step(`Filling dynamic page`, fillDynamicPageCmsUi);

          async function fillDynamicPageCmsUi() {
            await cms.fillInputByName({
              name: `name`,
              value: DYNAMIC_PAGE_NAME,
            });

            await cms.fillInputByName({
              name: `link`,
              value: DYNAMIC_PAGE_LINK,
            });

            await cms.addComponentBlock();

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

            await cms.clickOnText(`No entry yet. Click to add one.`);

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

      async function checkDynamicPageOnUi() {
        await goto(DYNAMIC_PAGE_LINK);

        await expect(page.getByText(DYNAMIC_PAGE_NAME))
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

export async function cleanupDynamicPageApi() {
  try {
    const dynamicPages = await cmsFetch(`${ENDPOINT}?populate=all`);

    const dynamicPage = dynamicPages.data.find((navigationItem: any) => navigationItem.name === DYNAMIC_PAGE_NAME);

    if (dynamicPage) {
      const response = await cmsFetch(`${ENDPOINT}/${dynamicPage.documentId}`, {
        method: `DELETE`,
      });

      await expect(response.status, `Dynamic page should be deleted with status 204`)
        .toEqual(204);
    }
  } catch (error: any) {
    throw new Error(`Failed to delete test dynamic page: ${error.message}`);
  }
}
