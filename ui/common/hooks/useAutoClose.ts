import { useEffect, useCallback, RefObject } from 'react';

export function useAutoClose(ref: RefObject<HTMLDivElement>, setIsOpen: (val: boolean) => void) {
  const handleClosure = useCallback(
    (event: MouseEvent | TouchEvent | FocusEvent) => ref.current && !ref.current.contains(event.target as Node) && setIsOpen(false),
    [setIsOpen, ref],
  );

  useEffect(() => {
    window.addEventListener(`click`, handleClosure);
    window.addEventListener(`focusin`, handleClosure);

    return () => {
      window.removeEventListener(`click`, handleClosure);
      window.removeEventListener(`focusin`, handleClosure);
    };
  }, [handleClosure, ref]);
}
