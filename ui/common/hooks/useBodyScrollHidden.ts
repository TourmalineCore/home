import { useEffect } from 'react';

const BODY_SCROLL_HIDDEN = `body--scroll-hidden`;

export function useBodyScrollHidden(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const {
      scrollY,
    } = window;

    document.body.classList.add(BODY_SCROLL_HIDDEN);

    // eslint-disable-next-line consistent-return
    return () => {
      document.body.classList.remove(BODY_SCROLL_HIDDEN);

      window.scrollTo({
        top: scrollY,
        behavior: `instant` as ScrollBehavior,
      });
    };
  }, [isOpen]);
}
