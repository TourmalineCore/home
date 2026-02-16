import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CollageWithTitle } from "../../components/CollageWithTitle/CollageWithTitle";
import { FooterRedesign } from "../../components/redesign/FooterRedesign/FooterRedesign";
import { Hero } from "../../components/Hero/Hero";
import { ShowcaseGrid } from "../../components/ShowcaseGrid/ShowcaseGrid";
import { FeaturedCardsList } from "../../components/FeaturedCardsList/FeaturedCardsList";
import { SignpostMultiple } from "../../components/SignpostMultiple/SignpostMultiple";
import { SingleImage } from "../../components/SingleImage/SingleImage";
import { FormBlockRedesign } from "../../components/redesign/FormBlockRedesign/FormBlockRedesign";
import { ComponentName } from "../../common/enums";
import { Cookie } from "../../components/Cookie/Cookie";
import { CustomError } from "../../components/CustomError/CustomError";
import { FormModal } from "../../components/FormModal/FormModal";
import { loadTranslations } from "../../common/utils/loadTranslations";
import { HeaderRedesign } from "../../components/redesign/HeaderRedesign/HeaderRedesign";
import { MobileMenu } from "../../components/redesign/HeaderRedesign/components/MobileMenuRedesign/MobileMenuRedesign";
import { ThreeColumnGrid } from "../../components/ThreeColumnGrid/ThreeColumnGrid";
import { CollageWithLink } from "../../components/CollageWithLink/CollageWithLink";

export default function ComponentsPage({
  pageData,
}: {
  pageData: Record<string, any>;
}) {
  const {
    threeColumnGrid,
    collageWithLink,
    collageWithTitle,
    hero,
    showcaseGridFirstSection,
    showcaseGridSecondSection,
    showcaseGridThirdSection,
    featuredCardsList,
    articleSignposts,
    singleImage,
    pageNotFound,
    headerRedesign,
    footerRedesign,
  } = pageData;

  const router = useRouter();
  const {
    query,
  } = router;

  const componentName = query.component?.[0];

  if (componentName === ComponentName.THREE_COLUMN_GRID) {
    return (
      <ThreeColumnGrid
        columns={threeColumnGrid.columns}
      />
    );
  }

  if (componentName === ComponentName.COLLAGE_WITH_LINK) {
    return (
      <CollageWithLink
        text={collageWithLink.text}
        link={collageWithLink.link}
        imagesWithBlurDataURL={collageWithLink.imagesWithBlurDataURL}
      />
    );
  }

  if (componentName === ComponentName.COLLAGE_WITH_TITLE) {
    return (
      <CollageWithTitle
        title={collageWithTitle.title}
        imagesWithBlurDataURL={collageWithTitle.imagesWithBlurDataURL}
      />
    );
  }

  if (componentName === ComponentName.FOOTER) {
    return (
      <FooterRedesign
        emailCaption={footerRedesign.emailCaption}
        emailAddress={footerRedesign.emailAddress}
        navigationLists={footerRedesign.navigationLists}
      />
    );
  }

  if (componentName === ComponentName.HERO) {
    return (
      <Hero
        title={hero.title}
        description={hero.description}
        media={hero.media}
      />
    );
  }

  if (componentName === ComponentName.HEADER) {
    return (
      <HeaderRedesign
        navigationLists={headerRedesign.navigationLists}
        buttonLabel={headerRedesign.buttonLabel}
        emailCaption={headerRedesign.emailCaption}
        emailAddress={headerRedesign.emailAddress}
        socialLinks={headerRedesign.socialLinks}
      />
    );
  }

  if (componentName === ComponentName.MOBILE_MENU) {
    return (
      <MobileMenu
        navigationLists={headerRedesign.navigationLists}
        buttonLabel={headerRedesign.buttonLabel}
        emailCaption={headerRedesign.emailCaption}
        emailAddress={headerRedesign.emailAddress}
        socialLinks={headerRedesign.socialLinks}
        setIsModalOpen={() => {}}
      />
    );
  }

  if (componentName === ComponentName.SHOWCASE_GRID_WITH_FOUR_COLUMNS) {
    return (
      <ShowcaseGrid
        dataTestId="showcase-grid-with-four-columns"
        showcaseColumns={showcaseGridSecondSection.showcaseColumns}
        showOnMobile={showcaseGridSecondSection.showOnMobile}
      />
    );
  }

  if (componentName === ComponentName.SHOWCASE_GRID_WITH_THREE_COLUMNS) {
    return (
      <ShowcaseGrid
        showcaseColumns={showcaseGridThirdSection.showcaseColumns}
        dataTestId="showcase-grid-with-three-columns"
        showOnMobile={showcaseGridThirdSection.showOnMobile}
      />
    );
  }

  if (componentName === ComponentName.SHOWCASE_GRID_WITH_MARKDOWN_COLUMN) {
    return (
      <ShowcaseGrid
        title={showcaseGridFirstSection.title}
        showcaseColumns={showcaseGridFirstSection.showcaseColumns}
        dataTestId="showcase-grid-with-markdown-column"
        showOnMobile={showcaseGridFirstSection.showOnMobile}
      />
    );
  }

  if (componentName === ComponentName.FEATURED_CARDS_LIST) {
    return (
      <FeaturedCardsList
        title={featuredCardsList.title}
        cards={featuredCardsList.cards}
      />
    );
  }

  if (componentName === ComponentName.SIGNPOST_MULTIPLE) {
    return (
      <SignpostMultiple
        title={articleSignposts.title}
        viewAllLink={articleSignposts.viewAllLink}
        signposts={articleSignposts.signposts}
        dataTestId="signpost-multiple-articles"
      />
    );
  }

  if (componentName === ComponentName.SINGLE_IMAGE) {
    return (
      <SingleImage
        imageWithBlurDataURL={singleImage.imageWithBlurDataURL}
      />
    );
  }

  if (componentName === ComponentName.FORM_BLOCK) {
    return (
      <FormBlockRedesign
        testId="form-block"
        isComponentPage
      />
    );
  }

  if (componentName === ComponentName.SUBMITTED_FORM_BLOCK) {
    return (
      <FormBlockRedesign
        initializeIsSubmit
        testId="submitted-form-block"
        isComponentPage
      />
    );
  }

  if (componentName === ComponentName.COOKIE) {
    return (
      <Cookie isComponentPage />
    );
  }

  if (componentName === ComponentName.NOT_FOUND) {
    return (
      <CustomError
        statusCode={404}
        message={pageNotFound.message}
      />
    );
  }

  if (componentName === ComponentName.FORM_MODAL) {
    return (
      <FormModal
        setIsOpen={() => {}}
        testId="form-modal"
        isComponentPage
      />
    );
  }

  if (componentName === ComponentName.SUBMITTED_FORM_MODAL) {
    return (
      <FormModal
        setIsOpen={() => {}}
        testId="submitted-form-modal"
        initializeIsSubmit
        isComponentPage
      />
    );
  }

  return (
    <div className="components-page container-redesign">
      <h2 className="components-page__subtitle">
        Redesigned Homepage
      </h2>
      <ul className="components-page__list">
        <li className="components-page__item">
          <Link href={ComponentName.THREE_COLUMN_GRID}>Three Column Grid</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.COLLAGE_WITH_LINK}>Collage with link</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.COLLAGE_WITH_TITLE}>Collage with title</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.FOOTER}>Footer</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.HERO}>Hero</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.HEADER}>Header</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.MOBILE_MENU}>Header popup</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.SHOWCASE_GRID_WITH_FOUR_COLUMNS}>Showcase with four columns</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.SHOWCASE_GRID_WITH_THREE_COLUMNS}>Showcase with three columns</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.SHOWCASE_GRID_WITH_MARKDOWN_COLUMN}>Showcase with markdown column</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.FEATURED_CARDS_LIST}>Featured cards list</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.SIGNPOST_MULTIPLE}>Articles signpost</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.SINGLE_IMAGE}>Single image</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.FORM_BLOCK}>Form block</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.SUBMITTED_FORM_BLOCK}>Submitted form</Link>
        </li>
        <li className="components-page__item">

          <Link href={ComponentName.NOT_FOUND}>Not found</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.COOKIE}>Cookie</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.FORM_MODAL}>Form Modal</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.SUBMITTED_FORM_MODAL}>Submitted Form Modal</Link>
        </li>
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
      ...(await serverSideTranslations(locale, [`cookie`, `formBlockRedesign`])),
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
