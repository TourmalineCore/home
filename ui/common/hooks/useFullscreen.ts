import { useEffect, useRef, useState } from 'react';
import { useDeviceSize } from './useDeviceSize';

export function useFullscreen({
  targetId,
  fallbackClassName,
}: {
  targetId: string;
  fallbackClassName: string;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  // null means "no native fullscreen session in progress"
  const scrollYRef = useRef<number | null>(null);

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
      const isNowFullscreen = document.fullscreenElement?.id === targetId;

      setIsFullscreen(isNowFullscreen);

      // Restore only on the way out, and only if a native session was actually started by us
      if (!isNowFullscreen && scrollYRef.current !== null) {
        const scrollY = scrollYRef.current;
        scrollYRef.current = null;

        // Two frames: Chrome/Android sometimes restores its own scroll right after the event,
        // and a single rAF lands before that and gets overwritten
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: scrollY,
              behavior: `instant` as ScrollBehavior,
            });
          });
        });
      }
    }
  }, [targetId]);

  useEffect(() => () => {
    if (document.body.classList.contains(`body--scroll-hidden`)) {
      restoreBodyScroll();
    }
  }, []);

  return {
    isFullscreen,
    toggleFullscreen,
  };

  function lockBodyScroll() {
    scrollYRef.current = window.scrollY;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = `hidden`;
    document.body.style.position = `fixed`;
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = `0`;
    document.body.style.right = `0`;
    document.body.style.width = `100%`;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.classList.add(`body--scroll-hidden`);
  }

  function restoreBodyScroll() {
    const scrollY = scrollYRef.current ?? 0;

    document.documentElement.style.overflow = ``;
    document.body.style.position = ``;
    document.body.style.top = ``;
    document.body.style.left = ``;
    document.body.style.right = ``;
    document.body.style.width = ``;
    document.body.style.paddingRight = ``;
    document.body.classList.remove(`body--scroll-hidden`);

    scrollYRef.current = null;

    window.scrollTo({
      top: scrollY,
      behavior: `instant` as ScrollBehavior,
    });
  }

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
        // Save once, right before entering. fullscreenchange must not overwrite this -
        // by the time it fires the browser may already have moved the scroll
        scrollYRef.current = window.scrollY;
        targetElement.requestFullscreen()
          .catch(() => {});
      }
    } else {
      // Fullscreen mode on phones does not work correctly.
      // iPhone Safari has no element fullscreen, so requestFullscreen is missing rather than rejecting, and calling it would throw.
      // And the zoom doesn't work on android, so we use CSS to stretch the element to the full screen.
      const isFullscreenOn = targetElement.classList.toggle(fallbackClassName);

      if (isFullscreenOn) {
        lockBodyScroll();
      } else {
        restoreBodyScroll();
      }

      setIsFullscreen(isFullscreenOn);
    }
  }
}
