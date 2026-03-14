import clsx from 'clsx';
import { usePath } from '../../common/hooks';

export function NamedList(
  {
    title,
    data,
    listClassName,
    titleClassName,
  }: {
    title: string;
    data: string[];
    listClassName?: string;
    titleClassName?: string;
  },
) {
  const {
    slicePathname,
  } = usePath();

  return (
    <div className={clsx(`named-list`, listClassName)}>
      <h4 className={clsx(`title-technology-type-3 named-list__title named-list__title--${slicePathname} ${titleClassName}`)}>{title}</h4>
      <ul className="named-list__items">
        {data.map((text) => (
          <li
            key={text}
            className="named-list__item"
          >
            <span className="title-technology-type-3 named-list__text">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
