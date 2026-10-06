import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useDeviceSize } from './useDeviceSize';

// Time for the target to settle back to its normal size after exit
const SCROLL_ANCHORING_PAUSE = 1000;

export function useFullscreen({
  targetId,
  fallbackClassName,
}: {
  targetId: string;
  fallbackClassName: string;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fullscreen takes the target out of the page and the scroll gets lost, so it's restored on exit
  const targetTopOnEnterRef = useRef<number | null>(null);
  const scrollAnchoringTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

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

  // Restores the scroll on any exit, before paint
  useLayoutEffect(() => {
    const targetTopOnEnter = targetTopOnEnterRef.current;
    const targetElement = document.getElementById(targetId);

    if (isFullscreen || targetTopOnEnter === null || !targetElement) {
      return;
    }

    targetTopOnEnterRef.current = null;

    // Instant, overriding scroll-behavior: smooth on html. Older Safari rejects behavior: `instant`
    const rootStyle = document.documentElement.style;
    const previousScrollBehavior = rootStyle.scrollBehavior;

    rootStyle.scrollBehavior = `auto`;
    window.scrollBy(0, targetElement.getBoundingClientRect().top - targetTopOnEnter);

    rootStyle.scrollBehavior = previousScrollBehavior;

    scrollAnchoringTimeoutRef.current = setTimeout(() => {
      rootStyle.overflowAnchor = ``;
    }, SCROLL_ANCHORING_PAUSE);
  }, [isFullscreen, targetId]);

  return {
    isFullscreen,
    toggleFullscreen,
  };

  function toggleFullscreen() {
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    const isEntering = document.fullscreenElement !== targetElement
      && !targetElement.classList.contains(fallbackClassName);

    if (isEntering) {
      targetTopOnEnterRef.current = targetElement.getBoundingClientRect().top;

      // The target briefly changes height on exit, and scroll anchoring would shift the page.
      // The timeout from the previous exit mustn't turn it back on in the middle of this fullscreen
      clearTimeout(scrollAnchoringTimeoutRef.current);
      document.documentElement.style.overflowAnchor = `none`;
    }

    if (isDesktop && typeof targetElement.requestFullscreen === `function`) {
      if (isEntering) {
        targetElement.requestFullscreen()
          .catch(() => {
            targetTopOnEnterRef.current = null;
            document.documentElement.style.overflowAnchor = ``;
          });
      } else {
        document.exitFullscreen()
          .catch(() => {});
      }
    } else {
      // Fullscreen mode on phones does not work correctly.
      // iPhone Safari has no element fullscreen, so requestFullscreen is missing rather than rejecting, and calling it would throw.
      // And the zoom doesn't work on android, so we use CSS to stretch the element to the full screen.
      const isFullscreenOn = targetElement.classList.toggle(fallbackClassName);

      document.documentElement.classList.toggle(`html--fullscreen`, isFullscreenOn);
      setIsFullscreen(isFullscreenOn);
    }
  }
}
