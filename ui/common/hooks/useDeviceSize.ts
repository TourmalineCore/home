import { useCallback, useEffect, useState } from 'react';
import { Breakpoint } from '../enums';

export const useDeviceSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener(`resize`, handleWindowResize);

    return () => window.removeEventListener(`resize`, handleWindowResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    width,
    height,
    isMobile: width < Breakpoint.TABLET,
    isTablet: width >= Breakpoint.TABLET,
    isTabletXl: width >= Breakpoint.TABLET_XL,
    isDesktop: width >= Breakpoint.DESKTOP,
    isDesktopXL: width >= Breakpoint.DESKTOP_XL,
  };
};
