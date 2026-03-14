/* eslint-disable react/no-unstable-nested-components */
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

const DynamicCommentsComponent = dynamic(() => import(`./components/Comments/Comments`), {
  ssr: false,
});

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
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
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

      <div className="article-page__comments">
        <DynamicCommentsComponent />
      </div>
    </div>
  );
}
