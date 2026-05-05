import { Trans, useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getCookie, setCookie } from 'cookies-next';
import { loadYandexMetrika } from '../../common/loadYandexMetrika/loadYandexMetrika';
import { COOKIE_ACCEPT, COOKIE_SETTINGS, GENERAL_COOKIE_OPTIONS } from '../../common/constants/cookie';
import { CookieSettingsModal } from '../CookieSettingsModal/CookieSettingsModal';

// Google metrics are temporarily disabled
// const googleId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ``;

export function Cookie({
  isComponentPage,
}: {
  isComponentPage?: boolean;
}) {
  const {
    t,
  } = useTranslation(`cookie`);
  const {
    locale,
  } = useRouter();

  const [isCookieVisible, setIsCookieVisible] = useState(isComponentPage || false);
  const [isCookieSettingsModalOpen, setIsCookieSettingsModalOpen] = useState(false);
  // const [date, setDate] = useState<Date | null>(null);
  const isMetricsEnabled = process.env.NEXT_PUBLIC_METRICS_ENABLED === `true`;

  useEffect(() => {
    if (!isComponentPage) {
      // setDate(new Date());
      if (getCookie(COOKIE_ACCEPT) !== undefined) {
        setIsCookieVisible(false);
      } else {
        setIsCookieVisible(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isCookieVisible) {
    return null;
  }

  return (
    <>
      <aside
        className="cookie"
        data-testid="cookie"
      >
        <div className="cookie__text">
          <Trans
            i18nKey="cookie:text"
            components={{
              bolt: <a
                className="cookie__link"
                href={`/documents/policy/policy-${locale}.pdf#page=5`}
                target="_blank"
                rel="noreferrer"
                aria-label=""
              />,
            }}
          />
        </div>
        <div className="cookie__buttons">
          <button
            type="button"
            className="cookie__button cookie__button--settings"
            onClick={() => setIsCookieSettingsModalOpen(true)}
            data-testid="cookie-settings-button"
          >
            {t(`settings`)}
          </button>

          <button
            type="button"
            className="cookie__button"
            onClick={rejectCookie}
            data-testid="reject-button"
          >
            {t(`reject`)}
          </button>
          <button
            type="button"
            className="cookie__button"
            onClick={acceptCookie}
            data-testid="accept-button"
          >
            {t(`accept`)}
          </button>
        </div>
      </aside>

      <CookieSettingsModal
        isModalOpen={isCookieSettingsModalOpen}
        onCloseModal={() => setIsCookieSettingsModalOpen(false)}
        onSaveSettings={() => {
          setIsCookieSettingsModalOpen(false);
          setIsCookieVisible(false);
        }}
      />
    </>
  );

  function acceptCookie() {
    if (!isComponentPage) {
      setCookie(
        COOKIE_ACCEPT,
        true,
        GENERAL_COOKIE_OPTIONS,
      );

      setCookie(
        COOKIE_SETTINGS,
        JSON.stringify({
          analytics: true,
          webvisor: true,
        }),
        GENERAL_COOKIE_OPTIONS,
      );

      if (isMetricsEnabled) {
        // window.gtag(`js`, date);
        // window.gtag(`config`, googleId);
        loadYandexMetrika({
          webvisor: true,
        });
      }
      setIsCookieVisible(false);
    }
  }

  function rejectCookie() {
    if (!isComponentPage) {
      setCookie(
        COOKIE_ACCEPT,
        false,
        GENERAL_COOKIE_OPTIONS,
      );

      setCookie(
        COOKIE_SETTINGS,
        JSON.stringify({
          analytics: false,
          webvisor: false,
        }),
        GENERAL_COOKIE_OPTIONS,
      );
    }

    setIsCookieVisible(false);
  }
}
