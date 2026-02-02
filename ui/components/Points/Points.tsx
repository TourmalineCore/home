import { TechnologyPageAnchorLink } from '../../common/enums';
import { usePath, useTranslationNamespace } from '../../common/hooks';

export function Points() {
  const {
    slicePathname,
  } = usePath();
  const {
    t,
  } = useTranslationNamespace(`points`);

  const pointsList: string[] = t(`list`, {
    returnObjects: true,
  });

  return (
    <section
      id={TechnologyPageAnchorLink.Points}
      className="points"
    >
      <div className="container points__wrapper">
        <div className="points__inner">
          <h2 className="title-technology-type-1 points__title">{t(`title`)}</h2>
          <ul className={`points__list points__list--${slicePathname}`}>
            {pointsList.map((text) => (
              <li
                key={text}
                className={`points__item points__item--${slicePathname}`}
              >
                <span className="points__text">{text}</span>
              </li>
            ))}
          </ul>
          <div className={`points__image points__image--${slicePathname}`} />
        </div>
      </div>
    </section>
  );
}
