import { setCookie } from "cookies-next";
import {
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from "react";
import {
  COOKIE_ACCEPT,
  GENERAL_COOKIE_OPTIONS,
  COOKIE_SETTINGS,
  POLICY_VERSION,
} from "../constants/cookie";
import { loadYandexMetrika } from "../loadYandexMetrika/loadYandexMetrika";

type CookieContextType = {
  isBannerVisible: boolean;
  setIsBannerVisible: (value: boolean) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (value: boolean) => void;
  acceptCookies: ({
    analytics,
    webvisor,
  }: {
    analytics: boolean;
    webvisor: boolean;
  }) => void;
  rejectCookies: () => void;
};

export const CookieContext = createContext<CookieContextType>({
  isBannerVisible: false,
  setIsBannerVisible: () => {},
  isSettingsModalOpen: false,
  setIsSettingsModalOpen: () => {},
  acceptCookies: () => {},
  rejectCookies: () => {},
});

const IS_METRICS_ENABLED = process.env.NEXT_PUBLIC_METRICS_ENABLED === `true`;

export function CookieProvider({
  children,
}: PropsWithChildren) {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const state = useMemo(() => ({
    isBannerVisible,
    setIsBannerVisible: (value: boolean) => setIsBannerVisible(value),
    isSettingsModalOpen,
    setIsSettingsModalOpen: (value: boolean) => setIsSettingsModalOpen(value),
    acceptCookies: async ({
      analytics,
      webvisor,
    }: {
      analytics: boolean;
      webvisor: boolean;
    }) => handleAcceptCookies({
      analytics,
      webvisor,
    }),
    rejectCookies: () => handleRejectCookies(),
  }), [isBannerVisible, isSettingsModalOpen]);

  return (
    <CookieContext.Provider value={state}>
      {children}
    </CookieContext.Provider>
  );

  async function handleAcceptCookies({
    analytics,
    webvisor,
  }: {
    analytics: boolean;
    webvisor: boolean;
  }) {
    setCookie(
      COOKIE_ACCEPT,
      true,
      GENERAL_COOKIE_OPTIONS,
    );

    setCookie(
      COOKIE_SETTINGS,
      JSON.stringify({
        analytics,
        webvisor,
      }),
      GENERAL_COOKIE_OPTIONS,
    );

    if (IS_METRICS_ENABLED) {
      // window.gtag(`js`, date);
      // window.gtag(`config`, googleId);
      let consentId = localStorage.getItem(`consentId`);

      if (!consentId) {
        consentId = crypto.randomUUID();
        localStorage.setItem(`consentId`, consentId);
      }

      loadYandexMetrika({
        webvisor,
      });

      await fetch(`/api/save-cookie-consent`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify({
          consentId,
          consentVersion: POLICY_VERSION,
          categories: {
            analytics,
            webvisor,
          },
        }),
      });
    }

    setIsBannerVisible(false);
  }

  function handleRejectCookies() {
    setCookie(
      COOKIE_ACCEPT,
      false,
      GENERAL_COOKIE_OPTIONS,
    );

    setCookie(
      COOKIE_SETTINGS,
      JSON.stringify({
        analytics: false,
        webvisor: false,
      }),
      GENERAL_COOKIE_OPTIONS,
    );

    setIsBannerVisible(false);
  }
}
