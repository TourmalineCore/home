import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useBodyScrollHidden, useIsRussianCountry, usePath } from '../../common/hooks';
import { TechnologyPageAnchorLink } from '../../common/enums';
import { FormModal } from '../FormModal/FormModal';
import { PrimaryButton } from '../PrimaryButton/PrimaryButton';

export function Cta() {
  const {
    slicePathname,
  } = usePath();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    t,
  } = useTranslation(`cta`);

  useBodyScrollHidden(isModalOpen);

  const isCountryRus = useIsRussianCountry();

  return (
    <section
      id={TechnologyPageAnchorLink.Cta}
      className="cta"
    >
      <div className="container cta__wrapper">
        <div className={`cta__inner cta__inner--${slicePathname}`}>
          <h2 className="title-technology-type-1 cta__title">{t(`title`)}</h2>
          {isCountryRus ? (
            <PrimaryButton
              onClick={() => setIsModalOpen(true)}
              className={`cta__button cta__button--${slicePathname}`}
            >
              {t(`buttonText`)}
            </PrimaryButton>
          ) : (
            <a
              href="mailto:contact@tourmalinecore.com"
              className={`cta__button cta__button--${slicePathname}`}
              role="button"
            >
              {t(`buttonText`)}
            </a>
          )}
          <div className="cta__image" />
        </div>
      </div>
      <FormModal
        onCloseModal={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
      />
    </section>
  );
}
