import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { yandexId } from '../common/hooks/useYandexMetrika';

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
    // const googleId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

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

          {/* Google metrics are temporarily disabled
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
          /> */}

          <Main />
          <NextScript />
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
