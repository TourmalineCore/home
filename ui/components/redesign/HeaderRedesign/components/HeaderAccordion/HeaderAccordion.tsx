import clsx from 'clsx';
import IconDownArrow from '../../../../../icons/icon-arrow-down-redesign.svg';
import { HeaderNavigationItem } from '../../../../../common/types';
import { useDeviceSize, useOnScrollDirections } from '../../../../../common/hooks';
import { SmartLink } from '../../../../SmartLink/SmartLink';

export function HeaderAccordion({
  className,
  navigationItems,
}: {
  className?: string;
  navigationItems: HeaderNavigationItem;
}) {
  const {
    name,
    navItems,
  } = navigationItems;

  const {
    isTabletXl,
  } = useDeviceSize();

  const {
    isScrollUp,
  } = useOnScrollDirections();

  const chunks = isTabletXl ? getChunks(navItems) : [navItems];

  return (
    <div
      className={clsx(
        `header-accordion`,
        className,
        {
          'header-accordion--left-align': chunks.length > 2,
        },
      )}
      data-testid="header-accordion"
    >
      <button
        className="header-accordion__button"
        data-testid="header-accordion-button"
        type="button"
      >
        <span className="header-accordion__label">
          {name}
        </span>
        <IconDownArrow
          className="header-accordion__arrow"
          aria-hidden="true"
        />
      </button>

      {isScrollUp && (
        <div
          className={clsx(
            `header-accordion__list-wrapper`,
            {
              'container-redesign': chunks.length > 2,
            },
          )}
        >
          {chunks.map((group, index) => (
            <ul
              className="header-accordion__list"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              {group.map((el) => (
                <li
                  className="header-accordion__list-item"
                  key={el.id}
                >
                  <SmartLink
                    className="header-accordion__link"
                    href={el.link || ``}
                  >
                    {el.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}

function getChunks(items: HeaderNavigationItem["navItems"]) {
  const chunks: HeaderNavigationItem["navItems"][] = [];

  for (let i = 0; i < items.length; i += 6) {
    chunks.push(items.slice(i, i + 6));
  }

  return chunks;
}
