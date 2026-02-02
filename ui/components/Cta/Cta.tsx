import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useBodyScrollHidden, usePath } from '../../common/hooks';
import { TechnologyPageAnchorLink } from '../../common/enums';
import { FormModal } from '../FormModal/FormModal';

export function Cta() {
  const {
    slicePathname,
  } = usePath();
  const [isOpen, setIsOpen] = useState(false);

  const {
    t,
  } = useTranslation(`cta`);

  useBodyScrollHidden(isOpen);

  return (
    <section
      id={TechnologyPageAnchorLink.Cta}
      className="cta"
    >
      <div className="container cta__wrapper">
        <div className={`cta__inner cta__inner--${slicePathname}`}>
          <h2 className="title-technology-type-1 cta__title">{t(`title`)}</h2>
          <a
            href="mailto:contact@tourmalinecore.com"
            className={`cta__button cta__button--${slicePathname}`}
          >
            {t(`buttonText`)}
          </a>
          {/* Todo: uncomment after editing the form */}
          {/* <PrimaryButton
            onClick={() => setIsOpen(true)}
            className={`cta__button cta__button--${slicePathname}`}
          >
            {t(`buttonText`)}
          </PrimaryButton> */}
          <div className="cta__image" />
        </div>
      </div>
      {isOpen && <FormModal setIsOpen={setIsOpen} />}
    </section>
  );
}
