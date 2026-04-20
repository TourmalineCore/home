import { useTranslation } from 'next-i18next';
import IconArrowCenter from '../../../icons/chelzoo-arrow-center.svg';
import IconCurvedArrow from '../../../icons/chelzoo-curved-arrow.svg';

type TestingTypes = {
  title: string;
  text: string;
}[];

export function ChelzooAutotests() {
  const {
    t,
  } = useTranslation(`chelzooAutotests`);

  const testingTypes: TestingTypes = t(`testingTypes`, {
    returnObjects: true,
  });

  return (
    <section
      className="chelzoo-autotests"
      data-testid="chelzoo-autotests"
    >
      <div className="container-cases chelzoo-autotests__wrapper">
        <h2 className="chelzoo-autotests__title">
          {t(`title`)}
        </h2>
        <ul className="chelzoo-autotests__list">
          {testingTypes.map(({
            title,
            text,
          }, index) => (
            <li
              key={title}
              className="chelzoo-autotests__item"
            >
              <div className="chelzoo-autotests__content">
                <span className="chelzoo-autotests__step">{index + 1}</span>
                <h3 className="chelzoo-autotests__subtitle">
                  {title}
                </h3>
                <p className="chelzoo-autotests__text">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="chelzoo-autotests__arrows">
          <IconCurvedArrow className="chelzoo-autotests__arrow chelzoo-autotests__arrow--left" />
          <IconArrowCenter className="chelzoo-autotests__arrow chelzoo-autotests__arrow--center" />
          <IconCurvedArrow className="chelzoo-autotests__arrow chelzoo-autotests__arrow--right" />
        </div>
        <div className="chelzoo-autotests__result">
          {t(`result`)}
        </div>
      </div>
    </section>
  );
}
