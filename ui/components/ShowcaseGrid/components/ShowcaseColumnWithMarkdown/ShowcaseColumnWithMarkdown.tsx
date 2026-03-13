import { MarkdownText } from '../../../MarkdownText/MarkdownText';
import { ShowcaseColumnWithMarkdownProps } from '../../../../common/types';

export function ShowcaseColumnWithMarkdown({
  subtitle,
  markdown,
}: ShowcaseColumnWithMarkdownProps) {
  return (
    <div className="showcase-column-with-markdown">
      {subtitle && (
        <h3 className="showcase-column-with-markdown__subtitle">
          {subtitle}
        </h3>
      )}
      <MarkdownText
        isTargetBlank
        className="showcase-column-with-markdown__markdown"
      >
        {markdown}
      </MarkdownText>
    </div>
  );
}
