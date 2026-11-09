import clsx from 'clsx';
import { DetailedHTMLProps, InputHTMLAttributes, useId } from 'react';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  description?: string;
  isError?: boolean;
}

export function InputRedesign({
  label,
  description,
  className,
  ...props
}: InputProps) {
  const inputId = useId();

  return (
    <div className={clsx(`input-redesign`, className)}>
      <div className="input-redesign__box">
        <input
          id={inputId}
          className="input-redesign__control ym-disable-keys"
          placeholder=""
          {...props}
        />
        <label
          htmlFor={inputId}
          className="input-redesign__label"
        >
          {label}
        </label>
      </div>

    </div>
  );
}
