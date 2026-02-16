import { NamedList } from '../NamedList/NamedList';
import { TechnologyPageAnchorLink } from '../../common/enums';
import { usePath, useTranslationNamespace } from '../../common/hooks';

type StackList = {
  title: string;
  data: string[];
}[];

export function Stack() {
  const {
    slicePathname,
  } = usePath();

  const {
    t,
  } = useTranslationNamespace(`stack`);

  const stackList: StackList = t(`list`, {
    returnObjects: true,
  });

  return (
    <section
      id={TechnologyPageAnchorLink.Stack}
      className="stack"
    >
      <div className="container stack__wrapper">
        <div className="stack__inner">
          <h2 className="title-technology-type-1 stack__title">{t(`title`)}</h2>
          <div className="stack__list">
            {stackList.map(({
              title, data,
            }) => (
              <NamedList
                key={title}
                title={title}
                data={data}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={`stack__image stack__image--${slicePathname}`} />
    </section>
  );
}
