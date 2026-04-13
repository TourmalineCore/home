import Image from "next/image";
import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";
import MobileImg1 from "../../../public/images/img_impact-map.jpg";
import MobileImg2 from "../../../public/images/img_cjm.jpg";
import MobileImg3 from "../../../public/images/img_usm.jpg";
import MobileImg4 from "../../../public/images/img_concept.jpg";
import EngMobileImg4 from "../../../public/images/img_concept-eng.jpg";

import DesktopImg1 from "../../../public/images/img-full-impact-map.png";
import EngDesktopImg1 from "../../../public/images/img-impact-map-eng.jpg";
import DesktopImg2 from "../../../public/images/img-full-cjm.png";
import DesktopImg3 from "../../../public/images/img-full-usm.png";
import EngDesktopImg3 from "../../../public/images/img-usm-eng.png";
import DesktopImg4 from "../../../public/images/img-full-concept.png";
import EngDesktopImg4 from "../../../public/images/img-concept-eng.jpg";

export function ChelzooDiscovery() {
  const {
    t,
  } = useTranslation(`chelzooDiscovery`);

  const {
    locale,
  } = useRouter();

  const CARDS = [
    {
      id: 1,
      mobileImg: MobileImg1,
      desktopImg: locale === `ru` ? DesktopImg1 : EngDesktopImg1,
      label: `Impact map`,
    },
    {
      id: 2,
      mobileImg: MobileImg2,
      desktopImg: DesktopImg2,
      label: `Customer Journey Mapping`,
    },
    {
      id: 3,
      mobileImg: MobileImg3,
      desktopImg: locale === `ru` ? DesktopImg3 : EngDesktopImg3,
      label: `User Story Mapping`,
    },
    {
      id: 4,
      mobileImg: locale === `ru` ? MobileImg4 : EngMobileImg4,
      desktopImg: locale === `ru` ? DesktopImg4 : EngDesktopImg4,
      label: t(`label`),
    },
  ];

  return (
    <section
      className="chelzoo-discovery"
      data-testid="chelzoo-discovery"
    >
      <div className="chelzoo-discovery__wrapper">
        <h2 className="chelzoo-discovery__title">{t(`title`)}</h2>
        <div className="chelzoo-discovery__list">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="chelzoo-discovery__card"
            >
              <div className="chelzoo-discovery__image chelzoo-discovery__image--mobile">
                <Image
                  src={card.mobileImg}
                  fill
                  alt=""
                  placeholder="blur"
                />
              </div>
              <span className="chelzoo-discovery__label">{card.label}</span>
              <p className="chelzoo-discovery__text">{t(`cards.${card.id}`)}</p>
              <div className="chelzoo-discovery__image chelzoo-discovery__image--desktop">
                <Image
                  src={card.desktopImg}
                  fill
                  alt=""
                  placeholder="blur"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
