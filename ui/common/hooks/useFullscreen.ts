import { useEffect, useState } from 'react';

export function useFullscreen(targetId: string) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fullscreen can also be left via Esc or the browser's own UI, which only this event reports.
  useEffect(() => {
    document.addEventListener(`fullscreenchange`, handleFullscreenChange);

    return () => {
      document.removeEventListener(`fullscreenchange`, handleFullscreenChange);
    };

    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement?.id === targetId);
    }
  }, [targetId]);

  return {
    isFullscreen,
    toggleFullscreen,
  };

  function toggleFullscreen() {
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    // Both reject on races and where fullscreen is disallowed (iOS Safari), which just leaves the
    // element as it was - not worth surfacing, but an uncaught rejection would be.
    if (document.fullscreenElement === targetElement) {
      document.exitFullscreen()
        .catch(() => {});
    } else {
      targetElement.requestFullscreen()
        .catch(() => {});
    }
  }
}
