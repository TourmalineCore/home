import { useTranslation } from 'next-i18next';
import { PaymentList } from './components/PaymentList/PaymentList';
import { Payments } from './types';
import { TechnologyPageAnchorLink } from '../../common/enums';

export function Payment() {
  const {
    t,
  } = useTranslation(`payment`);

  const paymentList: Payments = t(`list`, {
    returnObjects: true,
  });

  return (
    <section
      id={TechnologyPageAnchorLink.Payment}
      className="payment"
    >
      <div className="container payment__wrapper">
        <h2 className="title-technology-type-1 payment__title">{t(`title`)}</h2>
        <PaymentList list={paymentList} />
      </div>
    </section>
  );
}
