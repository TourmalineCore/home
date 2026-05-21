import { useEffect } from 'react';

import { getCookie, setCookie } from 'cookies-next';
import { loadYandexMetrika } from '../../common/loadYandexMetrika/loadYandexMetrika';
import {
  COOKIE_ACCEPT,
  COOKIE_SETTINGS,
  GENERAL_COOKIE_OPTIONS,
  POLICY_VERSION,
} from '../../common/constants/cookie';
import { useCookieContext } from '../../common/hooks/useCookieContext';
import { MarkdownText } from '../MarkdownText/MarkdownText';

// Google metrics are temporarily disabled
// const googleId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ``;

export function Cookie({
  acceptButtonText,
  rejectButtonText,
  bannerText,
  settingsButtonText,
  isComponentPage,
}: {
  acceptButtonText: string;
  rejectButtonText: string;
  bannerText: string;
  settingsButtonText: string;
  isComponentPage?: boolean;
}) {
  const {
    isBannerVisible,
    setIsBannerVisible,
    setIsSettingsModalOpen,
  } = useCookieContext();

  const isCookieVisible = isComponentPage || isBannerVisible;
  // const [date, setDate] = useState<Date | null>(null);
  const isMetricsEnabled = process.env.NEXT_PUBLIC_METRICS_ENABLED === `true`;

  useEffect(() => {
    if (!isComponentPage) {
      // setDate(new Date());
      if (getCookie(COOKIE_ACCEPT) !== undefined) {
        setIsBannerVisible(false);
      } else {
        setIsBannerVisible(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isCookieVisible) {
    return null;
  }

  return (
    <aside
      className="cookie"
      data-testid="cookie"
    >
      <div className="cookie__text">
        <MarkdownText
          linkClassName="cookie__link"
          isTargetBlank
        >
          {bannerText}
        </MarkdownText>
      </div>
      <div className="cookie__buttons">
        <button
          type="button"
          className="cookie__button cookie__button--settings"
          onClick={() => setIsSettingsModalOpen(true)}
          data-testid="cookie-settings-button"
        >
          {settingsButtonText}
        </button>

        <button
          type="button"
          className="cookie__button"
          onClick={rejectCookie}
          data-testid="reject-button"
        >
          {rejectButtonText}
        </button>
        <button
          type="button"
          className="cookie__button"
          onClick={acceptCookie}
          data-testid="accept-button"
        >
          {acceptButtonText}
        </button>
      </div>
    </aside>
  );

  async function acceptCookie() {
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
        let consentId = localStorage.getItem(`consentId`);

        if (!consentId) {
          consentId = crypto.randomUUID();
          localStorage.setItem(`consentId`, consentId);
        }

        loadYandexMetrika({
          webvisor: true,
        });

        await fetch(`/api/save-cookie-consent`, {
          method: `POST`,
          headers: {
            'Content-Type': `application/json`,
          },
          body: JSON.stringify({
            consentId,
            consentVersion: POLICY_VERSION,
            categories: {
              analytics: true,
              webvisor: true,
            },
          }),
        });
      }
      setIsBannerVisible(false);
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

    setIsBannerVisible(false);
  }
}
