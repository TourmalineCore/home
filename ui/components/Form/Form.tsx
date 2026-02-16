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
import { validateCaptchaToken } from '../../services/smartCaptcha/validateCaptchaToken';

export function Form({
  onSubmit = () => {},
  buttonClassName,
}: {
  onSubmit: ({
    formData,
  }: {
    formData: {
      email: string;
      name: string;
      description: string;
    };
  }) => unknown;
  buttonClassName?: string;
}) {
  const {
    t,
  } = useTranslation(`form`);
  const router = useRouter();

  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isCaptchaVisible, setIsCaptchaVisible] = useState<boolean>(false);
  // It is needed to recreate a captcha, because if a captcha has been sent once, its lifecycle ends.
  // This allows you to use the captcha multiple times without reloading the page.
  const [captchaKey, setCaptchaKey] = useState(0);

  const routerLocale = useMemo(() => {
    if (!router.locale) {
      return DEFAULT_LOCALE;
    }

    return router.locale;
  }, [router.locale]);

  const isSmartCaptchaEnabled = process.env.NEXT_PUBLIC_ENABLE_SMARTCAPTCHA === `true`;

  return (
    <form
      ref={formRef}
      className={clsx(`form`, {
        'form--zh': isChineseLanguage(router.locale),
      })}
      onSubmit={async (e) => {
        e.preventDefault();
        if (isSmartCaptchaEnabled) {
          setIsCaptchaVisible(true);
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
                href={`/documents/policy-${routerLocale}.pdf#page=${routerLocale === `ru` ? `4` : `3`}`}
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
                href={`/documents/policy-${routerLocale}.pdf`}
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
        {isCaptchaVisible && (
          <InvisibleSmartCaptcha
            key={captchaKey}
            sitekey={process.env.NEXT_PUBLIC_SMARTCAPTCHA_CLIENT_KEY as string}
            language={routerLocale === `ru` ? `ru` : `en`}
            onSuccess={handleCaptchaSuccess}
            onChallengeHidden={() => setIsCaptchaVisible(false)}
            visible={isCaptchaVisible}
          />
        )}
      </div>
    </form>
  );

  async function handleCaptchaSuccess(captchaToken: string) {
    try {
      setIsLoading(true);
      const response = await validateCaptchaToken(captchaToken);

      if (response.status === `ok`) {
        await handleSubmit();
      }

      if (submitButtonRef.current) {
        submitButtonRef.current.focus();
      }
    } finally {
      setIsCaptchaVisible(false);
      setIsLoading(false);
      setCaptchaKey((prev) => prev + 1);
    }
  }

  async function handleSubmit() {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      await onSubmit({
        formData: {
          email: formData.get(`email`) as string,
          name: formData.get(`name`) as string,
          description: formData.get(`message`) as string,
        },
      });
    }
  }

  function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === `Enter`) {
      e.preventDefault();
    }
  }
}
