import z from "zod";
import { ApiTestFixtures, expect, test } from "../../api-test-fixtures";
import { cleanupCookieConsent, COOKIE_CONSENTS_ENDPOINT, createCookieConsent, getCookieConsentData } from "./cookie-consent-collection-api";

const CookieConsentSchema = z.array(
  z.object({
    consentId: z.string(),
    consentVersion: z.string(),
    categories: z.record(z.string(), z.boolean())
  }));

test.describe(`Cookie consent response tests`, () => {
  test.beforeEach(async ({
    apiRequest 
  }) => {
    await cleanupCookieConsent({
      apiRequest 
    });

    await createCookieConsent({
      apiRequest 
    });
  });

  test.afterEach(async ({
    apiRequest 
  }) => {
    await cleanupCookieConsent({
      apiRequest 
    });
  });

  test(`
      GIVEN an empty cookie consent collection
      WHEN call method POST ${COOKIE_CONSENTS_ENDPOINT}
      AND call method GET ${COOKIE_CONSENTS_ENDPOINT}
      SHOULD get a correct response
      `,
  checkCookieConsentResponseTest
  );
});

async function checkCookieConsentResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const cookieConsent = await getCookieConsentData({
    apiRequest
  });
  
  await expect(() => {
    CookieConsentSchema.parse(cookieConsent)
  }, `Cookie consent response is correct`)
    .not
    .toThrow()
}