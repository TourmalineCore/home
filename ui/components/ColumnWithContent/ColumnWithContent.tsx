import { ReactNode } from 'react';
import clsx from 'clsx';
import { MarkdownText } from '../MarkdownText/MarkdownText';
import { ColumnWithContentProps } from '../../common/types';

export function ColumnWithContent({
  title,
  children,
  markdownText,
  className,
}: ColumnWithContentProps & {
  className: string;
  children: ReactNode;
}) {
  return (
    <div className={clsx(`column-with-content`, className)}>
      {title && <h3 className="column-with-content__title">{title}</h3>}
      {children}
      {markdownText && (
        <MarkdownText
          className="column-with-content__markdown"
          isTargetBlank
        >
          {markdownText}
        </MarkdownText>
      )}
    </div>
  );
}
