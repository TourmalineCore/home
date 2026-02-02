import clsx from 'clsx';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label: string;
  description?: string;
  isError?: boolean;
}

export function InputRedesign({
  id,
  label,
  description,
  className,
  ...props
}: InputProps) {
  return (
    <div className={clsx(`input-redesign`, className)}>
      <div className="input-redesign__box">
        <input
          id={id}
          className="input-redesign__control"
          placeholder=""
          {...props}
        />
        <label
          htmlFor={id}
          className="input-redesign__label"
        >
          {label}
        </label>
      </div>

    </div>
  );
}
