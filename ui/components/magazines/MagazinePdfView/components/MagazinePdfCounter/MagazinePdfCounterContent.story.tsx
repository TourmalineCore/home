import { useMemo } from 'react';
import { MagazinePdfCounterContent } from './MagazinePdfCounterContent';
import { MagazinePdfCounterState } from './MagazinePdfCounterState';
import { MagazinePdfCounterStateContext } from './MagazinePdfCounterStateContext';

// A Playwright component test can't mount a component defined in the spec file itself - its
// build-time transform only resolves components reachable via a real import - so this "story"
// wiring lives in its own module. It also constructs the state instance inside the mounted tree
// (rather than in the test) so the instance lives entirely in the browser: Component Testing runs
// test code in Node and the component in a separate browser, and a class instance built in the
// test would cross that boundary serialized down to a plain, non-reactive snapshot, since MobX's
// observable/computed properties aren't own-enumerable and are dropped by Playwright's prop
// serialization.
export function MagazinePdfCounterContentStory({
  currentSlide,
  totalPages,
  slidesToShow,
}: {
  currentSlide: number;
  totalPages: number;
  slidesToShow: number;
}) {
  const counterState = useMemo(() => {
    const state = new MagazinePdfCounterState();

    state.setSlideInfo({
      currentSlide,
      totalPages,
      slidesToShow,
    });

    return state;
  }, [
    currentSlide,
    totalPages,
    slidesToShow,
  ]);

  return (
    <MagazinePdfCounterStateContext.Provider value={counterState}>
      <MagazinePdfCounterContent />
    </MagazinePdfCounterStateContext.Provider>
  );
}
