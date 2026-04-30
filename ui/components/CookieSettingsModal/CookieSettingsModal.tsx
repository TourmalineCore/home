import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import { Modal } from '../Modal/Modal';
import { useDeviceSize } from '../../common/hooks';

type OptionsList = {
  title: string;
  text: string;
}[];

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
            }) => (
              <li
                key={title}
                className="cookie-settings-modal__item"
              >
                <div className="cookie-settings-modal__option">
                  <div className="cookie-settings-modal__checkbox">
                    <input
                      onChange={() => {}}
                      type="checkbox"
                      className="cookie-settings-modal__checkbox-input"
                      value=""
                      id={title}
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
            // onClick={}
            data-testid="save-cookie-settings-button"
          >
            {t(`buttonText`)}
          </button>
        </div>
      </Modal>
    </>
  );
}
