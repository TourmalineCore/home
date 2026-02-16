import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';
import { isChineseLanguage } from '../../common/utils';

type PrimaryButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

// eslint-disable-next-line react/display-name
export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(({
  children,
  className,
  ...props
}, ref) => {
  const {
    locale,
  } = useRouter();

  return (
    <button
      type="button"
      className={clsx(`button primary-button`, className, {
        'primary-button--zh': isChineseLanguage(locale),
      })}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
