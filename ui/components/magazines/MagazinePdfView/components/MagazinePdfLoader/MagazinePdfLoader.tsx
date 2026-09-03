export function MagazinePdfLoader({
  progressText,
}: {
  progressText?: string;
}) {
  return (
    <div className="magazine-pdf-loader">
      <span>{progressText || `Загрузка журнала...`}</span>
    </div>
  );
}
