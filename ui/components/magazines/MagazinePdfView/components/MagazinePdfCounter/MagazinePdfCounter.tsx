import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { MagazinePdfCounterStateContext } from './MagazinePdfCounterStateContext';
import { MagazinePdfCounterContent } from './MagazinePdfCounterContent';

export const MagazinePdfCounter = observer(({
  currentSlide,
  totalPages,
  slidesToShow,
}: {
  currentSlide: number;
  totalPages: number;
  slidesToShow: number;
}) => {
  const counterState = useContext(MagazinePdfCounterStateContext);

  useEffect(() => {
    counterState.setSlideInfo({
      currentSlide,
      totalPages,
      slidesToShow,
    });
  }, [
    counterState,
    currentSlide,
    totalPages,
    slidesToShow,
  ]);

  return (
    <MagazinePdfCounterContent />
  );
});
