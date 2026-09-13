import { useMemo, useRef } from 'react';
import { MagazinePdfFullscreenButton } from './MagazinePdfFullscreenButton';
import { MagazinePdfFullscreenButtonState } from './MagazinePdfFullscreenButtonState';
import { MagazinePdfFullscreenButtonStateContext } from './MagazinePdfFullscreenButtonStateContext';

// See MagazinePdfCounterContent.story.tsx for why this wiring needs its own module. Keeping the
// state instance and the target element in this one in-tree tree component means the container's
// fullscreenchange listener and this story's assertions share one live browser-side MobX state,
// so its reactivity actually runs instead of crossing the Node/browser boundary as a dead snapshot.
export function MagazinePdfFullscreenButtonStory({
  attachTargetRef = true,
}: {
  attachTargetRef?: boolean;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const fullscreenButtonState = useMemo(() => new MagazinePdfFullscreenButtonState(), []);

  return (
    <MagazinePdfFullscreenButtonStateContext.Provider value={fullscreenButtonState}>
      <div
        ref={attachTargetRef ? targetRef : null}
        data-testid="fullscreen-target"
      >
        <MagazinePdfFullscreenButton targetRef={targetRef} />
      </div>
    </MagazinePdfFullscreenButtonStateContext.Provider>
  );
}
