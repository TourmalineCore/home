import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { LayoutData } from "../../common/types";
import { PageHead } from "../../components/PageHead/PageHead";
import { LayoutRedesign } from "../../components/redesign/LayoutRedesign/LayoutRedesign";
import { getLayoutData } from "../../services/cms/api/layout-api/layout-api";
import { loadTranslations } from "../../common/utils";
import { useNonBreakingSpaces } from "../../common/hooks";
import { MagazineHero } from "../../components/magazines/MagazineHero/MagazineHero";
import { MagazineDescription } from "../../components/magazines/MagazineDescription/MagazineDescription";
import { useScrollTop } from "../../common/hooks/useScrollTop";
import { MagazineSubscriptionForm } from "../../components/magazines/MagazineSubscriptionForm/MagazineSubscriptionForm";

const MagazinePdfView = dynamic(
  () => import(`../../components/magazines/MagazinePdfView/MagazinePdfView`).then((component) => component.MagazinePdfView),
  {
    ssr: false,
  },
);

export default function MagazinePage({
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
        <MagazineHero />
        <MagazineDescription />
        <MagazinePdfView />
        <MagazineSubscriptionForm />
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
    `contactForm`,
    `footer`,
    `cookie`,
    `cookieSettings`,
  ]);
}
