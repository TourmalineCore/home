import { getCookie } from "cookies-next";
import { OptionYM } from "../../types/globals";

export const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

export const optionYandexMetrika: OptionYM = {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true,
};

export function useYandexMetrika() {
  const loadMetrika = () => {
    const isMetricsEnabled = process.env.NEXT_PUBLIC_METRICS_ENABLED === `true`;
    const isCookieAccept = getCookie(`cookieAccept`) === `true`;

    if (isMetricsEnabled && isCookieAccept) {
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
  };

  return {
    loadMetrika,
  };
}
