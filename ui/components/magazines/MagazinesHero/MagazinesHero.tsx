import Image from "next/image";
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
          Рассказываем истории про то, как принимались решения, что из этого получалось и какие выводы помогли делать следующие проекты лучше
        </p>
        <a className="magazines-hero__link">
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
            Первый номер нашего журнала про Test-Driven Development
          </h2>
        </a>
      </div>
    </section>
  );
}
