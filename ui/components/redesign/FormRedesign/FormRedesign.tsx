import { Trans, useTranslation } from 'next-i18next';
import {
  KeyboardEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import { InputRedesign } from './components/InputRedesign/InputRedesign';
import { TextareaRedesign } from './components/TextareaRedesign/TextareaRedesign';
import { Spinner } from '../../Spinner/Spinner';
import { DEFAULT_LOCALE } from '../../../common/constants';
import { CheckBox } from '../../Checkbox/Checkbox';
import { useSmartCaptcha } from '../../../common/hooks/useSmartCaptcha';

export function FormRedesign({
  onSubmit,
  isSubmit,
  setIsSubmit,
  isModal,
  onCloseModal,
  isComponentPage,
} : {
  onSubmit: ({
    formData,
    token,
  }:{
    formData: {
      email: string;
      name: string;
      description: string;
    };
    token: string;
  }) => unknown;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
  isModal?: boolean;
  onCloseModal?: () => void;
  isComponentPage?: boolean;
}) {
  const {
    t,
  } = useTranslation(`formBlockRedesign`);

  const {
    locale,
  } = useRouter();

  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(``);

  const {
    isSmartCaptchaEnabled,
    isSmartCaptchaVisible,
    smartCaptchaKey,
    showSmartCaptcha,
    hideSmartCaptcha,
    resetSmartCaptcha,
  } = useSmartCaptcha();

  const [isConsentAccepted, setIsConsentAccepted] = useState(false);

  const routerLocale = useMemo(() => {
    if (!locale) {
      return DEFAULT_LOCALE;
    }

    return locale;
  }, [locale]);

  const {
    nameLabel,
    emailLabel,
    description,
    textareaLabel,
    buttonSubmitLabel,
    buttonSubmittedLabel,
    buttonSubmittedLabelModal,
    titleSubmitted,
  } = getTranslations();

  return (
    <form
      ref={formRef}
      className={clsx(`form-redesign`, {
        'form-redesign--is-submitted': isSubmit,
        'is-modal': isModal,
      })}
      onSubmit={async (e) => {
        e.preventDefault();
        if (isSmartCaptchaEnabled) {
          showSmartCaptcha();
        } else {
          await handleSubmit();
        }
      }}
    >
      {
        isSubmit && (
          <div className="form-redesign__img-container">
            <Image
              src={t(`imageUrl`)}
              fill
              alt=""
            />
          </div>
        )
      }
      <h2 className="form-redesign__title">
        {isSubmit ? `${titleSubmitted}` : t(`title`)}
      </h2>
      {
        isSubmit ? (
          <p
            className="form-redesign__description ym-hide-content"
            data-testid="form-redesign-description"
          >
            {description}
            <Link
              className="form-redesign__contact-link"
              href={t(`contactLink`)}
              target="_blank"
            >
              {t(`contactLinkText`)}
            </Link>
          </p>
        ) : (
          <p className="form-redesign__description">
            {t(`description`)}
          </p>
        )
      }
      {
        !isSubmit && (
          <>
            <InputRedesign
              id={`name-${isModal ? `modal` : ``}`}
              name={`name-${isModal ? `modal` : ``}`}
              className="form-redesign__input"
              label={nameLabel}
              onKeyDown={handleOnKeyDown}
              data-testid="form-redesign-name-input"
              required
            />
            <InputRedesign
              id={`email-${isModal ? `modal` : ``}`}
              name={`email-${isModal ? `modal` : ``}`}
              className="form-redesign__input"
              label={emailLabel}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleOnKeyDown}
              data-testid="form-redesign-email-input"
              required
            />
            <TextareaRedesign
              id={`message-${isModal ? `modal` : ``}`}
              name={`message-${isModal ? `modal` : ``}`}
              label={textareaLabel}
              className="form-redesign__input"
              description={t(`message.description`)}
              data-testid="form-redesign-message-textarea"
            />
            <div className="form-redesign__consent">
              <CheckBox
                className="form-redesign__consent-checkbox"
                required
                aria-label={
                  locale === `ru`
                    ? `согласие на обработку персональных данных`
                    : `processing of personal data`
                }
                data-testid="form-block-consent-checkbox"
                checked={isConsentAccepted}
                onChange={() => setIsConsentAccepted(!isConsentAccepted)}
              />
              <div className="form-redesign__consent-text">
                <Trans
                  i18nKey="formBlockRedesign:consentText"
                  components={{
                    personalData: <a
                      className="form-redesign__consent-link"
                      href={`/documents/policy/policy-${routerLocale}.pdf#page=3}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={
                        locale === `ru`
                          ? `согласие на обработку персональных данных`
                          : `processing of personal data`
                      }
                    />,
                    privacyPolicy: <a
                      className="form-redesign__consent-link"
                      href={`/documents/policy/policy-${locale}.pdf`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={
                        locale === `ru`
                          ? `политика конфиденциальности`
                          : `privacy policy`
                      }
                    />,
                  }}
                />
              </div>
            </div>
          </>
        )
      }
      <div className="form-redesign__footer">
        {
          isSubmit ? (
            <button
              className="form-redesign__featured-button"
              type="button"
              onClick={() => {
                if (isModal) {
                  onCloseModal?.();
                }

                setIsSubmit(false);
              }}
            >
              {isModal ? buttonSubmittedLabelModal : buttonSubmittedLabel}
            </button>
          ) : (
            <button
              ref={submitButtonRef}
              className="form-redesign__featured-button"
              type="submit"
              data-testid="form-block-submit-button"
              disabled={!isConsentAccepted}
            >
              {isLoading ? <Spinner /> : buttonSubmitLabel}
            </button>
          )
        }

        {(isSmartCaptchaEnabled && !isComponentPage) && (
          <InvisibleSmartCaptcha
            key={smartCaptchaKey}
            sitekey={process.env.NEXT_PUBLIC_SMARTCAPTCHA_CLIENT_KEY as string}
            language={routerLocale === `ru` ? `ru` : `en`}
            onSuccess={handleCaptchaSuccess}
            onChallengeHidden={hideSmartCaptcha}
            visible={isSmartCaptchaVisible}
          />
        )}
      </div>
    </form>
  );

  function getTranslations() {
    if (locale === `ru`) {
      return {
        nameLabel: `Имя`,
        emailLabel: `Почта`,
        description: `Мы ответим на вашу почту ${email} в течение одного рабочего дня. Если вопрос срочный, смело пишите в`,
        textareaLabel: `Расскажите о вашей задаче`,
        buttonSubmitLabel: `Отправить заявку`,
        buttonSubmittedLabel: `Заполнить еще раз`,
        buttonSubmittedLabelModal: `Вернуться к сайту`,
        titleSubmitted: `Спасибо за заявку!`,
      };
    }

    return {
      nameLabel: `Name`,
      emailLabel: `Email`,
      description: `We will send a message to your email ${email} within 1 working day. If urgent, please contact us on`,
      textareaLabel: `Describe your project`,
      buttonSubmitLabel: `Send`,
      buttonSubmittedLabel: `Write more`,
      buttonSubmittedLabelModal: `Back to the website`,
      titleSubmitted: `Thank you!`,
    };
  }

  async function handleCaptchaSuccess(smartCaptchaToken: string) {
    try {
      setIsLoading(true);

      await handleSubmit({
        token: smartCaptchaToken,
      });

      if (submitButtonRef.current) {
        submitButtonRef.current.focus();
      }
    } finally {
      resetSmartCaptcha();
      setIsLoading(false);
    }
  }

  async function handleSubmit({
    token = ``,
  }: {
    token?: string;
  } = {}) {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      await onSubmit({
        formData: {
          email: formData.get(`email-${isModal ? `modal` : ``}`) as string,
          name: formData.get(`name-${isModal ? `modal` : ``}`) as string,
          description: formData.get(`message-${isModal ? `modal` : ``}`) as string,
        },
        token,
      });
    }
  }

  function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === `Enter`) {
      e.preventDefault();
    }
  }
}
