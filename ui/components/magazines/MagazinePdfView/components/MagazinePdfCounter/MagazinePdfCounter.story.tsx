import { useMemo } from 'react';
import { MagazinePdfCounter } from './MagazinePdfCounter';
import { MagazinePdfCounterState } from './MagazinePdfCounterState';
import { MagazinePdfCounterStateContext } from './MagazinePdfCounterStateContext';

// See MagazinePdfCounterContent.story.tsx for why this wiring needs its own module. This story
// owns the state instance the way the real page (MagazinePdfView) will, providing it around the
// container so the container's own effect and the content it renders share one live instance.
export function MagazinePdfCounterStory({
  currentSlide,
  totalPages,
  slidesToShow,
}: {
  currentSlide: number;
  totalPages: number;
  slidesToShow: number;
}) {
  const counterState = useMemo(() => new MagazinePdfCounterState(), []);

  return (
    <MagazinePdfCounterStateContext.Provider value={counterState}>
      <MagazinePdfCounter
        currentSlide={currentSlide}
        totalPages={totalPages}
        slidesToShow={slidesToShow}
      />
    </MagazinePdfCounterStateContext.Provider>
  );
}
