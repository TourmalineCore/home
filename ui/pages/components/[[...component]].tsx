import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { loadTranslations } from "../../common/utils/loadTranslations";
import { COMPONENT_LINKS, COMPONENT_MAP, ComponentName } from "../../common/screenshot-component-registry";

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
