import { Trans, useTranslation } from 'next-i18next';
import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha';

import { InputRedesign } from './components/InputRedesign/InputRedesign';
import { TextareaRedesign } from './components/TextareaRedesign/TextareaRedesign';
import { Spinner } from '../../Spinner/Spinner';
import { DEFAULT_LOCALE } from '../../../common/constants';
import { ReCAPTCHALanguage } from '../../../common/enums/captcha';

export function FormRedesign({
  onSubmit,
  isSubmit,
  setIsSubmit,
  isModal,
} : {
  onSubmit: (formData: FormData) => unknown;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
  isModal?: boolean;
}) {
  const {
    t,
  } = useTranslation(`formBlockRedesign`);

  const {
    locale,
  } = useRouter();

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const routerLocale = useMemo(() => {
    if (!locale) {
      return DEFAULT_LOCALE;
    }

    return locale;
  }, [locale]);

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState(``);

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
    <>
      <form
        className={clsx(`form-redesign`, {
          'form-redesign--is-submitted': isSubmit,
          'is-modal': isModal,
        })}
        onSubmit={handleFormSubmit}
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
          isSubmit
          && (
            <p className="form-redesign__description">
              {description}
              <Link
                className="form-redesign__contact-link"
                href={t(`contactLink`)}
                target="_blank"
              >
                {t(`contactLinkText`)}
              </Link>
            </p>
          )
        }
        {
          !isSubmit && (
            <p className="form-redesign__description">
              {t(`description`)}
            </p>
          )
        }
        {
          !isSubmit && (
            <>
              <InputRedesign
                id="name"
                name="name"
                className="form-redesign__input"
                label={nameLabel}
                onKeyDown={(e) => {
                  if (e.key === `Enter`) {
                    e.preventDefault();
                  }
                }}
                required
              />
              <InputRedesign
                id="email"
                name="email"
                className="form-redesign__input"
                label={emailLabel}
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === `Enter`) {
                    e.preventDefault();
                  }
                }}
                required
              />
              <TextareaRedesign
                id="message"
                name="message"
                label={textareaLabel}
                className="form-redesign__input"
                description={t(`message.description`)}
              />
            </>
          )
        }
        <div className="form-redesign__footer">
          {
            isSubmit ? (
              <button
                className="form-redesign__featured-button"
                type="button"
                onClick={() => setIsSubmit(false)}
              >
                {isModal ? buttonSubmittedLabelModal : buttonSubmittedLabel}
              </button>
            ) : (
              <button
                className="form-redesign__featured-button"
                type="submit"
              >
                {isLoading ? <Spinner /> : buttonSubmitLabel}
              </button>
            )
          }
          {
            !isSubmit && (
              <div className="form-redesign__consent">
                <Trans
                  i18nKey="formBlockRedesign:consentText"
                  components={{
                    bolt: <a
                      className="form-redesign__consent-link"
                      href={`/documents/policy-${locale}.pdf`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={
                        locale === `ru`
                          ? `согласие на обработку персональных данных`
                          : `processing of personal data`
                      }
                    />,
                  }}
                />
              </div>
            )
          }
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
