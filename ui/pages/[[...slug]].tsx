import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { PageHead } from '../components/PageHead/PageHead';
import { LayoutRedesign } from '../components/redesign/LayoutRedesign/LayoutRedesign';
import { BlockRenderer } from '../components/BlockRenderer/BlockRenderer';
import { AppRoute, BlockType } from '../common/enums';
import { loadTranslations } from '../common/utils';
import { Block, LayoutData, Seo } from '../common/types';
import { getLayoutData } from '../services/cms/api/layout-api/layout-api';
import { getPageData } from '../services/cms/api/pages-api/pages-api';
import { useScrollTop } from '../common/hooks/useScrollTop';

type PageData = {
  seo: Seo;
  blocks: Block[];
};

export default function UniversalPage({
  layoutData,
  pageData,
  isPreview,
}: {
  layoutData: LayoutData;
  pageData: PageData;
  isPreview: boolean;
}) {
  const {
    asPath,
  } = useRouter();

  useScrollTop({
    dependencies: [asPath],
  });

  const {
    blocks,
    seo,
  } = pageData;

  return (
    <>
      <PageHead
        seoData={{
          seo: {
            title: seo?.metaTitle,
            description: seo?.metaDescription,
          },
          keywords: seo?.metaKeywords,
          metaTags: [],
          structuredData: ` `,
          additionalCode: ``,
        }}
      />

      <LayoutRedesign
        headerContent={layoutData.headerContent}
        footerContent={layoutData.footerContent}
        isPreview={isPreview}
      >
        {blocks.map((block: Block) => (
          <BlockRenderer
            key={block.id}
            block={block}
          />
        ))}
      </LayoutRedesign>
    </>
  );
}

export async function getServerSideProps({
  locale,
  query,
  preview = false,
}: {
  locale: string;
  query: {
    slug: string;
  };
  preview: boolean;
}) {
  if (process.env.IS_STATIC_MODE === `true`) {
    const translationsPageData = await loadTranslations(locale, [
      `common`,
      `hero`,
      `featuredCardsList`,
      `showcaseGridFirstSection`,
      `showcaseGridSecondSection`,
      `showcaseGridThirdSection`,
      `showcaseGridFourthSection`,
      `showcaseGridFifthSection`,
      `threeColumnGrid`,
      `collageWithTitle`,
      `collageWithLink`,
      `conferenceSignposts`,
      `articleSignposts`,
      `singleImage`,
      `formBlockRedesign`,
      `headerRedesign`,
      `footerRedesign`,
    ]);

    const mapStaticBlocksWithId = (blocks: Block[]) => blocks.map((block) => ({
      id: crypto.randomUUID(),
      ...block,
    }));

    const blocks = mapStaticBlocksWithId([
      {
        __component: BlockType.SHARED_HERO,
        ...translationsPageData.hero,
      },
      {
        __component: BlockType.SHARED_FEATURED_CARDS_LIST,
        ...translationsPageData.featuredCardsList,
      },
      {
        __component: BlockType.SHARED_SHOWCASE_GRID,
        ...translationsPageData.showcaseGridFirstSection,
      },
      {
        __component: BlockType.SHARED_SHOWCASE_GRID,
        ...translationsPageData.showcaseGridSecondSection,
      },
      {
        __component: BlockType.SHARED_SHOWCASE_GRID,
        ...translationsPageData.showcaseGridThirdSection,
      },
      {
        __component: BlockType.SHARED_SHOWCASE_GRID,
        ...translationsPageData.showcaseGridFourthSection,
      },
      {
        __component: BlockType.SHARED_SHOWCASE_GRID,
        ...translationsPageData.showcaseGridFifthSection,
      },
      {
        __component: BlockType.SHARED_FORM_BLOCK,
      },
      {
        __component: BlockType.SHARED_COLLAGE_WITH_TITLE,
        ...translationsPageData.collageWithTitle,
      },
      {
        __component: BlockType.SHARED_SIGNPOST_MULTIPLE,
        ...translationsPageData.conferenceSignposts,
      },
      {
        __component: BlockType.SHARED_SINGLE_IMAGE,
        ...translationsPageData.singleImage,
      },
      {
        __component: BlockType.SHARED_SIGNPOST_MULTIPLE,
        ...translationsPageData.articleSignposts,
      },
      {
        __component: BlockType.SHARED_THREE_COLUMN_GRID,
        ...translationsPageData.threeColumnGrid,
      },
      {
        __component: BlockType.SHARED_COLLAGE_WITH_LINK,
        ...translationsPageData.collageWithLink,
      },
    ]);

    return {
      props: {
        layoutData: {
          headerContent: translationsPageData.headerRedesign,
          footerContent: translationsPageData.footerRedesign,
        },
        pageData: {
          blocks,
          seo: {
            metaTitle: translationsPageData.common.metaTitle,
            metaDescription: translationsPageData.common.metaDescription,
            metaKeywords: translationsPageData.common.metaKeywords,
          },
        },
        ...(await getStaticTranslation({
          locale,
        })),
      },
    };
  }

  const status = preview ? `draft` : `published`;

  const layoutData = await getLayoutData({
    locale,
    status,
  });

  const pageData = await getPageData({
    locale,
    status,
    slug: Array.isArray(query.slug) ? query.slug[0] : AppRoute.Main,
  });

  if (!pageData) {
    return {
      notFound: true,
    };
  }
  const {
    seo,
    blocks,
  } = pageData;

  return {
    props: {
      layoutData,
      isPreview: preview,
      pageData: {
        blocks,
        seo,
      },
      ...(await getStaticTranslation({
        locale,
      })),
    },
  };
}

async function getStaticTranslation({
  locale,
}: {
  locale: string;
}) {
  return serverSideTranslations(locale, [
    `common`,
    `cookie`,
    `formBlockRedesign`,
  ]);
}
