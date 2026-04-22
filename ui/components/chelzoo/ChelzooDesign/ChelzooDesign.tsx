import { useTranslation } from "next-i18next";
import Image from "next/image";
import ConceptImage from '../../../public/images/chelzoo-design-concept.jpg';
import IllustrationsImage from '../../../public/images/chelzoo-design-illustrations.jpg';
import PhotosImage from '../../../public/images/chelzoo-design-photos.jpg';
import TypographyImage from '../../../public/images/chelzoo-design-typography.jpg';
import { DesignCard } from "./components/DesignCard/DesignCard";

type CardInfo = {
  title: string;
  description: string;
};

export function ChelzooDesign() {
  const {
    t,
  } = useTranslation(`chelzooDesign`);

  const concept: CardInfo = t(`concept`, {
    returnObjects: true,
  });

  const illustration: CardInfo = t(`illustrations`, {
    returnObjects: true,
  });

  const photos: CardInfo = t(`photos`, {
    returnObjects: true,
  });

  const typography: CardInfo = t(`typography`, {
    returnObjects: true,
  });

  return (
    <section
      className="chelzoo-design"
      data-testid="chelzoo-design"
    >
      <div className="container-cases chelzoo-design__wrapper">
        <ul className="chelzoo-design__cards grid">
          <li className="chelzoo-design__item col-tablet-12 col-tablet-xl-4">
            <h2 className="chelzoo-design__title">{t(`title`)}</h2>
            <div className="chelzoo-design__description">{t(`description`)}</div>
          </li>
          <li className="chelzoo-design__item col-tablet-6 col-tablet-xl-4">
            <div className="chelzoo-design__image-container">
              <Image
                src={ConceptImage}
                fill
                alt=""
              />
            </div>
          </li>
          <DesignCard
            title={concept.title}
            description={concept.description}
            className="chelzoo-design__item col-tablet-6 col-tablet-xl-4"
            theme="purple"
          />
          <li className="chelzoo-design__item col-tablet-6 col-tablet-xl-4">
            <div className="chelzoo-design__image-container">
              <Image
                src={IllustrationsImage}
                fill
                alt=""
              />
            </div>
          </li>
          <DesignCard
            title={illustration.title}
            description={illustration.description}
            className="chelzoo-design__item col-tablet-6 col-tablet-xl-4"
            theme="pink"
          />
          <li className="chelzoo-design__item col-tablet-6 col-tablet-xl-4">
            <div className="chelzoo-design__image-container">
              <Image
                src={PhotosImage}
                fill
                alt=""
              />
            </div>
          </li>
          <DesignCard
            title={photos.title}
            description={photos.description}
            className="chelzoo-design__item col-tablet-6 col-tablet-xl-4"
            theme="yellow"
          />
          <li className="chelzoo-design__item col-tablet-6 col-tablet-xl-4">
            <div className="chelzoo-design__image-container">
              <Image
                src={TypographyImage}
                fill
                alt=""
              />
            </div>
          </li>
          <DesignCard
            title={typography.title}
            description={typography.description}
            className="chelzoo-design__item col-tablet-6 col-tablet-xl-4"
            theme="green"
          />
        </ul>
      </div>
    </section>
  );
}
