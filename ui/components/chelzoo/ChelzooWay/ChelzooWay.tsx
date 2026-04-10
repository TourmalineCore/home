import { useTranslation } from "next-i18next";
import Image from 'next/image';
import { useRouter } from "next/router";
import PreparationImage from '../../../public/images/chelzoo-way-preparation.png';
import PreparationImageEng from '../../../public/images/chelzoo-way-preparation-eng.png';
import Result from '../../../public/images/chelzoo-way-result.png';

export function ChelzooWay() {
  const {
    t,
  } = useTranslation(`chelzooWay`);

  const {
    locale,
  } = useRouter();

  return (
    <section
      className="chelzoo-way"
      data-testid="chelzoo-way"
    >
      <div className="container-cases chelzoo-way__wrapper">
        <h2 className="chelzoo-way__title">{t(`preparationTitle`)}</h2>
        <div
          className="chelzoo-way__preparation-image-container"
        >
          <div
            className="chelzoo-way__preparation-image-wrapper"
          >
            <Image
              src={locale === `ru` ? PreparationImage : PreparationImageEng}
              placeholder="blur"
              fill
              alt=""
            />
          </div>
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
