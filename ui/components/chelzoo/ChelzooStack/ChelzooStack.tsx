import { useTranslation } from 'next-i18next';

export function ChelzooStack() {
  const {
    t,
  } = useTranslation(`chelzooStack`);

  return (
    <section
      className="chelzoo-stack"
      data-testid="chelzoo-stack"
    >
      <div className="container-cases chelzoo-stack__wrapper">
        <h2 className="chelzoo-stack__title">
          {t(`title`)}
        </h2>
        <p className="chelzoo-stack__description">
          {t(`description`)}
        </p>
      </div>
    </section>
  );
}
