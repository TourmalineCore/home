import { useTranslation } from "next-i18next";
import Image from 'next/image';
import { useRouter } from "next/router";
import ResultImage from '../../../public/images/chelzoo-way-result.png';
import ResultImageEng from '../../../public/images/chelzoo-way-result-eng.png';
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
            src={isMobile ? t(`preparationImageSmallUrl`) : t(`preparationImageUrl`)}
            fill
            unoptimized
            alt=""
          />
        </div>

        <h2 className="chelzoo-way__title">{t(`resultTitle`)}</h2>
        <div className="chelzoo-way__result-image-container">
          <Image
            src={locale === `ru` ? ResultImage : ResultImageEng}
            fill
            placeholder="blur"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
