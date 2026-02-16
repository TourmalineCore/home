import qs from "qs";
import {
  Page,
  HomepageResponse,
  SharedSeoComponent,
  Seo,
  NavigationListResponse,
} from "../../../../common/types";
import { cmsFetch } from "../http-client";
import { mapBlockResponseByType } from "../../utils/mapBlockResponseByType";
import { AppRoute } from "../../../../common/enums";
import { BlockApi } from "../../../../common/types/blocks/api-block";

export async function getPageData({
  locale,
  status,
  slug,
}: {
  locale: string;
  status?: 'draft' | 'published';
  slug: string;
}): Promise<Page | null> {
  const generalQueryParams = {
    populate: `all`,
    locale: locale === `zh`
      ? `en`
      : locale,
    status,
  };

  if (slug === AppRoute.Main) {
    const homepageResponse = await cmsFetch<HomepageResponse>(`/homepage?${qs.stringify(generalQueryParams)}`);

    return mapPageResponse(homepageResponse);
  }

  const navigationQueryParams = {
    ...generalQueryParams,
    filters: {
      $or: [
        {
          link: {
            $eq: slug,
          },
        },
        {
          link: {
            $eq: `/${slug}`,
          },
        },
      ],
    },
  };

  const pageResponse = await cmsFetch<NavigationListResponse>(`/navigations?${qs.stringify(navigationQueryParams)}`);

  const pageData = pageResponse?.data?.[0];

  if (!pageData) {
    return null;
  }

  return mapPageResponse({
    data: pageResponse.data![0],
  } as PageResponse);
}

type PageResponse = HomepageResponse | null | {
  data?: {
    blocks: BlockApi[];
    seo: SharedSeoComponent;
  };
};

function mapPageResponse(response: PageResponse): Page {
  if (!response?.data) {
    return {
      blocks: [],
      seo: {
        metaTitle: ``,
        metaDescription: ``,
        metaKeywords: ``,
      },
    };
  }

  const {
    data,
  } = response;
  const {
    seo, blocks,
  } = data;

  const mappedBlocks = blocks.map((block) => mapBlockResponseByType(block));

  return {
    blocks: mappedBlocks.filter((mappedBlock) => mappedBlock !== null),
    seo: mapSeoResponse(seo),
  };
}

function mapSeoResponse(seo: SharedSeoComponent): Seo {
  if (!seo) {
    return {
      metaTitle: ``,
      metaDescription: ``,
      metaKeywords: ``,
    };
  }

  return {
    metaTitle: seo.metaTitle!,
    metaDescription: seo.metaDescription!,
    metaKeywords: seo.keywords,
  };
}
