import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '../../components/Layout/Layout';
import { PageHead } from '../../components/PageHead/PageHead';
import Article from '../../features/Articles/components/Article/Article';

import { fetchArticle } from '../../features/Articles/fetchHelpers/fetchArticle';
import { fetchMetadata } from '../../features/Articles/fetchHelpers/fetchMetadata';
import { fetchArticlesListWithMeta } from '../../features/Articles/fetchHelpers/fetchArticlesListWithMeta';
import { getArticleUrl } from '../../features/Articles/utils/getArticleUrl';
import { LayoutData } from '../../common/types';
import { getLayoutData } from '../../services/cms/api/layout-api/layout-api';
import { loadTranslations } from '../../common/utils';

export default function ArticlesPage({
  articleContent,
  metadata,
  articleUrl,
  layoutData,
}: {
  articleContent: string;
  metadata: {
    title: string;
    description: string;
    keywords: string;
    datePublication: string;
  };
  articleUrl: string;
  layoutData: {
    headerContent: LayoutData['headerContent'];
  };
}) {
  return (
    <>
      <PageHead
        seoData={{
          seo: {
            title: metadata.title,
            description: metadata.description,
          },
          keywords: metadata.keywords || ``,
          metaTags: [],
          structuredData: ``,
          additionalCode: ``,
        }}
      />

      <Layout headerContent={layoutData.headerContent}>
        <Article
          markdown={articleContent}
          articleUrl={articleUrl}
          datePublication={metadata.datePublication}
        />
      </Layout>
    </>
  );
}

export async function getServerSideProps({
  params,
  locale,
  preview = false,
}: {
  params: {
    article: string;
  };
  locale: string;
  preview: boolean;
}) {
  const {
    articleContent,
    articleUrl,
    metadata,
  } = await getArticleData({
    article: params.article,
    locale,
  });

  if (process.env.IS_STATIC_MODE === `true`) {
    const translationsPageData = await loadTranslations(locale, [`headerRedesign`]);

    return {
      props: {
        layoutData: {
          headerContent: translationsPageData.headerRedesign,
        },
        articleContent,
        metadata,
        articleUrl,
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
      articleContent,
      metadata,
      articleUrl,
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
    `footer`,
    `articles`,
    `cookie`,
  ]);
}

async function getArticleData({
  article,
  locale,
}: {
  article: string;
  locale: string;
}) {
  const articles = await fetchArticlesListWithMeta();

  const currentArticleFolder = articles.find((articleItem) => articleItem.metadata.slug === article);

  if (!currentArticleFolder) {
    return {
      articleContent: {},
      metadata: {},
      articleUrl: ``,
    };
  }

  const articleContent = await fetchArticle(`${currentArticleFolder.name}.md`, locale);
  const metadata = await fetchMetadata(`${currentArticleFolder.name}.md`, locale);
  const articleUrl = getArticleUrl(currentArticleFolder.name, locale);

  return {
    articleContent,
    articleUrl,
    metadata,
  };
}
