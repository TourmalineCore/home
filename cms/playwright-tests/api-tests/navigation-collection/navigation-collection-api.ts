import { HttpStatusCode } from "../../enums";
import { ApiTestFixtures, expect } from "../../api-test-fixtures";
import { getFileIdByName } from "../../helpers";
import { getNavigationMock, NAVIGATION_NAME } from "./navigation-mocks";

export const NAVIGATION_ENDPOINT = `/api/navigations`;

export async function createNavigationApi({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const imageId = await getFileIdByName({
      apiRequest
    });
      
    const response = await apiRequest(NAVIGATION_ENDPOINT, {
      method: `post`,
      data: {
        data: getNavigationMock({
          imageId
        })
      }
    });

    await expect(response.status(), `Navigation should be created with status 201`)
      .toEqual(HttpStatusCode.Created);

    const responseData =  await response.json();

    return responseData.data.id;
  } catch (error) {
    throw new Error(`Failed to create test navigation: ${error.message}`)
  }
}

export async function cleanupNavigationApi({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const navigationList = await getNavigationData({
      apiRequest
    });

    const navigation = navigationList.find((navigation) => navigation.name === NAVIGATION_NAME);

    if (navigation) {
      const response = await apiRequest(`${NAVIGATION_ENDPOINT}/${navigation.documentId}`, {
        method: `delete`
      });

      await expect(response.status(), `Navigation should be deleted with status 204`)
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
    throw new Error(`Failed to delete test navigation: ${error.message}`)
  }
}

export async function getNavigationData({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const response = await apiRequest(`${NAVIGATION_ENDPOINT}?populate=all`);
  const responseData = await response.json();

  return responseData.data;
}