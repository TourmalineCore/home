import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import CoverOfTddMagazine from "../../../public/images/cover-of-tdd-magazine.png";
import CoverOfTddMagazineRu from "../../../public/images/cover-of-tdd-magazine-ru.jpg";
import NewLabel from '../../../icons/new.svg';

export function MagazinesHero() {
  const {
    locale,
  } = useRouter();

  const {
    t,
  } = useTranslation(`magazinesHero`);

  const cover = locale === `ru` ? CoverOfTddMagazineRu : CoverOfTddMagazine;

  return (
    <section
      className="magazines-hero"
      data-testid="magazines-hero"
    >
      <div className="container-redesign magazines-hero__wrapper">
        <h1 className="magazines-hero__title">{t(`title`)}</h1>
        <p className="magazines-hero__description">
          {t(`description`)}
        </p>
        <Link
          href="/magazines/tourmaline-code-about-tdd"
          className="magazines-hero__link"
        >
          <NewLabel className="magazines-hero__new-label" />
          <div className="magazines-hero__image-container">
            <Image
              src={cover}
              fill
              placeholder="blur"
              alt=""
            />
          </div>
          <h2 className="magazines-hero__magazine-title">
            {t(`tddMagazineTitle`)}
          </h2>
        </Link>
      </div>
    </section>
  );
}
