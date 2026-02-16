import { CollageWithLinkBlock } from '../../common/types';
import { SmartLink } from '../SmartLink/SmartLink';
import { ImageWithBlur } from '../ImageWithBlur/ImageWithBlur';

export function CollageWithLink({
  text,
  link,
  imagesWithBlurDataURL,
}: Omit<CollageWithLinkBlock, "__component">) {
  return (
    <section
      className="collage-with-link"
      data-testid="collage-with-link"
    >
      <div className="collage-with-link__wrapper">
        {link && (
          <SmartLink
            href={link}
            className="collage-with-link__accent-link"
          >
            <span
              className="collage-with-link__link-box"
              aria-hidden="true"
            >
              ?
            </span>
            <span
              className="collage-with-link__cta"
            >
              {text}
            </span>
          </SmartLink>
        )}
        {imagesWithBlurDataURL.slice(0, 8)
          .map(({
            url,
            blurDataURL,
          }, index) => (
            <div
              key={url}
              className={`collage-with-link__image collage-with-link__image--${index + 1}`}
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
