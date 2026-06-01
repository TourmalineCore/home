import clsx from 'clsx';
import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  useMemo,
  useRef,
  KeyboardEvent,
  useState,
} from 'react';

import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import { Input } from './components/Input/Input';
import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
import { Textarea } from './components/Textarea/Textarea';
import { Spinner } from '../Spinner/Spinner';
import { isChineseLanguage } from '../../common/utils';
import { DEFAULT_LOCALE } from '../../common/constants';
import { CheckBox } from '../Checkbox/Checkbox';
import { useSmartCaptcha } from '../../common/hooks/useSmartCaptcha';

export function Form({
  onSubmit = () => {},
  error,
  buttonClassName,
}: {
  onSubmit: ({
    formData,
    token,
  }: {
    formData: {
      email: string;
      name: string;
      description: string;
    };
    token: string;
  }) => unknown;
  error: string;
  buttonClassName?: string;
}) {
  const {
    t,
  } = useTranslation(`form`);
  const router = useRouter();

  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const {
    isSmartCaptchaEnabled,
    isSmartCaptchaVisible,
    smartCaptchaKey,
    showSmartCaptcha,
    hideSmartCaptcha,
    resetSmartCaptcha,
  } = useSmartCaptcha();

  const routerLocale = useMemo(() => {
    if (!router.locale) {
      return DEFAULT_LOCALE;
    }

    return router.locale;
  }, [router.locale]);

  return (
    <form
      ref={formRef}
      className={clsx(`form`, {
        'form--zh': isChineseLanguage(router.locale),
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
      <Input
        id="name"
        name="name"
        className="form__input"
        label={t(`name.label`)}
        description={t(`name.description`)}
        onKeyDown={handleOnKeyDown}
        required
      />
      <Input
        id="email"
        name="email"
        className="form__input"
        label={t(`email.label`)}
        description={t(`email.description`)}
        type="email"
        onKeyDown={handleOnKeyDown}
        required
      />
      <Textarea
        id="message"
        name="message"
        label={t(`message.label`)}
        className="form__message"
        description={t(`message.description`)}
      />

      <div className="form__consent">
        <CheckBox
          className="form__consent-checkbox"
          required
          aria-label={
            router.locale === `ru`
              ? `согласие на обработку персональных данных`
              : `processing of personal data`
          }
        />
        <div className="form__consent-text">
          <Trans
            i18nKey="formBlock:consentText"
            components={{
              personalData: <a
                className="form__consent-link"
                href={`/documents/policy/policy-${routerLocale}.pdf#page=3}`}
                target="_blank"
                rel="noreferrer"
                aria-label={
                  routerLocale === `ru`
                    ? `согласие на обработку персональных данных`
                    : `processing of personal data`
                }
              />,
              privacyPolicy: <a
                className="form__consent-link"
                href={`/documents/policy/policy-${routerLocale}.pdf`}
                target="_blank"
                rel="noreferrer"
                aria-label={
                  routerLocale === `ru`
                    ? `политика конфиденциальности`
                    : `privacy policy`
                }
              />,
            }}
          />
        </div>
      </div>

      <div className="form__footer">
        <span className="form__error">{error}</span>
        <PrimaryButton
          type="submit"
          ref={submitButtonRef}
          className={clsx(`form__button`, buttonClassName)}
        >
          {
            isLoading
              ? <Spinner />
              : t(`buttonText`)
          }
        </PrimaryButton>
        {isSmartCaptchaVisible && (
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
          email: formData.get(`email`) as string,
          name: formData.get(`name`) as string,
          description: formData.get(`message`) as string,
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
