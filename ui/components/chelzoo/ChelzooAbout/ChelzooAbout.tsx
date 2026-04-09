import { useTranslation } from "next-i18next";
import Image from 'next/image';
import { useRouter } from "next/router";
import OldChelzoo from '../../../public/images/chelzoo-old-zoo.jpg';
import NewChelzoo from '../../../public/images/chelzoo-new-zoo.jpg';
import NewChelzooEng from '../../../public/images/chelzoo-new-zoo-eng.jpg';
import IconPinkArrow from '../../../icons/icon-pink-arrow.svg';

export function ChelzooAbout() {
  const {
    t,
  } = useTranslation(`chelzooAbout`);

  const {
    locale,
  } = useRouter();

  return (
    <section
      id="chelzoo-about"
      className="chelzoo-about"
      data-testid="chelzoo-about"
    >
      <div className="container-cases chelzoo-about__wrapper">
        <h2 className="chelzoo-about__title">{t(`title`)}</h2>
        <div className="chelzoo-about__description">{t(`description`)}</div>
        <div className="chelzoo-about__images">
          <div className="chelzoo-about__old-image-container">
            <Image
              src={OldChelzoo}
              fill
              placeholder="blur"
              alt=""
            />
          </div>
          <span className="chelzoo-about__arrow">
            <IconPinkArrow />
          </span>
          <div className="chelzoo-about__new-image-container">
            <Image
              src={locale === `ru` ? NewChelzoo : NewChelzooEng}
              fill
              placeholder="blur"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
