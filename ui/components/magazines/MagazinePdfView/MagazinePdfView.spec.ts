import { test } from '../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../playwright-tests/constants/breakpoints';
import { ComponentName } from '../../../common/enums';

test.describe(`MagazinePdfViewTests`, () => {
  test.beforeEach(async ({
    page,
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.MAGAZINE_PDF_VIEW);

    // the PDF loads asynchronously; wait for its first page to mount before sizing/screenshotting
    await page.waitForSelector(`[data-testid="${ComponentName.MAGAZINE_PDF_VIEW}"] canvas`);
  });

  for (const {
    name,
    breakpoint,
    breakpointName,
  } of BREAKPOINTS) {
    test(name, async ({
      page,
      testScreenshotAtBreakpoint,
    }) => {
      await testScreenshotAtBreakpoint({
        testId: ComponentName.MAGAZINE_PDF_VIEW,
        breakpoint,
        breakpointName,
        // The PDF file itself can be swapped for a new issue independently of this component's
        // code, so its rendered pages are masked out - only the surrounding viewer UI (toolbar,
        // page counter, fullscreen button, arrows) is asserted. Masking the slider wrapper rather
        // than the page canvases themselves: react-pdf keeps the next page's canvas mounted (for
        // smooth paging) past the visible edge, and Playwright merges masks that sit flush against
        // each other into one, which stretched the mask past the actual page.
        mask: [page.locator(`.magazine-pdf-view__slider-wrapper`)],
      });
    });
  }
});
