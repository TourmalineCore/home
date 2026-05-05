import z from "zod";
import { ApiTestFixtures, expect, test } from "../../api-test-fixtures";
import { updateCookieSingleTypeApi, COOKIE_ENDPOINT, cleanupCookieSingleTypeApi } from "./cookie-single-type-api";

const CookieSchema = z.object({
  bannerText: z.string(),
  analyticsText: z.string(),
  webvisorText: z.string(),
  privacyText: z.string(),
})

test.describe(`Cookie single type response tests`, () => {
  test.beforeEach(async ({
    apiRequest 
  }) => {
    await cleanupCookieSingleTypeApi({
      apiRequest 
    });

    await updateCookieSingleTypeApi({
      apiRequest 
    });
  });

  test.afterEach(async ({
    apiRequest 
  }) => {
    await cleanupCookieSingleTypeApi({
      apiRequest 
    });
  });

  test(`
      GIVEN an empty cookie single type
      WHEN call method PUT ${COOKIE_ENDPOINT}
      AND call method GET ${COOKIE_ENDPOINT}
      SHOULD get a correct response
      `,
  checkCookieSingleTypeResponseTest
  );
});

async function checkCookieSingleTypeResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const cookieResponse = await apiRequest(`${COOKIE_ENDPOINT}?populate=all`);
  const cookieData = await cookieResponse.json();

  
  await expect(() => {
    CookieSchema.parse(cookieData.data)
  }, `Cookie response is correct`)
    .not
    .toThrow()
}