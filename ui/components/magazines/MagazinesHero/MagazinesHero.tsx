/* eslint-disable max-len */
import Image from "next/image";
import Link from "next/link";
import CoverOfTddMagazine from "../../../public/images/cover-of-tdd-magazine.jpg";
import NewLabel from '../../../icons/new.svg';

export function MagazinesHero() {
  return (
    <section
      className="magazines-hero"
      data-testid="magazines-hero"
    >
      <div className="container-redesign magazines-hero__wrapper">
        <h1 className="magazines-hero__title">Журналы</h1>
        <p className="magazines-hero__description">
          Разбираем технологии, подходы и процессы, из которых собираются цифровые продукты. Одна большая тема на номер: что решение меняет в деньгах и сроках, и как оно устроено внутри.
        </p>
        <Link
          href="/magazines/tourmaline-code-tdd-uwdc"
          className="magazines-hero__link"
        >
          <NewLabel className="magazines-hero__new-label" />
          <div className="magazines-hero__image-container">
            <Image
              src={CoverOfTddMagazine}
              fill
              placeholder="blur"
              alt=""
            />
          </div>
          <h2 className="magazines-hero__magazine-title">
            №1: про Test-Driven Development. Когда стоит писать тесты до кода?
          </h2>
        </Link>
      </div>
    </section>
  );
}
