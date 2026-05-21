import {
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from "react";

type CookieContextType = {
  isBannerVisible: boolean;
  setIsBannerVisible: (value: boolean) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (value: boolean) => void;
};

export const CookieContext = createContext<CookieContextType>({
  isBannerVisible: false,
  setIsBannerVisible: () => {},
  isSettingsModalOpen: false,
  setIsSettingsModalOpen: () => {},
});

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
  }), [isBannerVisible, isSettingsModalOpen]);

  return (
    <CookieContext.Provider value={state}>
      {children}
    </CookieContext.Provider>
  );
}
