/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCode } from "../../enums";
import { ApiTestFixtures, expect } from "../../api-test-fixtures";
import { API_SMOKE_NAME_PREFIX } from "../../constants";

export const MAGAZINE_SUBSCRIPTIONS_ENDPOINT = `/api/magazine-subscriptions`;

export async function createMagazineSubscription({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(MAGAZINE_SUBSCRIPTIONS_ENDPOINT, {
      method: `post`,
      data: {
        data: {
          telegram: `${API_SMOKE_NAME_PREFIX} testTelegram`,
          email: `testApi@test.com`,
        },
      }
    });

    await expect(response.status(), `Magazine subscription should be updated with status 200`)
      .toEqual(HttpStatusCode.Created);
  } catch (error: any) {
    throw new Error(`Failed to update test magazine subscription: ${error.message}`)
  }
}


export async function cleanupMagazineSubscription({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const magazineSubscriptions = await getMagazineSubscriptionData({
      apiRequest
    });
    
    const magazineSubscriptionsToDelete = magazineSubscriptions
      ?.filter(( magazineSubscription: { telegram: string }) => magazineSubscription.telegram.startsWith(API_SMOKE_NAME_PREFIX));

    magazineSubscriptionsToDelete?.forEach(async ( magazineSubscription: { documentId: string }) => {
      const response = await apiRequest(`${MAGAZINE_SUBSCRIPTIONS_ENDPOINT}/${ magazineSubscription.documentId}`, {
        method: `delete`,
      });

      await expect(response.status(), `Magazine subscription should be deleted with status 204`)
        .toEqual(204);
    });
  } catch (error: any) {
    throw new Error(`Failed to delete test magazine subscription: ${error.message}`)
  }
}

export async function getMagazineSubscriptionData({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const response = await apiRequest(`${MAGAZINE_SUBSCRIPTIONS_ENDPOINT}?populate=all`);
  const responseData = await response.json();

  return responseData.data;
}
