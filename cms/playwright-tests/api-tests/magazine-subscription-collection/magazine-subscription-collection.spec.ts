import z from "zod";
import { ApiTestFixtures, expect, test } from "../../api-test-fixtures";
import { cleanupMagazineSubscription, createMagazineSubscription, getMagazineSubscriptionData, MAGAZINE_SUBSCRIPTIONS_ENDPOINT } from "./magazine-subscription-collection-api";

const MagazineSubscriptionsSchema = z.array(
  z.object({
    telegram: z.string(),
    email: z.email(),
  }));

test.describe(`Magazine subscriptions response tests`, () => {
  test.beforeEach(async ({
    apiRequest 
  }) => {
    await cleanupMagazineSubscription({
      apiRequest 
    });

    await createMagazineSubscription({
      apiRequest 
    });
  });

  test.afterEach(async ({
    apiRequest 
  }) => {
    await cleanupMagazineSubscription({
      apiRequest 
    });
  });

  test(`
      GIVEN an empty magazine subscriptions collection
      WHEN call method POST ${MAGAZINE_SUBSCRIPTIONS_ENDPOINT}
      AND call method GET ${MAGAZINE_SUBSCRIPTIONS_ENDPOINT}
      SHOULD get a correct response
      `,
  checkMagazineSubscriptionsResponseTest
  );
});

async function checkMagazineSubscriptionsResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const cookieConsent = await getMagazineSubscriptionData({
    apiRequest
  });
  
  await expect(() => {
    MagazineSubscriptionsSchema.parse(cookieConsent)
  }, `Magazine subscriptions response is correct`)
    .not
    .toThrow()
}