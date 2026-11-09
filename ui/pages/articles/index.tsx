import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import { Layout } from '../../components/Layout/Layout';
import { PageHead } from '../../components/PageHead/PageHead';
import Articles from '../../features/Articles/components/Articles/Articles';

import { fetchArticlesListWithMeta } from '../../features/Articles/fetchHelpers/fetchArticlesListWithMeta';
import { LayoutData } from '../../common/types';
import { getLayoutData } from '../../services/cms/api/layout-api/layout-api';
import { loadTranslations } from '../../common/utils';
import { getCookiePageProps } from '../../common/utils/getCookiePageProps';

export default function ArticlesPage({
  layoutData,
  articles,
}: {
  layoutData: {
    headerContent: LayoutData['headerContent'];
  };
  articles: string;
}) {
  const {
    t,
  } = useTranslation(`articles`);

  return (
    <>
      <PageHead
        seoData={{
          seo: {
            title: t(`title`),
            description: t(`description`),
          },
          keywords: t(`keywords`),
          metaTags: [],
          structuredData: ``,
          additionalCode: ``,
        }}
      />

      <Layout headerContent={layoutData.headerContent}>
        <Articles articles={articles} />
      </Layout>
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
  const {
    cookieData,
    cookieSettingsData,
  } = await getCookiePageProps({
    locale,
    preview,
  });
  const articlesWithMeta = await fetchArticlesListWithMeta();

  if (process.env.IS_STATIC_MODE === `true`) {
    const translationsPageData = await loadTranslations(locale, [`headerRedesign`]);

    return {
      props: {
        cookieData,
        cookieSettingsData,
        layoutData: {
          headerContent: translationsPageData.headerRedesign,
        },
        articles: articlesWithMeta,
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
      cookieData,
      cookieSettingsData,
      layoutData,
      articles: articlesWithMeta,
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
    `articles`,
    `footer`,
    `formBlockRedesign`,
  ]);
}
