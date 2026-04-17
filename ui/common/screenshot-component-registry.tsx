import { ChelzooAbout } from "../components/chelzoo/ChelzooAbout/ChelzooAbout";
import { ChelzooAccessibility } from "../components/chelzoo/ChelzooAccessibility/ChelzooAccessibility";
import { ChelzooAdaptation } from "../components/chelzoo/ChelzooAdaptation/ChelzooAdaptation";
import { ChelzooCMS } from "../components/chelzoo/ChelzooCMS/ChelzooCMS";
import { ChelzooDesign } from "../components/chelzoo/ChelzooDesign/ChelzooDesign";
import { ChelzooDevDesign } from "../components/chelzoo/ChelzooDevDesign/ChelzooDevDesign";
import { ChelzooDiscovery } from "../components/chelzoo/ChelzooDiscovery/ChelzooDiscovery";
import { ChelzooHero } from "../components/chelzoo/ChelzooHero/ChelzooHero";
import { ChelzooMockup } from "../components/chelzoo/ChelzooMockup/ChelzooMockup";
import { ChelzooPodcast } from "../components/chelzoo/ChelzooPodcast/ChelzooPodcast";
import { ChelzooPromo } from "../components/chelzoo/ChelzooPromo/ChelzooPromo";
import { ChelzooSeo } from "../components/chelzoo/ChelzooSeo/ChelzooSeo";
import { ChelzooStack } from "../components/chelzoo/ChelzooStack/ChelzooStack";
import { ChelzooTasks } from "../components/chelzoo/ChelzooTasks/ChelzooTasks";
import { ChelzooTestingStrategy } from "../components/chelzoo/ChelzooTestingStrategy/ChelzooTestingStrategy";
import { CollageWithLink } from "../components/CollageWithLink/CollageWithLink";
import { CollageWithTitle } from "../components/CollageWithTitle/CollageWithTitle";
import { Cookie } from "../components/Cookie/Cookie";
import { CustomError } from "../components/CustomError/CustomError";
import { FeaturedCardsList } from "../components/FeaturedCardsList/FeaturedCardsList";
import { FormModal } from "../components/FormModal/FormModal";
import { Hero } from "../components/Hero/Hero";
import { FooterRedesign } from "../components/redesign/FooterRedesign/FooterRedesign";
import { FormBlockRedesign } from "../components/redesign/FormBlockRedesign/FormBlockRedesign";
import { MobileMenu } from "../components/redesign/HeaderRedesign/components/MobileMenuRedesign/MobileMenuRedesign";
import { HeaderRedesign } from "../components/redesign/HeaderRedesign/HeaderRedesign";
import { ShowcaseGrid } from "../components/ShowcaseGrid/ShowcaseGrid";
import { SignpostMultiple } from "../components/SignpostMultiple/SignpostMultiple";
import { SingleImage } from "../components/SingleImage/SingleImage";
import { ThreeColumnGrid } from "../components/ThreeColumnGrid/ThreeColumnGrid";

export enum ComponentName {
  THREE_COLUMN_GRID = `three-column-grid`,
  COLLAGE_WITH_LINK = `collage-with-link`,
  COLLAGE_WITH_TITLE = `collage-with-title`,
  FOOTER = `footer`,
  HEADER = `header`,
  MOBILE_MENU = `mobile-menu`,
  HERO = `hero`,
  SHOWCASE_GRID_WITH_FOUR_COLUMNS = `showcase-grid-with-four-columns`,
  SHOWCASE_GRID_WITH_THREE_COLUMNS = `showcase-grid-with-three-columns`,
  SHOWCASE_GRID_WITH_MARKDOWN_COLUMN = `showcase-grid-with-markdown-column`,
  FEATURED_CARDS_LIST = `featured-cards-list`,
  SIGNPOST_MULTIPLE = `signpost-multiple`,
  SINGLE_IMAGE = `single-image`,
  FORM_BLOCK = `form-block`,
  SUBMITTED_FORM_BLOCK = `submitted-form-block`,
  COOKIE = `cookie`,
  NOT_FOUND = `not-found`,
  FORM_MODAL = `form-modal`,
  SUBMITTED_FORM_MODAL = `submitted-form-modal`,
  CHELZOO_HERO = `chelzoo-hero`,
  CHELZOO_ABOUT = `chelzoo-about`,
  CHELZOO_TASKS = `chelzoo-tasks`,
  CHELZOO_PODCAST = `chelzoo-podcast`,
  CHELZOO_DISCOVERY = `chelzoo-discovery`,
  CHELZOO_STACK = `chelzoo-stack`,
  CHELZOO_ACCESSIBILITY = `chelzoo-accessibility`,
  CHELZOO_DESIGN = `chelzoo-design`,
  CHELZOO_MOCKUP = `chelzoo-mockup`,
  CHELZOO_ADAPTATION = `chelzoo-adaptation`,
  CHELZOO_TESTING_STRATEGY = `chelzoo-testing-strategy`,
  CHELZOO_SEO = `chelzoo-seo`,
  CHELZOO_DEV_DESIGN = `chelzoo-dev-design`,
  CHELZOO_INFRASTRUCTURE = `chelzoo-infrastructure`,
  CHELZOO_CMS = `chelzoo-cms`,
  CHELZOO_PROMO = `chelzoo-promo`,
}

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
};

export const COMPONENT_LINKS = Object.values(ComponentName)
  .map((name) => ({
    href: name,
    label: name,
  }));
