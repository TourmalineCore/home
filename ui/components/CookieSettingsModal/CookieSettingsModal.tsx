import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { Modal } from '../Modal/Modal';
import { useDeviceSize } from '../../common/hooks';

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
      const savedCookieSettings = localStorage.getItem(`cookieSettings`);
      if (savedCookieSettings) {
        const parsedSettings = JSON.parse(savedCookieSettings);
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
                key={title}
                className="cookie-settings-modal__item"
              >
                <div className="cookie-settings-modal__option">
                  <div className="cookie-settings-modal__checkbox">
                    <input
                      id={title}
                      name={name}
                      onChange={(e) => handleCheckboxChange(e.target.name)}
                      onKeyDown={(e) => handleCheckboxChange(e.target.name)}
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
    localStorage.setItem(`cookieSettings`, JSON.stringify(cookieSettings));
    onSaveSettings();
  }
}
