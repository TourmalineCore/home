import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";

export function ChelzooAdaptation() {
  const {
    t,
  } = useTranslation(`chelzooAdaptation`);

  const {
    locale,
  } = useRouter();

  return (
    <section
      className="chelzoo-adaptation"
      data-testid="chelzoo-adaptation"
    >
      <div className="chelzoo-adaptation__wrapper">
        <h2 className="chelzoo-adaptation__title">{t(`title`)}</h2>
      </div>
    </section>
  );
}
