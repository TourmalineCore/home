import { useMemo } from 'react';
import { MagazinePdfFullscreenButtonContent } from './MagazinePdfFullscreenButtonContent';
import { MagazinePdfFullscreenButtonState } from './MagazinePdfFullscreenButtonState';
import { MagazinePdfFullscreenButtonStateContext } from './MagazinePdfFullscreenButtonStateContext';

// See MagazinePdfCounterContent.story.tsx for why this wiring needs its own module (Playwright
// can't mount a component defined in the spec file, and a state instance built in the test
// wouldn't survive the Node/browser boundary as a live MobX-observable object).
export function MagazinePdfFullscreenButtonContentStory({
  initialIsFullscreen,
  onToggleClick,
}: {
  initialIsFullscreen: boolean;
  onToggleClick: () => void;
}) {
  const fullscreenButtonState = useMemo(() => {
    const state = new MagazinePdfFullscreenButtonState();

    state.setIsFullscreen({
      isFullscreen: initialIsFullscreen,
    });

    return state;
  }, [
    initialIsFullscreen,
  ]);

  return (
    <MagazinePdfFullscreenButtonStateContext.Provider value={fullscreenButtonState}>
      <MagazinePdfFullscreenButtonContent onToggleClick={onToggleClick} />
    </MagazinePdfFullscreenButtonStateContext.Provider>
  );
}
