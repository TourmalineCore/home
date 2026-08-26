import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';
import { PageHead } from '../../components/PageHead/PageHead';
import { useScrollTop } from '../../common/hooks/useScrollTop';
import { getLayoutData } from '../../services/cms/api/layout-api/layout-api';
import { loadTranslations } from '../../common/utils';
import { CollageWithLinkBlock, LayoutData } from '../../common/types';
import { LayoutRedesign } from '../../components/redesign/LayoutRedesign/LayoutRedesign';
import { MagazinesHero } from '../../components/magazines/MagazinesHero/MagazinesHero';
import { useNonBreakingSpaces } from '../../common/hooks';
import { MagazineTeaser } from '../../components/magazines/MagazineTeaser/MagazineTeaser';
import { CollageWithLink } from '../../components/CollageWithLink/CollageWithLink';
import { getCookiePageProps } from '../../common/utils/getCookiePageProps';

export default function MagazinesPage({
  layoutData,
  collageWithLinkData,
  isPreview,
}: {
  layoutData: LayoutData;
  collageWithLinkData: CollageWithLinkBlock;
  isPreview: boolean;
}) {
  const {
    locale,
  } = useRouter();

  const {
    t,
  } = useTranslation(`magazinesMeta`);

  useNonBreakingSpaces({
    locale: locale!,
  });

  useScrollTop();

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
          image: {
            src: `https://tourmalinecore.com/images/cover-of-tdd-magazine.jpg`,
          },
        }}
      />
      <LayoutRedesign
        headerContent={layoutData.headerContent}
        footerContent={layoutData.footerContent}
        isPreview={isPreview}
      >
        <MagazinesHero />
        <MagazineTeaser />
        <CollageWithLink
          text={collageWithLinkData.text}
          link="/"
          imagesWithBlurDataURL={collageWithLinkData.imagesWithBlurDataURL}
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
  const {
    cookieData,
    cookieSettingsData,
  } = await getCookiePageProps({
    locale,
    preview,
  });

  if (process.env.IS_STATIC_MODE === `true`) {
    const translationsPageData = await loadTranslations(locale, [
      `headerRedesign`,
      `footerRedesign`,
      `collageWithLink`,
    ]);

    return {
      props: {
        cookieData,
        cookieSettingsData,
        layoutData: {
          headerContent: translationsPageData.headerRedesign,
          footerContent: translationsPageData.footerRedesign,
        },
        collageWithLinkData: translationsPageData.collageWithLink,
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

  const translationsPageData = await loadTranslations(locale, [`collageWithLink`]);

  return {
    props: {
      cookieData,
      cookieSettingsData,
      layoutData,
      collageWithLinkData: translationsPageData.collageWithLink,
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
    `magazinesMeta`,
    `formBlockRedesign`,
    `footer`,
  ]);
}
