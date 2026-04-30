import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import clsx from 'clsx';
import { Modal } from '../Modal/Modal';
import { useDeviceSize } from '../../common/hooks';

type OptionsList = {
  title: string;
  text: string;
}[];

type CookieSettings = {
  analytics: boolean;
  webVisor: boolean;
};

export function CookieSettingsModal({
  onCloseModal,
  isModalOpen,
}:{
  onCloseModal: () => void;
  isModalOpen: boolean;
}) {
  const {
    t,
  } = useTranslation(`cookieSettings`);

  const optionsList: OptionsList = t(`options`, {
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
          analytics: parsedSettings.analytics || false,
          webVisor: parsedSettings.webVisor || false,
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
            {optionsList.map(({
              text, title,
            }) => {
              const fieldName = getFieldName(title);
              return (
                <li
                  key={title}
                  className="cookie-settings-modal__item"
                >
                  <div className="cookie-settings-modal__option">
                    <div className="cookie-settings-modal__checkbox">
                      <input
                        onChange={() => handleCheckboxChange(fieldName)}
                        onKeyDown={() => handleCheckboxChange(fieldName)}
                        type="checkbox"
                        className="cookie-settings-modal__checkbox-input"
                        id={title}
                        checked={cookieSettings[fieldName]}
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
              );
            })}
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

  function handleCheckboxChange(field: keyof CookieSettings) {
    setCookieSettings((prev) => {
      const newCookieSettings = {
        ...prev,
        [field]: !prev[field],
      };
      localStorage.setItem(`cookieSettings`, JSON.stringify(newCookieSettings));
      return newCookieSettings;
    });
  }

  function getFieldName(title: string): keyof CookieSettings {
    if (title.toLowerCase()
      .includes(`analytics`) || title.toLowerCase()
      .includes(`аналитика`)) {
      return `analytics`;
    }
    if (title.toLowerCase()
      .includes(`webvisor`) || title.toLowerCase()
      .includes(`вебвизор`)) {
      return `webVisor`;
    }
    return `analytics`;
  }

  function handleSaveSettings() {
    onCloseModal();
  }
}
