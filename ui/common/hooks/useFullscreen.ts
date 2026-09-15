import { useEffect, useState } from 'react';

export function useFullscreen({
  targetId,
  fallbackClassName,
}: {
  targetId: string;
  fallbackClassName: string;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fullscreen can also be left via Esc or the browser's own UI, which only this event reports
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

    // iPhone Safari has no element fullscreen, so requestFullscreen is missing rather than
    // rejecting, and calling it would throw. Stand in for it with css there
    if (typeof targetElement.requestFullscreen !== `function`) {
      const isFullscreenOn = targetElement.classList.toggle(fallbackClassName);

      document.body.classList.toggle(`body--scroll-hidden`, isFullscreenOn);
      setIsFullscreen(isFullscreenOn);

      return;
    }

    if (document.fullscreenElement === targetElement) {
      document.exitFullscreen()
        .catch(() => {});
    } else {
      targetElement.requestFullscreen()
        .catch(() => {});
    }
  }
}
