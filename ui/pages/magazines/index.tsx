import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useRouter } from 'next/router';
import { PageHead } from '../../components/PageHead/PageHead';
import { useScrollTop } from '../../common/hooks/useScrollTop';
import { getLayoutData } from '../../services/cms/api/layout-api/layout-api';
import { loadTranslations } from '../../common/utils';
import { LayoutData } from '../../common/types';
import { LayoutRedesign } from '../../components/redesign/LayoutRedesign/LayoutRedesign';
import { MagazinesHero } from '../../components/magazines/MagazinesHero/MagazinesHero';
import { useNonBreakingSpaces } from '../../common/hooks';
import { FeaturedCardsList } from '../../components/FeaturedCardsList/FeaturedCardsList';
import { AppRoute } from '../../common/enums';

export default function MagazinesPage({
  layoutData,
  isPreview,
}: {
  layoutData: LayoutData;
  isPreview: boolean;
}) {
  const {
    locale,
  } = useRouter();

  useNonBreakingSpaces({
    locale: locale!,
  });

  useScrollTop();

  return (
    <>
      <PageHead
        seoData={{
          seo: {
            title: ``,
            description: ``,
          },
          keywords: ``,
          metaTags: [],
          structuredData: ``,
          additionalCode: ``,
        }}
      />
      <LayoutRedesign
        headerContent={layoutData.headerContent}
        footerContent={layoutData.footerContent}
        isPreview={isPreview}
      >
        <MagazinesHero />
        <FeaturedCardsList cards={[
          {
            id: 1,
            imageWithBlurDataURL: {
              url: `/images/next-magazine.png`,
              blurDataURL: ``,
            },
            theme: `blue`,
            type: `image`,
          },
          {
            id: 2,
            type: `wide`,
            title: `Следующий номер — про Content Credentials`,
            description: `Анонсы выпусков, разборры по темам номеров и точки, где можно забрать бумажный журнал — в блогах компании`,
            wideCardItems: [
              {
                id: 1,
                name: `Telegram`,
                link: `https://t.me/+f4cIrOcFi_EyYjcy`,
              },
              {
                id: 2,
                name: `Вконтакте`,
                link: `https://vk.com/tourmalinecore`,
              },
              {
                id: 3,
                name: `Youtube`,
                link: `https://www.youtube.com/@tourmalinecore`,
              },
            ],
            link: {
              text: `Узнать больше о компании`,
              url: AppRoute.Main,
            },
          },
        ]}
        />
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
    const translationsPageData = await loadTranslations(locale, [`headerRedesign`, `footerRedesign`]);

    return {
      props: {
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
    `formBlockRedesign`,
    `footer`,
    `cookie`,
    `cookieSettings`,
  ]);
}
