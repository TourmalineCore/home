import { useTranslation } from "next-i18next";
import Image from 'next/image';

export function ChelzooCMS({
  isComponentPage,
}:{
  isComponentPage?: boolean;
}) {
  const {
    t,
  } = useTranslation(`chelzooCMS`);

  return (
    <section
      className="chelzoo-cms"
      data-testid="chelzoo-cms"
    >
      <div className="container-cases chelzoo-cms__wrapper">
        <h1 className="chelzoo-cms__title">
          {t(`title`)}
        </h1>
        {` `}
        <p className="chelzoo-cms__description">
          {t(`description`)}
        </p>
        <div className="chelzoo-podcast__media">
          {renderMedia()}
        </div>
      </div>
    </section>
  );

  function renderMedia() {
    if (isComponentPage) {
      return (
        <Image
          src="/images/hero-slider-image-6.png"
          alt=""
          fill
        />
      );
    }

    return (
      <video
        src="/video/chelzoo-cms-video.mp4"
        playsInline
        loop
        muted
        autoPlay
      />
    );
  }
}
