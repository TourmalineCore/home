import { useTranslation } from "next-i18next";

export function ChelzooCMS() {
  const {
    t,
  } = useTranslation(`chelzooCMS`);

  return (
    <section
      className="chelzoo-cms"
      data-testid="chelzoo-cms"
    >
      <div className="container-cases chelzoo-cms__wrapper">
        <h1 className="chelzoo-cms__title">
          {t(`title`)}
        </h1>
        {` `}
        <p className="chelzoo-cms__description">
          {t(`description`)}
        </p>
      </div>
    </section>
  );
}
