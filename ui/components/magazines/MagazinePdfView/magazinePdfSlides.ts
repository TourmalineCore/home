// Works out what to put on each slide of the viewer: the way a real magazine falls open, its
// cover is read alone, the pages after it two at a time, and so the back cover of an even page
// count ends up alone as well. A viewport too narrow for two pages at a time gets one per slide
export function getMagazinePdfSlides({
  totalPages,
  pagesPerSlide,
}: {
  totalPages: number;
  pagesPerSlide: number;
}) {
  const pages = Array.from({
    length: totalPages,
  }, (_, index) => index + 1);

  if (pagesPerSlide < 2) {
    return pages.map((pageNumber) => [pageNumber]);
  }

  const [coverPage, ...innerPages] = pages;

  const slides = coverPage ? [[coverPage]] : [];

  for (let pageIndex = 0; pageIndex < innerPages.length; pageIndex += 2) {
    slides.push(innerPages.slice(pageIndex, pageIndex + 2));
  }

  return slides;
}
