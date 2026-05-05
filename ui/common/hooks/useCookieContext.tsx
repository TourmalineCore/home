import { useContext } from "react";
import { CookieContext } from "../providers/CookieProvider";

export function useCookieContext() {
  const {
    isBannerVisible,
    setIsBannerVisible,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
  } = useContext(CookieContext);

  return {
    isBannerVisible,
    setIsBannerVisible,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
  };
}
