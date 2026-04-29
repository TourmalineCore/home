/* eslint-disable jsx-a11y/no-static-element-interactions */
import Image, { StaticImageData } from "next/image";
import { useTranslation } from "next-i18next";

import DevOpsImage from "../../../public/images/chelzoo-hohma.jpg";
import KuberImage from "../../../public/images/chelzoo-devoops.jpg";
import FrontendImage from "../../../public/images/chelzoo-jora.jpg";
import SiteImage from "../../../public/images/chelzoo-uwds.jpg";
import TestsImage from "../../../public/images/chelzoo-sudno.jpg";
import DesignImage from "../../../public/images/chelzoo-soon.jpg";
import { SmartLink } from "../../SmartLink/SmartLink";
import { useHorizontalDragScroll } from "../../../common/hooks/useHorizontalDragScroll";

export function ChelzooLinks() {
  const {
    t,
  } = useTranslation(`chelzooLinks`);

  const {
    containerRef,
    hasDragged,
    handleMouseDown,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
  } = useHorizontalDragScroll();

  const cards = [
    {
      id: 1,
      image: DevOpsImage,
      text: t(`textDevOps`),
      link: `https://devoops.ru/talks/75b5985c7c5844bf9cfe92ec501900eb/?referer=%2Fpersons%2F0ba5b628344e4e1d89edf1ebafca8b6f%2F`,
    },
    {
      id: 2,
      image: KuberImage,
      text: t(`textKuber`),
      link: `https://youtu.be/Xn8qtCbTffM?si=FVn_x1wmFQ-Pkj1X`,
    },
    {
      id: 3,
      image: FrontendImage,
      text: t(`textFrontend`),
      link: `https://vk.com/wall-215630045_158`,
    },
    {
      id: 4,
      image: SiteImage,
      text: t(`textSite`),
      link: `https://youtu.be/YWa3eklu5yE?si=SZ1u_ALqPhs43jrJ`,
    },
    {
      id: 5,
      image: TestsImage,
      text: t(`textTests`),
      link: `https://heisenbug.ru/archive/2025%20Spring/talks/2f023c42771843ff8efb2e9aeb9aa1e5/`,
    },
    {
      id: 6,
      image: DesignImage,
      text: t(`textDesign`),
      link: ``,
    },
  ];

  return (
    <section
      className="chelzoo-links"
      data-testid="chelzoo-links"
    >
      <div className="chelzoo-links__wrapper">
        <h2 className="chelzoo-links__title">{t(`title`)}</h2>
        <div
          className="chelzoo-links__list-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <ul
            className="chelzoo-links__list"
            ref={containerRef}
          >
            {cards.map(({
              id,
              text,
              link,
              image,
            }) => (
              <li
                key={id}
                className="chelzoo-links__card"
              >
                {renderCardContent({
                  text,
                  link,
                  image,
                  hasDragged,
                })}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function renderCardContent({
  text,
  link,
  image,
  hasDragged,
}: {
  text: string;
  link: string;
  image: StaticImageData;
  hasDragged: boolean;
}) {
  if (link) {
    return (
      <SmartLink
        className="chelzoo-links__link"
        href={link}
        onClick={(e) => {
          if (hasDragged) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div className="chelzoo-links__image-wrapper">
          <Image
            src={image}
            fill
            alt=""
            placeholder="blur"
          />
        </div>
        {text}
      </SmartLink>
    );
  }

  return (
    <div>
      <div className="chelzoo-links__image-wrapper">
        <Image
          src={image}
          fill
          alt=""
          placeholder="blur"
        />
      </div>

      {text}
    </div>
  );
}
