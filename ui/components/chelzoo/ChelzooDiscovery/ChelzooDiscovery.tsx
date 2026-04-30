import Image from "next/image";
import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";
import clsx from "clsx";
import MobileImage1 from "../../../public/images/chelzoo-discovery-impact-map-mobile.jpg";
import MobileImage2 from "../../../public/images/chelzoo-discovery-cjm-mobile.jpg";
import MobileImage3 from "../../../public/images/chelzoo-discovery-usm-mobile.jpg";
import MobileImage4 from "../../../public/images/chelzoo-discovery-concept-mobile.jpg";
import MobileImage4Eng from "../../../public/images/chelzoo-discovery-concept-mobile-eng.jpg";

import DesktopImage1 from "../../../public/images/chelzoo-discovery-impact-map.png";
import DesktopImage1Eng from "../../../public/images/chelzoo-discovery-impact-map-eng.jpg";
import DesktopImage2 from "../../../public/images/chelzoo-discovery-cjm.png";
import DesktopImage3 from "../../../public/images/chelzoo-discovery-usm.png";
import DesktopImage3Eng from "../../../public/images/chelzoo-discovery-usm-eng.png";
import DesktopImage4 from "../../../public/images/chelzoo-discovery-concept.png";
import DesktopImage4Eng from "../../../public/images/chelzoo-discovery-concept-eng.jpg";

export function ChelzooDiscovery() {
  const {
    t,
  } = useTranslation(`chelzooDiscovery`);

  const {
    locale,
  } = useRouter();

  const cards = [
    {
      id: 1,
      mobileImg: MobileImage1,
      desktopImg: locale === `ru` ? DesktopImage1 : DesktopImage1Eng,
      label: `Impact Mapping`,
      className: `impact-map`,
      text: t(`impactMapCardText`),
    },
    {
      id: 2,
      mobileImg: MobileImage2,
      desktopImg: DesktopImage2,
      label: `Customer Journey Mapping`,
      className: `cjm`,
      text: t(`cjmCardText`),
    },
    {
      id: 3,
      mobileImg: MobileImage3,
      desktopImg: locale === `ru` ? DesktopImage3 : DesktopImage3Eng,
      label: `User Story Mapping`,
      className: `usm`,
      text: t(`usmCardText`),
    },
    {
      id: 4,
      mobileImg: locale === `ru` ? MobileImage4 : MobileImage4Eng,
      desktopImg: locale === `ru` ? DesktopImage4 : DesktopImage4Eng,
      label: t(`label`),
      className: `concepts`,
      text: t(`conceptsCardText`),
    },
  ];

  return (
    <section
      className="chelzoo-discovery"
      data-testid="chelzoo-discovery"
    >
      <div className="container-cases chelzoo-discovery__wrapper">
        <h2 className="chelzoo-discovery__title">{t(`title`)}</h2>
        <ul className="chelzoo-discovery__list">
          {cards.map((card) => (
            <li
              key={card.id}
              className={clsx(`chelzoo-discovery__card`, `chelzoo-discovery__card--${card.className}`)}
            >
              <div className={clsx(
                `chelzoo-discovery__image chelzoo-discovery__image--mobile`,
                `chelzoo-discovery__image--${card.className}`,
              )}
              >
                <Image
                  src={card.mobileImg}
                  fill
                  alt=""
                  placeholder="blur"
                />
              </div>
              <span className={clsx(`chelzoo-discovery__label`, `chelzoo-discovery__label--${card.className}`)}>
                {card.label}
              </span>
              <p className={clsx(`chelzoo-discovery__text`, `chelzoo-discovery__text--${card.className}`)}>
                {card.text}
              </p>
              <div className={clsx(
                `chelzoo-discovery__image--${card.className}`,
                `chelzoo-discovery__image chelzoo-discovery__image--desktop`,
              )}
              >
                <Image
                  src={card.desktopImg}
                  fill
                  alt=""
                  placeholder="blur"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
