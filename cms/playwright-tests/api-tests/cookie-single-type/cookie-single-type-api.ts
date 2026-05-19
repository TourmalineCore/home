/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpStatusCode } from "../../enums";
import { ApiTestFixtures, expect } from "../../api-test-fixtures";

export const COOKIE_ENDPOINT = `/api/cookie`;

export async function updateCookieSingleType({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(COOKIE_ENDPOINT, {
      method: `put`,
      data: {
        data: {
          bannerText: `Banner text`,
          analyticsText: `Analytics text`,
          webvisorText: `Webvisor text`,
          privacyText: `Privacy text`
        },
      }
    });

    await expect(response.status(), `Cookie single type should be updated with status 200`)
      .toEqual(HttpStatusCode.Ok);
  } catch (error: any) {
    throw new Error(`Failed to update test homepage single type: ${error.message}`)
  }
}

export async function cleanupCookieSingleType({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(COOKIE_ENDPOINT, {
      method: `delete`
    });
    
    await expect(response.status(), `Cookie single type should be deleted with status 204`)
      .toEqual(HttpStatusCode.NoContent);
  } catch (error: any) {
    throw new Error(`Failed to delete test cookie single type: ${error.message}`)
  }
}
