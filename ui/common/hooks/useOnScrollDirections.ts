import { useEffect, useState } from 'react';

export function useOnScrollDirections() {
  const [isScrollUp, setIsScrollUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const bodyElement = document.querySelector(`body`);
    const handleScroll = () => {
      const currentScrollY = bodyElement?.scrollTop || 0;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrollUp(false);
      } else if (currentScrollY < lastScrollY) {
        setIsScrollUp(true);
      }

      setLastScrollY(currentScrollY);
    };

    bodyElement?.addEventListener(`scroll`, handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener(`scroll`, handleScroll);
  }, [lastScrollY]);

  return {
    isScrollUp,
  };
}
