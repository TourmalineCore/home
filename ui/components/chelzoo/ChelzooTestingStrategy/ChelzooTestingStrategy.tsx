import { useTranslation } from 'next-i18next';

type TestingTypes = {
  label: string;
  title: string;
  text: string;
}[];

export function ChelzooTestingStrategy() {
  const {
    t,
  } = useTranslation(`chelzooTestingStrategy`);

  const testingTypes: TestingTypes = t(`testingTypes`, {
    returnObjects: true,
  });

  return (
    <section
      className="chelzoo-testing-strategy"
      data-testid="chelzoo-testing-strategy"
    >
      <div className="container-cases chelzoo-testing-strategy__wrapper">
        <h2 className="chelzoo-testing-strategy__title">
          {t(`title`)}
        </h2>
        <p className="chelzoo-testing-strategy__description">
          {t(`description`)}
        </p>
        <ul className="chelzoo-testing-strategy__list">
          {testingTypes.map(({
            label,
            title,
            text,
          }) => (
            <li
              key={title}
              className="chelzoo-testing-strategy__item"
            >
              <div className="chelzoo-testing-strategy__content">
                <span className="chelzoo-testing-strategy__label">
                  {label}
                </span>
                <h3 className="chelzoo-testing-strategy__subtitle">
                  {title}
                </h3>
                <p className="chelzoo-testing-strategy__text">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <a
          className="chelzoo-testing-strategy__link"
          href="https://heisenbug.ru/archive/2025%20Spring/talks/2f023c42771843ff8efb2e9aeb9aa1e5/"
          target="_blank"
          rel="noreferrer"
        >
          {t(`linkText`)}
          {` `}
          →
        </a>
      </div>
    </section>
  );
}
