import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";

export function ChelzooSeo({
  isComponentPage,
}: {
  isComponentPage?: boolean;
}) {
  const {
    t,
  } = useTranslation(`chelzooSeo`);

  const {
    locale,
  } = useRouter();

  return (
    <section
      className="chelzoo-seo"
      data-testid="chelzoo-seo"
    >

      <div className="container-cases chelzoo-seo__wrapper">
        <h2 className="chelzoo-seo__title">{t(`title`)}</h2>
        <div className="chelzoo-seo__description">{t(`description`)}</div>
        <div className="chelzoo-seo__media">
          <div className="chelzoo-seo__media-wrapper">
            {renderMedia()}
          </div>
          <div className="chelzoo-seo__card chelzoo-seo__card--left">{t(`firstCardText`)}</div>
          <div className="chelzoo-seo__card chelzoo-seo__card--right">{t(`secondCardText`)}</div>
        </div>
      </div>
    </section>
  );

  function renderMedia() {
    if (isComponentPage) {
      return (
        <Image
          src="/images/hero-slider-image-8.png"
          alt=""
          fill
        />
      );
    }

    return (
      <video
        src={locale === `ru` ? `/video/chelzoo-seo.mp4` : `/video/chelzoo-seo-eng.mp4`}
        playsInline
        loop
        muted
        autoPlay
      />
    );
  }
}
