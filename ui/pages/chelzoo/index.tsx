import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { PageHead } from '../../components/PageHead/PageHead';
import { useScrollTop } from '../../common/hooks/useScrollTop';
import { LayoutData } from '../../common/types';
import { getLayoutData } from '../../services/cms/api/layout-api/layout-api';
import { loadTranslations } from '../../common/utils';
import { LayoutRedesign } from '../../components/redesign/LayoutRedesign/LayoutRedesign';
import { ChelzooHero } from '../../components/chelzoo/ChelzooHero/ChelzooHero';
import { ChelzooAbout } from '../../components/chelzoo/ChelzooAbout/ChelzooAbout';
import { ChelzooStack } from '../../components/chelzoo/ChelzooStack/ChelzooStack';
import { ChelzooTasks } from '../../components/chelzoo/ChelzooTasks/ChelzooTasks';
import { ChelzooAccessibility } from '../../components/chelzoo/ChelzooAccessibility/ChelzooAccessibility';
import { ChelzooPodcast } from '../../components/chelzoo/ChelzooPodcast/ChelzooPodcast';
import { ChelzooDiscovery } from '../../components/chelzoo/ChelzooDiscovery/ChelzooDiscovery';
import { ChelzooDesign } from '../../components/chelzoo/ChelzooDesign/ChelzooDesign';
import { ChelzooMockup } from '../../components/chelzoo/ChelzooMockup/ChelzooMockup';
import { ChelzooAdaptation } from '../../components/chelzoo/ChelzooAdaptation/ChelzooAdaptation';
import { ChelzooTestingStrategy } from '../../components/chelzoo/ChelzooTestingStrategy/ChelzooTestingStrategy';
import { ChelzooSeo } from '../../components/chelzoo/ChelzooSeo/ChelzooSeo';
import { ChelzooDevDesign } from '../../components/chelzoo/ChelzooDevDesign/ChelzooDevDesign';
import { ChelzooCMS } from '../../components/chelzoo/ChelzooCMS/ChelzooCMS';

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
          <ChelzooAbout />
          <ChelzooTasks />
          <ChelzooPodcast />
          <ChelzooDiscovery />
          <ChelzooStack />
          <ChelzooAccessibility />
          <ChelzooDesign />
          <ChelzooMockup />
          <ChelzooAdaptation />
          <ChelzooDevDesign />
          <ChelzooTestingStrategy />
          <ChelzooCMS />
          <ChelzooSeo />
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
    `common`,
    `cookie`,
    `formBlockRedesign`,
    `chelzooHero`,
    `chelzooAbout`,
    `chelzooStack`,
    `chelzooTasks`,
    `chelzooAccessibility`,
    `chelzooPodcast`,
    `chelzooDiscovery`,
    `chelzooDesign`,
    `chelzooMockup`,
    `chelzooAdaptation`,
    `chelzooTestingStrategy`,
    `chelzooSeo`,
    `chelzooDevDesign`,
    `chelzooCMS`,
  ]);
}
