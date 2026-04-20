import { useTranslation } from "next-i18next";
import Image from 'next/image';
import ReviewImg from "../../../public/images/chelzoo-review.png";

export function ChelzooReview() {
  const {
    t,
  } = useTranslation(`chelzooReview`);

  return (
    <section
      className="chelzoo-review"
      data-testid="chelzoo-review"
    >
      <div className="chelzoo-review__wrapper">
        <div className="chelzoo-review__image-wrapper">
          <Image
            className="chelzoo-review__image"
            src={ReviewImg}
            alt=""
            fill
            placeholder="blur"
          />
        </div>
        <div className="chelzoo-review__quote">{t(`quote`)}</div>
        <div className="chelzoo-review__author">{t(`author`)}</div>
      </div>
    </section>
  );
}
