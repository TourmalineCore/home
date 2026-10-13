import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import path from "path";
import { PDFParse } from "pdf-parse";
import { CollageWithLinkBlock, LayoutData } from "../../common/types";
import { PageHead } from "../../components/PageHead/PageHead";
import { LayoutRedesign } from "../../components/redesign/LayoutRedesign/LayoutRedesign";
import { getLayoutData } from "../../services/cms/api/layout-api/layout-api";
import { loadTranslations } from "../../common/utils";
import { useNonBreakingSpaces } from "../../common/hooks";
import { MagazineHero } from "../../components/magazines/MagazineHero/MagazineHero";
import { MagazineDescription } from "../../components/magazines/MagazineDescription/MagazineDescription";
import { MagazineTeaser } from "../../components/magazines/MagazineTeaser/MagazineTeaser";
import { CollageWithLink } from "../../components/CollageWithLink/CollageWithLink";
import { getCookiePageProps } from "../../common/utils/getCookiePageProps";
import { MagazinePdfLoader } from "../../components/magazines/MagazinePdfView/components/MagazinePdfLoader/MagazinePdfLoader";

const MagazinePdfView = dynamic(
  () => import(`../../components/magazines/MagazinePdfView/MagazinePdfView`).then((component) => component.MagazinePdfView),
  {
    ssr: false,
    loading: () => (
      <div style={{
        height: 500,
      }}
      >
        <MagazinePdfLoader />
      </div>
    ),
  },
);

export default function MagazinePage({
  layoutData,
  collageWithLinkData,
  isPreview,
  pdfText,
}: {
  layoutData: LayoutData;
  collageWithLinkData: CollageWithLinkBlock;
  isPreview: boolean;
  pdfText: string;
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

  // It is necessary for indexing text from a pdf magazine
  const structuredData = pdfText ? {
    '@context': `https://schema.org`,
    '@type': `Article`,
    headline: t(`metaTitle`),
    description: t(`metaDescription`),
    articleBody: pdfText,
    inLanguage: locale === `ru` ? `ru-RU` : `en-US`,
    author: {
      '@type': `Organization`,
      name: `Tourmaline Core`,
    },
  } : null;

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
          structuredData,
          additionalCode: ``,
          image: {
            src: `https://tourmalinecore.com/images/cover-of-tdd-magazine-ru.jpg`,
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
  query,
  locale,
  preview = false,
}: {
  query: {
    version?: string;
  };
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

  const fileName = `tourmaline-code-001-tdd-${query.version || `full`}-${locale}.pdf`;
  const filePath = path.join(
    process.cwd(),
    `public`,
    `documents`,
    `magazines`,
    fileName,
  );

  let pdfText = ``;

  try {
    const parser = new PDFParse({
      url: filePath,
    });

    const pdfData = await parser.getText();

    pdfText = pdfData.text;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`PDF file ${fileName} not found`);
  }

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
        pdfText,
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
      pdfText,
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
    `magazineTddHero`,
    `magazineTddDescription`,
    `magazinePdfView`,
    `magazineTeaser`,
    `formBlockRedesign`,
    `footer`,
  ]);
}
