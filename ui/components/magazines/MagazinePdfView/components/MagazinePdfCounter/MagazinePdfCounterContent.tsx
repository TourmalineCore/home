import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { MagazinePdfCounterStateContext } from './MagazinePdfCounterStateContext';

export const MagazinePdfCounterContent = observer(() => {
  const counterState = useContext(MagazinePdfCounterStateContext);

  const pageLabel = counterState.currentPage === counterState.currentPageEnd
    ? `${counterState.currentPage}`
    : `${counterState.currentPage}–${counterState.currentPageEnd}`;

  return (
    <span
      className="magazine-pdf-counter"
      data-testid="magazine-pdf-counter"
      aria-live="polite"
    >
      {`${pageLabel} / ${counterState.totalPages}`}
    </span>
  );
});
