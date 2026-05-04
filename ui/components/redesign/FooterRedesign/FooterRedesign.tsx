import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FooterNavigationListRedesign } from './components/FooterNavigationListRedesign/FooterNavigationListRedesign';
import { FooterRedesignProps } from '../../../common/types';
import { CookieSettingsModal } from '../../CookieSettingsModal/CookieSettingsModal';

export function FooterRedesign({
  emailCaption,
  emailAddress,
  navigationLists,
}: FooterRedesignProps) {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  const {
    locale,
    reload,
  } = useRouter();

  const colCount = Math.min(navigationLists.length, 4);

  useEffect(() => {
    setCurrentYear(new Date()
      .getFullYear());
  }, []);

  const [isCookieSettingsModalOpen, setIsCookieSettingsModalOpen] = useState(false);

  return (
    <>
      <footer
        id="footer-redesign"
        className="footer-redesign"
        data-testid="footer"
      >
        <div className="container-redesign footer-redesign__inner">
          <div className="footer-redesign__info">
            {emailCaption && <p className="footer-redesign__caption">{emailCaption}</p>}
            <a
              className="footer-redesign__email"
              href={`mailto:${emailAddress}`}
            >
              {emailAddress}
            </a>
          </div>
          <div className="footer-redesign__copyright">
            <span>
              {`© 2019-${currentYear} Tourmaline Core`}
            </span>
            <a
              href={`/documents/policy/policy-${locale}.pdf`}
              target="_blank"
              rel="noreferrer"
              className="footer-redesign__privacy-policy"
            >
              {locale === `ru` ? `Политика конфиденциальности` : `Privacy policy`}
            </a>
            <button
              type="button"
              className="footer-redesign__cookie-button"
              onClick={() => setIsCookieSettingsModalOpen(true)}
              data-testid="footer-cookie-settings-button"
            >
              {locale === `ru` ? `Настройки пользовательских данных` : `User privacy settings`}
            </button>
          </div>
          {navigationLists.length > 0 && (
            <ul
              className="footer-redesign__navigation"
              style={{
                '--columns-count': colCount,
              } as React.CSSProperties}
            >
              {navigationLists.map((el) => (
                <FooterNavigationListRedesign
                  key={el.id}
                  caption={el.caption}
                  links={el.links}
                />
              ))}
            </ul>
          )}
        </div>
      </footer>
      <CookieSettingsModal
        isModalOpen={isCookieSettingsModalOpen}
        onCloseModal={() => setIsCookieSettingsModalOpen(false)}
        onSaveSettings={() => {
          setIsCookieSettingsModalOpen(false);
          reload();
        }}
      />
    </>
  );
}
