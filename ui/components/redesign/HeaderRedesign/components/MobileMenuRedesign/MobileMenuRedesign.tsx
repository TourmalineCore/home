import Link from "next/link";
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
  setIsModalOpen,
}: HeaderRedesignProps & {
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  return (
    <div
      className="mobile-menu-redesign container-redesign"
      data-testid="mobile-menu-redesign"
    >
      <HeaderNavigationList
        className="mobile-menu-redesign__nav"
        navigationLists={navigationLists}
      />

      {buttonLabel && (
        <HeaderButton
          className="mobile-menu-redesign__button"
          onClick={setIsModalOpen}
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
