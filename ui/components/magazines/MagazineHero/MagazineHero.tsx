import Image from "next/image";
import { useTranslation } from "next-i18next";
import CoverOfTddMagazine from "../../../public/images/cover-of-tdd-magazine.jpg";

export function MagazineHero() {
  const {
    t,
  } = useTranslation(`magazineTddHero`);

  return (
    <section
      className="magazine-hero"
      data-testid="magazine-hero"
    >
      <div className="magazine-hero__wrapper">
        <h1 className="magazine-hero__title">{t(`title`)}</h1>
        <div className="magazine-hero__image-container">
          <Image
            src={CoverOfTddMagazine}
            fill
            placeholder="blur"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
