import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import IconDownArrow from '../../../icons/icon-arrow-chelzoo.svg';
import { SmartLink } from '../../SmartLink/SmartLink';

export function ChelzooHero({
  isComponentPage,
}:{
  isComponentPage?: boolean;
}) {
  const {
    t,
  } = useTranslation(`chelzooHero`);

  const {
    locale,
  } = useRouter();

  return (
    <section
      className="chelzoo-hero"
      data-testid="chelzoo-hero"
    >
      <div className="chelzoo-hero__decor chelzoo-hero__decor--left" />
      <div className="chelzoo-hero__decor chelzoo-hero__decor--right" />
      <div className="chelzoo-hero__wrapper">
        <h1 className={clsx(`chelzoo-hero__title`, {
          'chelzoo-hero__title--max-width-lg': locale !== `ru`,
        })}
        >
          {t(`title`)}
        </h1>
        <div className="chelzoo-hero__media">
          {renderMedia()}
        </div>
        <div className="chelzoo-hero__content">
          <span className="chelzoo-hero__label">
            {t(`yearLabel`)}
          </span>
          <h2 className="chelzoo-hero__subtitle">
            {t(`subtitle`)}
            {` `}
            —&nbsp;
            <SmartLink
              className="chelzoo-hero__link"
              href="https://chelzoo.ru/"
            >
              chelzoo.ru
            </SmartLink>
          </h2>
          <p className="chelzoo-hero__description">
            {t(`description`)}
          </p>
        </div>
      </div>
      <button
        type="button"
        aria-label={locale === `ru` ? `Перейти к следующей секции` : `Go to the next section`}
        onClick={() => {
          const element = document.getElementById(`chelzoo-about`);
          if (element) {
            element.scrollIntoView({
              behavior: `smooth`,
            });
          }
        }}
        className="chelzoo-hero__scroll-button"
      >
        <IconDownArrow />
      </button>
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
        src="/video/chelzoo-hero-video.mp4"
        playsInline
        loop
        muted
        autoPlay
      />
    );
  }
}
