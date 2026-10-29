import mermaid from 'mermaid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

mermaid.initialize({
  startOnLoad: false,
  theme: `default`,
  securityLevel: `loose`,
  suppressErrorRendering: true,
});

export function MermaidDiagram({
  code,
}: {
  code: string;
}) {
  const {
    locale,
  } = useRouter();

  const [svg, setSvg] = useState(``);
  const [error, setError] = useState(``);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        const mermaidRender = await mermaid.render(id, code);
        setSvg(mermaidRender.svg);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`Mermaid rendering error:`, err);
        setError(locale === `ru`
          ? `Произошла ошибка при загрузке диаграммы.`
          : `An error occurred while loading the diagram.`);
      }
    };
    renderDiagram();
  }, [code, locale]);

  return (
    <div className="mermaid-diagram">
      {renderContent()}
    </div>
  );

  function renderContent() {
    if (error) {
      return (
        <div
          className="mermaid-diagram__error"
          data-testid="mermaid-error"
        >
          {error}
        </div>
      );
    }

    if (!svg) {
      <div
        className="mermaid-diagram__loading"
        data-testid="mermaid-loading"
      >
        {locale === `ru`
          ? `Загрузка диаграммы...`
          : `Loading the diagram...`}
      </div>;
    }

    return (
      <div
        className="mermaid-diagram__container"
        data-testid="mermaid-diagram-container"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: svg,
        }}
      />
    );
  }
}
