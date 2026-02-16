import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

import { optionYandexMetrika } from '../components/Cookie/Cookie';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const {
      locale,
    } = ctx;

    return {
      ...initialProps,
      locale,
    };
  }

  render() {
    const {
      locale,
    } = this.props;
    const isMetricsEnabled = process.env.NEXT_PUBLIC_METRICS_ENABLED === `true`;

    const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
    const googleId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

    return (
      <Html lang={locale}>
        <Head>
          <meta
            name="theme-color"
            content="#000000"
          />

          <link
            rel="icon"
            href="/favicon.ico"
          />
          <link
            rel="manifest"
            href="/manifest.json"
          />
          <link
            rel="apple-touch-icon"
            href="/logo192.png"
          />

          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:ital,wght@0,400;0,500;1,400&display=swap"
            rel="stylesheet"
          />

          <link
            rel="preconnect"
            href="https://mc.yandex.ru"
          />
        </Head>

        <body className="default-scroll">
          <script
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `<!-- Global site tag (gtag.js) - Google Analytics -->

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            var isCookieAccept = document.cookie.includes('cookieAccept=true');

            if (${isMetricsEnabled} && isCookieAccept) {
              gtag('js', new Date());
              gtag('config', '${googleId}', {
                page_path: window.location.pathname,
              });
            }`,
            }}
          />

          <Main />
          <NextScript />

          <script
            type="text/javascript"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              var z = null;m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              var isCookieAccept = document.cookie.includes('cookieAccept=true');

              if (${isMetricsEnabled} && isCookieAccept) {
                ym(${yandexId}, "init", ${JSON.stringify(optionYandexMetrika)})
              }
            `,
            }}
          />
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${yandexId}`}
                style={{
                  position: `absolute`,
                  left: `-9999px`,
                }}
                alt=""
              />
            </div>
          </noscript>
        </body>
      </Html>
    );
  }
}
