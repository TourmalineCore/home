import clsx from 'clsx';
import IconChevronLeft from '../../../../../icons/icon-chevron-left.svg';
import IconChevronRight from '../../../../../icons/icon-chevron-right.svg';

export function MagazinePdfViewArrow({
  direction,
  className,
  onClick,
}: {
  direction: 'prev' | 'next';
  className?: string;
  onClick?: () => void;
}) {
  const Icon = direction === `prev` ? IconChevronLeft : IconChevronRight;

  return (
    <button
      type="button"
      className={clsx(`magazine-pdf-view__arrow-button`, className)}
      data-testid={`magazine-pdf-view-${direction}-arrow`}
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
