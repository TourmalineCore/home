import clsx from 'clsx';
import { useRouter } from 'next/router';
import { NamedList } from '../../../NamedList/NamedList';
import { Payments } from '../../types';
import { isChineseLanguage } from '../../../../common/utils';

export function PaymentList({
  list,
}:{
  list: Payments;
}) {
  const {
    locale,
  } = useRouter();

  return (
    <ul className="payment-list">
      {list.map(({
        mainTitle, mainData,
      }) => (
        <li
          key={mainTitle}
          className="payment-list__item"
        >
          <h3 className="title-technology-type-2 payment-list__title">{mainTitle}</h3>
          <div className="payment-list__inner">
            {mainData.map(({
              title, data,
            }) => (
              <NamedList
                key={title}
                title={title}
                data={data}
                listClassName={clsx(`payment-list__named-list`, {
                  'payment-list__named-list--zh': isChineseLanguage(locale),
                })}
                titleClassName="payment-list__named-list-title"
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
