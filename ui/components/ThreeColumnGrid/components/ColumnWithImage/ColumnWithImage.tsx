import clsx from 'clsx';
import { ColumnWithContent } from '../../../ColumnWithContent/ColumnWithContent';
import { ColumnWithImageProps } from '../../../../common/types';

import { ImageWithBlur } from '../../../ImageWithBlur/ImageWithBlur';

export function ColumnWithImage({
  title,
  markdownText,
  imageWithBlurDataURL,
  className,
}: ColumnWithImageProps & {
  className: string;
}) {
  return (
    <ColumnWithContent
      title={title}
      markdownText={markdownText}
      className={clsx(`column-with-image`, className)}
    >
      <div className="column-with-image__image">
        <ImageWithBlur
          src={imageWithBlurDataURL?.url}
          blurDataURL={imageWithBlurDataURL?.blurDataURL}
        />
      </div>
    </ColumnWithContent>
  );
}
