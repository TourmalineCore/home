import clsx from 'clsx';
import { ServicesTechnologyCard } from './components/ServicesTechnologyCard/ServicesTechnologyCard';
import { ServicesTechnologyList } from './types';
import { TechnologyPageAnchorLink } from '../../common/enums';
import { usePath, useTranslationNamespace } from '../../common/hooks';

export function ServicesTechnology({
  localeKeyName,
  isFilled,
}: {
  localeKeyName?: string;
  isFilled?: boolean;
}) {
  const {
    slicePathname,
  } = usePath();
  const {
    t,
  } = useTranslationNamespace(localeKeyName || `servicesTechnology`);

  const servicesTechnologyList: ServicesTechnologyList = t(`list`, {
    returnObjects: true,
  });

  return (
    <section
      id={TechnologyPageAnchorLink.Services}
      className="services-technology"
    >
      <div className="container services-technology__wrapper">
        <div className="services-technology__inner">
          <h2
            className={clsx(`title-technology-type-1 services-technology__title services-technology__title--${slicePathname}`, {
              'services-technology__title--filled': isFilled,
            })}
          >
            {t(`title`)}
          </h2>
          <ul
            className={clsx(`services-technology__list services-technology__list--${slicePathname}`, {
              'services-technology__list--filled': isFilled,
            })}
          >
            {servicesTechnologyList.map(({
              title, description, link,
            }) => (
              <li
                key={description}
                className="services-technology__item"
              >
                <ServicesTechnologyCard
                  title={title}
                  description={description}
                  link={link}
                  isFilled={isFilled}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
