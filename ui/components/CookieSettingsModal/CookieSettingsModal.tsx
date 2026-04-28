import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import { Modal } from '../Modal/Modal';

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

  return (
    <Modal
      className={clsx(`cookie-settings-modal`, {
        'cookie-settings-modal--open': isModalOpen,
      })}
      data-testid="cookie-settings-modal"
      onClose={onCloseModal}
    >
      <div
        className="cookie-settings-modal__inner"
      >
        <h2 className="cookie-settings-modal__title">{t(`title`)}</h2>
        <ul className="cookie-settings-modal__list">
          {optionsList.map(({
            text, title,
          }) => (
            <li
              key={title}
              className="cookie-settings-modal__item"
            >
              <span
                className="cookie-settings-modal__radio"
              />
              <h3>{t(`title`)}</h3>
              <span
                className="cookie-settings-modal__description"
              >
                {text}
              </span>
            </li>
          ))}
        </ul>
        <div>{t(`note`)}</div>
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
  );
}
