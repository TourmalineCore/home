import { ReactNode } from 'react';
import i18n, { i18n as I18nInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

export function I18nextTestProvider({
  children,
  i18nInstance,
}: {
  children: ReactNode;
  i18nInstance: I18nInstance;
}) {
  return (
    <I18nextProvider i18n={i18nInstance}>
      {children}
    </I18nextProvider>
  );
}

export function createTestI18n({
  lng = `ru`,
  resources,
  ns = `translation`,
}: {
  lng?: string;
  resources: Record<string, any>;
  ns?: string;
}) {
  const instance = i18n.createInstance();

  instance.use(initReactI18next)
    .init({
      lng,
      fallbackLng: lng,
      ns: [ns],
      defaultNS: ns,
      interpolation: {
        escapeValue: false,
      },
      resources: {
        [lng]: {
          [ns]: resources,
        },
      },
      react: {
        useSuspense: false,
      },
    });

  return instance;
}
