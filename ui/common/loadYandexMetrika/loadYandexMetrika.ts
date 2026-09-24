import { getCookie } from "cookies-next";
import { OptionYM } from "../../types/globals";
import { COOKIE_ACCEPT } from "../constants/cookie";

export function loadYandexMetrika({
  webvisor,
  isYandexIframe,
}: {
  webvisor: boolean;
  isYandexIframe?: boolean;
}) {
  const isMetricsEnabled = process.env.NEXT_PUBLIC_METRICS_ENABLED === `true`;
  const isCookieAccept = getCookie(COOKIE_ACCEPT) === `true`;

  // You need to initialize yandex.metrica if the site opens as an iframe on the analytics page in Yandex.Metrica and in this case it is not necessary to accept cookies
  // Otherwise, the click and link map will not work
  if (isMetricsEnabled && (isCookieAccept || isYandexIframe)) {
    initYandexMetrika({
      webvisor,
    });
  }
}

function initYandexMetrika({
  webvisor,
}: {
  webvisor: boolean;
}) {
  const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  const optionYandexMetrika: OptionYM = {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    defer: true,
    webvisor,
  };

  const counterCode = `
         (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          var z = null;m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})

        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      `;

  const initScript = document.createElement(`script`);
  initScript.textContent = counterCode;
  document.head.appendChild(initScript);

  const initCode = `
        if (typeof window["ym"] !== 'undefined') {
          window["ym"](${yandexId}, "init", ${JSON.stringify(optionYandexMetrika)});
        }
      `;

  const initScriptElement = document.createElement(`script`);
  initScriptElement.textContent = initCode;
  document.head.appendChild(initScriptElement);
}

// A function for detecting that a site is open inside a Yandex.Metrica iframe
export function isYandexMetricaIframe() {
  if (typeof window === `undefined`) return false;

  // If the window is not an iframe, it is a regular user
  if (window === window.top) return false;

  const referrer = document.referrer.toLowerCase();
  return (
    referrer.includes(`webvisor.com`)
    || referrer.includes(`metrika.yandex.`)
    || referrer.includes(`metrica.yandex.`)
  );
}
