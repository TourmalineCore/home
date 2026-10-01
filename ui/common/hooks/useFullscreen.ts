import { useEffect, useState } from 'react';
import { useDeviceSize } from './useDeviceSize';

export function useFullscreen({
  targetId,
  fallbackClassName,
}: {
  targetId: string;
  fallbackClassName: string;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const {
    isDesktop,
  } = useDeviceSize();

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

    if (isDesktop && typeof targetElement.requestFullscreen === `function`) {
      if (document.fullscreenElement === targetElement) {
        document.exitFullscreen()
          .catch(() => {});
      } else {
        targetElement.requestFullscreen()
          .catch(() => {});
      }
    } else {
      // Fullscreen mode on phones does not work correctly.
      // iPhone Safari has no element fullscreen, so requestFullscreen is missing rather than rejecting, and calling it would throw.
      // And the zoom doesn't work on android, so we use CSS to stretch the element to the full screen.
      const isFullscreenOn = targetElement.classList.toggle(fallbackClassName);

      document.body.classList.toggle(`body--scroll-hidden`, isFullscreenOn);
      setIsFullscreen(isFullscreenOn);
    }
  }
}
