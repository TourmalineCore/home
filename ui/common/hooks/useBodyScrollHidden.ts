import { useEffect } from 'react';

const BODY_SCROLL_HIDDEN = `body--scroll-hidden`;

export function useBodyScrollHidden(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(BODY_SCROLL_HIDDEN);
    } else {
      document.body.classList.remove(BODY_SCROLL_HIDDEN);
    }

    return () => {
      document.body.classList.remove(BODY_SCROLL_HIDDEN);
    };
  }, [isOpen]);
}
