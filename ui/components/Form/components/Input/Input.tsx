import clsx from 'clsx';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useRouter } from 'next/router';
import { isChineseLanguage } from '../../../../common/utils';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label: string;
  description?: string;
  isError?: boolean;
}

export function Input({
  id,
  label,
  description,
  isError = false,
  className,
  ...props
}: InputProps) {
  const {
    locale,
  } = useRouter();

  return (
    <div className={clsx(`input`, className, {
      'input--is-error': isError,
      'input--zh': isChineseLanguage(locale),
    })}
    >
      <div className="input__box">
        <input
          id={id}
          className="input__control"
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={id}
          className="input__label"
        >
          {label}
        </label>
      </div>
      {description && <div className="input__description">{description}</div>}
    </div>
  );
}
