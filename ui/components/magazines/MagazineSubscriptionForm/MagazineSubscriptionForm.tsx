import { KeyboardEvent, useState } from "react";
import { useIsRussianCountry } from "../../../common/hooks";
import { FormBlockRedesign } from "../../redesign/FormBlockRedesign/FormBlockRedesign";
import { FormRedesign } from "../../redesign/FormRedesign/FormRedesign";
import { InputRedesign } from "../../redesign/InputRedesign/InputRedesign";

const TEXTS = {
  title: `Не пропустите следующий выпуск`,
  titleSubmitted: `Спасибо!`,
  // eslint-disable-next-line max-len
  description: `В следующем выпуске поговорим про инженерную культуру, команды и процессы. Оставьте почту или Telegram, чтобы мы сообщили о выходе нового номера и прислали ссылку на журнал.`,
  descriptionSubmitted: `Мы отправим тебе сообщение когда появится новый выпуск журнала.`,
  buttonSubmit: `Узнать о выпуске первым`,
  buttonSubmitted: `Оставить другой контакт`,
  telegramLabel: `Telegram`,
  emailLabel: `Почта`,
  errorMessage: `Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже или отправьте ваш запрос на почту contact@tourmalinecore.com`,

};

export function MagazineSubscriptionForm({
  isComponentPage,
}: {
  isComponentPage?: boolean;
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(``);
  const [telegram, setTelegram] = useState(``);
  const [email, setEmail] = useState(``);

  const isCountryRus = useIsRussianCountry();

  if (!isCountryRus && !isComponentPage) {
    return null;
  }

  const isRequired = telegram === `` && email === ``;

  return (
    <FormBlockRedesign
      className="magazine-subscription-form"
      testId="magazine-subscription-form"
    >
      <div className="magazine-subscription-form__form-wrapper">
        <FormRedesign
          title={isSubmit ? TEXTS.titleSubmitted : TEXTS.title}
          description={isSubmit ? TEXTS.descriptionSubmitted : TEXTS.description}
          buttonSubmitLabel={TEXTS.buttonSubmit}
          buttonSubmittedLabel={TEXTS.buttonSubmitted}
          onSubmit={onFormSubmit}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          isModal={false}
          onCloseModal={() => {}}
          isComponentPage={isComponentPage}
          error={error}
        >
          <>
            <InputRedesign
              name="telegram"
              className="magazine-subscription-form__input"
              label={TEXTS.telegramLabel}
              value={telegram}
              onChange={((e) => setTelegram(e.target.value))}
              onKeyDown={handleOnKeyDown}
              data-testid="magazine-subscription-form-telegram-input"
              required={isRequired}
            />
            <InputRedesign
              name="email"
              className="magazine-subscription-form__input"
              label={TEXTS.emailLabel}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleOnKeyDown}
              data-testid="magazine-subscription-form-email-input"
              required={isRequired}
            />
          </>
        </FormRedesign>
      </div>
    </FormBlockRedesign>
  );

  async function onFormSubmit({
    formData,
    token,
  }: {
    formData: FormData;
    token: string;
  }) {
    const response = await fetch(`/api/save-magazine-subscribe`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        telegram: formData.get(`telegram`) as string,
        email: formData.get(`email`) as string,
        token,
      }),
    });

    if (!response.ok) {
      setError(TEXTS.errorMessage);
    } else {
      if (error !== ``) {
        setError(``);
      }

      setIsSubmit(true);
    }
  }

  function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === `Enter`) {
      e.preventDefault();
    }
  }
}
