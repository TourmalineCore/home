import { useTranslation } from "next-i18next";
import Image from 'next/image';
import { useRouter } from "next/router";
import ResultImage from '../../../public/images/chelzoo-promo-result.png';
import ResultImageEng from '../../../public/images/chelzoo-promo-result-eng.png';

export function ChelzooPromo() {
  const {
    t,
  } = useTranslation(`chelzooPromo`);

  const {
    locale,
  } = useRouter();

  return (
    <section
      className="chelzoo-promo"
      data-testid="chelzoo-promo"
    >
      <div className="container-cases chelzoo-promo__wrapper">
        <h2 className="chelzoo-promo__title">{t(`title`)}</h2>
        <div className="chelzoo-promo__image-container">
          <Image
            src={locale === `ru` ? ResultImage : ResultImageEng}
            fill
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
