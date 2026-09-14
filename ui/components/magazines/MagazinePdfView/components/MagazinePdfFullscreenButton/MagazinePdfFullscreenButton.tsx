import { RefObject, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { MagazinePdfFullscreenButtonStateContext } from './MagazinePdfFullscreenButtonStateContext';
import { MagazinePdfFullscreenButtonContent } from './MagazinePdfFullscreenButtonContent';

export const MagazinePdfFullscreenButton = observer(({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement>;
}) => {
  const fullscreenButtonState = useContext(MagazinePdfFullscreenButtonStateContext);

  useEffect(() => {
    document.addEventListener(`fullscreenchange`, handleFullscreenChange);

    return () => {
      document.removeEventListener(`fullscreenchange`, handleFullscreenChange);
    };

    function handleFullscreenChange() {
      fullscreenButtonState.setIsFullscreen({
        isFullscreen: document.fullscreenElement === targetRef.current,
      });
    }
  }, [targetRef, fullscreenButtonState]);

  return (
    <MagazinePdfFullscreenButtonContent
      onToggleClick={toggleFullscreen}
    />
  );

  function toggleFullscreen() {
    if (!targetRef.current) {
      return;
    }

    if (document.fullscreenElement === targetRef.current) {
      // Rejects if fullscreen was already exited by other means (e.g. the browser's own Esc
      // handling racing this click), which isn't an error worth surfacing to the user.
      document.exitFullscreen()
        .catch(() => {});
    } else {
      // Rejects e.g. when the Fullscreen API is disallowed by permissions policy, or on browsers
      // (notably iOS Safari) that don't support it on arbitrary elements - left uncaught, this
      // becomes an unhandled promise rejection instead of just leaving the viewer non-fullscreen.
      targetRef.current.requestFullscreen()
        .catch(() => {});
    }
  }
});
