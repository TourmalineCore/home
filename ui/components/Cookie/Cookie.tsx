import { Trans, useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { OptionYM } from '../../types/globals';

const STORAGE_KEY = `cookieAccept`;

const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
const googleId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ``;

export const optionYandexMetrika: OptionYM = {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true,
};

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
  const [date, setDate] = useState<Date | null>(null);
  const isMetricsEnabled = process.env.NEXT_PUBLIC_METRICS_ENABLED === `true`;

  useEffect(() => {
    if (!isComponentPage) {
      setDate(new Date());
      if (localStorage.getItem(STORAGE_KEY)) {
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
              href={`/documents/policy-${locale}.pdf#page=5`}
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
          className="cookie__button"
          onClick={acceptCookie}
          data-testid="accept-button"
        >
          {t(`accept`)}
        </button>
        <button
          type="button"
          className="cookie__button"
          onClick={rejectCookie}
          data-testid="reject-button"
        >
          {t(`reject`)}
        </button>
      </div>
    </aside>
  );

  function acceptCookie() {
    if (!isComponentPage) {
      localStorage.setItem(STORAGE_KEY, `true`);

      if (isMetricsEnabled) {
        window.gtag(`js`, date);
        window.gtag(`config`, googleId);

        window.ym(Number(yandexId), `init`, optionYandexMetrika);
      }
    }

    setIsCookieVisible(false);
  }

  function rejectCookie() {
    if (!isComponentPage) {
      localStorage.setItem(STORAGE_KEY, `false`);
    }

    setIsCookieVisible(false);
  }
}
