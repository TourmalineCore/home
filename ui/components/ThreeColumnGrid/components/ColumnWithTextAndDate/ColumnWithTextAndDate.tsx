import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/en-gb';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ColumnWithContent } from '../../../ColumnWithContent/ColumnWithContent';
import { ColumnWithTextAndDateProps } from '../../../../common/types';

export function ColumnWithTextAndDate({
  title,
  text,
  date,
  markdownText,
  className,
}: ColumnWithTextAndDateProps & {
  className: string;
}) {
  const {
    locale,
  } = useRouter();
  const [formattedDate, setFormattedDate] = useState(``);

  useEffect(() => {
    if (date) {
      moment.locale(locale);

      setFormattedDate(moment(date)
        .format(
          locale === `en`
            ? `MMMM D, YYYY`
            : `D MMMM YYYY`,
        ));
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return (
    <ColumnWithContent
      title={title}
      markdownText={markdownText}
      className={clsx(`column-with-text-and-date`, className)}
    >
      <p className="column-with-text-and-date__text">{text}</p>
      {date && (
        <span className="column-with-text-and-date__date">
          {formattedDate}
        </span>
      )}
    </ColumnWithContent>
  );
}
