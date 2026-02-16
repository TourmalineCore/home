import clsx from "clsx";
import { WideCardProps } from "../../../../../../common/types";
import { SmartLink } from "../../../../../SmartLink/SmartLink";

export function WideCard({
  title,
  description,
  wideCardItems,
  link,
  className,
}: WideCardProps & {
  className: string;
}) {
  return (
    <li className={clsx(`wide-card col-tablet-12 col-tablet-xl-8 col-desktop-6`, className)}>
      <div className="wide-card__wrapper">
        {title && <h3 className="wide-card__subtitle">{title}</h3>}
        {description && (
          <p className="wide-card__description">
            {description}
          </p>
        )}
        {wideCardItems.length > 0 && (
          <ul className="wide-card__list">
            {
              wideCardItems.map(({
                id,
                icon,
                link: itemLink,
                name,
              }) => (
                <li
                  className="wide-card__item"
                  key={id}
                >
                  {icon && (
                    <span className="wide-card__icon-wrapper">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icon}
                        alt=""
                      />
                    </span>
                  )}
                  {
                    itemLink
                      ? (
                        <SmartLink
                          className="wide-card__link"
                          href={itemLink}
                        >
                          {name}
                        </SmartLink>
                      )
                      : (
                        <span className="wide-card__name">
                          {name}
                        </span>
                      )
                  }
                </li>
              ))
            }
          </ul>
        )}
        {link && (
          <SmartLink
            href={link.url}
            className="wide-card__featured-link"
          >
            {link.text}
          </SmartLink>
        )}
      </div>
    </li>
  );
}
