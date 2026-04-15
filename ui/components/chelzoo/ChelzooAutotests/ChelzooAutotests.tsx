import { useTranslation } from 'next-i18next';

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
          }) => (
            <li
              key={title}
              className="chelzoo-autotests__item"
            >
              <div className="chelzoo-autotests__content">

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
        <div className="chelzoo-autotests__result">
          {t(`result`)}
        </div>
      </div>
    </section>
  );
}
