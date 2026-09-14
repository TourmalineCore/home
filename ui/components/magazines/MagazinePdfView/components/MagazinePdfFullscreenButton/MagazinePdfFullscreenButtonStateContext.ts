import { createContext } from 'react';
import { MagazinePdfFullscreenButtonState } from './MagazinePdfFullscreenButtonState';

export const MagazinePdfFullscreenButtonStateContext = createContext<MagazinePdfFullscreenButtonState>(
  null as unknown as MagazinePdfFullscreenButtonState,
);
