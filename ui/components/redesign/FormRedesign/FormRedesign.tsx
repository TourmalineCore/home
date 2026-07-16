import { ReactNode, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import { Spinner } from '../../Spinner/Spinner';
import { CheckBox } from '../../Checkbox/Checkbox';
import { useSmartCaptcha } from '../../../common/hooks/useSmartCaptcha';

export function FormRedesign({
  title,
  description,
  buttonSubmitLabel,
  buttonSubmittedLabel,
  imageUrl,
  children,
  onSubmit,
  isSubmit,
  setIsSubmit,
  isModal,
  onCloseModal,
  error,
  isComponentPage,
  testId,
} : {
  title: string;
  description: ReactNode;
  buttonSubmitLabel: string;
  buttonSubmittedLabel: string;
  imageUrl?: string;
  children: ReactNode;
  onSubmit: ({
    formData,
    token,
  }:{
    formData: FormData;
    token: string;
  }) => unknown;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
  isModal: boolean;
  onCloseModal: () => void;
  error: string;
  isComponentPage?: boolean;
  testId?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    locale,
  } = useRouter();

  const {
    isSmartCaptchaEnabled,
    isSmartCaptchaVisible,
    smartCaptchaKey,
    showSmartCaptcha,
    hideSmartCaptcha,
    resetSmartCaptcha,
  } = useSmartCaptcha();

  const [isConsentAccepted, setIsConsentAccepted] = useState(false);

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
      data-testid={testId}
    >
      {
        isSubmit && imageUrl && (
          <div className="form-redesign__img-container">
            <Image
              src={imageUrl}
              fill
              alt=""
            />
          </div>
        )
      }
      <h2 className="form-redesign__title">
        {title}
      </h2>
      <p
        className="form-redesign__description ym-hide-content"
        data-testid="form-redesign-description"
      >
        {description}
      </p>
      {
        !isSubmit && (
          <>
            {children}
            <div className="form-redesign__consent">
              <CheckBox
                className="form-redesign__consent-checkbox"
                required
                aria-label={
                  locale === `ru`
                    ? `согласие на обработку персональных данных`
                    : `processing of personal data`
                }
                data-testid="form-redesign-consent-checkbox"
                checked={isConsentAccepted}
                onChange={() => setIsConsentAccepted(!isConsentAccepted)}
              />
              <div className="form-redesign__consent-text">
                {getConsentText()}
              </div>
            </div>
          </>
        )
      }
      <div className="form-redesign__footer">
        {error && <span className="form-redesign__error">{error}</span>}
        {
          isSubmit ? (
            <button
              className="form-redesign__featured-button"
              type="button"
              onClick={(e) => {
                e.preventDefault();

                if (isModal) {
                  onCloseModal();
                }

                setIsSubmit(false);
              }}
            >
              {buttonSubmittedLabel}
            </button>
          ) : (
            <button
              ref={submitButtonRef}
              className="form-redesign__featured-button"
              type="submit"
              data-testid="form-redesign-submit-button"
              disabled={!isConsentAccepted || isLoading}
            >
              {isLoading ? <Spinner /> : buttonSubmitLabel}
            </button>
          )
        }

        {(isSmartCaptchaEnabled && !isComponentPage) && (
          <InvisibleSmartCaptcha
            key={smartCaptchaKey}
            sitekey={process.env.NEXT_PUBLIC_SMARTCAPTCHA_CLIENT_KEY as string}
            language={locale === `ru` ? `ru` : `en`}
            onSuccess={handleCaptchaSuccess}
            onChallengeHidden={hideSmartCaptcha}
            visible={isSmartCaptchaVisible}
          />
        )}
      </div>
    </form>
  );

  async function handleCaptchaSuccess(smartCaptchaToken: string) {
    try {
      await handleSubmit({
        token: smartCaptchaToken,
      });

      if (submitButtonRef.current) {
        submitButtonRef.current.focus();
      }
    } finally {
      resetSmartCaptcha();
    }
  }

  async function handleSubmit({
    token = ``,
  }: {
    token?: string;
  } = {}) {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      try {
        setIsLoading(true);

        await onSubmit({
          formData,
          token,
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  function getConsentText() {
    if (locale === `ru`) {
      return (
        <>
          Я даю
          <a
            className="form-redesign__consent-link"
            href="/documents/policy/policy-ru.pdf#page=3"
            target="_blank"
            rel="noreferrer"
            aria-label="согласие на обработку персональных данных"
          >
            согласие на обработку персональных данных
          </a>
          {` `}
          и&nbsp;ознакомлен(а)
          <a
            className="form-redesign__consent-link"
            href="/documents/policy/policy-ru.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label="политика конфиденциальности"
          >
            с политикой конфиденциальности
          </a>
        </>
      );
    }
    return (
      <>
        I consent to the processing of
        <a
          className="form-redesign__consent-link"
          href="/documents/policy/policy-en.pdf#page=3"
          target="_blank"
          rel="noreferrer"
          aria-label="processing of personal data"
        >
          personal data
        </a>
        {` `}
        and have read the
        <a
          className="form-redesign__consent-link"
          href="/documents/policy/policy-en.pdf"
          target="_blank"
          rel="noreferrer"
          aria-label="privacy policy"
        >
          privacy policy
        </a>
      </>
    );
  }
}
