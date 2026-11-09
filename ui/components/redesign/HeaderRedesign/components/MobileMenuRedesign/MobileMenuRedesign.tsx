import Link from "next/link";
import clsx from "clsx";
import { HeaderButton } from "../HeaderButton/HeaderButton";
import { HeaderRedesignProps } from "../../../../../common/types";
import { HeaderNavigationList } from "../HeaderNavigationList/HeaderNavigationList";
import { SmartLink } from "../../../../SmartLink/SmartLink";

export function MobileMenu({
  navigationLists,
  buttonLabel,
  emailCaption,
  emailAddress,
  socialLinks,
  onOpenModal,
  isMobileMenuOpen,
}: HeaderRedesignProps & {
  onOpenModal: () => void;
  isMobileMenuOpen: boolean;
}) {
  return (
    <div
      className={clsx(`mobile-menu-redesign container-redesign`, {
        'mobile-menu-redesign--open': isMobileMenuOpen,
      })}
      data-testid="mobile-menu-redesign"
    >
      <HeaderNavigationList
        className="mobile-menu-redesign__nav"
        navigationLists={navigationLists}
        isMobileMenu
      />

      {buttonLabel && (
        <HeaderButton
          className="mobile-menu-redesign__button"
          onClick={onOpenModal}
          isMobileMenu
        >
          {buttonLabel}
        </HeaderButton>
      )}

      <div className="mobile-menu-redesign__contact">
        {emailCaption && <span className="mobile-menu-redesign__caption">{emailCaption}</span>}
        <Link
          className="mobile-menu-redesign__email"
          href={`mailto:${emailAddress}`}
        >
          {emailAddress}
        </Link>
      </div>
      <nav className="mobile-menu-redesign__nav">
        <ul className="mobile-menu-redesign__list">
          {socialLinks.map(({
            id,
            name,
            link,
          }) => (
            <li
              key={id}
              className="mobile-menu-redesign__list-item"
            >
              <SmartLink
                className="mobile-menu-redesign__link"
                href={link}
              >
                {name}
              </SmartLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
