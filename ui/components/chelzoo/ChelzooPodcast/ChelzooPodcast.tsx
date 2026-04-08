import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export function ChelzooPodcast({
  isComponentPage,
}:{
  isComponentPage?: boolean;
}) {
  const {
    t,
  } = useTranslation(`chelzooPodcast`);

  return (
    <section
      className="chelzoo-podcast"
      data-testid="chelzoo-podcast"
    >
      <div className="container-cases chelzoo-podcast__wrapper">
        <h1 className="chelzoo-podcast__title">
          {t(`title`)}
        </h1>
        <div className="chelzoo-podcast__media">
          {renderMedia()}
        </div>
        <div className="chelzoo-podcast__content">
          <p className="chelzoo-podcast__description">
            {t(`description`)}
          </p>
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
        src="/video/chelzoo-podcast-video.mp4"
        playsInline
        loop
        muted
        autoPlay
      />
    );
  }
}
