import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import DevImage from "../../../public/images/chelzoo-accessibility-dev.jpg";
import DevImageEng from "../../../public/images/chelzoo-accessibility-dev-eng.jpg";
import ColorImage from "../../../public/images/chelzoo-accessibility-color.jpg";
import ColorImageEng from "../../../public/images/chelzoo-accessibility-color-eng.jpg";
import TypographyImage from "../../../public/images/chelzoo-accessibility-typography.jpg";
import TypographyImageEng from "../../../public/images/chelzoo-accessibility-typography-eng.jpg";

export function ChelzooAccessibility() {
  const {
    t,
  } = useTranslation(`chelzooAccessibility`);

  const {
    locale,
  } = useRouter();

  return (
    <section
      className="chelzoo-accessibility"
      data-testid="chelzoo-accessibility"
    >
      <div className="container-cases chelzoo-accessibility__wrapper">
        <h2 className="chelzoo-accessibility__title">{t(`title`)}</h2>
        <div className="chelzoo-accessibility__description">{t(`description`)}</div>
        <div className="chelzoo-accessibility__images">
          <div className="chelzoo-accessibility__image-container chelzoo-accessibility__image-container--dev">
            <Image
              src={locale === `ru` ? DevImage : DevImageEng}
              fill
              placeholder="blur"
              alt="Семантическая верстка"
            />
          </div>

          <div className="chelzoo-accessibility__image-container chelzoo-accessibility__image-container--color">
            <Image
              src={locale === `ru` ? ColorImage : ColorImageEng}
              fill
              placeholder="blur"
              alt="Колористика по WCAG"
            />
          </div>

          <div className="chelzoo-accessibility__image-container chelzoo-accessibility__image-container--typography">
            <Image
              src={locale === `ru` ? TypographyImage : TypographyImageEng}
              fill
              placeholder="blur"
              alt="Иерархия типографики"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
