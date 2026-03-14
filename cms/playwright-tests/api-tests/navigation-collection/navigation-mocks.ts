import { getHeroMock } from "../../block-mocks";
import { API_SMOKE_NAME_PREFIX } from "../../constants";

export const NAVIGATION_NAME = `${API_SMOKE_NAME_PREFIX} Services`;

export function getNavigationMock({ 
  imageId
}: {
  imageId: number;
}) {
  return {
    name: NAVIGATION_NAME,
    link: `/services`,
    blocks: [
      getHeroMock({
        imageId
      }),
    ],
    seo: {
      metaTitle: `metaTitle`,
      metaDescription: `metaDescription`
    }
  }
}
