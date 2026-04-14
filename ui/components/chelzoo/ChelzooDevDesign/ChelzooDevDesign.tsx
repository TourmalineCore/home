import Image from 'next/image';
import { useTranslation } from "next-i18next";
import { useDeviceSize } from "../../../common/hooks";
import TaskImage from "../../../public/images/img-chelzoo-dev-design.jpg";

export function ChelzooDevDesign() {
  const {
    t,
  } = useTranslation(`chelzooDevDesign`);

  const {
    isMobile,
  } = useDeviceSize();

  return (
    <section
      className="chelzoo-dev-design"
      data-testid="chelzoo-dev-design"
    >
      <div className="container-cases chelzoo-dev-design__wrapper">
        <h2 className="chelzoo-dev-design__title">
          {isMobile ? t(`titleMobile`) : t(`title`)}
          {` `}
          <span
            className="chelzoo-dev-design__heart"
          >
            ❤
          </span>
        </h2>
        <p className="chelzoo-dev-design__description">
          {t(`description`)}
        </p>
        <div className="chelzoo-dev-design__image-wrapper">
          <Image
            className="chelzoo-dev-design__image"
            src={TaskImage}
            alt=""
            fill
            placeholder="blur"
          />
        </div>
        <a
          className="chelzoo-dev-design__link"
          href={t(`link`)}
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
