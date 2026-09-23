import clsx from 'clsx';
import IconChevronLeft from '../../../../../icons/icon-chevron-left.svg';
import IconChevronRight from '../../../../../icons/icon-chevron-right.svg';

export function MagazinePdfViewArrow({
  direction,
  isDisabled,
  onClick,
}: {
  direction: 'prev' | 'next';
  isDisabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === `prev` ? IconChevronLeft : IconChevronRight;

  return (
    <button
      type="button"
      // Rendered outside the slider, but keeps slick's classes so its existing styles still apply
      className={clsx(`magazine-pdf-view__arrow-button slick-arrow slick-${direction}`, {
        'slick-disabled': isDisabled,
      })}
      data-testid={`magazine-pdf-view-${direction}-arrow`}
      onClick={onClick}
      // Not `disabled`, which would drop focus once the user reaches the last slide
      aria-disabled={isDisabled}
      aria-label={direction === `prev` ? `Предыдущий разворот` : `Следующий разворот`}
    >
      <Icon
        className="magazine-pdf-view__arrow-icon"
        aria-hidden="true"
      />
    </button>
  );
}
