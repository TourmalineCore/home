import '../styles/main.scss';

import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { initYandexMetrika, isYandexMetricaIframe, loadYandexMetrika } from '../common/loadYandexMetrika/loadYandexMetrika';
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
  const [isYandexIframe, setIsYandexIframe] = useState(false);

  useEffect(() => {
    const savedCookieSettings = getCookie(COOKIE_SETTINGS);

    if (savedCookieSettings) {
      const parsedSettings = JSON.parse(savedCookieSettings as string);

      loadYandexMetrika({
        webvisor: parsedSettings.webvisor,
      });
    }
  }, []);

  // You need to initialize yandex metrica if the site opens as an iframe on the analytics page in yandex metrica
  // Otherwise, the click and link map won't work
  useEffect(() => {
    const yandexIframe = isYandexMetricaIframe();
    setIsYandexIframe(yandexIframe);

    if (yandexIframe) {
      initYandexMetrika({
        webvisor: true,
      });
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const isCookieAccept = document.cookie.includes(`${COOKIE_ACCEPT}=true`);

      if ((isCookieAccept || isYandexIframe) && typeof window !== `undefined` && isMetricsEnabled) {
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
  }, [router.events, isYandexIframe]);

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
