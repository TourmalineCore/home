import 'gitalk/dist/gitalk.css';
import '../styles/main.scss';

import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
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

function MyApp({
  Component,
  pageProps,
  router,
}: AppProps) {
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
      <Cookie />
      <CookieSettingsModal />
      <Component {...pageProps} />
    </CookieProvider>
  );
}

export default appWithTranslation(MyApp);
