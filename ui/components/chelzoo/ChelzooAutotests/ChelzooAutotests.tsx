import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import ArrowCenter from '../../../public/images/chelzoo-arrow-center.png';
import ArrowLeft from '../../../public/images/chelzoo-arrow-left.png';
import ArrowRight from '../../../public/images/chelzoo-arrow-right.png';

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
          <Image
            className="chelzoo-autotests__arrow chelzoo-autotests__arrow--left"
            src={ArrowLeft}
            alt=""
          />
          <Image
            className="chelzoo-autotests__arrow chelzoo-autotests__arrow--center"
            src={ArrowCenter}
            alt=""
          />
          <Image
            className="chelzoo-autotests__arrow chelzoo-autotests__arrow--right"
            src={ArrowRight}
            alt=""
          />
        </div>
        <div className="chelzoo-autotests__result">
          {t(`result`)}
        </div>
      </div>
    </section>
  );
}
