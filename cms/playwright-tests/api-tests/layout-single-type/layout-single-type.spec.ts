import { LayoutSchema } from "./layout-single-type-schema";
import { cleanupLayoutSingleTypeApi, LAYOUT_ENDPOINT, updateLayoutSingleTypeApi } from "./layout-single-type-api";
import { ApiTestFixtures, expect, test } from "../../api-test-fixtures";
import { cleanupSocialNetworkApi } from "../social-networks-collection/social-networks-collection-api";
import { cleanupNavigationApi } from "../navigation-collection/navigation-collection-api";

test.describe(`Layout single type response tests`, () => {
  test.beforeEach(async ({
    apiRequest 
  }) => {
    await cleanupLayoutSingleTypeApi({
      apiRequest 
    });

    await cleanupSocialNetworkApi({
      apiRequest
    })

    await cleanupNavigationApi({
      apiRequest
    })
    
    await updateLayoutSingleTypeApi({
      apiRequest 
    });
  });

  test.afterEach(async ({
    apiRequest 
  }) => {
    await cleanupLayoutSingleTypeApi({
      apiRequest 
    });

    await cleanupNavigationApi({
      apiRequest
    })

    await cleanupSocialNetworkApi({
      apiRequest
    })
  });

  test(`
      GIVEN an empty layout single type
      WHEN call method PUT ${LAYOUT_ENDPOINT}
      AND call method GET ${LAYOUT_ENDPOINT}
      SHOULD get a correct response
      `,
  checkLayoutSingleTypeResponseTest
  );
});

async function checkLayoutSingleTypeResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {  
  const layoutResponse = await apiRequest(`${LAYOUT_ENDPOINT}?populate=all`);
  const layoutData = await layoutResponse.json();
  
  await expect(() => {
    LayoutSchema.parse(layoutData.data)
  }, `Layout response is correct`)
    .not
    .toThrow()
}