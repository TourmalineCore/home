export function MagazinePdfCounter({
  currentSlide,
  totalPages,
  slidesToShow,
}: {
  currentSlide: number;
  totalPages: number;
  slidesToShow: number;
}) {
  // A wide viewport shows a two-page spread. Both ends clamp to the total, since an odd page
  // count leaves the last spread half empty
  const currentPage = Math.min(currentSlide + 1, totalPages);
  const currentPageEnd = Math.min(currentSlide + slidesToShow, totalPages);

  const pageLabel = currentPage === currentPageEnd
    ? `${currentPage}`
    : `${currentPage}–${currentPageEnd}`;

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
