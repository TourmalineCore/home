import { Trans, useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getCookie, setCookie } from 'cookies-next';
import { loadYandexMetrika } from '../../common/loadYandexMetrika/loadYandexMetrika';
import { POLICY_VERSION } from '../../common/constants';

const cookieAccept = `cookieAccept`;

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
  // const [date, setDate] = useState<Date | null>(null);
  const isMetricsEnabled = process.env.NEXT_PUBLIC_METRICS_ENABLED === `true`;

  useEffect(() => {
    if (!isComponentPage) {
      // setDate(new Date());
      if (getCookie(cookieAccept) !== undefined) {
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
              href={`/documents/policy/policy-${POLICY_VERSION}-${locale}.pdf#page=5`}
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

  async function acceptCookie() {
    if (!isComponentPage) {
      setCookie(cookieAccept, true);

      if (isMetricsEnabled) {
        // window.gtag(`js`, date);
        // window.gtag(`config`, googleId);

        loadYandexMetrika();
      }
    }

    await fetch(`/api/save-cookie-consent`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        accepted: true,
        consentVersion: `1.0`,
        categories: {
          analytics: true,
        },
      }),
    });

    setIsCookieVisible(false);
  }

  function rejectCookie() {
    if (!isComponentPage) {
      setCookie(cookieAccept, false);
    }

    setIsCookieVisible(false);
  }
}
