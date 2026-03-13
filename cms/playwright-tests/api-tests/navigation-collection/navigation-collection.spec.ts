import { ApiTestFixtures, expect, test } from "../../api-test-fixtures";
import { NavigationSchema } from "./navigation-collection-schema";
import { cleanupNavigationApi, createNavigationApi, getNavigationData, NAVIGATION_ENDPOINT } from "./navigation-collection-api";

test.describe(`Navigation response tests`, () => {
  test.beforeEach(async ({
    apiRequest
  }) => {
    await cleanupNavigationApi({
      apiRequest
    });

    await createNavigationApi({
      apiRequest
    });
  });

  test.afterEach(async ({
    apiRequest
  }) => {
    await cleanupNavigationApi({
      apiRequest
    });
  }); 

  test(`
      GIVEN an empty navigation collection
      WHEN call method POST ${NAVIGATION_ENDPOINT}
      AND call method GET ${NAVIGATION_ENDPOINT}
      SHOULD get a correct response
      `,
  checkNavigationResponseTest 
  );
})

async function checkNavigationResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const navigation = await getNavigationData({
    apiRequest
  });

  await expect(() => {
    NavigationSchema.parse(navigation)
  }, `Navigation response is correct`)
    .not
    .toThrow()
}