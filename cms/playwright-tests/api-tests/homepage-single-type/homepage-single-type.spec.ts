import { ApiTestFixtures, expect, test } from "../../api-test-fixtures";
import { PageSchema } from "../../block-schemas";
import { cleanupHomepageSingleTypeApi, updateHomepageSingleTypeApi, HOMEPAGE_ENDPOINT } from "./homepage-single-type-api";

test.describe(`Homepage single type response tests`, () => {
  test.beforeEach(async ({
    apiRequest 
  }) => {
    await cleanupHomepageSingleTypeApi({
      apiRequest 
    });

    await updateHomepageSingleTypeApi({
      apiRequest 
    });
  });

  test.afterEach(async ({
    apiRequest 
  }) => {
    await cleanupHomepageSingleTypeApi({
      apiRequest 
    });
  });

  test(`
      GIVEN an empty homepage single type
      WHEN call method PUT ${HOMEPAGE_ENDPOINT}
      AND call method GET ${HOMEPAGE_ENDPOINT}
      SHOULD get a correct response
      `,
  checkHomepageSingleTypeResponseTest
  );
});

async function checkHomepageSingleTypeResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const homepageResponse = await apiRequest(`${HOMEPAGE_ENDPOINT}?populate=all`);
  const homepageData = await homepageResponse.json();
  
  await expect(() => {
    PageSchema.parse(homepageData.data)
  }, `Homepage response is correct`)
    .not
    .toThrow()
}