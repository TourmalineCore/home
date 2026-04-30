import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useDeviceSize } from '../../../common/hooks';
import { SmartLink } from '../../SmartLink/SmartLink';

export function ChelzooPodcast({
  isComponentPage,
}:{
  isComponentPage?: boolean;
}) {
  const {
    t,
  } = useTranslation(`chelzooPodcast`);

  const {
    isTabletXl,
  } = useDeviceSize();

  return (
    <section
      className="chelzoo-podcast"
      data-testid="chelzoo-podcast"
    >
      <div className="container-cases chelzoo-podcast__wrapper">
        <h1 className="chelzoo-podcast__title">
          {t(`title`)}
        </h1>
        {` `}
        <p className="chelzoo-podcast__description">
          {t(`description`)}
        </p>
        <div className="chelzoo-podcast__content">
          <div className="chelzoo-podcast__media">
            {renderMedia()}
          </div>
          <div className="chelzoo-podcast__link-wrapper">
            <SmartLink
              className="chelzoo-podcast__link"
              href={t(`link`)}
            >
              {t(`linkText`)}
              {` `}
              →
            </SmartLink>
          </div>
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
        src={isTabletXl ? `/video/chelzoo-podcast-video-large.mp4` : `/video/chelzoo-podcast-video.mp4`}
        playsInline
        loop
        muted
        autoPlay
        aria-hidden
      />
    );
  }
}
