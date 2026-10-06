import { useEffect } from 'react';

export function useBodyScrollHidden(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const {
      scrollY,
    } = window;

    // `overflow: hidden` alone resets window.scrollY when the scrollbar is removed,
    //  so the page behind the modal jumps to the top on close.
    //  Pinning the body keeps the offset in `top` and restores it in the cleanup below
    document.body.style.position = `fixed`;
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = `0`;
    document.body.style.right = `0`;
    document.body.style.width = `100%`;
    document.body.classList.add(`body--scroll-hidden`);

    // eslint-disable-next-line consistent-return
    return () => {
      document.body.style.position = ``;
      document.body.style.top = ``;
      document.body.style.left = ``;
      document.body.style.right = ``;
      document.body.style.width = ``;
      document.body.classList.remove(`body--scroll-hidden`);

      window.scrollTo({
        top: scrollY,
        behavior: `instant` as ScrollBehavior,
      });
    };
  }, [isOpen]);
}
