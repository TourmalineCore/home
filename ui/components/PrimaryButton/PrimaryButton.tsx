import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { isChineseLanguage } from '../../common/utils';

type PrimaryButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function PrimaryButton({
  children,
  className,
  ...props
}: PrimaryButtonProps) {
  const {
    locale,
  } = useRouter();

  return (
    <button
      type="button"
      className={clsx(`button primary-button`, className, {
        'primary-button--zh': isChineseLanguage(locale),
      })}
      {...props}
    >
      {children}
    </button>
  );
}
