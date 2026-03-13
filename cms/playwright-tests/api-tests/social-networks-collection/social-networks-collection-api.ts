import { HttpStatusCode } from "../../enums";
import { ApiTestFixtures, expect } from "../../api-test-fixtures";
import { API_SMOKE_NAME_PREFIX } from "../../constants";


const NAME = `${API_SMOKE_NAME_PREFIX} Social Network`;
const LINK = `/socialNetworkLink`;
export const SOCIAL_NETWORKS_ENDPOINT = `/api/social-networks`;

export async function createSocialNetworkApi({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(SOCIAL_NETWORKS_ENDPOINT, {
      method: `post`,
      data: {
        data: {
          name: NAME,
          link: LINK,
        }
      }
    });

    await expect(response.status(), `Social network should be created with status 201`)
      .toEqual(HttpStatusCode.Created);
    const responseData =  await response.json();

    return responseData.data.id;
  } catch (error) {
    throw new Error(`Failed to create test social network: ${error.message}`)
  }
}

export async function cleanupSocialNetworkApi({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const socialNetworks = await getSocialNetworksData({
      apiRequest
    });

    const socialNetwork = socialNetworks.find((socialNetwork) => socialNetwork.name === NAME);

    if (socialNetwork) {
      const response = await apiRequest(`${SOCIAL_NETWORKS_ENDPOINT}/${socialNetwork.documentId}`, {
        method: `delete`
      });

      await expect(response.status(), `Social network should be deleted with status 204`)
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
    throw new Error(`Failed to delete test social network: ${error.message}`)
  }
}

export async function getSocialNetworksData({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const response = await apiRequest(`${SOCIAL_NETWORKS_ENDPOINT}?populate=*`);
  const responseData = await response.json();

  return responseData.data;
}