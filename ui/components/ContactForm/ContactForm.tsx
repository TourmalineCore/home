import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormBlockRedesign } from "../redesign/FormBlockRedesign/FormBlockRedesign";
import { MarkdownText } from "../MarkdownText/MarkdownText";
import { FormRedesign } from "../redesign/FormRedesign/FormRedesign";
import { sendEmail } from "../../services/sendEmail/sendEmail";
import { useIsRussianCountry } from "../../common/hooks";
import { InputRedesign } from "../redesign/InputRedesign/InputRedesign";
import { TextareaRedesign } from "../redesign/TextareaRedesign/TextareaRedesign";

export function ContactForm({
  isModal = false,
  initializeIsSubmit = false,
  isComponentPage,
  onCloseModal = () => {},
}: {
  isModal?: boolean;
  initializeIsSubmit?: boolean;
  isComponentPage?: boolean;
  onCloseModal?: () => void;
}) {
  const [isSubmit, setIsSubmit] = useState(initializeIsSubmit);
  const [error, setError] = useState(``);
  const [email, setEmail] = useState(``);

  const isCountryRus = useIsRussianCountry();

  const {
    locale,
  } = useRouter();

  const {
    t,
  } = useTranslation(`contactForm`);

  if (!isCountryRus && !isComponentPage) {
    return null;
  }

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
    <FormBlockRedesign
      className="contact-form"
      testId="contact-form"
      isModal={isModal}
    >
      <div className="contact-form__form-wrapper">
        <FormRedesign
          title={isSubmit ? titleSubmitted : t(`title`)}
          description={isSubmit
            ? (
              <>
                {description}
                <Link
                  className="contact-form__contact-link"
                  href={t(`contactLink`)}
                  target="_blank"
                >
                  {t(`contactLinkText`)}
                </Link>
              </>
            )
            : t(`description`)}
          buttonSubmitLabel={buttonSubmitLabel}
          buttonSubmittedLabel={isModal ? buttonSubmittedLabelModal : buttonSubmittedLabel}
          imageUrl={t(`imageUrl`)}
          onSubmit={onFormSubmit}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          isModal={isModal}
          onCloseModal={onCloseModal}
          isComponentPage={isComponentPage}
          error={error}
        >
          <>
            <InputRedesign
              name="name"
              className="contact-form__input"
              label={nameLabel}
              onKeyDown={handleOnKeyDown}
              data-testid="contact-form-name-input"
              required
            />
            <InputRedesign
              name="email"
              className="contact-form__input"
              label={emailLabel}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleOnKeyDown}
              data-testid="contact-form-email-input"
              required
            />
            <TextareaRedesign
              name="message"
              label={textareaLabel}
              className="contact-form__input"
              description={t(`message.description`)}
              data-testid="contact-form-message-textarea"
            />
          </>
        </FormRedesign>
      </div>
      {!isSubmit && (
        <div className="contact-form__aside">
          <div className="contact-form__aside-inner container-redesign">
            <div className="contact-form__aside-img">
              <Image
                src="/images/img-aside.png"
                alt=""
                fill
              />
            </div>
            <MarkdownText
              isTargetBlank
              className="contact-form__aside-text"
            >
              {t(`asideText`)}
            </MarkdownText>
          </div>
        </div>
      )}
    </FormBlockRedesign>
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

  async function onFormSubmit({
    formData,
    token,
  }: {
    formData: FormData;
    token: string;
  }) {
    try {
      await sendEmail({
        formData: {
          email: formData.get(`email`) as string,
          name: formData.get(`name`) as string,
          description: formData.get(`message`) as string,
        },
        token,
      });

      if (error !== ``) {
        setError(``);
      }

      setIsSubmit(true);
    } catch {
      setError(t(`error`));
    }
  }

  function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === `Enter`) {
      e.preventDefault();
    }
  }
}
