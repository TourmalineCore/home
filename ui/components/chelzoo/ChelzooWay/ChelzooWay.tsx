import { useTranslation } from "next-i18next";
import Image from 'next/image';
import Result from '../../../public/images/chelzoo-way-result.png';
import { useDeviceSize } from "../../../common/hooks";

type PreparationImage = {
  url: string;
  blurDataURL: string;
};

export function ChelzooWay() {
  const {
    t,
  } = useTranslation(`chelzooWay`);

  const {
    isMobile,
  } = useDeviceSize();

  const preparationImage: PreparationImage = t(`preparationImage`, {
    returnObjects: true,
  });

  const preparationImageMobile: PreparationImage = t(`preparationImageSmall`, {
    returnObjects: true,
  });

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
            src={isMobile ? preparationImageMobile.url : preparationImage.url}
            fill
            unoptimized
            placeholder="blur"
            blurDataURL={isMobile ? preparationImageMobile.blurDataURL : preparationImage.blurDataURL}
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
