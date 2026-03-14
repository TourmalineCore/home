import { expect } from "@playwright/test";
import { HttpStatusCode } from "../../enums";
import { ApiTestFixtures } from "../../api-test-fixtures";
import { createNavigationApi } from "../navigation-collection/navigation-collection-api";
import { createSocialNetworkApi } from "../social-networks-collection/social-networks-collection-api";

export const LAYOUT_ENDPOINT = `/api/layout`;

export async function updateLayoutSingleTypeApi({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const socialLinkId = await createSocialNetworkApi({
      apiRequest
    });

    const navigationId = await createNavigationApi({
      apiRequest
    });
    
    const response = await apiRequest(LAYOUT_ENDPOINT, {
      method: `put`,
      data: {
        data: {
          emailAddress: `emailAddress`,
          header: {
            buttonLabel: `buttonLabel`,
            emailCaption: `emailCaption`,
            navigationLists: [navigationId],
            socialLinks: [socialLinkId]
          },
          footer: {
            emailCaption: `emailCaption`,
            navigationLists: [
              {
                caption: `caption`,
                isSocialNetworks: false,
                links: [navigationId],
              },
              {
                caption: `caption 2`,
                isSocialNetworks: true,
                socialLinks: [socialLinkId]
              }
            ]
          }
        },
      }
    });

    await expect(response.status(), `Layout single type should be updated with status 200`)
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test layout single type: ${error.message}`)
  }
}

export async function cleanupLayoutSingleTypeApi({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(LAYOUT_ENDPOINT, {
      method: `delete`
    });

    await expect(response.status(), `Layout single type should be deleted with status 204`)
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test layout single type: ${error.message}`)
  }
}