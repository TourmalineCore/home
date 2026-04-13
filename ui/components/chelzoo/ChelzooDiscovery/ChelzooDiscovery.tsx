import Image from "next/image";
import { useTranslation } from "next-i18next";

import MobileImg1 from "../../../public/images/img_impact-map.jpg";
import MobileImg2 from "../../../public/images/img_cjm.jpg";
import MobileImg3 from "../../../public/images/img_usm.jpg";
import MobileImg4 from "../../../public/images/img_concept.jpg";

import DesktopImg1 from "../../../public/images/img-full-impact-map.png";
import DesktopImg2 from "../../../public/images/img-full-cjm.png";
import DesktopImg3 from "../../../public/images/img-full-usm.png";
import DesktopImg4 from "../../../public/images/img-full-concept.png";

export function ChelzooDiscovery() {
  const {
    t,
  } = useTranslation(`chelzooDiscovery`);

  const CARDS = [
    {
      id: 1,
      mobileImg: MobileImg1,
      desktopImg: DesktopImg1,
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
      desktopImg: DesktopImg3,
      label: `User Story Mapping`,
    },
    {
      id: 4,
      mobileImg: MobileImg4,
      desktopImg: DesktopImg4,
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
