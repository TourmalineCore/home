import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Layout } from '../../components/Layout/Layout';
import { PageHead } from '../../components/PageHead/PageHead';
import { HeroBlockTechnology } from '../../components/HeroBlockTechnology/HeroBlockTechnology';
import { Points } from '../../components/Points/Points';
import { Tasks } from '../../components/Tasks/Tasks';
import { Cases } from '../../components/Cases/Cases';
import { Cta } from '../../components/Cta/Cta';
import { Stack } from '../../components/Stack/Stack';
import { Payment } from '../../components/Payment/Payment';
import { Cooperation } from '../../components/Cooperation/Cooperation';
import { ServicesTechnology } from '../../components/ServicesTechnology/ServicesTechnology';
import { useScrollTop } from '../../common/hooks/useScrollTop';
import { useIsRussianCountry } from '../../common/hooks';
import { FormBlock } from '../../components/FormBlock/FormBlock';
import { TechnologyPageAnchorLink } from '../../common/enums';
import { getLayoutData } from '../../services/cms/api/layout-api/layout-api';
import { loadTranslations } from '../../common/utils';
import { LayoutData } from '../../common/types';

export default function FrontendPage({
  layoutData,
}: {
  layoutData: {
    headerContent: LayoutData['headerContent'];
  };
}) {
  const {
    t,
  } = useTranslation(`common`);

  const isCountryRus = useIsRussianCountry();

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
      <Layout
        mainClassName="frontend"
        headerContent={layoutData.headerContent}
      >
        <div className="frontend__hero-block-container">
          <HeroBlockTechnology />
          <Points />
        </div>
        <Tasks />
        <Cases />
        <Cta />
        <Stack />
        <Payment />
        <Cooperation />
        <ServicesTechnology />
        {isCountryRus && (
          <FormBlock
            id={TechnologyPageAnchorLink.Contact}
            buttonClassName="frontend__form-button"
          />
        )}
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
  if (process.env.IS_STATIC_MODE === `true`) {
    const translationsPageData = await loadTranslations(locale, [`headerRedesign`]);

    return {
      props: {
        layoutData: {
          headerContent: translationsPageData.headerRedesign,
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
    `footer`,
    `cookie`,
    `form`,
    `formBlock`,
    `heroFrontend`,
    `pointsFrontend`,
    `tasksFrontend`,
    `payment`,
    `cta`,
    `stackFrontend`,
    `cooperation`,
    `servicesTechnologyFrontend`,
    `casesFrontend`,
    `formBlockRedesign`,
  ]);
}
