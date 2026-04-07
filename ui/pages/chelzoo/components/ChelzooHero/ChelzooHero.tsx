import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import IconDownArrow from '../../../../icons/icon-arrow-down-chelzoo.svg';

export function ChelzooHero({
  isComponentPage,
}:{
  isComponentPage?: boolean;
}) {
  const {
    t,
  } = useTranslation(`chelzooHero`);

  return (
    <section
      className="chelzoo-hero"
      data-testid="chelzoo-hero"
    >
      <div className="chelzoo-hero__decor chelzoo-hero__decor--left" />
      <div className="chelzoo-hero__decor chelzoo-hero__decor--right" />
      <div className="container-cases chelzoo-hero__wrapper">
        <h1 className="chelzoo-hero__title">
          {t(`title`)}
        </h1>
        <div className="chelzoo-hero__media">
          {
            isComponentPage
              ? (
                <Image
                  src="/images/hero-slider-image-6.png"
                  alt=""
                  fill
                />
              ) : (
                <video
                  src={t(`videoUrl`)}
                  playsInline
                  loop
                  muted
                  autoPlay
                />
              )
          }
        </div>
        <div className="chelzoo-hero__content">
          <span className="chelzoo-hero__label">
            {t(`yearLabel`)}
          </span>
          <h3 className="chelzoo-hero__subtitle">
            {t(`subtitle`)}
          </h3>
          <p className="chelzoo-hero__description">
            {t(`description`)}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="chelzoo-hero__scroll-button"
      >
        <IconDownArrow />
      </button>
    </section>
  );
}
