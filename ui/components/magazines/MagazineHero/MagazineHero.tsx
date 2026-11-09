import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import CoverOfTddMagazine from "../../../public/images/cover-of-tdd-magazine.png";
import CoverOfTddMagazineRu from "../../../public/images/cover-of-tdd-magazine-ru.jpg";

export function MagazineHero() {
  const {
    locale,
  } = useRouter();

  const {
    t,
  } = useTranslation(`magazineTddHero`);

  const cover = locale === `ru` ? CoverOfTddMagazineRu : CoverOfTddMagazine;

  return (
    <section
      className="magazine-hero"
      data-testid="magazine-hero"
    >
      <div className="magazine-hero__wrapper">
        <h1 className="magazine-hero__title">{t(`title`)}</h1>
        <div className="magazine-hero__image-container">
          <Image
            src={cover}
            fill
            placeholder="blur"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
