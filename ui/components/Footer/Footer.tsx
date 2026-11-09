import { useTranslation } from 'next-i18next';

import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SocialLinks } from '../SocialLinks/SocialLinks';
import { AppRoute } from '../../common/enums';
import { isChineseLanguage } from '../../common/utils';

export function Footer() {
  const {
    t,
  } = useTranslation(`footer`);

  const {
    locale,
    pathname,
  } = useRouter();

  return (
    <footer
      id="footer"
      className={clsx(`footer`, {
        'footer--technology': pathname !== AppRoute.Main,
        'footer--zh': isChineseLanguage(locale),
      })}
      itemScope
      itemType="http://schema.org/Organization"
    >
      <div className="container footer__inner">
        <div className="footer__about-us">
          <div className="footer__short-information">
            <Link
              className="footer__logo"
              href="/"
              aria-label="Footer logo"
            >
              <Image
                src="/images/logo.png"
                fill
                alt=""
              />
            </Link>

            <span className="footer__description">{t(`description`)}</span>
          </div>

          <div className="footer__links">
            <span>{t(`writeUs`)}</span>
            <SocialLinks />
          </div>
        </div>

        <div className="footer__copyright">
          <span>
            {`© ${locale === `ru` ? `С 2019 года` : `Since 2019`} Tourmaline Core`}
          </span>
          {/* <span className="footer__location">
            {t('location')}
          </span> */}
        </div>
      </div>
    </footer>
  );
}
