import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { loadTranslations } from "../../common/utils/loadTranslations";
import { COMPONENT_LINKS, ComponentName } from "../../common/enums";
import { ChelzooAbout } from "../../components/chelzoo/ChelzooAbout/ChelzooAbout";
import { ChelzooAccessibility } from "../../components/chelzoo/ChelzooAccessibility/ChelzooAccessibility";
import { ChelzooAdaptation } from "../../components/chelzoo/ChelzooAdaptation/ChelzooAdaptation";
import { ChelzooCMS } from "../../components/chelzoo/ChelzooCMS/ChelzooCMS";
import { ChelzooDesign } from "../../components/chelzoo/ChelzooDesign/ChelzooDesign";
import { ChelzooDevDesign } from "../../components/chelzoo/ChelzooDevDesign/ChelzooDevDesign";
import { ChelzooDiscovery } from "../../components/chelzoo/ChelzooDiscovery/ChelzooDiscovery";
import { ChelzooHero } from "../../components/chelzoo/ChelzooHero/ChelzooHero";
import { ChelzooMockup } from "../../components/chelzoo/ChelzooMockup/ChelzooMockup";
import { ChelzooPodcast } from "../../components/chelzoo/ChelzooPodcast/ChelzooPodcast";
import { ChelzooPromo } from "../../components/chelzoo/ChelzooPromo/ChelzooPromo";
import { ChelzooSeo } from "../../components/chelzoo/ChelzooSeo/ChelzooSeo";
import { ChelzooStack } from "../../components/chelzoo/ChelzooStack/ChelzooStack";
import { ChelzooTasks } from "../../components/chelzoo/ChelzooTasks/ChelzooTasks";
import { ChelzooTestingStrategy } from "../../components/chelzoo/ChelzooTestingStrategy/ChelzooTestingStrategy";
import { CollageWithLink } from "../../components/CollageWithLink/CollageWithLink";
import { CollageWithTitle } from "../../components/CollageWithTitle/CollageWithTitle";
import { Cookie } from "../../components/Cookie/Cookie";
import { CustomError } from "../../components/CustomError/CustomError";
import { FeaturedCardsList } from "../../components/FeaturedCardsList/FeaturedCardsList";
import { FormModal } from "../../components/FormModal/FormModal";
import { Hero } from "../../components/Hero/Hero";
import { FooterRedesign } from "../../components/redesign/FooterRedesign/FooterRedesign";
import { FormBlockRedesign } from "../../components/redesign/FormBlockRedesign/FormBlockRedesign";
import { MobileMenu } from "../../components/redesign/HeaderRedesign/components/MobileMenuRedesign/MobileMenuRedesign";
import { HeaderRedesign } from "../../components/redesign/HeaderRedesign/HeaderRedesign";
import { ShowcaseGrid } from "../../components/ShowcaseGrid/ShowcaseGrid";
import { SignpostMultiple } from "../../components/SignpostMultiple/SignpostMultiple";
import { SingleImage } from "../../components/SingleImage/SingleImage";
import { ThreeColumnGrid } from "../../components/ThreeColumnGrid/ThreeColumnGrid";
import { ChelzooInfrastructure } from "../../components/chelzoo/ChelzooInfrastructure/ChelzooInfrastructure";

export const COMPONENT_MAP: Record<string, (pageData: Record<string, any>) => JSX.Element> = {
  [ComponentName.THREE_COLUMN_GRID]: ({
    threeColumnGrid,
  }) => (
    <ThreeColumnGrid columns={threeColumnGrid.columns} />
  ),
  [ComponentName.COLLAGE_WITH_LINK]: ({
    collageWithLink,
  }) => (
    <CollageWithLink
      text={collageWithLink.text}
      link={collageWithLink.link}
      imagesWithBlurDataURL={collageWithLink.imagesWithBlurDataURL}
    />
  ),
  [ComponentName.COLLAGE_WITH_TITLE]: ({
    collageWithTitle,
  }) => (
    <CollageWithTitle
      title={collageWithTitle.title}
      imagesWithBlurDataURL={collageWithTitle.imagesWithBlurDataURL}
    />
  ),
  [ComponentName.FOOTER]: ({
    footerRedesign,
  }) => (
    <FooterRedesign
      emailCaption={footerRedesign.emailCaption}
      emailAddress={footerRedesign.emailAddress}
      navigationLists={footerRedesign.navigationLists}
    />
  ),
  [ComponentName.HERO]: ({
    hero,
  }) => (
    <Hero
      title={hero.title}
      description={hero.description}
      media={hero.media}
    />
  ),
  [ComponentName.HEADER]: ({
    headerRedesign,
  }) => (
    <HeaderRedesign
      navigationLists={headerRedesign.navigationLists}
      buttonLabel={headerRedesign.buttonLabel}
      emailCaption={headerRedesign.emailCaption}
      emailAddress={headerRedesign.emailAddress}
      socialLinks={headerRedesign.socialLinks}
    />
  ),
  [ComponentName.MOBILE_MENU]: ({
    headerRedesign,
  }) => (
    <MobileMenu
      navigationLists={headerRedesign.navigationLists}
      buttonLabel={headerRedesign.buttonLabel}
      emailCaption={headerRedesign.emailCaption}
      emailAddress={headerRedesign.emailAddress}
      socialLinks={headerRedesign.socialLinks}
      onOpenModal={() => {}}
      isMobileMenuOpen
    />
  ),
  [ComponentName.SHOWCASE_GRID_WITH_FOUR_COLUMNS]: ({
    showcaseGridSecondSection,
  }) => (
    <ShowcaseGrid
      dataTestId="showcase-grid-with-four-columns"
      showcaseColumns={showcaseGridSecondSection.showcaseColumns}
      showOnMobile={showcaseGridSecondSection.showOnMobile}
    />
  ),
  [ComponentName.SHOWCASE_GRID_WITH_THREE_COLUMNS]: ({
    showcaseGridThirdSection,
  }) => (
    <ShowcaseGrid
      showcaseColumns={showcaseGridThirdSection.showcaseColumns}
      dataTestId="showcase-grid-with-three-columns"
      showOnMobile={showcaseGridThirdSection.showOnMobile}
    />
  ),
  [ComponentName.SHOWCASE_GRID_WITH_MARKDOWN_COLUMN]: ({
    showcaseGridFirstSection,
  }) => (
    <ShowcaseGrid
      title={showcaseGridFirstSection.title}
      showcaseColumns={showcaseGridFirstSection.showcaseColumns}
      dataTestId="showcase-grid-with-markdown-column"
      showOnMobile={showcaseGridFirstSection.showOnMobile}
    />
  ),
  [ComponentName.FEATURED_CARDS_LIST]: ({
    featuredCardsList,
  }) => (
    <FeaturedCardsList
      title={featuredCardsList.title}
      cards={featuredCardsList.cards}
    />
  ),
  [ComponentName.SIGNPOST_MULTIPLE]: ({
    articleSignposts,
  }) => (
    <SignpostMultiple
      title={articleSignposts.title}
      viewAllLink={articleSignposts.viewAllLink}
      signposts={articleSignposts.signposts}
      dataTestId="signpost-multiple-articles"
    />
  ),
  [ComponentName.SINGLE_IMAGE]: ({
    singleImage,
  }) => (
    <SingleImage imageWithBlurDataURL={singleImage.imageWithBlurDataURL} />
  ),
  [ComponentName.FORM_BLOCK]: () => (
    <FormBlockRedesign
      testId="form-block"
      isComponentPage
    />
  ),
  [ComponentName.SUBMITTED_FORM_BLOCK]: () => (
    <FormBlockRedesign
      initializeIsSubmit
      testId="submitted-form-block"
      isComponentPage
    />
  ),
  [ComponentName.COOKIE]: () => <Cookie isComponentPage />,
  [ComponentName.NOT_FOUND]: ({
    pageNotFound,
  }) => (
    <CustomError
      statusCode={404}
      message={pageNotFound.message}
    />
  ),
  [ComponentName.FORM_MODAL]: () => (
    <FormModal
      onCloseModal={() => {}}
      isModalOpen
      testId="form-modal"
      isComponentPage
    />
  ),
  [ComponentName.SUBMITTED_FORM_MODAL]: () => (
    <FormModal
      onCloseModal={() => {}}
      isModalOpen
      testId="submitted-form-modal"
      initializeIsSubmit
      isComponentPage
    />
  ),
  [ComponentName.CHELZOO_HERO]: () => <ChelzooHero isComponentPage />,
  [ComponentName.CHELZOO_ABOUT]: () => <ChelzooAbout />,
  [ComponentName.CHELZOO_STACK]: () => <ChelzooStack />,
  [ComponentName.CHELZOO_TASKS]: () => <ChelzooTasks />,
  [ComponentName.CHELZOO_ACCESSIBILITY]: () => <ChelzooAccessibility />,
  [ComponentName.CHELZOO_PODCAST]: () => <ChelzooPodcast isComponentPage />,
  [ComponentName.CHELZOO_DISCOVERY]: () => <ChelzooDiscovery />,
  [ComponentName.CHELZOO_DESIGN]: () => <ChelzooDesign />,
  [ComponentName.CHELZOO_MOCKUP]: () => <ChelzooMockup />,
  [ComponentName.CHELZOO_ADAPTATION]: () => <ChelzooAdaptation />,
  [ComponentName.CHELZOO_TESTING_STRATEGY]: () => <ChelzooTestingStrategy />,
  [ComponentName.CHELZOO_SEO]: () => <ChelzooSeo isComponentPage />,
  [ComponentName.CHELZOO_DEV_DESIGN]: () => <ChelzooDevDesign />,
  [ComponentName.CHELZOO_CMS]: () => <ChelzooCMS isComponentPage />,
  [ComponentName.CHELZOO_PROMO]: () => <ChelzooPromo />,
  [ComponentName.CHELZOO_INFRASTRUCTURE]: () => <ChelzooInfrastructure />,
};

export default function ComponentsPage({
  pageData,
}: {
  pageData: Record<string, any>;
}) {
  const router = useRouter();
  const {
    query,
  } = router;

  const componentName = query.component?.[0];

  if (componentName) {
    const component = COMPONENT_MAP[componentName];

    return component(pageData);
  }

  return (
    <div className="components-page container-redesign">
      <h2 className="components-page__subtitle">
        Components
      </h2>
      <ul className="components-page__list">
        {COMPONENT_LINKS.map(({
          href,
          label,
        }) => (
          <li
            key={label}
            className="components-page__item"
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps({
  locale,
}: {
  locale: string;
}) {
  const translationsPageData = await loadTranslations(locale, [
    `threeColumnGrid`,
    `collageWithLink`,
    `collageWithTitle`,
    `hero`,
    `showcaseGridFirstSection`,
    `showcaseGridSecondSection`,
    `showcaseGridThirdSection`,
    `featuredCardsList`,
    `articleSignposts`,
    `singleImage`,
    `pageNotFound`,
    `headerRedesign`,
    `footerRedesign`,
  ]);

  return {
    props: {
      pageData: translationsPageData,
      ...(await serverSideTranslations(locale, [
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
        `chelzooInfrastructure`,
        `chelzooCMS`,
        `chelzooPromo`,
      ])),
    },
  };
}

export async function getStaticPaths() {
  const paths = Object.values(ComponentName)
    .map((component) => ({
      params: {
        component: [component],
      },
    }));

  const basePath = {
    params: {
      component: [],
    },
  };

  const locales = [`en`, `ru`];
  const localizedPaths = locales.flatMap((locale) => [basePath, ...paths].map((path) => ({
    params: path.params,
    locale,
  })));

  return {
    paths: localizedPaths,
    fallback: false,
  };
}
