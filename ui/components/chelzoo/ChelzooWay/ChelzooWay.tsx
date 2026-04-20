import { useTranslation } from "next-i18next";
import Image from 'next/image';
import { useRouter } from "next/router";
import Result from '../../../public/images/chelzoo-way-result.png';
import { useDeviceSize } from "../../../common/hooks";

export function ChelzooWay() {
  const {
    t,
  } = useTranslation(`chelzooWay`);

  const {
    locale,
  } = useRouter();

  const {
    isMobile,
  } = useDeviceSize();

  const preparationImage = {
    ru: isMobile ? `/images/chelzoo-way-preparation-mobile.svg` : `/images/chelzoo-way-preparation.svg`,
    eng: isMobile ? `/images/chelzoo-way-preparation-mobile-eng.svg` : `/images/chelzoo-way-preparation-eng.svg`,
  };

  return (
    <section
      className="chelzoo-way"
      data-testid="chelzoo-way"
    >
      <div className="container-cases chelzoo-way__wrapper">
        <h2 className="chelzoo-way__title">{t(`preparationTitle`)}</h2>
        <div
          className="chelzoo-way__preparation-image-wrapper"
        >
          <Image
            src={locale === `ru` ? preparationImage.ru : preparationImage.eng}
            fill
            unoptimized
            alt=""
          />
        </div>

        <h2 className="chelzoo-way__title">{t(`resultTitle`)}</h2>
        <div className="chelzoo-way__result-image-container">
          <Image
            src={Result}
            fill
            placeholder="blur"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
