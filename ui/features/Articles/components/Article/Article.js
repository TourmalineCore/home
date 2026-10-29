/* eslint-disable react/no-unstable-nested-components */
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { MermaidDiagram } from '../../../../components/MermaidDiagram/MermaidDiagram';

export default function Article({
  markdown,
  articleUrl,
  datePublication,
}) {
  const {
    t,
  } = useTranslation(`articles`);

  return (
    <div className="container article-page">

      <div className="article-page__info">
        <Link href="/articles">
          {t(`backlinkLabel`)}
        </Link>

        {datePublication && (
          <div className="article-page__date-publication">
            {t(`datePublication`)}
            :
            {` `}
            {datePublication}
          </div>
        )}
      </div>

      <article className="article-page__article">
        <ReactMarkdown
          remarkPlugins={[gfm]}
          rehypePlugins={[
            [
              rehypeHighlight,
              {
                plainText: [`mermaid`],
              },
            ],
            rehypeRaw,
          ]}
          components={{
            code({
              node,
              inline,
              className,
              children,
              ...props
            }) {
              const match = /language-(\w+)/.exec(className || ``);
              const lang = match ? match[1] : ``;

              if (lang === `mermaid`) {
                const code = String(children)
                  .replace(/\n$/, ``);

                return <MermaidDiagram code={code} />;
              }

              return !inline && match ? (
                <pre {...props}>
                  <code
                    className={className}
                    {...props}
                  >
                    {children}
                  </code>
                </pre>
              ) : (
                <code
                  className={className}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            img: ({
              src, alt, title,
            }) => (
              <img
                src={`${articleUrl}/${src.replace(/\.\/images/, `/images`)}`}
                alt={alt}
                title={title}
                style={{
                  maxWidth: `100%`,
                }}
              />
            ),
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            a: ({
              href, title, children,
            }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                title={title}
              >
                {children}
              </a>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </div>
  );
}
