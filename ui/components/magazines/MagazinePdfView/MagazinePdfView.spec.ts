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
      GIVEN MagazinePdfView 
      WHEN MagazinePdfView arrows are rendered
      THEN they have correct aria-labels
      `,
      magazinePdfViewArrowAriaLabelTests,
  );

  test(
      `
      GIVEN rendering MagazinePdfView 
      WHEN user click by next page button and then click by previous page button
      THEN counter is changed to next page number and then back to previous page number
      `,
      counterOfPagesTests,
  );

  test(
      `
      GIVEN rendering MagazinePdfView 
      WHEN user click by fullscreen button 
      THEN viewer is changed to fullscreen mode
      `,
      fullScreenTests,
  );
  }
);

async function magazinePdfViewArrowAriaLabelTests({
  page,
}: {
  page: Page;
}) {    
  await expect(page.getByTestId(`magazine-pdf-view-next-arrow`))
    .toHaveAttribute(`aria-label`, `Следующий разворот`);

  await expect(page.getByTestId(`magazine-pdf-view-prev-arrow`))
    .toHaveAttribute(`aria-label`, `Предыдущий разворот`);
};

async function counterOfPagesTests({
  page,
}: {
  page: Page;
}) {    
  const magazinePdfCounter = page.getByTestId(`magazine-pdf-counter`);
  await expect(magazinePdfCounter)
    .toHaveText(/1.2 \/ 20/); 
  
  await page.getByTestId(`magazine-pdf-view-next-arrow`)
    .click();

  await expect(magazinePdfCounter)
    .toHaveText(/2.3 \/ 20/);

  const prevArrowButton = page.getByTestId(`magazine-pdf-view-prev-arrow`);

  await page.waitForTimeout(500);
  
  await prevArrowButton
    .click();
  
  await expect(magazinePdfCounter)
    .toHaveText(/1.2 \/ 20/);
};

async function fullScreenTests({
  page,
}: {
  page: Page;
}) {    
  const fullscreenButton = page.getByTestId(`magazine-pdf-fullscreen-button`);
  await expect(fullscreenButton)
    .toHaveAttribute(`aria-label`, `Развернуть журнал на весь экран`);

  await expect(fullscreenButton)
    .toHaveText(`На весь экран`);
  
  await fullscreenButton
    .click();
  
  await stubFullscreenApi(page);
    
  await fullscreenButton
    .click();

  await expect.poll(() => page.evaluate(() => (window as unknown as {
    __fullscreenCalls: {
      request: number;
    };
  }).__fullscreenCalls.request))
    .toBe(1);

  await expect(fullscreenButton)
    .toHaveAttribute(`aria-label`, `Свернуть журнал`);

    await expect(fullscreenButton)
    .toHaveText(`Свернуть`);
};

function stubFullscreenApi(page: Page) {
  return page.evaluate(() => {
    Object.defineProperty(document, `fullscreenElement`, {
      configurable: true,
      writable: true,
      value: null,
    });

    (window as unknown as {
      __fullscreenCalls: {
        request: number;
        exit: number;
      };
    }).__fullscreenCalls = {
      request: 0,
      exit: 0,
    };

    Element.prototype.requestFullscreen = function requestFullscreen() {
      (window as unknown as {
        __fullscreenCalls: {
          request: number;
        };
      }).__fullscreenCalls.request += 1;

      return Promise.resolve();
    };

    document.exitFullscreen = function exitFullscreen() {
      (window as unknown as {
        __fullscreenCalls: {
          exit: number;
        };
      }).__fullscreenCalls.exit += 1;

      return Promise.resolve();
    };
  });
}

function enterFullscreen(page: Page, targetId = "magazine-pdf-view") {
  return page.evaluate((id) => {
    (document as unknown as { fullscreenElement: Element | null; }).fullscreenElement = document.getElementById(id);
    document.dispatchEvent(new Event(`fullscreenchange`));
  }, targetId);
}