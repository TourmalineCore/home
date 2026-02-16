import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Layout } from '../../components/Layout/Layout';
import { PageHead } from '../../components/PageHead/PageHead';
import { HeroBlockTechnology } from '../../components/HeroBlockTechnology/HeroBlockTechnology';
import { Points } from '../../components/Points/Points';
import { ServicesTechnology } from '../../components/ServicesTechnology/ServicesTechnology';
import { Tasks } from '../../components/Tasks/Tasks';
import { Stack } from '../../components/Stack/Stack';
import { Cases } from '../../components/Cases/Cases';
import { Stages } from '../../components/Stages/Stages';
import { useScrollTop } from '../../common/hooks/useScrollTop';
import { useIsRussianCountry } from '../../common/hooks';
import { FormBlock } from '../../components/FormBlock/FormBlock';
import { TechnologyPageAnchorLink } from '../../common/enums';
import { LayoutData } from '../../common/types';
import { getLayoutData } from '../../services/cms/api/layout-api/layout-api';
import { loadTranslations } from '../../common/utils';

export default function FrontendTeamPage({
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
        mainClassName="frontend-team"
        headerContent={layoutData.headerContent}
      >
        <div className="frontend-team__hero-block-container">
          <HeroBlockTechnology />
          <Points />
        </div>
        <Tasks />
        <ServicesTechnology
          localeKeyName="benefits"
          isFilled
        />
        <Cases />
        <Stages />
        <Stack />
        <ServicesTechnology />
        {isCountryRus && (
          <FormBlock
            id={TechnologyPageAnchorLink.Contact}
            buttonClassName="frontend-team__form-button"
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
    `heroFrontend-team`,
    `pointsFrontend-team`,
    `servicesTechnologyFrontend-team`,
    `benefitsFrontend-team`,
    `tasksFrontend-team`,
    `stackFrontend-team`,
    `casesFrontend-team`,
    `stagesFrontend-team`,
    `formBlockRedesign`,
  ]);
}
