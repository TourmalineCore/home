import { useEffect } from 'react';

export function useOnClickOutside(handler: (evt: Event) => unknown) {
  useEffect(
    () => {
      const listener = (event: Event) => {
        const isInside = !!(event.target as Element)?.closest(`.modal__inner`);

        if (!isInside) {
          handler(event);
        }
      };

      document.addEventListener(`mousedown`, listener);
      document.addEventListener(`touchstart`, listener);

      return () => {
        document.removeEventListener(`mousedown`, listener);
        document.removeEventListener(`touchstart`, listener);
      };
    },

    [handler],
  );
}
