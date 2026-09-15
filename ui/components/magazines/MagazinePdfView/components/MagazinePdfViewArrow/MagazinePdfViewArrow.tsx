import { CSSProperties } from 'react';
import clsx from 'clsx';
import IconChevronLeft from '../../../../../icons/icon-chevron-left.svg';
import IconChevronRight from '../../../../../icons/icon-chevron-right.svg';

export function MagazinePdfViewArrow({
  direction,
  className,
  style,
  onClick,
}: {
  direction: 'prev' | 'next';
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  const Icon = direction === `prev` ? IconChevronLeft : IconChevronRight;

  return (
    <button
      type="button"
      className={clsx(`magazine-pdf-view__arrow-button`, className)}
      style={style}
      onClick={onClick}
      aria-label={direction === `prev` ? `Предыдущий разворот` : `Следующий разворот`}
    >
      <Icon
        className="magazine-pdf-view__arrow-icon"
        aria-hidden="true"
      />
    </button>
  );
}
