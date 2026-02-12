
import { HttpStatusCode } from "../../enums";
import { getFileIdByName } from "../../helpers";
import { ApiTestFixtures, expect } from "../../api-test-fixtures";
import { getHomeMock } from "./homepage-mocks";

export const HOMEPAGE_ENDPOINT = `/api/homepage`;

export async function updateHomepageSingleTypeApi({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const imageId = await getFileIdByName({
    apiRequest
  });

  try {
    const response = await apiRequest(HOMEPAGE_ENDPOINT, {
      method: `put`,
      data: {
        data: getHomeMock({
          imageId
        }),
      }
    });

    await expect(response.status(), `Homepage single type should be updated with status 200`)
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test homepage single type: ${error.message}`)
  }
}

export async function cleanupHomepageSingleTypeApi({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(HOMEPAGE_ENDPOINT, {
      method: `delete`
    });
    
    await expect(response.status(), `Homepage single type should be deleted with status 204`)
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test homepage single type: ${error.message}`)
  }
}
