import { ServerResponse } from 'http';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PageHead } from '../../components/PageHead/PageHead';
import { getLayoutData } from '../../services/cms/api/layout-api/layout-api';
import { loadTranslations } from '../../common/utils';
import { LayoutData } from '../../common/types';
import { LayoutRedesign } from '../../components/redesign/LayoutRedesign/LayoutRedesign';
import { ZooMapSurvey } from '../../components/zooMapSurvey/ZooMapSurvey/ZooMapSurvey';
import { ZOO_MAP_SURVEY_DESCRIPTION, ZOO_MAP_SURVEY_TITLE } from '../../components/zooMapSurvey/ZooMapSurvey/zooMapSurveyQuestions';
import { getCookiePageProps } from '../../common/utils/getCookiePageProps';

const ROBOTS_NO_INDEX = `noindex, nofollow`;

export default function ZooMapSurveyPage({
  layoutData,
  isPreview,
}: {
  layoutData: LayoutData;
  isPreview: boolean;
}) {
  return (
    <>
      <PageHead
        seoData={{
          seo: {
            title: `${ZOO_MAP_SURVEY_TITLE} | Tourmaline Core`,
            description: ZOO_MAP_SURVEY_DESCRIPTION,
          },
          keywords: ``,
          // The survey is temporary and is meant to be opened by a direct link only
          metaTags: [
            {
              name: `robots`,
              content: ROBOTS_NO_INDEX,
            },
          ],
          structuredData: ``,
          additionalCode: ``,
        }}
      />
      <LayoutRedesign
        headerContent={layoutData.headerContent}
        footerContent={layoutData.footerContent}
        isPreview={isPreview}
      >
        <ZooMapSurvey />
      </LayoutRedesign>
    </>
  );
}

export async function getServerSideProps({
  locale,
  preview = false,
  res,
}: {
  locale: string;
  preview: boolean;
  res: ServerResponse;
}) {
  // The survey exists in Russian only
  if (locale !== `ru`) {
    return {
      notFound: true,
    };
  }

  // Duplicates the robots meta tag for the crawlers that only look at the headers
  res.setHeader(`X-Robots-Tag`, ROBOTS_NO_INDEX);

  const {
    cookieData,
    cookieSettingsData,
  } = await getCookiePageProps({
    locale,
    preview,
  });

  if (process.env.IS_STATIC_MODE === `true`) {
    const translationsPageData = await loadTranslations(locale, [`headerRedesign`, `footerRedesign`]);

    return {
      props: {
        cookieData,
        cookieSettingsData,
        layoutData: {
          headerContent: translationsPageData.headerRedesign,
          footerContent: translationsPageData.footerRedesign,
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
      cookieData,
      cookieSettingsData,
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
  return serverSideTranslations(locale, [`formBlockRedesign`, `footer`]);
}
