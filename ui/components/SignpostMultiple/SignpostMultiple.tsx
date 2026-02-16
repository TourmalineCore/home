import IconArrow from '../../icons/icon-arrow-redesign.svg';
import { SignpostMultipleBlock } from '../../common/types';
import { SmartLink } from '../SmartLink/SmartLink';
import { Signpost } from './components/Signpost/Signpost';

export function SignpostMultiple({
  title,
  viewAllLink,
  signposts,
  dataTestId,
}: Omit<SignpostMultipleBlock, "__component"> & {
  dataTestId?: string;
}) {
  return (
    <section
      className="signpost-multiple container-redesign"
      data-testid={dataTestId}
    >
      <div className="signpost-multiple__head">
        {title && <h2 className="signpost-multiple__title">{title}</h2>}
        {viewAllLink
        && (
          <SmartLink
            className="signpost-multiple__view-all-link"
            href={viewAllLink.url}
          >
            {viewAllLink.text}
            <IconArrow />
          </SmartLink>
        )}
      </div>
      <ul
        className="signpost-multiple__list grid"
      >
        {signposts.map(({
          title: signpostTitle,
          subtitle,
          link,
          imageWithBlurDataURL,
        }) => (
          <li
            key={signpostTitle}
            // This element has scrolling on a mobile device, so axe-core recommends adding a tabIndex
            // More info - https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable?application=playwright
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            className="signpost-multiple__item col-desktop-3"
          >
            <Signpost
              title={signpostTitle}
              subtitle={subtitle}
              link={link}
              imageWithBlurDataURL={imageWithBlurDataURL}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
