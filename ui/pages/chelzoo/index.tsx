import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { PageHead } from '../../components/PageHead/PageHead';
import { useScrollTop } from '../../common/hooks/useScrollTop';
import { Block, LayoutData } from '../../common/types';
import { getLayoutData } from '../../services/cms/api/layout-api/layout-api';
import { loadTranslations } from '../../common/utils';
import { LayoutRedesign } from '../../components/redesign/LayoutRedesign/LayoutRedesign';
import { ChelzooHero } from './components/ChelzooHero/ChelzooHero';
import { BlockType } from '../../common/enums';

export default function ChelzooPage({
  layoutData,
  isPreview,
}: {
  layoutData: LayoutData;
  isPreview: boolean;
}) {
  const {
    t,
  } = useTranslation(`common`);

  useScrollTop({
    dependencies: [],
  });

  return (
    <>
      <PageHead
        seoData={{
          seo: {
            title: t(`metaTitle`),
            description: t(`metaDescription`),
          },
          keywords: t(`metaKeywords`),
          metaTags: [],
          structuredData: ``,
          additionalCode: ``,
        }}
      />
      <LayoutRedesign
        mainClassName="chelzoo"
        headerContent={layoutData.headerContent}
        footerContent={layoutData.footerContent}
        isPreview={isPreview}
      >
        <div className="chelzoo__container">
          <ChelzooHero />

        </div>
      </LayoutRedesign>
    </>
  );
}

export async function getServerSideProps({
  locale,
  preview = false,
}: {
  locale: string;
  preview: boolean;
}) {
  if (process.env.IS_STATIC_MODE === `true`) {
    const translationsPageData = await loadTranslations(locale, [
      `common`,
      `headerRedesign`,
      `footerRedesign`,
      `chelzooHero`,
    ]);

    const mapStaticBlocksWithId = (blocks: Block[]) => blocks.map((block) => ({
      id: crypto.randomUUID(),
      ...block,
    }));

    const blocks = mapStaticBlocksWithId([
      {
        __component: BlockType.CHELZOO_HERO,
        ...translationsPageData.chelzooHero,
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

  return {
    props: {
      layoutData,
      isPreview: preview,
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
    `chelzooHero`,
  ]);
}
