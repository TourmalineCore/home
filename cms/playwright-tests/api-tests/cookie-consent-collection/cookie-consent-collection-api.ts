/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCode } from "../../enums";
import { ApiTestFixtures, expect } from "../../api-test-fixtures";
import { API_SMOKE_NAME_PREFIX } from "../../constants";

export const COOKIE_CONSENTS_ENDPOINT = `/api/cookie-consents`;

export async function createCookieConsent({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(COOKIE_CONSENTS_ENDPOINT, {
      method: `post`,
      data: {
        data: {
          consentId: `${API_SMOKE_NAME_PREFIX} Consent Id`,
          consentVersion: `Analytics text`,
          categories: {
            analytics: false,
            webvisor: true
          },
        },
      }
    });

    await expect(response.status(), `Cookie consent should be updated with status 200`)
      .toEqual(HttpStatusCode.Created);
  } catch (error: any) {
    throw new Error(`Failed to update test cookie consent: ${error.message}`)
  }
}


export async function cleanupCookieConsent({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const cookieConsentList = await getCookieConsentData({
      apiRequest
    });

    const cookieConsentToDelete = cookieConsentList?.data
      ?.filter((cookieConsent: { consentId: string }) => cookieConsent.consentId.startsWith(API_SMOKE_NAME_PREFIX));

    cookieConsentToDelete?.forEach(async (cookieConsent: { documentId: string }) => {
      const response = await apiRequest(`${COOKIE_CONSENTS_ENDPOINT}/${cookieConsent.documentId}`, {
        method: `delete`,
      });

      await expect(response.status(), `Cookie consent should be deleted with status 204`)
        .toEqual(204);
    });
  } catch (error: any) {
    throw new Error(`Failed to delete test cookie consent: ${error.message}`)
  }
}

export async function getCookieConsentData({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const response = await apiRequest(`${COOKIE_CONSENTS_ENDPOINT}?populate=all`);
  const responseData = await response.json();

  return responseData.data;
}
