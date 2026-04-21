import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type Steps = {
  title: string;
  description: string;
}[];

export function ChelzooInfrastructure() {
  const {
    t,
  } = useTranslation(`chelzooInfrastructure`);

  const {
    locale,
  } = useRouter();

  const steps: Steps = t(`steps`, {
    returnObjects: true,
  });

  return (
    <section
      className="chelzoo-infrastructure"
      data-testid="chelzoo-infrastructure"
    >
      <div className="container-cases chelzoo-infrastructure__wrapper">
        <h2 className="chelzoo-infrastructure__title">{t(`title`)}</h2>
        <ul className="chelzoo-infrastructure__steps grid">
          {steps.map(({
            title,
            description,
          }) => (
            <li
              key={title}
              className={clsx(`chelzoo-infrastructure__step col-tablet-6`, {
                'chelzoo-infrastructure__step--eng': locale !== `ru`,
              })}
            >
              <div className="chelzoo-infrastructure__step-inner">
                <h3 className="chelzoo-infrastructure__step-title">{title}</h3>
                <div className="chelzoo-infrastructure__step-description">{description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
