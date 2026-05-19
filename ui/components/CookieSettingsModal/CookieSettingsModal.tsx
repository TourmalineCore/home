import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { Modal } from '../Modal/Modal';
import { useDeviceSize } from '../../common/hooks';
import { COOKIE_ACCEPT, COOKIE_SETTINGS, GENERAL_COOKIE_OPTIONS } from '../../common/constants/cookie';
import { loadYandexMetrika } from '../../common/loadYandexMetrika/loadYandexMetrika';
import { useCookieContext } from '../../common/hooks/useCookieContext';

type CookieSettings = {
  analytics: boolean;
  webvisor: boolean;
};

export function CookieSettingsModal({
  title,
  note,
  buttonText,
  analyticsData,
  webvisorData,
  isComponentPage,
}: {
  title: string;
  note: string;
  buttonText: string;
  analyticsData: {
    title: string;
    text: string;
  };
  webvisorData: {
    title: string;
    text: string;
  };
  isComponentPage?: boolean;
}) {
  const {
    reload,
  } = useRouter();

  const {
    isSettingsModalOpen,
    setIsBannerVisible,
    setIsSettingsModalOpen,
  } = useCookieContext();

  const isModalOpen = isComponentPage || isSettingsModalOpen;

  const {
    isTablet,
  } = useDeviceSize();

  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    analytics: false,
    webvisor: false,
  });

  useEffect(() => {
    if (isModalOpen && !isComponentPage) {
      const savedCookieSettings = getCookie(COOKIE_SETTINGS);

      if (savedCookieSettings) {
        const parsedSettings = JSON.parse(savedCookieSettings as string);
        setCookieSettings({
          analytics: parsedSettings.analytics,
          webvisor: parsedSettings.webvisor,
        });
      }
    }
  }, [isModalOpen, isComponentPage]);

  return (
    <>
      {isModalOpen && isTablet && <div className="cookie-settings-modal-overlay" />}
      <Modal
        className={clsx(`cookie-settings-modal`, {
          'cookie-settings-modal--open': isModalOpen,
        })}
        testId="cookie-settings-modal"
        onClose={handleCloseModal}
        type="cookie"
      >
        <div className="cookie-settings-modal__inner">
          <h2 className="cookie-settings-modal__title">{title}</h2>
          <ul className="cookie-settings-modal__list">
            <li
              className="cookie-settings-modal__item"
            >
              <div className="cookie-settings-modal__option">
                <div className="cookie-settings-modal__checkbox">
                  <input
                    id="analytics"
                    onChange={() => handleCheckboxChange(`analytics`)}
                    type="checkbox"
                    className="cookie-settings-modal__checkbox-input"
                    checked={cookieSettings.analytics}
                    data-testid="checkbox-analytics"
                  />
                  <div className="cookie-settings-modal__checkbox-indicator" />
                </div>
                <label
                  className="cookie-settings-modal__label"
                  htmlFor="analytics"
                >
                  {analyticsData.title}
                </label>
              </div>
              <p className="cookie-settings-modal__description">
                {analyticsData.text}
              </p>
            </li>
            <li
              className="cookie-settings-modal__item"
            >
              <div className="cookie-settings-modal__option">
                <div className="cookie-settings-modal__checkbox">
                  <input
                    id="webvisor"
                    onChange={() => handleCheckboxChange(`webvisor`)}
                    type="checkbox"
                    className="cookie-settings-modal__checkbox-input"
                    checked={cookieSettings.webvisor}
                    disabled={!cookieSettings.analytics}
                    data-testid="checkbox-webvisor"
                  />
                  <div className="cookie-settings-modal__checkbox-indicator" />
                </div>
                <label
                  className="cookie-settings-modal__label"
                  htmlFor="webvisor"
                >
                  {webvisorData.title}
                </label>
              </div>
              <p className="cookie-settings-modal__description">
                {webvisorData.text}
              </p>
            </li>
          </ul>
          <div className="cookie-settings-modal__note">{note}</div>
          <button
            type="button"
            className="cookie-settings-modal__button"
            onClick={handleSaveSettings}
            data-testid="save-cookie-settings-button"
          >
            {buttonText}
          </button>
        </div>
      </Modal>
    </>
  );

  function handleCheckboxChange(fieldName: string) {
    if (fieldName === `analytics`) {
      if (cookieSettings.analytics) {
        setCookieSettings({
          analytics: false,
          webvisor: false,
        });
      } else {
        setCookieSettings(() => ({
          webvisor: false,
          analytics: true,
        }));
      }
    } else if (fieldName === `webvisor`) {
      setCookieSettings((prev) => ({
        ...prev,
        webvisor: !prev.webvisor,
      }));
    }
  }

  function handleSaveSettings() {
    if (!isComponentPage) {
      const hasCookieSettings = hasCookie(COOKIE_SETTINGS);

      setCookie(
        COOKIE_SETTINGS,
        JSON.stringify(cookieSettings),
        GENERAL_COOKIE_OPTIONS,
      );

      const {
        analytics,
        webvisor,
      } = cookieSettings;

      const isCookieAccept = analytics || webvisor;

      setCookie(
        COOKIE_ACCEPT,
        isCookieAccept,
        GENERAL_COOKIE_OPTIONS,
      );

      if (isCookieAccept) {
        loadYandexMetrika({
          webvisor,
        });
      }

      if (hasCookieSettings) {
        reload();
      }

      setIsSettingsModalOpen(false);
      setIsBannerVisible(false);
    }
  }

  function handleCloseModal() {
    setCookieSettings({
      analytics: false,
      webvisor: false,
    });

    setIsSettingsModalOpen(false);
  }
}
