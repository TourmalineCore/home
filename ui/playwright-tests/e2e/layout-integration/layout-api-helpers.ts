
import { cmsFetch } from "../../../services/cms/api/http-client";
import { expect } from "../../custom-test";

const LAYOUT_ENDPOINT = `/layout`;

export async function cleanupLayoutApi({
  locale = `en`,
}: {
  locale?: 'en' | 'ru';
} = {}) {
  try {
    const response = await cmsFetch(`${LAYOUT_ENDPOINT}?locale=${locale}`, {
      method: `DELETE`,
    });

    await expect(response.status, `Layout should be deleted with status 204`)
      .toEqual(204);
  } catch (error: any) {
    throw new Error(`Failed to delete test layout: ${error.message}`);
  }
}

export async function updateLayoutApi({
  buttonLabel,
  navigationListCaption,
  emailAddress,
  locale = `en`,
  status = `published`,
}: {
  buttonLabel: string;
  navigationListCaption: string;
  emailAddress: string;
  locale?: 'ru' | 'en';
  status?: 'draft' | 'published';
}) {
  try {
    const response = await cmsFetch(`${LAYOUT_ENDPOINT}?locale=${locale}&status=${status}`, {
      method: `PUT`,
      body: JSON.stringify({
        data: {
          emailAddress,
          header: {
            buttonLabel,
          },
          footer: {
            navigationLists: [
              {
                caption: navigationListCaption,
              },
            ],
          },
        },
      }),
    });
    await expect(response.data, `Layout should be updated`)
      .not.toBeNull();
  } catch (error: any) {
    throw new Error(`Failed to update layout: ${error.message}`);
  }
}
