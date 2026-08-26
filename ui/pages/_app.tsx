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

type CustomPageProps = {
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

type MyAppProps = AppProps<CustomPageProps>;

function MyApp({
  Component,
  pageProps,
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

  const {
    cookieData,
    cookieSettingsData,
  } = pageProps;

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

export default appWithTranslation(MyApp) as React.ComponentType<AppProps<CustomPageProps>>;
