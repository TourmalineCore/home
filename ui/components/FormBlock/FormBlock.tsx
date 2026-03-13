import { useTranslation } from 'next-i18next';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Form } from '../Form/Form';
import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
import { isChineseLanguage } from '../../common/utils';
import { sendEmail } from '../../services/sendEmail/sendEmail';

export function FormBlock({
  id,
  buttonClassName,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  buttonClassName?: string;
}) {
  const {
    locale,
  } = useRouter();
  const [email, setEmail] = useState(``);
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    t,
  } = useTranslation(`formBlock`);

  return (
    <section
      className={
        clsx(`section container form-block`, {
          'form-block--zh': isChineseLanguage(locale),
        })
      }
      id={id}
      {...props}
    >
      <div
        className={clsx(`form-block__inner`)}
      >
        <h2 className="title-technology-type-2 form-block__title">
          {t(`title`)}
          {` `}
          <span className="title-technology-type-2 form-block__title-technology">
            {t(`titleGradient`)}
          </span>
        </h2>
        {
          !isSubmit
            ? (
              <Form
                onSubmit={onFormSubmit}
                buttonClassName={buttonClassName}
              />
            )
            : (
              <div>
                <span className="form-block__text">
                  {t(`text`)}
                  {` `}
                  {email}
                </span>
                <PrimaryButton onClick={() => setIsSubmit(false)}>{t(`buttonText`)}</PrimaryButton>
              </div>
            )
        }
      </div>
    </section>
  );

  async function onFormSubmit({
    formData,
  }: {
    formData: {
      email: string;
      name: string;
      description: string;
    };
  }) {
    await sendEmail(formData);

    setEmail(formData.email);
    setIsSubmit(true);
  }
}
