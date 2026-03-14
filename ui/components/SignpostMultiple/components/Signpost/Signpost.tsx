import { SignpostProps } from '../../../../common/types';
import { SmartLink } from '../../../SmartLink/SmartLink';
import { ImageWithBlur } from '../../../ImageWithBlur/ImageWithBlur';

export function Signpost({
  title,
  subtitle,
  link,
  imageWithBlurDataURL,
}: SignpostProps) {
  return (
    <div className="signpost">
      {link ? (
        <SmartLink
          className="signpost__link-wrapper"
          href={link}
        >
          {renderSignpostContent()}
        </SmartLink>
      )
        : renderSignpostContent()}
    </div>
  );

  function renderSignpostContent() {
    return (
      <>
        <div className="signpost__image-container">
          <ImageWithBlur
            src={imageWithBlurDataURL?.url}
            blurDataURL={imageWithBlurDataURL?.blurDataURL}
          />
        </div>
        <h3 className="signpost__title">
          {title}
        </h3>
        {subtitle && (
          <span className="signpost__subtitle">
            {subtitle}
          </span>
        )}
      </>
    );
  }
}
