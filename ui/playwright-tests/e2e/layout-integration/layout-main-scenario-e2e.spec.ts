
import { Breakpoint } from "../../../common/enums";
import { NavigationListResponse } from "../../../common/types";
import { cmsFetch } from "../../../services/cms/api/http-client";
import { createCmsActions } from "../../create-cms-actions";
import { E2E_UI_NAME_PREFIX } from "../../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";
import { cleanupLayoutApi } from "./layout-api-helpers";

const EMAIL_CAPTION = `If you have any questions`;
const EMAIL_ADDRESS = `test@tourmalinecore.com`;
const BUTTON_LABEL = `Discuss the project`;
const FOOTER_NAVIGATION_CAPTION = `Navigation`;

const HEADER_NAVIGATION = `${E2E_UI_NAME_PREFIX} Services`;
const NESTED_HEADER_NAVIGATION = `${E2E_UI_NAME_PREFIX} Frontend`;
const NESTED_HEADER_NAVIGATION_LINK = `/frontend`;

const NAVIGATION_ENDPOINT = `/navigations`;

test.describe(`Main scenario for filling layout`, layoutMainScenarioTest);

async function layoutMainScenarioTest() {
  test.beforeEach(async () => {
    await cleanupNavigation();

    await cleanupLayoutApi();
  });

  test.afterEach(async () => {
    await cleanupNavigation();

    await cleanupLayoutApi();
  });

  test(
    `
    GIVEN an empty layout with no navigation
    WHEN creating navigation and filling layout in CMS
    THEN the layout should display correctly on frontend for both desktop and mobile
    `,
    async ({
      goto,
      setViewportSize,
      page,
    }: {
      goto: CustomTestFixtures['goto'];
      setViewportSize: CustomTestFixtures['setViewportSize'];
      page: Page;
    }) => {
      const cms = createCmsActions(page);

      await page.goto(process.env.CMS_URL as string);

      await test.step(`Authorize in CMS`, cms.authorize);

      await test.step(`Setup CMS content`, setupCmsContent);

      await test.step(`Check layout content on ui`, checkLayoutOnUi);

      async function setupCmsContent() {
        await cms.navigateToContentManager();

        await cms.skipTutorial();

        await test.step(`Creating nested navigation`, createAndPublishNestedNavigationCmsUi);

        await test.step(`Filling layout content`, fillAndPublishLayoutCmsUi);

        async function createAndPublishNestedNavigationCmsUi() {
          await cms.navigateToContentTypeByName(`Navigation`);

          await cms.createNewEntry();

          await cms.fillInputByName({
            name: `name`,
            value: NESTED_HEADER_NAVIGATION,
          });

          await cms.fillInputByName({
            name: `link`,
            value: NESTED_HEADER_NAVIGATION_LINK,
          });

          await cms.publish();

          await cms.navigateToContentTypeByName(`Navigation`);

          await cms.createNewEntry();

          await cms.fillInputByName({
            name: `name`,
            value: HEADER_NAVIGATION,
          });

          await cms.checkCheckbox(`isMultiLevelNavigation`);

          await cms.focusInput(`navItems`);

          await cms.clickOnText(NESTED_HEADER_NAVIGATION);

          await cms.publish();
        }

        async function fillAndPublishLayoutCmsUi() {
          await cms.navigateToContentTypeByName(`Layout`);

          await cms.fillInputByName({
            name: `emailAddress`,
            value: EMAIL_ADDRESS,
          });

          await cms.fillInputByName({
            name: `header.buttonLabel`,
            value: BUTTON_LABEL,
          });

          await cms.fillInputByName({
            name: `header.emailCaption`,
            value: EMAIL_CAPTION,
          });

          await cms.focusInput(`header.navigationLists`);

          await cms.clickOnText(HEADER_NAVIGATION);

          await cms.clickOnText(`No entry yet. Click to add one.`);

          await cms.clickOnText(`No entry yet. Click to add one.`);

          await cms.fillInputByName({
            name: `footer.navigationLists.0.caption`,
            value: FOOTER_NAVIGATION_CAPTION,
          });

          await cms.fillInputByName({
            name: `footer.emailCaption`,
            value: EMAIL_CAPTION,
          });

          await cms.publish();
        }
      }

      async function checkLayoutOnUi() {
        await goto();

        await test.step(`Check desktop`, checkDesktop);

        await test.step(`Check mobile menu`, checkMobileMenu);

        async function checkDesktop() {
          await expect(page.getByText(HEADER_NAVIGATION))
            .toBeVisible();

          await page.getByText(HEADER_NAVIGATION)
            .hover();

          await expect(page.getByText(NESTED_HEADER_NAVIGATION))
            .toBeVisible();

          await expect(page.getByText(EMAIL_CAPTION))
            .toBeVisible();

          await expect(page.getByText(EMAIL_ADDRESS))
            .toBeVisible();

          await expect(page.getByText(BUTTON_LABEL))
            .toBeVisible();

          await expect(page.getByText(FOOTER_NAVIGATION_CAPTION))
            .toBeVisible();
        }

        async function checkMobileMenu() {
          await setViewportSize({
            width: Breakpoint.TABLET,
          });

          await page.getByTestId(`header-redesign-burger`)
            .click();

          const mobileMenu = await page.getByTestId(`mobile-menu-redesign`);

          await expect(mobileMenu)
            .toContainText(EMAIL_CAPTION);

          await expect(mobileMenu)
            .toContainText(EMAIL_ADDRESS);

          await expect(mobileMenu)
            .toContainText(BUTTON_LABEL);
        }
      }
    },
  );
}

async function cleanupNavigation({
  locale = `en`,
}: {
  locale?: 'ru' | 'en';
} = {}) {
  try {
    const navigationList = await cmsFetch<NavigationListResponse>(`${NAVIGATION_ENDPOINT}?populate=*&locale=${locale}`);

    const navigationToDelete = navigationList?.data?.filter((navigation) => navigation.name.startsWith(E2E_UI_NAME_PREFIX));

    navigationToDelete?.forEach(async (navigation) => {
      const response = await cmsFetch(`${NAVIGATION_ENDPOINT}/${navigation.documentId}?locale=${locale}`, {
        method: `DELETE`,
      });

      await expect(response.status, `Navigation should be deleted with status 204`)
        .toEqual(204);
    });
  } catch (error: any) {
    throw new Error(`Failed to delete test navigation: ${error.message}`);
  }
}
