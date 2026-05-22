import { useEffect } from 'react';

import { getCookie } from 'cookies-next';
import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import { useRouter } from 'next/router';
import { COOKIE_ACCEPT } from '../../common/constants/cookie';
import { useCookieContext } from '../../common/hooks/useCookieContext';
import { MarkdownText } from '../MarkdownText/MarkdownText';
import { useSmartCaptcha } from '../../common/hooks/useSmartCaptcha';

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
    locale,
  } = useRouter();

  const {
    isBannerVisible,
    setIsBannerVisible,
    setIsSettingsModalOpen,
    acceptCookies,
    rejectCookies,
  } = useCookieContext();

  const {
    isSmartCaptchaEnabled,
    isSmartCaptchaVisible,
    smartCaptchaKey,
    showSmartCaptcha,
    hideSmartCaptcha,
    handleCaptchaSuccess,
  } = useSmartCaptcha({
    onSuccess: async () => {
      await acceptCookie();
    },
  });

  const isCookieVisible = isComponentPage || isBannerVisible;
  // const [date, setDate] = useState<Date | null>(null);

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
          onClick={async () => {
            if (isSmartCaptchaEnabled) {
              showSmartCaptcha();
            } else {
              await acceptCookie();
            }
          }}
          data-testid="accept-button"
        >
          {acceptButtonText}
        </button>
      </div>
      {(isSmartCaptchaEnabled && !isComponentPage) && (
        <InvisibleSmartCaptcha
          key={smartCaptchaKey}
          sitekey={process.env.NEXT_PUBLIC_SMARTCAPTCHA_CLIENT_KEY as string}
          language={locale === `ru` ? `ru` : `en`}
          onSuccess={handleCaptchaSuccess}
          onChallengeHidden={hideSmartCaptcha}
          visible={isSmartCaptchaVisible}
        />
      )}
    </aside>
  );

  async function acceptCookie() {
    if (!isComponentPage) {
      await acceptCookies({
        analytics: true,
        webvisor: true,
      });
    }
  }

  function rejectCookie() {
    if (!isComponentPage) {
      rejectCookies();
    }
  }
}
