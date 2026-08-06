import Head from 'next/head';

import { getMetaLangLinks } from './getMetaLangLinks';

export function PageHead({
  seoData,
}) {
  const {
    seo: {
      title,
      description,
    },
    structuredData,
    // additionalCode,
    keywords,
    metaTags,
    image,
  } = seoData;

  const {
    src: imageSrc,
    width: imageWidth,
    height: imageHeight,
  } = image || {
    src: `/images/browser-preview.webp`,
    width: `300`,
    height: `300`,
  };

  return (
    <Head>
      <meta charSet="utf-8" />

      {createMetaTags(metaTags)}

      {getMetaLangLinks()}

      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <meta
        name="keywords"
        content={keywords}
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:image"
        content={imageSrc}
      />
      {imageWidth && (
        <meta
          property="og:image:width"
          content={imageWidth}
        />
      )}
      {imageHeight && (
        <meta
          property="og:image:height"
          content={imageHeight}
        />
      )}

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );

  function createMetaTags(tags) {
    return tags.map((element) => {
      const props = {};

      if (element.name) {
        props.name = element.name;
      }

      if (element.property) {
        props.property = element.property;
      }

      if (element.itemProp) {
        props.itemProp = element.itemProp;
      }

      if (element.content) {
        props.content = element.content;
      }

      return (
        <meta
          key={element.name || element.property}
          {...props}
        />
      );
    });
  }
}
