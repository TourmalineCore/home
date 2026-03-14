import { CollageWithTitleBlock } from '../../common/types';
import { ImageWithBlur } from '../ImageWithBlur/ImageWithBlur';

export function CollageWithTitle({
  title,
  imagesWithBlurDataURL,
}: Omit<CollageWithTitleBlock, "__component">) {
  return (
    <section
      className="collage-with-title"
      data-testid="collage-with-title"
    >
      <div className="collage-with-title__wrapper">
        <h2 className="container-redesign collage-with-title__title">{title}</h2>
        {imagesWithBlurDataURL.slice(0, 9)
          .map(({
            url,
            blurDataURL,
          }, index) => (
            <div
              key={url}
              className={`collage-with-title__image collage-with-title__image--${index + 1}`}
            >
              <ImageWithBlur
                src={url}
                blurDataURL={blurDataURL}
              />
            </div>
          ))}
      </div>
    </section>
  );
}
