import {
  getCollageWithLinkMock,
  getCollageWithTitleMock,
  getFeaturedCardsListMock,
  getHeroMock,
  getShowcaseGridMock,
  getSignpostMultipleMock,
  getSingleImageMock,
  getThreeColumnGridMock
} from "../../block-mocks";


export function getHomeMock({ 
  imageId
}: {
  imageId: number;
}) {
  return {
    blocks: [
      getHeroMock({
        imageId
      }),
      getFeaturedCardsListMock({
        imageId
      }),
      getCollageWithTitleMock({
        imageId
      }),
      getCollageWithLinkMock({
        imageId
      }),
      getSignpostMultipleMock({
        imageId
      }),
      getSingleImageMock({
        imageId
      }),
      getThreeColumnGridMock({
        imageId
      }),
      getShowcaseGridMock({
        imageId
      })
    ],
    seo: {
      metaTitle: `metaTitle`,
      metaDescription: `metaDescription`
    }
  }
}
