import { E2E_UI_DRAFT_NAME_PREFIX } from "../../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";
import { cleanupLayoutApi, updateLayoutApi } from "./layout-api-helpers";

const EMAIL_ADDRESS = `test@tourmalinecore.com`;

const BUTTON_LABEL_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Discuss the project`;
const FOOTER_NAVIGATION_CAPTION_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Navigation`;

test.describe(`Check preview mode`, layoutPreviewTest);

function layoutPreviewTest() {
  test.beforeEach(async () => {
    await cleanupLayoutApi();

    await updateLayoutApi({
      buttonLabel: BUTTON_LABEL_DRAFT,
      navigationListCaption: FOOTER_NAVIGATION_CAPTION_DRAFT,
      emailAddress: EMAIL_ADDRESS,
      status: `draft`,
    });
  });

  test.afterEach(async () => {
    await cleanupLayoutApi();
  });

  test(
    `
    GIVEN layout content saved as draft via API
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

      await expect(page.getByText(BUTTON_LABEL_DRAFT))
        .toBeHidden();

      await expect(page.getByText(FOOTER_NAVIGATION_CAPTION_DRAFT))
        .toBeHidden();

      await gotoInPreviewMode();

      await expect(page.getByText(BUTTON_LABEL_DRAFT))
        .toBeVisible();

      await expect(page.getByText(FOOTER_NAVIGATION_CAPTION_DRAFT))
        .toBeVisible();
    },
  );
}
