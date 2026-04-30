import Image from 'next/image';
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';
import { useDeviceSize } from "../../../common/hooks";
import DevDesignImage from "../../../public/images/chelzoo-dev-design.jpg";
import DevDesignImageEng from "../../../public/images/chelzoo-dev-design-eng.jpg";
import { SmartLink } from '../../SmartLink/SmartLink';

export function ChelzooDevDesign() {
  const {
    t,
  } = useTranslation(`chelzooDevDesign`);

  const {
    isMobile,
  } = useDeviceSize();

  const {
    locale,
  } = useRouter();

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
            src={locale === `ru` ? DevDesignImage : DevDesignImageEng}
            alt=""
            fill
            placeholder="blur"
          />
        </div>
        <div className="chelzoo-dev-design__link-wrapper">
          <SmartLink
            className="chelzoo-dev-design__link"
            href="https://vk.com/wall-215630045_158"
          >
            {t(`linkText`)}
            {` `}
            →
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
