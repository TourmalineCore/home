import clsx from 'clsx';
import { DetailedHTMLProps, TextareaHTMLAttributes, useId } from 'react';

interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  label: string;
  description?: string;
  isError?: boolean;
}

export function TextareaRedesign({
  label,
  description,
  className,
  ...props
}: TextareaProps) {
  const textareaId = useId();

  return (
    <div className={clsx(`textarea-redesign`, className)}>
      <div className="textarea-redesign__box">
        <textarea
          id={textareaId}
          className="textarea-redesign__control ym-disable-keys"
          placeholder=""
          {...props}
        />
        <label
          htmlFor={textareaId}
          className="textarea-redesign__label"
        >
          {label}
        </label>
      </div>
    </div>
  );
}
