import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import clsx from "clsx";
import ImageDesktopXL from "../../../public/images/chelzoo-1920.png";
import ImageDesktop from "../../../public/images/chelzoo-1366.png";
import ImageTabletXL from "../../../public/images/chelzoo-1024.png";
import ImageTablet from "../../../public/images/chelzoo-768.png";
import ImageMobile from "../../../public/images/chelzoo-375.png";

import Mockup from "../../../public/images/chelzoo-mockup-lemon.jpg";
import MockupEng from "../../../public/images/chelzoo-mockup-lemon-eng.jpg";

export function ChelzooAdaptation() {
  const {
    t,
  } = useTranslation(`chelzooAdaptation`);

  const {
    locale,
  } = useRouter();

  const adaptations = [
    {
      id: 1,
      image: ImageDesktopXL,
      label: `1920`,
    },
    {
      id: 2,
      image: ImageDesktop,
      label: `1366`,
    },
    {
      id: 3,
      image: ImageTabletXL,
      label: `1024`,
    },
    {
      id: 4,
      image: ImageTablet,
      label: `768`,
    },
    {
      id: 5,
      image: ImageMobile,
      label: `375`,
    },
  ];

  return (
    <section
      className="chelzoo-adaptation"
      data-testid="chelzoo-adaptation"
    >
      <div className="chelzoo-adaptation__container">
        <div className="chelzoo-adaptation__wrapper">
          <h2 className="chelzoo-adaptation__title">{t(`title`)}</h2>
          <div className="chelzoo-adaptation__mockup">
            <Image
              src={locale === `ru` ? Mockup : MockupEng}
              fill
              placeholder="blur"
              alt=""
            />
          </div>
          <ul className="chelzoo-adaptation__list">
            {adaptations.map((adaptation) => (
              <li key={adaptation.id}>
                <span className="chelzoo-adaptation__label">
                  {adaptation.label}
                  px
                </span>
                <div className={clsx(
                  `chelzoo-adaptation__image-wrapper`,
                  `chelzoo-adaptation__image-wrapper--${adaptation.label}`,
                )}
                >
                  <Image
                    src={adaptation.image}
                    fill
                    alt=""
                    placeholder="blur"
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="chelzoo-adaptation__decorate" />
        </div>
      </div>
    </section>
  );
}
