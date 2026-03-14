import clsx from 'clsx';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import { useRouter } from 'next/router';
import { isChineseLanguage } from '../../../../common/utils';

interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  id: string;
  label: string;
  description?: string;
  isError?: boolean;
}

export function Textarea({
  id,
  label,
  description,
  isError = false,
  className,
  ...props
}: TextareaProps) {
  const {
    locale,
  } = useRouter();

  return (
    <div className={clsx(`textarea`, className, {
      'textarea--is-error': isError,
      'textarea--zh': isChineseLanguage(locale),
    })}
    >
      <div className="textarea__box">
        <textarea
          id={id}
          className="textarea__control"
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={id}
          className="textarea__label"
        >
          {label}
        </label>
      </div>
      {description && <div className="textarea__description">{description}</div>}
    </div>
  );
}
