import { useTranslation } from 'next-i18next';

export function MagazinePdfLoader({
  progressText,
}: {
  progressText?: string;
}) {
  const {
    t,
  } = useTranslation(`magazinePdfView`);

  return (
    <div className="magazine-pdf-loader">
      <span>{progressText || t(`loading`)}</span>
    </div>
  );
}
