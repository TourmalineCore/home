import { FeaturedCardsListBlock } from '../../common/types';
import { FeaturedCard } from './components/FeaturedCard/FeaturedCard';

export function FeaturedCardsList({
  title,
  cards,
  anchorId,
}: Omit<FeaturedCardsListBlock, '__component' | 'id'> & {
  targetId?: string;
}) {
  return (
    <section
      className="featured-cards-list"
      data-testid="featured-cards-list"
      {...(anchorId && {
        id: anchorId,
      })}
    >
      <ul className="featured-cards-list__cards grid container-redesign">
        <li className="featured-cards-list__card col-tablet-12 col-tablet-xl-4 col-desktop-3">
          {title && (
            <h2 className="featured-cards-list__title">
              {title}
            </h2>
          )}
        </li>
        {cards.map(({
          id,
          title: cardTitle,
          points,
          description,
          link,
          theme,
          wideCardItems,
          imageWithBlurDataURL,
          type,
        }) => (
          <FeaturedCard
            key={id}
            title={cardTitle}
            description={description}
            points={points}
            link={link}
            theme={theme}
            imageWithBlurDataURL={imageWithBlurDataURL}
            type={type}
            wideCardItems={wideCardItems}
          />
        ))}
      </ul>
    </section>
  );
}
