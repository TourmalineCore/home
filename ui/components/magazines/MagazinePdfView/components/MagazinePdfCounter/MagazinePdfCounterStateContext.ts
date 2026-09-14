import { createContext } from 'react';
import { MagazinePdfCounterState } from './MagazinePdfCounterState';

export const MagazinePdfCounterStateContext = createContext<MagazinePdfCounterState>(
  null as unknown as MagazinePdfCounterState,
);
