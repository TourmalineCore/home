/* eslint-disable react/no-unstable-nested-components */
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import clsx from 'clsx';

export function MarkdownText({
  children,
  className,
  isTargetBlank,
}: {
  children: string;
  className?: string;
  isTargetBlank?: boolean;
}) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      className={className}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        a(props: any) {
          return (
            <a
              href={props.href}
              className={clsx(props.className)}
              {...(isTargetBlank ? {
                target: `_blank`,
                rel: `noopener noreferrer`,
              } : {
                target: props.target,
                rel: props.rel,
              })}
            >
              {props.children}
            </a>
          );
        },
      }}
    >
      {formatTextWithLineBreaks(children)}
    </ReactMarkdown>
  );
}

function formatTextWithLineBreaks(text: string) {
  return text.replace(/\n/g, `<br />`);
}
