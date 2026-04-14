import { useTranslation } from "next-i18next";

export function ChelzooDevDesign() {
  const {
    t,
  } = useTranslation(`chelzooDevDesign`);

  return (
    <section
      className="chelzoo-dev-design"
      data-testid="chelzoo-dev-design"
    >
      <div className="container-cases chelzoo-dev-design__wrapper">
        <h2 className="chelzoo-dev-design__title">
          {t(`title`)}
        </h2>
        <p className="chelzoo-dev-design__description">
          {t(`description`)}
        </p>
      </div>
    </section>
  );
}
