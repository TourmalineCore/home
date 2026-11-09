export function MagazinePdfCounter({
  pages,
  totalPages,
}: {
  pages: number[];
  totalPages: number;
}) {
  // Whatever is on screen, be it a pair of pages or the cover on its own
  const firstPage = pages[0] || 0;
  const lastPage = pages[pages.length - 1] || 0;

  const pageLabel = firstPage === lastPage
    ? `${firstPage}`
    : `${firstPage}–${lastPage}`;

  return (
    <span
      className="magazine-pdf-counter"
      data-testid="magazine-pdf-counter"
      aria-live="polite"
    >
      {`${pageLabel} / ${totalPages}`}
    </span>
  );
}
