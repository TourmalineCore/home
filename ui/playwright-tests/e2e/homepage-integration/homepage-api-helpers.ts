import { BlockType } from "../../../common/enums";
import { cmsFetch } from "../../../services/cms/api/http-client";
import { expect } from "../../custom-test";

const ENDPOINT = `/homepage`;

export async function updateHomepageApi({
  title,
  description,
  metaTitle,
  metaDescription,
  keywords,
  locale = `en`,
  status = `published`,
}: {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  locale?: 'ru' | 'en';
  status?: 'draft' | 'published';
}) {
  try {
    const response = await cmsFetch(`${ENDPOINT}?locale=${locale}&status=${status}`, {
      method: `PUT`,
      body: JSON.stringify({
        data: {
          blocks: [
            {
              __component: BlockType.SHARED_HERO,
              title,
              description,
            },
          ],
          seo: {
            metaTitle,
            metaDescription,
            keywords,
          },
        },
      }),
    });
    await expect(response.data, `Homepage should be updated`)
      .not.toBeNull();
  } catch (error: any) {
    throw new Error(`Failed to update homepage: ${error.message}`);
  }
}

export async function cleanupHomepageApi({
  locale = `en`,
}: {
  locale?: 'en' | 'ru';
} = {}) {
  try {
    const response = await cmsFetch(`${ENDPOINT}?locale=${locale}`, {
      method: `DELETE`,
    });

    await expect(response.status, `Homepage should be deleted with status 204`)
      .toEqual(204);
  } catch (error: any) {
    throw new Error(`Failed to delete homepage: ${error.message}`);
  }
}
