import { useEffect, useState } from 'react';

export function useOnScrollDirections() {
  const [isScrollUp, setIsScrollUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || 0;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrollUp(false);
      } else if (currentScrollY < lastScrollY) {
        setIsScrollUp(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener(`scroll`, handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener(`scroll`, handleScroll);
  }, [lastScrollY]);

  return {
    isScrollUp,
  };
}
