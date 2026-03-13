import { SingleImageBlock } from '../../common/types';
import { ImageWithBlur } from '../ImageWithBlur/ImageWithBlur';

export function SingleImage({
  imageWithBlurDataURL,
}: Omit<SingleImageBlock, "__component">) {
  return (
    <section
      className="single-image container-redesign"
      data-testid="single-image"
    >
      <div className="single-image__container">
        <ImageWithBlur
          src={imageWithBlurDataURL?.url}
          blurDataURL={imageWithBlurDataURL?.blurDataURL}
        />
      </div>
    </section>
  );
}
