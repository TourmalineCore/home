import { useTranslation } from "next-i18next";

export function ChelzooDiscovery() {
  const {
    t,
  } = useTranslation(`chelzooDiscovery`);

  return (
    <section
      className="chelzoo-discovery"
      data-testid="chelzoo-discovery"
    >
      <div className="chelzoo-discovery__wrapper">
        <h2 className="chelzoo-discovery__title">{t(`title`)}</h2>
      </div>
    </section>
  );
}
