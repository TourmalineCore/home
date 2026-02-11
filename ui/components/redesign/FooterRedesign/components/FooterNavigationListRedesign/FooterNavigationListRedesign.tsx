import router from 'next/router';
import { SmartLink } from '../../../../SmartLink/SmartLink';
import { FooterNavigationItem } from '../../../../../common/types';

export function FooterNavigationListRedesign({
  caption,
  links,
}: Omit<FooterNavigationItem, 'id'>) {
  return (
    <li className="footer-navigation-list-redesign">
      <span className="footer-navigation-list-redesign__caption">{caption}</span>
      <ul className="footer-navigation-list-redesign__list">
        {links.map((el) => (
          <li
            className="footer-navigation-list-redesign__item"
            key={el.id}
          >
            <SmartLink
              className="footer-navigation-list-redesign__link"
              href={el.link || ``}
              onClick={(e) => router.pathname === el.link && e.preventDefault()}
            >
              {el.name}
            </SmartLink>
          </li>
        ))}
      </ul>
    </li>
  );
}
