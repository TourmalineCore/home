import clsx from "clsx";
import { useState } from "react";
import { HeaderAccordion } from "../HeaderAccordion/HeaderAccordion";
import { HeaderRedesignProps } from "../../../../../common/types";
import { useDeviceSize } from "../../../../../common/hooks";
import { SmartLink } from "../../../../SmartLink/SmartLink";

export function HeaderNavigationList({
  className,
  navigationLists,
}: {
  className?: string;
  navigationLists: HeaderRedesignProps["navigationLists"];
}) {
  const {
    isTabletXl,
  } = useDeviceSize();

  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <nav
      className={clsx(
        `header-navigation-list`,
        className,
      )}
    >
      <ul className="header-navigation-list__list">
        {navigationLists.map((el) => (el.navItems.length > 0 ? (
          <li
            className={clsx(
              `header-navigation-list__list-item`,
              {
                'header-navigation-list__list-item--is-open': openId === el.id,
              },
            )}
            key={el.id}
            {...(!isTabletXl ? {
              onClick: () => handleToggle(el.id),
            } : {
              onMouseEnter: () => setOpenId(el.id),
              onMouseLeave: () => setOpenId(null),
              onFocus: () => setOpenId(el.id),
              onBlurCapture: (e) => {
                if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
                  setOpenId(null);
                }
              },
            })}
          >
            <HeaderAccordion
              className="header-navigation-list__accordion"
              navigationItems={el}
            />
          </li>
        ) : (
          <li
            className="header-navigation-list__list-item"
            key={el.id}
          >
            <SmartLink
              className="header-navigation-list__link"
              href={el.link || ``}
            >
              {el.name}
            </SmartLink>
          </li>
        )))}
      </ul>
    </nav>
  );
}
