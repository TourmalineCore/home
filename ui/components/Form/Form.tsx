import clsx from 'clsx';
import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  FormEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { ExternalLink } from '../ExternalLink/ExternalLink';
import { Input } from './components/Input/Input';
import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
import { Textarea } from './components/Textarea/Textarea';
import { Spinner } from '../Spinner/Spinner';
import { DEFAULT_LOCALE } from '../../common/constants';
import { isChineseLanguage } from '../../common/utils';
import { ReCAPTCHALanguage } from '../../common/enums/captcha';

export function Form({
  onSubmit = () => {},
  buttonClassName,
}: {
  onSubmit: (formData: FormData) => unknown;
  buttonClassName?: string;
}) {
  const {
    t,
  } = useTranslation(`form`);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const routerLocale = useMemo(() => {
    if (!router.locale) {
      return DEFAULT_LOCALE;
    }

    return router.locale;
  }, [router.locale]);

  return (
    <>
      <form
        className={clsx(`form`, {
          'form--zh': isChineseLanguage(router.locale),
        })}
        onSubmit={handleFormSubmit}
      >
        <Input
          id="name"
          name="name"
          className="form__input"
          label={t(`name.label`)}
          description={t(`name.description`)}
          onKeyDown={(e) => {
            if (e.key === `Enter`) {
              e.preventDefault();
            }
          }}
          required
        />
        <Input
          id="email"
          name="email"
          className="form__input"
          label={t(`email.label`)}
          description={t(`email.description`)}
          type="email"
          onKeyDown={(e) => {
            if (e.key === `Enter`) {
              e.preventDefault();
            }
          }}
          required
        />
        <Textarea
          id="message"
          name="message"
          label={t(`message.label`)}
          className="form__message"
          description={t(`message.description`)}
        />

        <div className="form__footer">
          <PrimaryButton
            type="submit"
            className={clsx(`form__button`, buttonClassName)}
          >
            {
              isLoading
                ? <Spinner />
                : t(`buttonText`)
            }
          </PrimaryButton>
          <div className="form__approval">
            <Trans
              i18nKey="form:recaptchaText"
              components={{
                privacyLink: <ExternalLink
                  target="_blank"
                  href="https://policies.google.com/privacy"
                />,
                termsLink: <ExternalLink
                  target="_blank"
                  href="https://policies.google.com/terms"
                />,
              }}
            />
          </div>
        </div>
      </form>

      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ``}
        badge="bottomleft"
        hl={ReCAPTCHALanguage[routerLocale as keyof typeof ReCAPTCHALanguage]}
      />
    </>
  );

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!recaptchaRef.current) {
        return;
      }

      const token = await recaptchaRef.current.executeAsync();

      if (!token) {
        return;
      }

      const formData = new FormData(event.target as HTMLFormElement);
      formData.append(`g-recaptcha-response`, token);

      onSubmit(formData);

      recaptchaRef.current.reset();
    } finally {
      setIsLoading(false);
    }
  }
}
