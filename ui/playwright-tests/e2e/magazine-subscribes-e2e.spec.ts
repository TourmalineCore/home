import { Browser } from "@playwright/test";
import { createCmsActions } from "../create-cms-actions";
import { expect, test } from "../custom-test";
import { AppRoute } from "../../common/enums";
import { cmsFetch } from "../../services/cms/api/http-client";
import { E2E_UI_NAME_PREFIX } from "../constants/e2e-ui-name-prefix";
import { MagazineSubscriptionListResponse } from "../../common/types";

const ENDPOINT = `/magazine-subscriptions`;

test.describe(`Magazine subscribes`, () => {
  test.describe(`Send magazine subscribe form`, sendMagazineSubscriptionForm);
});

async function sendMagazineSubscriptionForm() {
  test.beforeEach(async () => {
    await cleanupMagazineSubscription();
  });

  test.afterEach(async () => {
    await cleanupMagazineSubscription();
  });

  test(`
    GIVEN magazine subscription form
    WHEN user fills telegram and email
    AND click on the submit button
    THEN the data must be saved to the database and displayed in the CMS
    `, async ({
    browser,
  }: {
    browser: Browser;
  }) => {
    // In order for the form to be displayed, you need to set the Russian coordinates.
    const context = await browser.newContext({
      permissions: [`geolocation`],
      geolocation: {
        latitude: 61.5240,
        longitude: 105.3188,
      },
    });

    const page = await context.newPage();

    const telegram = `${E2E_UI_NAME_PREFIX}-testTelegram`;
    const email = `test@test.ru`;

    await page.goto(`${process.env.FRONTEND_URL}${AppRoute.Magazines}`, {
      waitUntil: `networkidle`,
    });

    await expect(page
      .getByTestId(`magazine-subscription-form`))
      .toBeVisible();

    await page
      .getByTestId(`magazine-subscription-form-telegram-input`)
      .fill(telegram);

    await page
      .getByTestId(`magazine-subscription-form-email-input`)
      .fill(email);

    await page.getByTestId(`form-redesign-consent-checkbox`)
      .filter({
        visible: true,
      })
      .check();

    await page
      .getByTestId(`form-redesign-submit-button`)
      .filter({
        visible: true,
      })
      .click();

    const cms = createCmsActions(page);

    await test.step(
      `Check magazine subscription in CMS`,
      () => page.goto(process.env.CMS_URL as string),
    );

    await cms.authorize();

    await cms.navigateToContentManager();

    await cms.skipTutorial();

    await cms.navigateToContentTypeByName(`Magazine subscription`);

    await expect(page.getByText(telegram))
      .toBeVisible();

    await expect(page.getByText(email))
      .toBeVisible();
  });
}

export async function cleanupMagazineSubscription() {
  try {
    const magazineSubscriptions = await cmsFetch<MagazineSubscriptionListResponse>(`${ENDPOINT}?populate=all`);

    const magazineSubscriptionsToDelete = magazineSubscriptions!.data!.filter(({
      telegram,
    }) => telegram!.startsWith(E2E_UI_NAME_PREFIX));

    magazineSubscriptionsToDelete.forEach(async (item) => {
      const response = await cmsFetch(`${ENDPOINT}/${item.documentId}?locale=en`, {
        method: `DELETE`,
      });

      await expect(response.status, `Magazine subscription should be deleted with status 204`)
        .toEqual(204);
    });
  } catch (error: any) {
    throw new Error(`Failed to delete test magazine subscription: ${error.message}`);
  }
}
