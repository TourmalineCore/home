import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const BODY_SCROLL_HIDDEN = `body--scroll-hidden`;

export function useBodyScrollHidden(isOpen: boolean) {
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      isNavigatingRef.current = true;
    };
    router.events.on(`routeChangeStart`, handleRouteChangeStart);
    return () => {
      router.events.off(`routeChangeStart`, handleRouteChangeStart);
    };
  }, [router.events]);

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

      // If there is a transition to another page, we DO NOT restore the scroll.
      // Next.js will correctly set the scroll to 0 for the new page.
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false;
        return;
      }

      window.scrollTo({
        top: scrollY,
        behavior: `instant`,
      });
    };
  }, [isOpen]);
}
