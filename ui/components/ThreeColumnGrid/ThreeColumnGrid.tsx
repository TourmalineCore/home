import { ThreeColumnGridBlock } from '../../common/types';
import { ColumnWithImage } from './components/ColumnWithImage/ColumnWithImage';
import { ColumnWithRepositories } from './components/ColumnWithRepositories/ColumnWithRepositories';
import { ColumnWithTextAndDate } from './components/ColumnWithTextAndDate/ColumnWithTextAndDate';

export function ThreeColumnGrid({
  columns,
}: Omit<ThreeColumnGridBlock, "__component">) {
  return (
    <section
      className="three-column-grid"
      data-testid="three-column-grid"
    >
      <div className="container-redesign three-column-grid__wrapper">
        <ul className="three-column-grid__cards grid">
          {columns.map(({
            id,
            type,
            columnWithImage,
            columnWithRepositories,
            columnWithTextAndDate,
          }) => (
            <li
              className="three-column-grid__card-item col-desktop-4 col-tablet-4"
              key={id}
            >
              {type === `image` && (
                <ColumnWithImage
                  className="three-column-grid__card-with-image"
                  title={columnWithImage!.title}
                  markdownText={columnWithImage!.markdownText}
                  imageWithBlurDataURL={columnWithImage!.imageWithBlurDataURL}
                />
              )}
              {type === `repositories` && (
                <ColumnWithRepositories
                  className="three-column-grid__card-with-repositories"
                  title={columnWithRepositories!.title}
                  markdownText={columnWithRepositories!.markdownText}
                  repositories={columnWithRepositories!.repositories}
                />
              )}
              {type === `text-and-date` && (
                <ColumnWithTextAndDate
                  className="three-column-grid__card-with-text-and-date"
                  title={columnWithTextAndDate!.title}
                  text={columnWithTextAndDate!.text}
                  date={columnWithTextAndDate!.date}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
