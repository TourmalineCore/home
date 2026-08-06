import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CollageWithLinkBlock, LayoutData } from "../../common/types";
import { PageHead } from "../../components/PageHead/PageHead";
import { LayoutRedesign } from "../../components/redesign/LayoutRedesign/LayoutRedesign";
import { getLayoutData } from "../../services/cms/api/layout-api/layout-api";
import { loadTranslations } from "../../common/utils";
import { useNonBreakingSpaces } from "../../common/hooks";
import { MagazineHero } from "../../components/magazines/MagazineHero/MagazineHero";
import { MagazineDescription } from "../../components/magazines/MagazineDescription/MagazineDescription";
import { useScrollTop } from "../../common/hooks/useScrollTop";
import { MagazineTeaser } from "../../components/magazines/MagazineTeaser/MagazineTeaser";
import { CollageWithLink } from "../../components/CollageWithLink/CollageWithLink";

const MagazinePdfView = dynamic(
  () => import(`../../components/magazines/MagazinePdfView/MagazinePdfView`).then((component) => component.MagazinePdfView),
  {
    ssr: false,
  },
);

export default function MagazinePage({
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
  } = useTranslation(`magazineTddMeta`);

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
        <MagazineHero />
        <MagazineDescription />
        <MagazinePdfView />
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
  if (process.env.IS_STATIC_MODE === `true`) {
    const translationsPageData = await loadTranslations(locale, [
      `headerRedesign`,
      `footerRedesign`,
      `collageWithLink`,
    ]);

    return {
      props: {
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
    `magazineTddMeta`,
    `formBlockRedesign`,
    `footer`,
    `cookie`,
    `cookieSettings`,
  ]);
}
