import { HeroBlock } from '../../common/types';
import { ImageSlider } from '../ImageSlider/ImageSlider';

export function Hero({
  title,
  description,
  media,
}: Omit<HeroBlock, '__component' | 'id'>) {
  const imagesWithBlurDataURL = (media || [])
    .filter((item) => item.mime?.startsWith(`image`))
    .map((item) => ({
      url: item.url,
      blurDataURL: item.blurDataURL!,
    }));

  const isVideo = media?.[0]?.mime?.startsWith(`video`);

  return (
    <section
      className="hero"
      data-testid="hero"
    >
      <div className="container-redesign hero__wrapper">
        <h1 className="hero__title">{title}</h1>
        {description && <p className="hero__description">{description}</p>}
        {(isVideo || imagesWithBlurDataURL.length > 0) && (
          <div className="hero__media">
            {isVideo ? (
              <video
                src={media![0].url}
                playsInline
                loop
                muted
                autoPlay
              />
            ) : (
              <ImageSlider
                imagesWithBlurDataURL={imagesWithBlurDataURL}
                interval={1600}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
