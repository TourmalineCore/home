import clsx from 'clsx';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  useBodyScrollHidden,
  useIsRussianCountry,
  usePath,
  useTranslationNamespace,
} from '../../common/hooks';
import { isChineseLanguage } from '../../common/utils';
import { FormModal } from '../FormModal/FormModal';

export function HeroBlockTechnology() {
  const {
    slicePathname,
  } = usePath();
  const [isOpen, setIsOpen] = useState(false);
  const {
    locale,
  } = useRouter();
  const {
    t,
  } = useTranslationNamespace(`hero`);

  useBodyScrollHidden(isOpen);

  const isCountryRus = useIsRussianCountry();

  return (
    <section className={clsx(`hero-block-technology`, {
      'hero-block-technology--zh': isChineseLanguage(locale),
    })}
    >
      <div className="container hero-block-technology__wrapper">
        <div className="hero-block-technology__inner">
          <h1 className="hero-block-technology__title">{t(`title`)}</h1>
          <h2 className="hero-block-technology__description">{t(`description`)}</h2>
          {isCountryRus ? (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={`hero-block-technology__button hero-block-technology__button--${slicePathname}`}
            >
              <span className="hero-block-technology__button-text">{t(`buttonText`)}</span>
            </button>
          ) : (
            <a
              href="mailto:contact@tourmalinecore.com"
              role="button"
              className={`hero-block-technology__button hero-block-technology__button--${slicePathname}`}
            >
              <span className="hero-block-technology__button-text">{t(`buttonText`)}</span>
            </a>
          )}
        </div>
        <picture className="hero-block-technology__image">
          <source
            srcSet={`/images/hero-${slicePathname}-element-desktop.webp`}
            media="(min-width: 1024px)"
          />
          <source
            srcSet={`/images/hero-${slicePathname}-element-tablet.webp`}
            media="(min-width: 768px)"
          />
          <img
            srcSet={`/images/hero-${slicePathname}-element-mobile.webp`}
            alt="heroImage"
          />
        </picture>
      </div>
      {isOpen && <FormModal setIsOpen={setIsOpen} />}
    </section>
  );
}
