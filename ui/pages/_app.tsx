import 'gitalk/dist/gitalk.css';
import '../styles/main.scss';

import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { loadYandexMetrika } from '../common/loadYandexMetrika/loadYandexMetrika';
import { COOKIE_ACCEPT, COOKIE_SETTINGS } from '../common/constants/cookie';
import { CookieProvider } from '../common/providers/CookieProvider';
import { getCookieData } from '../services/cms/api/cookie-api/cookie-api';
import { loadTranslations } from '../common/utils';

const Cookie = dynamic(
  () => import(`../components/Cookie/Cookie`).then((component) => component.Cookie),
  {
    ssr: false,
  },
);

const CookieSettingsModal = dynamic(
  () => import(`../components/CookieSettingsModal/CookieSettingsModal`).then((component) => component.CookieSettingsModal),
  {
    ssr: false,
  },
);

const isMetricsEnabled = process.env.NEXT_PUBLIC_METRICS_ENABLED === `true`;
const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
// const googleId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

type MyAppProps = AppProps & {
  cookieData: {
    acceptButtonText: string;
    rejectButtonText: string;
    bannerText: string;
    settingsButtonText: string;
  };
  cookieSettingsData: {
    title: string;
    note: string;
    buttonText: string;
    analytics: {
      title: string;
      text: string;
    };
    webvisor: {
      title: string;
      text: string;
    };
  };
};

function MyApp({
  Component,
  pageProps,
  cookieData,
  cookieSettingsData,
  router,
}: MyAppProps) {
  useEffect(() => {
    const savedCookieSettings = getCookie(COOKIE_SETTINGS);

    if (savedCookieSettings) {
      const parsedSettings = JSON.parse(savedCookieSettings as string);

      loadYandexMetrika({
        webvisor: parsedSettings.webvisor,
      });
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (document.cookie.includes(`${COOKIE_ACCEPT}=true`) && typeof window !== `undefined` && isMetricsEnabled) {
        // Google metrics are temporarily disabled
        // window.gtag(`event`, url, {
        //   send_to: googleId,
        // });

        window.ym(Number(yandexId), `hit`, url);
      }
    };

    router.events.on(`routeChangeComplete`, handleRouteChange);

    return () => {
      router.events.off(`routeChangeComplete`, handleRouteChange);
    };
  }, [router.events]);

  return (
    <CookieProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>Tourmaline Core</title>
      </Head>
      <Cookie
        acceptButtonText={cookieData.acceptButtonText}
        rejectButtonText={cookieData.rejectButtonText}
        bannerText={cookieData.bannerText}
        settingsButtonText={cookieData.settingsButtonText}
      />
      <CookieSettingsModal
        title={cookieSettingsData.title}
        note={cookieSettingsData.note}
        buttonText={cookieSettingsData.buttonText}
        analyticsData={cookieSettingsData.analytics}
        webvisorData={cookieSettingsData.webvisor}
      />
      <Component {...pageProps} />
    </CookieProvider>
  );
}

MyApp.getInitialProps = async ({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  router,
}: {
  router: {
    locale: string;
    isPreview: boolean;
  };
}) => {
  const translationsData = await loadTranslations(router.locale, [`cookie`, `cookieSettings`]);

  if (process.env.IS_STATIC_MODE === `true`) {
    return {
      cookieData: {
        acceptButtonText: translationsData.cookie.accept,
        rejectButtonText: translationsData.cookie.reject,
        bannerText: translationsData.cookie.text,
        settingsButtonText: translationsData.cookie.settings,
      },
      cookieSettingsData: translationsData.cookieSettings,
    };
  }

  try {
    const cookieResponse = await getCookieData({
      status: router.isPreview ? `draft` : `published`,
      locale: router.locale,
    });

    return {
      cookieData: {
        acceptButtonText: translationsData.cookie.accept,
        rejectButtonText: translationsData.cookie.reject,
        settingsButtonText: translationsData.cookie.settings,
        bannerText: cookieResponse.bannerText,
      },
      cookieSettingsData: {
        ...translationsData.cookieSettings,
        analytics: {
          title: translationsData.cookieSettings.analytics.title,
          text: cookieResponse.analyticsText,
        },
        webvisor: {
          title: translationsData.cookieSettings.webvisor.title,
          text: cookieResponse.webvisorText,
        },
        note: cookieResponse.privacyText,
      },
    };
  } catch {
    return {
      cookieData: {},
      cookieSettingsData: {},
    };
  }
};

export default appWithTranslation(MyApp as unknown as React.ComponentType<AppProps>);
