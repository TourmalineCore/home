import { expect, Page, test } from '../../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../../playwright-tests/constants/breakpoints';
import { ComponentName } from '../../../common/enums';

test.describe(`MagazinePdfViewTests`, () => {
  test.beforeEach(async ({
    page,
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.MAGAZINE_PDF_VIEW);

    // The pdf loads asynchronously, so wait for its first page before screenshotting
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
        // The pdf can be swapped for a new issue, so only the viewer UI around it is asserted.
        // The wrapper is masked rather than the canvases: react-pdf keeps the next page mounted
        // past the visible edge, and Playwright merges flush masks into one that overshoots
        mask: [page.locator(`.magazine-pdf-view__slider-wrapper`)],
      });
    });
   };
   
  test(
      `
      GIVEN rendering MagazinePdfView 
      WHEN user click by next page button and then click by previous page button
      THEN counter is changed to next page number and then back to previous page number
      `,
      counterOfPagesTests,
    );
  }
);

async function counterOfPagesTests({
  page,
}: {
  page: Page;
}) {    
  await expect(page.getByTestId(`magazine-pdf-counter`))
    .toHaveText(/1.2 \/ 20/); 
  
  await page.getByTestId(`magazine-pdf-view-next-arrow`)
    .click();

  await expect(page.getByTestId(`magazine-pdf-counter`))
    .toHaveText(/2.3 \/ 20/);

  const prevArrowButton = page.getByTestId(`magazine-pdf-view-prev-arrow`);

  await page.waitForTimeout(500);
  
  await prevArrowButton
    .click();
  
  await expect(page.getByTestId(`magazine-pdf-counter`))
    .toHaveText(/1.2 \/ 20/);
};