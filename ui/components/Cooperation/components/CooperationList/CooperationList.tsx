import { usePath } from '../../../../common/hooks';
import { Cooperations } from '../../types';

export function CooperationList({
  list,
}: {
  list: Cooperations;
}) {
  const {
    slicePathname,
  } = usePath();

  return (
    <ul className="cooperation-list">
      {list.map(({
        title, description,
      }) => (
        <li
          key={title}
          className="cooperation-list__item"
        >
          <h3 className="title-technology-type-2 cooperation-list__title">{title}</h3>
          <span className={`title-technology-type-3 cooperation-list__description cooperation-list__description--${slicePathname}`}>{description}</span>
        </li>
      ))}
    </ul>
  );
}
