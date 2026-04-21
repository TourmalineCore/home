import { useTranslation } from "next-i18next";
import Image from 'next/image';
import ReviewImage from "../../../public/images/chelzoo-review.jpg";

export function ChelzooReview() {
  const {
    t,
  } = useTranslation(`chelzooReview`);

  return (
    <section
      className="chelzoo-review"
      data-testid="chelzoo-review"
    >
      <div className="container-cases chelzoo-review__wrapper">
        <div className="chelzoo-review__image-wrapper">
          <Image
            src={ReviewImage}
            alt=""
            fill
            placeholder="blur"
          />
        </div>
        <div className="chelzoo-review__text">
          <div className="chelzoo-review__quote">{t(`quote`)}</div>
          <div className="chelzoo-review__author">{t(`author`)}</div>
        </div>
      </div>
    </section>
  );
}
