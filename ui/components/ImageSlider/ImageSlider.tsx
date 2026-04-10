import { useEffect, useState } from 'react';
import { ImageWithBlur } from '../ImageWithBlur/ImageWithBlur';
import { ImagesWithBlurDataURL } from '../../common/types';

export function ImageSlider({
  imagesWithBlurDataURL,
  interval,
  priority,
  fetchPriority,
}: {
  imagesWithBlurDataURL: ImagesWithBlurDataURL[];
  interval: number;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === imagesWithBlurDataURL.length - 1 ? 0 : prevIndex + 1));
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [imagesWithBlurDataURL.length, interval]);

  return (
    <ImageWithBlur
      src={imagesWithBlurDataURL[currentIndex].url}
      blurDataURL={imagesWithBlurDataURL[currentIndex].blurDataURL}
      priority={priority}
      fetchPriority={fetchPriority}
    />
  );
}
