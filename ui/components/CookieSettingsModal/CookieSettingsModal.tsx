import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { getCookie, setCookie } from 'cookies-next';
import { Modal } from '../Modal/Modal';
import { useDeviceSize } from '../../common/hooks';
import { COOKIE_ACCEPT, COOKIE_SETTINGS, GENERAL_COOKIE_OPTIONS } from '../../common/constants/cookie';
import { loadYandexMetrika } from '../../common/loadYandexMetrika/loadYandexMetrika';

type Options = {
  title: string;
  text: string;
  name: string;
}[];

type CookieSettings = {
  analytics: boolean;
  webVisor: boolean;
};

export function CookieSettingsModal({
  onCloseModal,
  onSaveSettings,
  isModalOpen,
}:{
  onCloseModal: () => void;
  onSaveSettings: () => void;
  isModalOpen: boolean;
}) {
  const {
    t,
  } = useTranslation(`cookieSettings`);

  const options: Options = t(`options`, {
    returnObjects: true,
  });

  const {
    isTablet,
  } = useDeviceSize();

  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    analytics: false,
    webVisor: false,
  });

  useEffect(() => {
    if (isModalOpen) {
      const savedCookieSettings = getCookie(COOKIE_SETTINGS);

      if (savedCookieSettings) {
        const parsedSettings = JSON.parse(savedCookieSettings as string);
        setCookieSettings({
          analytics: parsedSettings.analytics,
          webVisor: parsedSettings.webVisor,
        });
      }
    }
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && isTablet && <div className="cookie-settings-modal-overlay" />}
      <Modal
        className={clsx(`cookie-settings-modal`, {
          'cookie-settings-modal--open': isModalOpen,
        })}
        testId="cookie-settings-modal"
        onClose={onCloseModal}
        type="cookie"
      >
        <div className="cookie-settings-modal__inner">
          <h2 className="cookie-settings-modal__title">{t(`title`)}</h2>
          <ul className="cookie-settings-modal__list">
            {options.map(({
              text,
              title,
              name,
            }) => (
              <li
                key={name}
                className="cookie-settings-modal__item"
              >
                <div className="cookie-settings-modal__option">
                  <div className="cookie-settings-modal__checkbox">
                    <input
                      id={title}
                      onChange={() => handleCheckboxChange(name)}
                      onKeyDown={() => handleCheckboxChange(name)}
                      type="checkbox"
                      className="cookie-settings-modal__checkbox-input"
                      checked={cookieSettings[name as keyof CookieSettings]}
                    />
                    <div className="cookie-settings-modal__checkbox-indicator" />
                  </div>
                  <label
                    className="cookie-settings-modal__label"
                    htmlFor={title}
                  >
                    {title}
                  </label>
                </div>
                <p className="cookie-settings-modal__description">
                  {text}
                </p>
              </li>
            ))}
          </ul>
          <div className="cookie-settings-modal__note">{t(`note`)}</div>
          <button
            type="button"
            className="cookie-settings-modal__button"
            onClick={handleSaveSettings}
            data-testid="save-cookie-settings-button"
          >
            {t(`buttonText`)}
          </button>
        </div>
      </Modal>
    </>
  );

  function handleCheckboxChange(fieldName: string) {
    setCookieSettings((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName as keyof CookieSettings],
    }));
  }

  function handleSaveSettings() {
    setCookie(
      COOKIE_SETTINGS,
      JSON.stringify(cookieSettings),
      GENERAL_COOKIE_OPTIONS,
    );

    const {
      analytics,
      webVisor,
    } = cookieSettings;

    const isCookieAccept = analytics || webVisor;

    setCookie(
      COOKIE_ACCEPT,
      isCookieAccept,
      GENERAL_COOKIE_OPTIONS,
    );

    if (isCookieAccept) {
      loadYandexMetrika();
    }

    onSaveSettings();
  }
}
