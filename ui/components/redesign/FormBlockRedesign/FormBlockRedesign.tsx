import clsx from 'clsx';
import { ReactNode } from 'react';

export function FormBlockRedesign({
  className,
  children,
  testId,
  isModal,
}: {
  className: string;
  children: ReactNode;
  testId?: string;
  isModal?: boolean;
}) {
  return (
    <section
      className={clsx(`form-block-redesign`, className, {
        'is-modal': isModal,
      })}
      data-testid={testId}
    >
      <div className="form-block-redesign__wrapper container-redesign">
        <div className="form-block-redesign__inner">
          {children}
        </div>
      </div>
    </section>
  );
}
