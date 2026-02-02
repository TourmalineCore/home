import clsx from 'clsx';
import IconCasesArrow from '../../../../icons/cases-arrow.svg';
import { usePath } from '../../../../common/hooks';

export function CasesCard(
  {
    title,
    description,
    icon,
    link,
  }:{
    title: string;
    description: string;
    icon: JSX.Element;
    link: string;
  },
) {
  const {
    slicePathname,
  } = usePath();

  return (
    <a
      href={link}
      className={clsx(`cases-card cases-card--${slicePathname}`, {
        'cases-card--hover': link,
      })}
      onClick={(e) => (
        link
          ? e.stopPropagation()
          : e.preventDefault())}
      target="_blank"
      rel="noreferrer"
    >
      <div className="cases-card__inner">
        <div className="cases-card__icon">{icon}</div>
        <h3 className="title-technology-type-2 cases-card__title">{title}</h3>
        <span className="cases-card__description">{description}</span>
      </div>
      {link && (
        <span className="cases-card__arrow">
          <IconCasesArrow />
        </span>
      )}
    </a>
  );
}
